'use client'

import { Theme } from "@/src/data/themes";
import useAudio from "@/src/hooks/useAudio";
import {useState} from "react";

interface ThemeCardProps{
    theme: Theme
    onThemeClick: (theme: Theme) => void  // NEW PROP

}

function ThemeCard({theme,onThemeClick}:ThemeCardProps){

    const [isHovered,setIsHovered]=useState(false);
    const hoverSound=useAudio(`/audio/themes/${theme.id}.mp3`)

        const handleClick = () => {
        onThemeClick(theme)
    }

    return(
        <div 
        className="p-8 rounded-xl min-w-64 cursor-pointer text-center transition-all 
                duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
        onMouseEnter={() => {
                setIsHovered(true)
                hoverSound.play()
            }}
        onMouseLeave={()=>setIsHovered(false)}
        onClick={handleClick}
        style={
            {
                background:`linear-gradient(180deg, #0a0a0f, ${theme.colors.primary}, ${theme.colors.secondary})`,
                boxShadow: isHovered?`0 0 30px ${theme.colors.glow}`:"none"
            }
        }
    >
        <span className="text-4xl">{theme.icon}</span>
        <h2 className="text-xl font-bold text-white">{theme.name}</h2>
        <p className="text-sm text-white/70">{theme.tagline}</p>
    </div>
    )
}

export default ThemeCard;