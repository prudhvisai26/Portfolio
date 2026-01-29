'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// ============ MAIN PAGE COMPONENT ============
function GotPage() {
    const [stage, setStage] = useState(0)
    const hasInitialized = useRef(false)

    useEffect(() => {
        // Prevent double initialization in strict mode
        if (hasInitialized.current) return
        hasInitialized.current = true

        // Stage progression timeline
        const timers = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 1500),
            setTimeout(() => setStage(3), 3000),
            setTimeout(() => setStage(4), 4500),
            setTimeout(() => setStage(5), 6500),
            setTimeout(() => setStage(6), 8500),
            setTimeout(() => setStage(7), 10500),
        ]

        return () => timers.forEach(clearTimeout)
    }, [])

    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            
            {/* ============ BACKGROUND ============ */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 50% 120%, #2a0a00 0%, #150300 30%, #000000 70%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 1 ? 1 : 0 }}
                transition={{ duration: 2.5 }}
            />

            <motion.div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 50%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 1 ? 1 : 0 }}
                transition={{ duration: 2 }}
            />

            {/* ============ SMOKE ============ */}
            <SmokeLayer stage={stage} />

            {/* ============ EMBERS ============ */}
            <EmberLayer stage={stage} />

            {/* ============ SPARKS ============ */}
            {stage >= 3 && <SparkLayer />}

            {/* ============ FIRE GLOW ============ */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[50vh]"
                style={{
                    background: 'linear-gradient(to top, rgba(255,80,0,0.5) 0%, rgba(255,60,0,0.3) 20%, rgba(255,40,0,0.15) 40%, transparent 70%)',
                }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                    opacity: stage >= 1 ? 1 : 0,
                    y: stage >= 1 ? 0 : 100,
                }}
                transition={{ duration: 2 }}
            />

            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[40vh]"
                style={{
                    background: 'linear-gradient(to top, rgba(255,100,0,0.4) 0%, rgba(255,50,0,0.2) 30%, transparent 60%)',
                }}
                animate={{
                    opacity: stage >= 2 ? [0.4, 0.7, 0.5, 0.8, 0.4] : 0,
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[35vh]"
                style={{
                    background: 'radial-gradient(ellipse at 50% 100%, rgba(255,120,0,0.6) 0%, rgba(255,60,0,0.3) 40%, transparent 70%)',
                }}
                animate={{
                    opacity: stage >= 2 ? [0.5, 0.9, 0.6, 1, 0.5] : 0,
                    scaleX: stage >= 2 ? [1, 1.1, 0.95, 1.05, 1] : 1,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* ============ SIDE GLOWS ============ */}
            <motion.div
                className="absolute top-0 bottom-0 left-0 w-[20%]"
                style={{
                    background: 'linear-gradient(to right, rgba(255,60,0,0.15) 0%, transparent 100%)',
                }}
                animate={{
                    opacity: stage >= 2 ? [0.3, 0.6, 0.4, 0.7, 0.3] : 0,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute top-0 bottom-0 right-0 w-[20%]"
                style={{
                    background: 'linear-gradient(to left, rgba(255,60,0,0.15) 0%, transparent 100%)',
                }}
                animate={{
                    opacity: stage >= 2 ? [0.4, 0.7, 0.3, 0.6, 0.4] : 0,
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />

            {/* ============ VIGNETTE ============ */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)',
                }}
            />

            {/* ============ MAIN CONTENT ============ */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                
                <motion.p
                    className="text-lg tracking-[0.5em] text-amber-500/60 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ 
                        opacity: stage >= 4 ? 1 : 0,
                        y: stage >= 4 ? 0 : -20,
                    }}
                    transition={{ duration: 1.5 }}
                >
                    HOUSE TARGARYEN PRESENTS
                </motion.p>

                <div className="overflow-hidden">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-center"
                        style={{
                            color: '#ffd700',
                            textShadow: '0 0 40px #ff6600, 0 0 80px #ff4400, 0 0 120px #ff2200, 0 4px 20px rgba(0,0,0,0.8)',
                        }}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ 
                            opacity: stage >= 4 ? 1 : 0,
                            y: stage >= 4 ? 0 : 80,
                        }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    >
                        PRUDHVI SAI RAJ
                    </motion.h1>
                </div>

                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.2em] mt-2"
                    style={{
                        color: '#ffd700',
                        textShadow: '0 0 30px #ff6600, 0 0 60px #ff4400',
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ 
                        opacity: stage >= 5 ? 1 : 0,
                        y: stage >= 5 ? 0 : 40,
                    }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                    DASARI
                </motion.h2>

                <motion.div
                    className="h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-8"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                        width: stage >= 5 ? 400 : 0,
                        opacity: stage >= 5 ? 1 : 0,
                    }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                />

                <motion.p
                    className="text-xl md:text-2xl tracking-[0.4em] mt-6"
                    style={{
                        color: '#ffffff',
                        textShadow: '0 0 20px #ff660080',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                        opacity: stage >= 6 ? 1 : 0,
                        y: stage >= 6 ? 0 : 20,
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    SOFTWARE DEVELOPER
                </motion.p>

                <motion.p
                    className="text-lg text-amber-500/70 mt-4 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: stage >= 6 ? 1 : 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Fire and Blood
                </motion.p>
            </div>

            {/* ============ SCROLL INDICATOR ============ */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 7 ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="flex flex-col items-center text-amber-500/50"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <p className="text-sm tracking-[0.4em] mb-4">SCROLL TO EXPLORE</p>
                    <div className="w-6 h-10 border-2 border-amber-500/30 rounded-full flex justify-center">
                        <motion.div
                            className="w-1.5 h-2.5 bg-amber-500/50 rounded-full mt-2"
                            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* ============ HOUSE INDICATOR ============ */}
            <motion.div
                className="absolute top-6 right-6 text-right z-30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                    opacity: stage >= 6 ? 1 : 0,
                    x: stage >= 6 ? 0 : 20,
                }}
                transition={{ duration: 1 }}
            >
                <p className="text-amber-500/80 text-sm font-bold tracking-widest">
                    HOUSE TARGARYEN
                </p>
                <p className="text-white/50 text-xs italic">
                    Fire and Blood
                </p>
            </motion.div>
        </div>
    )
}

