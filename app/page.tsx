'use client'
import { useState } from "react";
import { themes } from "@/src/data/themes";
import ThemeCard from "@/src/components/landing/ThemeCard";
import ParticleBackground from "@/src/components/landing/ParticleBackground";
import CinematicTransition from "@/src/components/landing/CrackTransition";


function Home(){
    const [transitionActive, setTransitionActive] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState<typeof themes[0] | null>(null)

    const handleThemeClick = (theme: typeof themes[0]) => {
        if (transitionActive) return
        setSelectedTheme(theme)
        setTransitionActive(true)
    }
  return (
    <main className="relative min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center flex-col">
        <ParticleBackground />
        <h1 className="text-4xl text-yellow-500 font-bold mb-8">Choose Your Realm</h1>
        <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-10 min-w-52 min-h-52"> 
          <div className="flex gap-6 justify-center">
              {themes.map((theme)=>(
                <ThemeCard 
                  key={theme.id} 
                  theme={theme} 
                  onThemeClick={handleThemeClick}
                />
              ))}
          </div>
        </div>

        {/* Crack Transition Overlay */}
              {selectedTheme && (
                <CinematicTransition
                    isActive={transitionActive}
                    targetRoute={selectedTheme.route}
                    themeColor={selectedTheme.colors.primary}
                    themeName={selectedTheme.name}
                    themeIcon={selectedTheme.icon}
                    tagline={selectedTheme.tagline}
                />
            )}
    </main>
  );
}

export default Home;