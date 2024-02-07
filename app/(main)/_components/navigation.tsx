"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, MenuIcon, Sidebar } from "lucide-react"
import { usePathname } from "next/navigation"
import { ElementRef, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import UserItem from "./user-item"

const Navigation = () => {

    /* Vamos a usar el pathname para que, en caso de que estemos en un celular, el sidebar se colapse automaticamente al tocar en un item */
    const pathname = usePathname()
    /* Usamos useMediaQuery para saber si estamos en mobile o desktop */
    const isMobile = useMediaQuery("(max-width: 768px)")

    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null)
    const [isResetting, setIsResetting] = useState(false)
    /* Lo inicializamos en isMobile para que este colapsado si estamos en un celular */
    const [isCollapsed, setIsCollapsed] = useState(isMobile)

    /* Usamos ambos useEffect para el correcto funcionamiento cuando pasamos de desktop a mobile */
    useEffect(() => {
      if(isMobile){
        collapse()
      } else {
        resetWidth()
      }
      /* Evitar este warning */
    }, [isMobile])

    useEffect(() => {
      if(isMobile){
        collapse()
      }
    }, [pathname, isMobile])

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
        event.stopPropagation()

        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    /* Funcion para cambiar el tamaño del sidebar */
    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef) return
        let newWidth = event.clientX

        if (newWidth < 240) newWidth = 240
        if (newWidth > 480) newWidth = 480

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`
            navbarRef.current.style.setProperty("left", `${newWidth}px`)
            navbarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`)
        }
    }

    /* Funcion para saber cuando se solto el sidebar, es decir una vez que ya hayamos cambiado el tamaño */
    const handleMouseUp = () => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    /* Funcion para resetar el tamaño del sidebar */
    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width = isMobile ? "100%" : "240px"
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100%-240px)"
            )
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            )

            /* Le ponemos 300 porque en el aside y el div del navbar le agregamos el className "duration: 300" */
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    /* Funcion para colapsar el sidebar */
    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = "0"
            navbarRef.current.style.setProperty("width", "100%")
            navbarRef.current.style.setProperty("left", "0")

            setTimeout(() => setIsResetting(false), 300);
        }
    }

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >
                <div
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}
                >
                    <ChevronLeft className="h-6 w-6" />
                </div>
                <div>
                    <UserItem />
                </div>
                <div className="mt-4">
                    <p>Documents</p>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                />
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    /* al width le restamos 240px porque es valor del left-60 */
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && (
                        <MenuIcon
                            onClick={resetWidth}
                            role="button"
                            className="h-6 w-6 text-muted-foreground"
                        />
                    )}
                </nav>
            </div>
        </>
    )
}

export default Navigation