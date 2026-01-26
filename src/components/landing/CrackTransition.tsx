// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion, AnimatePresence } from 'framer-motion'

// interface CinematicTransitionProps {
//     isActive: boolean
//     targetRoute: string
//     themeColor: string
//     themeName: string
//     themeIcon: string
// }

// function CinematicTransition({ 
//     isActive, 
//     targetRoute, 
//     themeColor, 
//     themeName,
//     themeIcon 
// }: CinematicTransitionProps) {
//     const router = useRouter()

//     useEffect(() => {
//         if (!isActive) return

//         // Navigate after animation completes
//         const timer = setTimeout(() => {
//             router.push(targetRoute)
//         }, 1800)

//         return () => clearTimeout(timer)
//     }, [isActive, targetRoute, router])

//     return (
//         <AnimatePresence>
//             {isActive && (
//                 <>
//                     {/* Background blur/darken overlay */}
//                     <motion.div
//                         className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                     />

//                     {/* Central expanding circle/portal */}
//                     <motion.div
//                         className="fixed inset-0 z-50 flex items-center justify-center"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.2 }}
//                     >
//                         {/* Glowing ring */}
//                         <motion.div
//                             className="absolute rounded-full"
//                             style={{
//                                 background: `radial-gradient(circle, ${themeColor}40 0%, transparent 70%)`,
//                                 boxShadow: `0 0 100px 50px ${themeColor}60`,
//                             }}
//                             initial={{ width: 100, height: 100, opacity: 0 }}
//                             animate={{ 
//                                 width: [100, 200, 150],
//                                 height: [100, 200, 150],
//                                 opacity: [0, 1, 1]
//                             }}
//                             transition={{ duration: 0.5, ease: "easeOut" }}
//                         />

//                         {/* Icon and text container */}
//                         <motion.div
//                             className="relative z-10 flex flex-col items-center"
//                             initial={{ scale: 0.5, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             transition={{ duration: 0.4, delay: 0.1 }}
//                         >
//                             {/* Theme Icon */}
//                             <motion.span
//                                 className="text-8xl mb-4"
//                                 initial={{ scale: 0, rotate: -180 }}
//                                 animate={{ scale: 1, rotate: 0 }}
//                                 transition={{ 
//                                     duration: 0.6, 
//                                     delay: 0.2,
//                                     type: "spring",
//                                     stiffness: 200
//                                 }}
//                             >
//                                 {themeIcon}
//                             </motion.span>

//                             {/* Theme Name */}
//                             <motion.h2
//                                 className="text-4xl font-bold text-white text-center"
//                                 style={{ textShadow: `0 0 30px ${themeColor}` }}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.4, delay: 0.4 }}
//                             >
//                                 {themeName}
//                             </motion.h2>

//                             {/* Loading dots */}
//                             <motion.div
//                                 className="flex gap-2 mt-6"
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ delay: 0.6 }}
//                             >
//                                 {[0, 1, 2].map((i) => (
//                                     <motion.div
//                                         key={i}
//                                         className="w-3 h-3 rounded-full"
//                                         style={{ backgroundColor: themeColor }}
//                                         animate={{
//                                             scale: [1, 1.5, 1],
//                                             opacity: [0.5, 1, 0.5],
//                                         }}
//                                         transition={{
//                                             duration: 0.8,
//                                             repeat: Infinity,
//                                             delay: i * 0.2,
//                                         }}
//                                     />
//                                 ))}
//                             </motion.div>
//                         </motion.div>
//                     </motion.div>

//                     {/* Full screen color flood */}
//                     <motion.div
//                         className="fixed inset-0 z-60"
//                         style={{ backgroundColor: themeColor }}
//                         initial={{ 
//                             clipPath: 'circle(0% at 50% 50%)'
//                         }}
//                         animate={{ 
//                             clipPath: 'circle(150% at 50% 50%)'
//                         }}
//                         transition={{ 
//                             duration: 0.8, 
//                             delay: 1.0,
//                             ease: [0.22, 1, 0.36, 1]
//                         }}
//                     />
//                 </>
//             )}
//         </AnimatePresence>
//     )
// }

// export default CinematicTransition


'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface CinematicTransitionProps {
    isActive: boolean
    targetRoute: string
    themeColor: string
    themeName: string
    themeIcon: string
    tagline: string
}

// Pre-generate particle positions
const particles = Array.from({ length: 20 }, (_, i) => ({
    angle: (i / 20) * 360,
    distance: 80 + Math.random() * 40,
    size: 4 + Math.random() * 4,
    duration: 2 + Math.random() * 1,
    delay: Math.random() * 0.5,
}))

// Pre-generate light ray angles
const lightRays = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * 360,
    length: 150 + Math.random() * 100,
    width: 2 + Math.random() * 3,
    delay: i * 0.05,
}))

