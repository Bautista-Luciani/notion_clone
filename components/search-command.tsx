"use client"

import { api } from "@/convex/_generated/api"
import { useSearch } from "@/hooks/use-search"
import { useUser } from "@clerk/clerk-react"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { File } from "lucide-react"

const SearchCommand = () => {

    const { user } = useUser()
    const router = useRouter()
    const documents = useQuery(api.documents.getSearch)
    const [isMounted, setIsMounted] = useState(false)

    const toggle = useSearch((state) => state.toogle)
    const isOpen = useSearch((state) => state.isOpen)
    const onClose = useSearch((state) => state.onClose)

    /* Usamos este useEffect para abrir el buscador al tocar ctrl + k */
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
        }

        document.addEventListener("keydown", down)
        /* Hay que agregar el return para evitar overflows */
        return () => document.removeEventListener("keydown", down)
    }, [toggle])

    /* Usamos el useEffect y el if para evitar errores de hidratacion */
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    /* Funcion para redirijir a un doc */
    const onSelect = (id: string) => {
        router.push(`/documents/${id}`)
        onClose()
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
                placeholder={`Search ${user?.fullName}'s Jotion...`}
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {documents?.map((document) => (
                        <CommandItem
                            key={document._id}
                            value={`${document._id}-${document.title}`}
                            title={document.title}
                            onSelect={() => onSelect(document._id)}
                        >
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">
                                    {document.icon}
                                </p>
                            ) : (
                                <File className="mr-2 h-4 w-4" />
                            )}
                            <span>
                                {document.title}
                            </span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}

export default SearchCommand
