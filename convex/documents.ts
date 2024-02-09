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

        if(!identity){
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

        if(!identity){
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
