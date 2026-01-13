'use client'

import { Theme } from "@/src/data/themes";
import {useState} from "react";



interface ThemeCardProps{
    theme: Theme
}

function ThemeCard({theme}:ThemeCardProps){

    const [isHovered,setIsHovered]=useState(false);

    return(
        <div 
        className="p-6 rounded-xl min-w-52 cursor-pointer text-center transition-all 
                duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
        style={
            {
                backgroundColor:theme.colors.primary,
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