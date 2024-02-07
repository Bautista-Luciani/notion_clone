"use client"

import Spinner from "@/components/spinner"
import { useConvexAuth } from "convex/react"
import { redirect } from "next/navigation"
import Navigation from "./_components/navigation"

const MainLayout = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, isLoading } = useConvexAuth()

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    /* Protegemos todas las paginas que estan dentro de main, es decir que si no estan autenticados se los redirecciona al landingpage */
    if (!isAuthenticated) {
        return redirect("/")
    }

    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    )
}

export default MainLayout