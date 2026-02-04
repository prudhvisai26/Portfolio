'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll} from 'framer-motion'

// ============================================================
// PRE-GENERATED PARTICLE DATA
// ============================================================

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

// Snow particles for Stark section
const SNOW_DATA = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: (i * 17) % 100,
  size: 2 + (i % 4),
  duration: 8 + (i % 5),
  delay: (i * 0.15) % 10,
  drift: ((i % 12) - 6) * 20,
}))

// ============================================================
// PORTFOLIO DATA
// ============================================================

const portfolioData = {
  name: "Prudhvi Sai Raj Dasari",
  title: "Software Developer",
  email: "dasariprudhvisai26@gmail.com",
  location: "San Jose, California",
  
  about: `A passionate Software Developer with a strong foundation in building scalable applications 
  and solving complex problems. Like the Starks of Winterfell, I believe in honor, integrity, 
  and delivering quality work that stands the test of time. Currently pursuing my Master's degree 
  at San José State University while crafting elegant solutions to challenging problems.`,
  
  skills: [
    { name: 'Java', level: 90, category: 'Languages' },
    { name: 'Python', level: 85, category: 'Languages' },
    { name: 'Go', level: 75, category: 'Languages' },
    { name: 'JavaScript', level: 88, category: 'Languages' },
    { name: 'TypeScript', level: 85, category: 'Languages' },
    { name: 'React', level: 88, category: 'Frontend' },
    { name: 'Next.js', level: 82, category: 'Frontend' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'AWS', level: 78, category: 'Cloud' },
    { name: 'PostgreSQL', level: 82, category: 'Database' },
    { name: 'MongoDB', level: 78, category: 'Database' },
    { name: 'Docker', level: 75, category: 'DevOps' },
    { name: 'Kafka', level: 72, category: 'Tools' },
    { name: 'Git', level: 88, category: 'Tools' },
  ],
  
  experience: [
    {
      company: 'Accolite Digital',
      role: 'Software Engineer',
      period: 'June 2022 - January 2024',
      location: 'India',
      highlights: [
        'Developed scalable microservices architecture',
        'Improved system performance by 40%',
        'Led team of 4 developers on critical projects',
        'Implemented CI/CD pipelines with Docker & Kubernetes',
      ],
    },
  ],
  
  projects: [
    {
      name: 'MindClash',
      description: 'Real-time multiplayer quiz battle platform with live competition features',
      tech: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
      highlight: 'Battle of wits in real-time',
    },
    {
      name: 'AI Scrum Master',
      description: 'Intelligent project management assistant powered by machine learning',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
      highlight: 'Strategic command center',
    },
    {
      name: 'Portfolio Website',
      description: 'Cinematic Game of Thrones themed portfolio with immersive animations',
      tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
      highlight: 'Fire and Blood',
    },
  ],
  
  education: [
    {
      degree: 'Master of Science in Computer Science',
      school: 'San José State University',
      period: '2024 - 2026',
      gpa: '3.5',
      location: 'San Jose, CA',
    },
    {
      degree: 'Bachelor of Technology in Computer Science',
      school: 'MLR Institute of Technology',
      period: '2018 - 2022',
      gpa: '8.61',
      location: 'Hyderabad, India',
    },
  ],
  
  social: {
    github: 'https://github.com/prudhvisairaj',
    linkedin: 'https://linkedin.com/in/prudhvisairaj',
    email: 'dasariprudhvisai26@gmail.com',
  },
}

// ============================================================
// MAIN COMPONENT
// ============================================================

