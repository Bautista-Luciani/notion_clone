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

export const get = query({
    /* Funcion para obtener los documentos */
    handler: async (ctx) => {
        /* Verificamos que el usuario este loggueado */
        const identity = await ctx.auth.getUserIdentity()

        if(!identity){
            throw new Error("Not authenticated")
        }

        /* Obetenemos los documentos */
        const documents = await ctx.db.query("documents").collect()

        return documents
    }
})
