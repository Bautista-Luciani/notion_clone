/* Creamos este hook para que al navbar se le agregue un borde al hacer scroll en la pagina */

import { useEffect, useState } from "react"

export const useScrollTop = (threshold = 10) => {
    
    const [scrolled, setScrolled] = useState(false)
    
    /* Creamos este useEffect para saber si el usuario esta haciendo scroll */
    useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY > threshold){
            setScrolled(true)
        } else {
            setScrolled(false)
        }
      }
      
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [threshold])
    
    return scrolled;
}

