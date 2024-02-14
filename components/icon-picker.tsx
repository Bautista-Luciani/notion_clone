"use client"

import EmojiPicker, { Theme } from 'emoji-picker-react'
import { useTheme } from "next-themes"
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface IconPickerProps {
    onChange: (icon: string) => void
    children: React.ReactNode
    asChild?: boolean
}

const IconPicker = ({ onChange, children, asChild }: IconPickerProps) => {

    /* El emoji picker trae su propio themes, pero como nosotros estamos trabajando con 'useTheme' de next/theme debemos combinar ambos */
    const { resolvedTheme } = useTheme()
    const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap

    const themeMap = {
        "dark": Theme.DARK,
        "light": Theme.LIGHT
    }

    const theme = themeMap[currentTheme]

    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                { children }
            </PopoverTrigger>
            <PopoverContent className='p-0 w-full border-none shadow-none'>
                <EmojiPicker 
                    height={350}
                    theme={theme}
                    onEmojiClick={(data) => onChange(data.emoji)}
                />
            </PopoverContent>
        </Popover>
    )
}

export default IconPicker