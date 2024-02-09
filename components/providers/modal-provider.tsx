/* Creamos este provider para evitar problemas de hidratacion
En vez de escribir en cada componente el useEffect y el if, creamos el provider y agregamos los componentes aca */

"use client"

import { useEffect, useState } from "react"
import SettingModal from "../modals/setting-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }

    return (
        <>
            <SettingModal />
        </>
    )
}