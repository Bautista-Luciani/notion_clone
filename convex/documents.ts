import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { Doc, Id } from './_generated/dataModel'

export const create = mutation({
    /* Argumentos que debemos enviarle cada vez que queramos crear un documento */
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents"))
    },
    /* Funcion para crear el documento */
    handler: async (ctx, args) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        /* Obtenemos el userId */
        const userId = identity.subject

        /* Creamos el documento */
        const document = await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false
        })

        return document
    }
})

export const getSidebar = query({
    /* Posibles argumentos que debemos enviarle para obtener los documentos */
    args: {
        parentDocument: v.optional(v.id("documents"))
    },
    /* Funcion para obtener los documentos */
    handler: async (ctx, args) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        /* Obtenemos el userId */
        const userId = identity.subject

        /* Obtenemos los documentos utilizando los index que definimos en el schema */
        const documents = await ctx.db
            /* Archivo el cual queremos hacer la busqueda */
            .query("documents")
            /* Index que vamos a usar para la busqueda */
            .withIndex("by_user_parent", (q) => q.eq("userId", userId).eq("parentDocument", args.parentDocument))
            /* Filtramos los elementos eliminados */
            .filter((q) => q.eq(q.field("isArchived"), false))
            /* Orden descendiente */
            .order("desc")
            /* Obtenemos los documentos */
            .collect()

        return documents
    }
})

export const archive = mutation({
    /* Argumentos que debemos enviarle cada vez que queramos archivar un documento */
    args: {
        id: v.id("documents")
    },
    /* Funcion para archivar los documentos */
    handler: async (ctx, args) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        /* Obtenemos el userId */
        const userId = identity.subject

        /* Obtenemos y verificamos que el documento exista */
        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Not found")
        }

        /* Verificamos que el usuario sea el propietario del documento */
        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized")
        }

        /* Archivamos todos los documentos hijos */
        const recursiveArchive = async (documentId: Id<"documents">) => {
            /* Obtenemos los children */
            const children = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", (q) => (
                    q.eq("userId", userId).eq("parentDocument", documentId)
                ))
                .collect()

            /* Archivamos cada children */
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true
                })

                /* Volvemos a llamar a la funcion para archivar a los hijos de los hijos */
                await recursiveArchive(child._id)
            }
        }

        /* Archivamos los documentos */
        const document = await ctx.db.patch(args.id, {
            isArchived: true
        })

        recursiveArchive(args.id)

        return document
    }
})

export const getTrash = query({
    /* Funcion para obtener los documentos eliminados */
    handler: async (ctx) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        /* Obtenemos el userId */
        const userId = identity.subject

        /* Obtenemos los documentos eliminados utilizando los index que definimos en el schema */
        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("isArchived"), true))
            .order("desc")
            .collect()

        return documents
    }
})

export const restore = mutation({
    /* Argumentos que debemos enviarle cada vez que queramos recuperar un documento */
    args: {
        id: v.id("documents")
    },
    /* Funcion para recuperar los documentos */
    handler: async (ctx, args) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        /* Obtenemos el userId */
        const userId = identity.subject

        /* Obtenemos y verificamos que el documento exista */
        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Not found")
        }

        /* Verificamos que el usuario sea el propietario del documento */
        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized")
        }

        /* Restauramos todos los documentos hijos */
        const recursiveRestore = async (documentId: Id<"documents">) => {
            /* Obtenemos los children */
            const children = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", (q) => (
                    q.eq("userId", userId).eq("parentDocument", documentId)
                ))
                .collect()

            /* Restauramos cada children */
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: false
                })

                /* Volvemos a llamar a la funcion para restaurar a los hijos de los hijos */
                await recursiveRestore(child._id)
            }
        }

        const options: Partial<Doc<"documents">> = {
            isArchived: false
        }

        /* En caso de que el documento actual tenga un documento padre, y ese documento padre esta archivado,
        vamos a cambiar el valor del isArchived a false y el parentDocument a undefined */
        if (existingDocument.parentDocument) {
            const parent = await ctx.db.get(existingDocument.parentDocument)
            if (parent?.isArchived) {
                options.parentDocument = undefined
            }
        }

        /* Restauramos el doc */
        const document = await ctx.db.patch(args.id, options)

        recursiveRestore(args.id)

        return document
    }
})

export const remove = mutation({
    /* Argumentos que debemos enviarle cada vez que queramos eliminar un documento */
    args: {
        id: v.id("documents")
    },
    /* Funcion para eliminar los documentos */
    handler: async (ctx, args) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        /* Obtenemos el userId */
        const userId = identity.subject

        /* Obtenemos y verificamos que el documento exista */
        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Not found")
        }

        /* Verificamos que el usuario sea el propietario del documento */
        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized")
        }

        /* Eliminamos el documento */
        const document = await ctx.db.delete(args.id)

        return document
    }
})

export const getSearch = query({
    /* Funcion para obtener los documentos a traves del search */
    handler: async (ctx) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Not authenticated")
        }

        /* Obtenemos el userId */
        const userId = identity.subject

        /* Obtenemos los documentos utilizando los index que definimos en el schema */
        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .filter((q) => q.eq(q.field("isArchived"), false))
            .order("desc")
            .collect()

        return documents
    }
})

export const getById = query({
    args: {
        documentId: v.id("documents")
    },
    handler: async (ctx, args) => {
        /* Obtenemos el usuario pero todavia no verificamos que el doc sea del usuario ya que en caso 
        de que este publicado lo podrian ver otros usuarios. Primero hay que verificar de que este 
        publicado y en caso de que no recien ahi hacemos esta verificacion */
        const identity = await ctx.auth.getUserIdentity()

        /* Obtenemos el documento y verificamos de que exista */
        const document = await ctx.db.get(args.documentId)

        if (!document) {
            throw new Error("Not found")
        }

        /* Si el doc esta publicado y no esta eliminado lo retornamos */
        if (document.isPublished && !document.isArchived) {
            return document
        }

        /* Ahora si verificamos de que el doc sea del usuario, ya que si llegamos a este punto es porque no esta publicado */
        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        if (document.userId !== userId) {
            throw new Error("Unauthorized")
        }

        return document
    }
})

export const update = mutation({
    /* Argumentos que debemos enviarle cada vez que queramos actualizar un documento */
    args: {
        id: v.id("documents"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean())
    },
    handler: async (ctx, args) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthenticated");
        }

        /* Obtenemos el userId */
        const userId = identity.subject;

        /* Obtenemos los args */
        const { id, ...rest } = args;

        /* Obtenemos el doc */
        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        /* Actualizamos el doc */
        const document = await ctx.db.patch(args.id, {
            ...rest,
        });

        return document;
    },
});

export const removeIcon = mutation({
    /* Argumentos que debemos enviarle cada vez que queramos eliminar un icono */
    args: { 
        id: v.id("documents") 
    },
    handler: async (ctx, args) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthenticated");
        }

        /* Obtenemos el userId */
        const userId = identity.subject;

        /* Obtenemos el doc */
        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        /* Eliminamos el icono */
        const document = await ctx.db.patch(args.id, {
            icon: undefined
        });

        return document;
    }
});

export const removeCoverImage = mutation({
    /* Argumentos que debemos enviarle cada vez que queramos eliminar una imagen */
    args: { 
        id: v.id("documents") 
    },
    handler: async (ctx, args) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthenticated");
        }

        /* Obtenemos el userId */
        const userId = identity.subject;

        /* Obtenemos el doc */
        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        /* Eliminamos la imagen */
        const document = await ctx.db.patch(args.id, {
            coverImage: undefined
        });

        return document;
    }
});
