'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Pre-generated particle data
const EMBER_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: (i * 19) % 100,
  size: 2 + (i % 5),
  duration: 6 + (i % 4),
  delay: (i * 0.2) % 8,
}))

const SPARK_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: 40 + (i % 20),
  top: 55 + (i % 10),
  size: 2 + (i % 3),
  duration: 1 + (i % 4) * 0.3,
  delay: (i * 0.15) % 3,
  xDrift: ((i % 8) - 4) * 20,
  yDrift: -40 - (i % 6) * 15,
}))

function GotPage() {
  const [stage, setStage] = useState(0)
  const [lettersRevealed, setLettersRevealed] = useState(0)
  const hasInit = useRef(false)

  const firstName = "PRUDHVI"
  const middleName = "SAI RAJ"
  const lastName = "DASARI"
  const fullName = firstName + " " + middleName

  useEffect(() => {
    if (hasInit.current) return
    hasInit.current = true

    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => setStage(3), 2000),
      setTimeout(() => setStage(4), 3000),
      setTimeout(() => setStage(5), 6500),
      setTimeout(() => setStage(6), 8000),
      setTimeout(() => setStage(7), 10000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (stage >= 4 && lettersRevealed < fullName.length) {
      const timer = setTimeout(() => setLettersRevealed(p => p + 1), 120)
      return () => clearTimeout(timer)
    }
  }, [stage, lettersRevealed, fullName.length])

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 120%, #2a0800 0%, #120200 35%, #000000 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 1 ? 1 : 0 }}
        transition={{ duration: 2.5 }}
      />
      
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, transparent 40%)' }} />

      {/* Embers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {EMBER_DATA.map(ember => (
          <motion.div
            key={ember.id}
            className="absolute rounded-full"
            style={{
              width: ember.size,
              height: ember.size,
              left: `${ember.left}%`,
              bottom: '-2%',
              background: 'radial-gradient(circle, #ffcc00 0%, #ff6600 50%, transparent 100%)',
              boxShadow: `0 0 ${ember.size * 3}px #ff6600`,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: stage >= 1 ? [0, 0.8, 0.4, 0] : 0,
              y: stage >= 1 ? [0, -800, -1100] : 0,
            }}
            transition={{ duration: ember.duration, delay: ember.delay, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Fire Glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[45vh]"
        style={{ background: 'linear-gradient(to top, rgba(255,80,0,0.5) 0%, rgba(255,60,0,0.25) 30%, transparent 100%)' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 50 }}
        transition={{ duration: 2 }}
      />

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[35vh]"
        style={{ background: 'linear-gradient(to top, rgba(255,100,0,0.4) 0%, transparent 100%)' }}
        animate={{ opacity: stage >= 2 ? [0.4, 0.7, 0.5, 0.8, 0.4] : 0 }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[40vh]"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,120,0,0.5) 0%, transparent 80%)' }}
        animate={{ opacity: stage >= 2 ? [0.5, 0.9, 0.5] : 0, scaleX: stage >= 2 ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Sparks */}
      {stage >= 3 && (
        <div className="absolute inset-0 pointer-events-none">
          {SPARK_DATA.map(spark => (
            <motion.div
              key={spark.id}
              className="absolute rounded-full"
              style={{
                width: spark.size,
                height: spark.size,
                left: `${spark.left}%`,
                top: `${spark.top}%`,
                background: '#ffee00',
                boxShadow: '0 0 6px #ffaa00, 0 0 12px #ff6600',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [0, spark.xDrift],
                y: [0, spark.yDrift],
              }}
              transition={{ duration: spark.duration, delay: spark.delay, repeat: Infinity }}
            />
          ))}
        </div>
      )}

      {/* Side Glows */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[20%]"
        style={{ background: 'linear-gradient(to right, rgba(255,50,0,0.12) 0%, transparent 100%)' }}
        animate={{ opacity: stage >= 2 ? [0.3, 0.7, 0.3] : 0 }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[20%]"
        style={{ background: 'linear-gradient(to left, rgba(255,50,0,0.12) 0%, transparent 100%)' }}
        animate={{ opacity: stage >= 2 ? [0.4, 0.6, 0.4] : 0 }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse, transparent 20%, rgba(0,0,0,0.7) 100%)' }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
        
        <motion.p
          className="text-sm md:text-base tracking-[0.5em] text-amber-500/60 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : -20 }}
          transition={{ duration: 1.5 }}
        >
          HOUSE TARGARYEN PRESENTS
        </motion.p>

        {/* Letter by Letter Name */}
        <h1 
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-center"
          style={{ textShadow: '0 0 30px #ff6600, 0 0 60px #ff4400, 0 0 90px #ff2200' }}
        >
          {fullName.split('').map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 30, scale: 0.5 }}
              animate={{
                opacity: i < lettersRevealed ? 1 : 0,
                y: i < lettersRevealed ? 0 : 30,
                scale: i < lettersRevealed ? 1 : 0.5,
                color: i < lettersRevealed ? '#ffd700' : 'transparent',
              }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>

        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-[0.2em] mt-2"
          style={{ color: '#ffd700', textShadow: '0 0 25px #ff6600, 0 0 50px #ff4400' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 30 }}
          transition={{ duration: 1 }}
        >
          {lastName}
        </motion.h2>

        {/* Animated Line */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-10 relative overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: stage >= 6 ? 350 : 0, opacity: stage >= 6 ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ opacity: 0.6 }}
          />
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl tracking-[0.4em] mt-8 text-white"
          style={{ textShadow: '0 0 15px rgba(255,100,0,0.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage >= 6 ? 1 : 0, y: stage >= 6 ? 0 : 20 }}
          transition={{ duration: 1 }}
        >
          SOFTWARE DEVELOPER
        </motion.p>

        <motion.p
          className="text-lg text-amber-500/70 mt-6 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 6 ? [0.6, 1, 0.6] : 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Fire and Blood
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 7 ? 1 : 0 }}
      >
        <motion.div
          className="flex flex-col items-center text-amber-500/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
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

      {/* House Badge */}
      <motion.div
        className="absolute top-6 right-6 text-right z-30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: stage >= 6 ? 1 : 0, x: stage >= 6 ? 0 : 20 }}
      >
        <p className="text-amber-500/80 text-sm font-bold tracking-widest">HOUSE TARGARYEN</p>
        <p className="text-white/50 text-xs italic">Fire and Blood</p>
      </motion.div>
    </div>
  )
}

export default GotPage