function CinematicTransition({ 
    isActive, 
    targetRoute, 
    themeColor, 
    themeName,
    themeIcon,
    tagline
}: CinematicTransitionProps) {
    const router = useRouter()

    useEffect(() => {
        if (!isActive) return

        const timer = setTimeout(() => {
            router.push(targetRoute)
        }, 3500) // Slower - 3.5 seconds

        return () => clearTimeout(timer)
    }, [isActive, targetRoute, router])

    // Split name into letters for typewriter effect
    const letters = themeName.split('')

    return (
        <AnimatePresence>
            {isActive && (
                <>
                    {/* Background blur/darken overlay */}
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    {/* Main content container */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Light rays */}
                        <div className="absolute">
                            {lightRays.map((ray, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute origin-center"
                                    style={{
                                        width: `${ray.length}px`,
                                        height: `${ray.width}px`,
                                        background: `linear-gradient(90deg, ${themeColor}80, transparent)`,
                                        transform: `rotate(${ray.angle}deg)`,
                                        left: '50%',
                                        top: '50%',
                                        marginLeft: '0px',
                                        marginTop: `-${ray.width / 2}px`,
                                        transformOrigin: 'left center',
                                    }}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ 
                                        scaleX: [0, 1, 0.8],
                                        opacity: [0, 0.8, 0.4]
                                    }}
                                    transition={{ 
                                        duration: 1.5, 
                                        delay: 0.5 + ray.delay,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </div>

                        {/* Multiple expanding rings */}
                        {[1, 2, 3].map((ring) => (
                            <motion.div
                                key={ring}
                                className="absolute rounded-full border-2"
                                style={{
                                    borderColor: themeColor,
                                    boxShadow: `0 0 30px ${themeColor}60, inset 0 0 30px ${themeColor}30`,
                                }}
                                initial={{ width: 0, height: 0, opacity: 0 }}
                                animate={{ 
                                    width: [0, 200 + ring * 80, 180 + ring * 80],
                                    height: [0, 200 + ring * 80, 180 + ring * 80],
                                    opacity: [0, 0.8, 0.3]
                                }}
                                transition={{ 
                                    duration: 1.5, 
                                    delay: 0.3 + ring * 0.2,
                                    ease: "easeOut"
                                }}
                            />
                        ))}

                        {/* Central glow */}
                        <motion.div
                            className="absolute rounded-full"
                            style={{
                                background: `radial-gradient(circle, ${themeColor}60 0%, ${themeColor}20 40%, transparent 70%)`,
                            }}
                            initial={{ width: 0, height: 0, opacity: 0 }}
                            animate={{ 
                                width: [0, 300, 250],
                                height: [0, 300, 250],
                                opacity: [0, 1, 0.8]
                            }}
                            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                        />

                        {/* Floating particles */}
                        <div className="absolute">
                            {particles.map((particle, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full"
                                    style={{
                                        width: particle.size,
                                        height: particle.size,
                                        backgroundColor: themeColor,
                                        boxShadow: `0 0 10px ${themeColor}`,
                                    }}
                                    initial={{ 
                                        x: 0, 
                                        y: 0, 
                                        opacity: 0,
                                        scale: 0
                                    }}
                                    animate={{ 
                                        x: Math.cos(particle.angle * Math.PI / 180) * particle.distance,
                                        y: Math.sin(particle.angle * Math.PI / 180) * particle.distance,
                                        opacity: [0, 1, 1, 0],
                                        scale: [0, 1.2, 1, 0.5]
                                    }}
                                    transition={{ 
                                        duration: particle.duration, 
                                        delay: 0.8 + particle.delay,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </div>

                        {/* Icon and text container */}
                        <motion.div
                            className="relative z-10 flex flex-col items-center"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        >
                            {/* Theme Icon with dramatic entrance */}
                            <motion.div
                                className="relative"
                                initial={{ scale: 0, rotate: -180, y: 50 }}
                                animate={{ scale: 1, rotate: 0, y: 0 }}
                                transition={{ 
                                    duration: 1, 
                                    delay: 0.5,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 10
                                }}
                            >
                                {/* Icon glow background */}
                                <motion.div
                                    className="absolute inset-0 rounded-full blur-xl"
                                    style={{ backgroundColor: themeColor }}
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <span className="text-9xl relative z-10 drop-shadow-2xl">
                                    {themeIcon}
                                </span>
                            </motion.div>

                            {/* Theme Name - Typewriter effect */}
                            <motion.h2
                                className="text-5xl font-bold text-white mt-8 flex"
                                style={{ textShadow: `0 0 40px ${themeColor}, 0 0 80px ${themeColor}50` }}
                            >
                                {letters.map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ 
                                            duration: 0.1, 
                                            delay: 1.2 + i * 0.08,
                                            ease: "easeOut"
                                        }}
                                    >
                                        {letter === ' ' ? '\u00A0' : letter}
                                    </motion.span>
                                ))}
                            </motion.h2>

                            {/* Tagline */}
                            <motion.p
                                className="text-xl text-white/80 mt-4 italic"
                                style={{ textShadow: `0 0 20px ${themeColor}` }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 2.0 }}
                            >
                                {tagline}
                            </motion.p>

                            {/* Animated line under text */}
                            <motion.div
                                className="h-1 rounded-full mt-6"
                                style={{ backgroundColor: themeColor }}
                                initial={{ width: 0 }}
                                animate={{ width: 200 }}
                                transition={{ duration: 0.8, delay: 2.3, ease: "easeOut" }}
                            />

                            {/* Pulsing "Entering..." text */}
                            <motion.p
                                className="text-lg text-white/60 mt-6 tracking-widest uppercase"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 1] }}
                                transition={{ duration: 0.5, delay: 2.5 }}
                            >
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    Entering realm...
                                </motion.span>
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    {/* Portal expansion - Final transition */}
                    <motion.div
                        className="fixed inset-0 z-60"
                        style={{ backgroundColor: themeColor }}
                        initial={{ 
                            clipPath: 'circle(0% at 50% 50%)'
                        }}
                        animate={{ 
                            clipPath: 'circle(150% at 50% 50%)'
                        }}
                        transition={{ 
                            duration: 1.0, 
                            delay: 2.8,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    />

                    {/* Final white flash for dramatic effect */}
                    <motion.div
                        className="fixed inset-0 z-70 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 0.8, 0] }}
                        transition={{ 
                            duration: 0.5, 
                            delay: 3.2,
                            times: [0, 0.5, 0.7, 1]
                        }}
                    />
                </>
            )}
        </AnimatePresence>
    )
}

export default CinematicTransition