function GotPage() {
  const [stage, setStage] = useState(0)
  const [lettersRevealed, setLettersRevealed] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const hasInit = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const firstName = "PRUDHVI"
  const middleName = "SAI RAJ"
  const lastName = "DASARI"
  const fullName = firstName + " " + middleName

  const { scrollYProgress } = useScroll()

  // Stage progression for hero
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

  // Letter reveal
  useEffect(() => {
    if (stage >= 4 && lettersRevealed < fullName.length) {
      const timer = setTimeout(() => setLettersRevealed(p => p + 1), 120)
      return () => clearTimeout(timer)
    }
  }, [stage, lettersRevealed, fullName.length])

  // Track current section for navigation
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const sectionIndex = Math.min(Math.floor(progress * 7), 6)
      setCurrentSection(sectionIndex)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div ref={containerRef} className="relative">
      
      {/* ============ PROGRESS BAR ============ */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ 
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #ff4400, #ff6600, #ffaa00, #ffd700)',
        }}
      />

      {/* ============ SECTION NAVIGATION ============ */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {['Hero', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((section, i) => (
          <a
            key={section}
            href={`#${section.toLowerCase()}`}
            className="group flex items-center gap-2"
          >
            <span 
              className={`text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                currentSection === i ? 'text-amber-500' : 'text-white/50'
              }`}
            >
              {section.toUpperCase()}
            </span>
            <div 
              className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                currentSection === i 
                  ? 'bg-amber-500 border-amber-500 scale-125' 
                  : 'border-white/30 group-hover:border-amber-500'
              }`}
            />
          </a>
        ))}
      </div>

      {/* ============ HERO SECTION - HOUSE TARGARYEN ============ */}
      <section id="hero" className="relative min-h-screen bg-black overflow-hidden">
        
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
      </section>

      {/* ============ ABOUT SECTION - HOUSE STARK ============ */}
      <section id="about" className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #0a1628, #1a2a4a, #0a1628, #0a0a0a)' }}>
        
        {/* Snow particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {SNOW_DATA.map(snow => (
            <motion.div
              key={`snow-${snow.id}`}
              className="absolute rounded-full bg-white/60"
              style={{
                width: snow.size,
                height: snow.size,
                left: `${snow.left}%`,
                top: '-2%',
              }}
              animate={{
                y: [0, 1200],
                x: [0, snow.drift],
                opacity: [0, 0.8, 0.6, 0],
              }}
              transition={{
                duration: snow.duration,
                delay: snow.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Ice/frost overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(168,213,255,0.3) 0%, transparent 60%)' }}
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full">
            
            {/* House header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-blue-300/60 text-sm tracking-[0.4em] mb-4">HOUSE STARK</p>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(168,213,255,0.5)' }}>
                ABOUT ME
              </h2>
              <p className="text-blue-200/70 italic">Winter is Coming</p>
            </motion.div>

            {/* Direwolf watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[20rem] pointer-events-none">
              🐺
            </div>

            {/* About content */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div 
                className="p-8 rounded-lg border border-blue-500/20"
                style={{ background: 'rgba(10,22,40,0.8)', backdropFilter: 'blur(10px)' }}
              >
                <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed">
                  {portfolioData.about}
                </p>
                
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-blue-900/30">
                    <p className="text-3xl font-bold text-blue-300">2+</p>
                    <p className="text-sm text-blue-200/60">Years Experience</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-blue-900/30">
                    <p className="text-3xl font-bold text-blue-300">10+</p>
                    <p className="text-sm text-blue-200/60">Projects</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-blue-900/30">
                    <p className="text-3xl font-bold text-blue-300">3.5</p>
                    <p className="text-sm text-blue-200/60">GPA (MS)</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-blue-900/30">
                    <p className="text-3xl font-bold text-blue-300">14+</p>
                    <p className="text-sm text-blue-200/60">Technologies</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>

      {/* ============ SKILLS SECTION - HOUSE TARGARYEN ============ */}
      <section id="skills" className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a0000, #2a0a0a, #1a0000, #0a0a0a)' }}>
        
        {/* Fire embers (reuse) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {EMBER_DATA.slice(0, 30).map(ember => (
            <motion.div
              key={`skill-ember-${ember.id}`}
              className="absolute rounded-full"
              style={{
                width: ember.size,
                height: ember.size,
                left: `${ember.left}%`,
                bottom: '-2%',
                background: 'radial-gradient(circle, #ffcc00 0%, #ff6600 50%, transparent 100%)',
                boxShadow: `0 0 ${ember.size * 3}px #ff6600`,
              }}
              animate={{
                opacity: [0, 0.6, 0.3, 0],
                y: [0, -600, -900],
              }}
              transition={{ duration: ember.duration, delay: ember.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Fire glow at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[30vh]"
          style={{ background: 'linear-gradient(to top, rgba(255,80,0,0.3) 0%, transparent 100%)' }}
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full">
            
            {/* House header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-amber-500/60 text-sm tracking-[0.4em] mb-4">HOUSE TARGARYEN</p>
              <h2 className="text-5xl md:text-6xl font-bold text-amber-500 mb-4" style={{ textShadow: '0 0 30px rgba(255,100,0,0.5)' }}>
                MY ARSENAL
              </h2>
              <p className="text-amber-400/70 italic">Fire and Blood</p>
            </motion.div>

            {/* Skills grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolioData.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="relative p-4 rounded-lg border border-orange-500/20 overflow-hidden"
                  style={{ background: 'rgba(26,0,0,0.8)' }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, amount: 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255,150,50,0.5)' }}
                >
                  <p className="text-amber-100 font-bold mb-2">{skill.name}</p>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #ff4400, #ff6600, #ffaa00)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <p className="text-xs text-orange-400/60 mt-2">{skill.category}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>

      {/* ============ EXPERIENCE SECTION - HOUSE LANNISTER ============ */}
      <section id="experience" className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1000, #2a1a00, #1a1000, #0a0a0a)' }}>
        
        {/* Gold shimmer particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={`gold-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${(i * 31) % 100}%`,
                top: `${(i * 17) % 100}%`,
                background: '#ffd700',
                boxShadow: '0 0 10px #ffd700',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + (i % 3),
                delay: (i * 0.2) % 4,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full">
            
            {/* House header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-yellow-500/60 text-sm tracking-[0.4em] mb-4">HOUSE LANNISTER</p>
              <h2 className="text-5xl md:text-6xl font-bold text-yellow-500 mb-4" style={{ textShadow: '0 0 30px rgba(255,215,0,0.5)' }}>
                EXPERIENCE
              </h2>
              <p className="text-yellow-400/70 italic">Hear Me Roar</p>
            </motion.div>

            {/* Lion watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[20rem] pointer-events-none">
              🦁
            </div>

            {/* Experience cards */}
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.company}
                className="relative p-8 rounded-lg border border-yellow-500/20 mb-6"
                style={{ background: 'rgba(26,16,0,0.8)', backdropFilter: 'blur(10px)' }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-400">{exp.role}</h3>
                    <p className="text-yellow-200/80">{exp.company}</p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <p className="text-yellow-300/80">{exp.period}</p>
                    <p className="text-yellow-200/50 text-sm">{exp.location}</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-yellow-100/80"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-yellow-500 mt-1">⚔</span>
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Quote */}
            <motion.p
              className="text-center text-yellow-400/60 italic mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              A Lannister always delivers quality code
            </motion.p>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>

      {/* ============ PROJECTS SECTION - HOUSE BARATHEON ============ */}
      <section id="projects" className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #0a0a0a, #1a1a1a, #0a0a0a, #0a0a0a)' }}>
        
        {/* Storm/lightning effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.1) 0%, transparent 50%)' }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl w-full">
            
            {/* House header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-gray-400 text-sm tracking-[0.4em] mb-4">HOUSE BARATHEON</p>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(255,215,0,0.3)' }}>
                CONQUESTS
              </h2>
              <p className="text-gray-400 italic">Ours is the Fury</p>
            </motion.div>

            {/* Projects grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  className="relative p-6 rounded-lg border border-gray-700 overflow-hidden group"
                  style={{ background: 'rgba(15,15,15,0.9)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ borderColor: '#ffd700', y: -5 }}
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.1) 0%, transparent 70%)' }} />
                  
                  <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-2 py-1 text-xs rounded bg-gray-800 text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-yellow-500/60 text-sm italic">{project.highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#0a0a0a] to-transparent" />
      </section>

      {/* ============ EDUCATION SECTION - THE CITADEL ============ */}
      <section id="education" className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1810, #2a2820, #1a1810, #0a0a0a)' }}>
        
        {/* Candlelight flicker */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={`candle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + (i * 6)}%`,
                top: `${20 + (i % 5) * 15}%`,
                background: '#c9a227',
                boxShadow: '0 0 20px #c9a227, 0 0 40px #ff8c00',
              }}
              animate={{
                opacity: [0.4, 0.8, 0.5, 0.9, 0.4],
                scale: [1, 1.2, 0.9, 1.1, 1],
              }}
              transition={{
                duration: 2 + (i % 3),
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full">
            
            {/* House header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-amber-600/60 text-sm tracking-[0.4em] mb-4">THE CITADEL</p>
              <h2 className="text-5xl md:text-6xl font-bold text-amber-200 mb-4" style={{ textShadow: '0 0 30px rgba(201,162,39,0.5)' }}>
                KNOWLEDGE
              </h2>
              <p className="text-amber-300/70 italic">Knowledge is Power</p>
            </motion.div>

            {/* Scroll watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[20rem] pointer-events-none">
              📜
            </div>

            {/* Education cards */}
            {portfolioData.education.map((edu, index) => (
              <motion.div
                key={edu.school}
                className="relative p-8 rounded-lg border border-amber-700/30 mb-6"
                style={{ background: 'rgba(26,24,16,0.8)', backdropFilter: 'blur(10px)' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-amber-200">{edu.degree}</h3>
                    <p className="text-amber-300/80">{edu.school}</p>
                    <p className="text-amber-400/60 text-sm">{edu.location}</p>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-amber-300/80">{edu.period}</p>
                    <p className="text-2xl font-bold text-amber-400">GPA: {edu.gpa}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Maester quote */}
            <motion.p
              className="text-center text-amber-400/60 italic mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
            The ink is dry, but the quest for knowledge never ends
            </motion.p>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>

      {/* ============ CONTACT SECTION - IRON THRONE ============ */}
      <section id="contact" className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #0a0a0a, #151515, #0a0a0a)' }}>
        
        {/* Metallic shimmer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`metal-${i}`}
              className="absolute w-1 h-8 rounded-full"
              style={{
                left: `${(i * 5) + 2}%`,
                top: '40%',
                background: 'linear-gradient(to bottom, transparent, #666, transparent)',
                opacity: 0.3,
              }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{
                duration: 3,
                delay: i * 0.15,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl w-full text-center">
            
            {/* House header */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-gray-500 text-sm tracking-[0.4em] mb-4">THE IRON THRONE</p>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px rgba(150,150,150,0.3)' }}>
                SEND A RAVEN
              </h2>
              <p className="text-gray-400 italic">Send a Message</p>
            </motion.div>

            {/* Crown watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[20rem] pointer-events-none">
              👑
            </div>

            {/* Contact info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to forge alliances and build something legendary? 
                The realm awaits your message.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <motion.a
                  href={`mailto:${portfolioData.social.email}`}
                  className="px-8 py-4 rounded-lg border border-gray-600 text-white font-bold tracking-wider hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
                  style={{ background: 'rgba(20,20,20,0.8)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📧 EMAIL
                </motion.a>
                
                <motion.a
                  href={portfolioData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-lg border border-gray-600 text-white font-bold tracking-wider hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
                  style={{ background: 'rgba(20,20,20,0.8)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💼 LINKEDIN
                </motion.a>
                
                <motion.a
                  href={portfolioData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-lg border border-gray-600 text-white font-bold tracking-wider hover:border-purple-500 hover:text-purple-500 transition-all duration-300"
                  style={{ background: 'rgba(20,20,20,0.8)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🐙 GITHUB
                </motion.a>
              </div>

              {/* Location */}
              <motion.p
                className="text-gray-500 mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                📍 {portfolioData.location}
              </motion.p>
            </motion.div>

            {/* Footer */}
            <motion.div
              className="mt-20 pt-8 border-t border-gray-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 text-sm">
                © 2024 {portfolioData.name}. All rights reserved.
              </p>
              <p className="text-gray-700 text-xs mt-2 italic">
                When you play the game of jobs, you win or you learn. There is no middle ground.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GotPage