// ============ SMOKE LAYER ============
const SMOKE_DATA = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    startX: 35 + (i * 2.5),
    size: 60 + (i * 8),
    duration: 10 + (i % 3) * 2,
    delay: i * 0.5,
    xDrift: ((i % 6) - 3) * 30,
}))

function SmokeLayer({ stage }: { stage: number }) {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {SMOKE_DATA.map((smoke) => (
                <motion.div
                    key={smoke.id}
                    className="absolute rounded-full"
                    style={{
                        width: smoke.size,
                        height: smoke.size,
                        left: `${smoke.startX}%`,
                        bottom: '0%',
                        background: 'radial-gradient(circle, rgba(60,30,10,0.25) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{
                        opacity: stage >= 2 ? [0, 0.4, 0.2, 0] : 0,
                        y: stage >= 2 ? [0, -600, -900] : 0,
                        x: stage >= 2 ? [0, smoke.xDrift] : 0,
                        scale: stage >= 2 ? [0.5, 1.5, 2.5] : 0.5,
                    }}
                    transition={{
                        duration: smoke.duration,
                        delay: smoke.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    )
}

// ============ EMBER LAYER ============
const EMBER_DATA = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    startX: (i * 17) % 100,
    size: 3 + (i % 5),
    duration: 5 + (i % 4),
    delay: (i * 0.15) % 8,
    xDrift: ((i % 10) - 5) * 8,
    opacity: 0.5 + ((i % 5) * 0.1),
}))

function EmberLayer({ stage }: { stage: number }) {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {EMBER_DATA.map((ember) => (
                <motion.div
                    key={ember.id}
                    className="absolute rounded-full"
                    style={{
                        width: ember.size,
                        height: ember.size,
                        left: `${ember.startX}%`,
                        bottom: '-2%',
                        background: `radial-gradient(circle, #ffaa00 0%, #ff6600 40%, #ff4400 70%, transparent 100%)`,
                        boxShadow: `0 0 ${ember.size * 2}px #ff6600, 0 0 ${ember.size * 3}px #ff4400`,
                    }}
                    initial={{ opacity: 0, y: 0, scale: 0.3 }}
                    animate={{
                        opacity: stage >= 1 ? [0, ember.opacity, ember.opacity * 0.8, 0] : 0,
                        y: stage >= 1 ? [0, -800, -1100] : 0,
                        x: stage >= 1 ? [0, ember.xDrift] : 0,
                        scale: stage >= 1 ? [0.3, 1, 0.6] : 0.3,
                    }}
                    transition={{
                        duration: ember.duration,
                        delay: ember.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    )
}

// ============ SPARK LAYER ============
const SPARK_DATA = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: 35 + (i * 1.2),
    y: 60 + (i % 8) * 2,
    size: 2 + (i % 3),
    duration: 0.8 + (i % 5) * 0.2,
    delay: (i * 0.12) % 3,
    xOffset: ((i % 10) - 5) * 15,
    yOffset: -30 - (i % 8) * 10,
}))

function SparkLayer() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {SPARK_DATA.map((spark) => (
                <motion.div
                    key={spark.id}
                    className="absolute rounded-full"
                    style={{
                        width: spark.size,
                        height: spark.size,
                        left: `${spark.x}%`,
                        top: `${spark.y}%`,
                        background: '#ffdd00',
                        boxShadow: '0 0 8px #ffaa00, 0 0 16px #ff6600',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.5, 1, 0],
                        x: [0, spark.xOffset],
                        y: [0, spark.yOffset],
                    }}
                    transition={{
                        duration: spark.duration,
                        delay: spark.delay,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    )
}

export default GotPage