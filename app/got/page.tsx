'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================
// SKILLS DATA
// ============================================================
const skillsData = {
  'Languages & Frameworks': {
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'TypeScript'],
    icon: '⚔️',
    color: '#ff6600',
    animation: 'fire',
  },
  'Databases': {
    skills: ['MySQL', 'DynamoDB', 'MongoDB', 'PostgreSQL', 'SQLite'],
    icon: '🏰',
    color: '#ffd700',
    animation: 'gold',
  },
  'Cloud (AWS)': {
    skills: ['S3', 'DynamoDB', 'Lambda', 'CloudWatch', 'EC2', 'ECS', 'EKS', 'RDS'],
    icon: '☁️',
    color: '#4a9eff',
    animation: 'cloud',
  },
  'Data Science / ML': {
    skills: ['scikit-learn', 'TensorFlow', 'Keras', 'NLP', 'ML', 'LLM'],
    icon: '🧠',
    color: '#a855f7',
    animation: 'neural',
  },
  'Tools & Platforms': {
    skills: ['FastAPI', 'Flask', 'Spring Boot', 'REST APIs', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'GitHub Actions', 'Jira'],
    icon: '⚙️',
    color: '#10b981',
    animation: 'gear',
  },
  'Observability & Quality': {
    skills: ['OpenTelemetry', 'ELK Stack', 'Kibana', 'JUnit', 'Mockito', 'Logging', 'Metrics', 'Alerting'],
    icon: '👁️',
    color: '#06b6d4',
    animation: 'scan',
  },
}

// ============================================================
// PORTFOLIO DATA
// ============================================================
const portfolioData = {
  name: "Prudhvi Sai Raj Dasari",
  title: "Software Developer",
  email: "dasariprudhvisai26@gmail.com",
  location: "San Jose, California",
  
  about: `A passionate Software Developer forging scalable applications with the precision of Valyrian steel. Like the Starks of Winterfell, I believe in honor, integrity, and code that stands the test of time. Currently pursuing my Master's at San José State University while crafting elegant solutions to challenging problems. Experienced in building low-latency backend services, optimizing distributed systems, and implementing robust observability solutions.`,
  
  stats: [
    { value: '2+', label: 'Years Experience', icon: '⚔️' },
    { value: '10+', label: 'Projects Built', icon: '🏰' },
    { value: '3.5', label: 'GPA (MS)', icon: '📜' },
    { value: '50+', label: 'Skills Mastered', icon: '🐉' },
  ],
  
  experience: [
    {
      company: 'Accolite Digital',
      role: 'Software Engineer',
      period: 'Jun 2022 – Jan 2024',
      location: 'Bangalore, India',
      icon: '👑',
      highlights: [
        'Designed and delivered a production Sales Incentive Management application using Node.js, Express, MongoDB, and React, supporting thousands of internal sales users and eliminating spreadsheet-based workflows, reducing manual finance reconciliation effort by 40%',
        'Implemented core incentive calculation workflows evaluating monthly revenue attainment (actual sales vs quota), eligibility rules, and tier-based payouts; fixed incorrect formulas and added validation, reducing payout discrepancies and recalculation requests by 30%.',
        'Designed distributed-safe backend APIs using idempotent REST endpoints, append-only data models, and ACID transactions, eliminating duplicate payouts and reducing incentive-processing latency by 20% during end-of-month and quarter-close spikes.',
        'Productionized and scaled the application by deploying stateless services with Docker on AWS EC2, securing access via JWT (HttpOnlycookies) and RBAC, and automating builds/tests with GitHub Actions CI, reducing deployment-related incidents and debugging time by 25%.'
      ],
    },
    {
      company: 'Accolite Digital',
      role: 'Software Engineering Intern',
      period: 'Jan 2022 – Jun 2022',
      location: 'Hyderabad, India',
      icon: '⚔️',
      highlights: [
        'Implemented backend features in Spring Boot/Java and integrated with a React (TypeScript/JavaScript) UI; added cursor/offset pagination, validation, and error handling',
        'Wrote JUnit tests and containerized integration tests; enforced Git branching/reviews and set up lightweight CI/CD for build/test/package',
        'Optimized MySQL queries and indexes; added structured application logs and runbooks to speed debugging',
        'Dockerized services and assisted deployments on AWS; handled secrets, least-privilege IAM, and environment configs',
      ],
    },
  ],
  
  projects: [
    {
      name: 'Mind Clash',
      description: 'Real-time multiplayer quiz battle platform with live competition features and immersive 3D graphics',
      tech: ['React', 'Python', 'SQLite', 'Three.js', 'Django', 'Socket.IO'],
      icon: '⚔️',
      github: 'https://github.com/CS161-Software-Project/MindClash',
      type: 'Group Project',
      highlight: 'Battle of Wits',
    },
    {
      name: 'AI Scrum Master',
      description: 'Intelligent project management assistant powered by machine learning for agile teams',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'React', 'NLP'],
      icon: '🤖',
      github: 'https://github.com/prudhvisai26',
      type: 'Group Project',
      highlight: 'Strategic Command',
    },
    {
      name: 'IntentFlow',
      description: 'Lightweight chatbot for intent classification using Dolphin-2.6-Mistral-7B model via llama.cpp',
      tech: ['FastAPI', 'Python', 'LLM', 'llama.cpp', 'NLP'],
      icon: '🧠',
      github: 'https://github.com/Shivankthakur/IntentFlow',
      type: 'Group Project',
      highlight: 'Voice of Dragons',
    },
    {
      name: 'ShortUrl Service',
      description: 'URL shortening service with unique identifiers and seamless redirects',
      tech: ['Node.js', 'Express', 'Sequelize', 'SQLite'],
      icon: '🔗',
      github: 'https://github.com/prudhvisai26/ShortUrl',
      type: 'Personal',
      highlight: 'Swift Ravens',
    },
    {
      name: 'Blog Application',
      description: 'Full-stack blog platform with authentication, CRUD operations, and responsive design',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      icon: '📝',
      github: 'https://github.com/prudhvisai26/BlogApp',
      type: 'Personal',
      highlight: 'Chronicles',
    },
    {
      name: 'Weather App',
      description: 'Real-time weather application with beautiful UI and location-based forecasts',
      tech: ['JavaScript', 'REST API', 'CSS', 'HTML'],
      icon: '🌤️',
      github: 'https://github.com/prudhvisai26/Weather-App',
      type: 'Personal',
      highlight: 'Storm Watch',
    },
    {
      name: 'Portfolio Website',
      description: 'Cinematic Game of Thrones themed portfolio with immersive 3D tunnel animations',
      tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
      icon: '🐉',
      github: 'https://github.com/prudhvisai26',
      type: 'Personal',
      highlight: 'Fire and Blood',
    },
  ],
  
  education: [
    { 
      degree: 'M.S. Computer Science', 
      school: 'San José State University', 
      period: '2024 - 2026', 
      gpa: '3.5',
      location: 'San Jose, CA',
      icon: '🎓',
    },
    { 
      degree: 'B.Tech Computer Science', 
      school: 'MLR Institute of Technology', 
      period: '2018 - 2022', 
      gpa: '8.61',
      location: 'Hyderabad, India',
      icon: '📚',
    },
  ],
  
  social: {
    github: 'https://github.com/prudhvisai26',
    linkedin: 'https://linkedin.com/in/prudhvisai26',
    email: 'dasariprudhvisai26@gmail.com',
  },
}

// ============================================================
// SECTIONS CONFIG
// ============================================================
const sections = [
  { id: 'hero', name: 'Hero', house: 'TARGARYEN', color: '#ff4400', accent: '#ffd700', motto: 'Fire and Blood' },
  { id: 'about', name: 'About', house: 'STARK', color: '#88ccff', accent: '#a8d5ff', motto: 'Winter is Coming' },
  { id: 'skills', name: 'Skills', house: 'TARGARYEN', color: '#ff6600', accent: '#ffaa00', motto: 'Fire and Blood' },
  { id: 'experience', name: 'Experience', house: 'LANNISTER', color: '#ffd700', accent: '#ffed4a', motto: 'Hear Me Roar' },
  { id: 'projects', name: 'Projects', house: 'BARATHEON', color: '#ffd700', accent: '#ffffff', motto: 'Ours is the Fury' },
  { id: 'education', name: 'Education', house: 'CITADEL', color: '#c9a227', accent: '#f5e6c8', motto: 'Knowledge is Power' },
  { id: 'contact', name: 'Contact', house: 'IRON THRONE', color: '#888888', accent: '#cccccc', motto: 'Bend the Knee' },
]

// ============================================================
// PARTICLE DATA
// ============================================================
const EMBER_DATA = Array.from({ length: 80 }, (_, i) => ({
  id: i, x: (i * 13) % 100, size: 2 + (i % 6), speed: 3 + (i % 4), delay: (i * 0.1) % 5, wobble: ((i % 10) - 5) * 4,
}))

const SNOW_DATA = Array.from({ length: 100 }, (_, i) => ({
  id: i, x: (i * 11) % 100, size: 2 + (i % 5), speed: 5 + (i % 6), delay: (i * 0.12) % 8, wobble: ((i % 16) - 8) * 3, opacity: 0.4 + (i % 5) * 0.12,
}))

const GOLD_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i, x: (i * 19) % 100, y: (i * 23) % 100, size: 2 + (i % 4), duration: 2 + (i % 3), delay: (i * 0.15) % 4,
}))

const STORM_DATA = Array.from({ length: 30 }, (_, i) => ({
  id: i, x: (i * 31) % 100, width: 1 + (i % 2), delay: (i * 0.2) % 3,
}))

// ============================================================
// SCROLLABLE SECTION WRAPPER - Handles internal scrolling
// ============================================================
function ScrollableSection({ children, color, onAtTop, onAtBottom }: { 
  children: React.ReactNode
  color: string
  onAtTop: () => void
  onAtBottom: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(true)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      const atTop = scrollTop <= 5
      const atBottom = scrollTop + clientHeight >= scrollHeight - 5
      
      setCanScrollUp(!atTop)
      setCanScrollDown(!atBottom)
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      const atTop = scrollTop <= 5
      const atBottom = scrollTop + clientHeight >= scrollHeight - 5

      // If scrolling up and at top, or scrolling down and at bottom, let parent handle it
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        // Don't prevent default - let it bubble up
        if (e.deltaY < 0 && atTop) onAtTop()
        if (e.deltaY > 0 && atBottom) onAtBottom()
      } else {
        // Internal scroll - stop propagation
        e.stopPropagation()
      }
    }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        className="overflow-y-auto overflow-x-hidden max-h-[85vh] w-full scrollbar-thin"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: `${color}40 transparent`,
        }}
      >
        <style>{`
          .scrollbar-thin::-webkit-scrollbar { width: 6px; }
          .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
          .scrollbar-thin::-webkit-scrollbar-thumb { 
            background: linear-gradient(to bottom, ${color}50, ${color}30);
            border-radius: 3px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover { 
            background: linear-gradient(to bottom, ${color}70, ${color}50);
          }
        `}</style>
        {children}
      </div>
      
      {/* Scroll indicators */}
      <AnimatePresence>
        {canScrollUp && (
          <motion.div 
            className="absolute top-0 left-0 right-0 h-12 pointer-events-none z-20"
            style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute top-2 left-1/2 -translate-x-1/2"
              animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path d="M2 8L10 2L18 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {canScrollDown && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-20"
            style={{ background: `linear-gradient(to top, rgba(0,0,0,0.6), transparent)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center"
              animate={{ y: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <span className="text-xs mb-1" style={{ color: `${color}80` }}>SCROLL</span>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path d="M2 2L10 8L18 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6"/>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function GotTunnelPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionProgress, setTransitionProgress] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [heroStage, setHeroStage] = useState(0)
  const [lettersRevealed, setLettersRevealed] = useState(0)
  // const [canTransition, setCanTransition] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(0)
  const touchStartY = useRef(0)

  const fullName = "PRUDHVI SAI RAJ"

  useEffect(() => {
    const timers = [
      setTimeout(() => setHeroStage(1), 500),
      setTimeout(() => setHeroStage(2), 1500),
      setTimeout(() => setHeroStage(3), 2500),
      setTimeout(() => setHeroStage(4), 3500),
      setTimeout(() => setHeroStage(5), 7000),
      setTimeout(() => setHeroStage(6), 8500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (heroStage >= 4 && lettersRevealed < fullName.length) {
      const timer = setTimeout(() => setLettersRevealed(p => p + 1), 100)
      return () => clearTimeout(timer)
    }
  }, [heroStage, lettersRevealed])

  const transitionToSection = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= sections.length || isTransitioning) return
    setDirection(newIndex > currentSection ? 'forward' : 'backward')
    setIsTransitioning(true)
    setTransitionProgress(0)
    const duration = 1200
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setTransitionProgress(eased)
      if (progress < 1) requestAnimationFrame(animate)
      else { setCurrentSection(newIndex); setIsTransitioning(false); setTransitionProgress(0) }
    }
    requestAnimationFrame(animate)
  }, [currentSection, isTransitioning])

  const handleWheel = useCallback((e: WheelEvent) => {
    const now = Date.now()
    if (now - lastScrollTime.current < 1500 || isTransitioning) return
    
    // Check if the event target is inside a scrollable section
    const target = e.target as HTMLElement
    const scrollableParent = target.closest('.scrollbar-thin')
    if (scrollableParent) {
      // Let the scrollable section handle it
      return
    }
    
    e.preventDefault()
    if (e.deltaY > 30 && currentSection < sections.length - 1) {
      lastScrollTime.current = now
      transitionToSection(currentSection + 1)
    } else if (e.deltaY < -30 && currentSection > 0) {
      lastScrollTime.current = now
      transitionToSection(currentSection - 1)
    }
  }, [currentSection, isTransitioning, transitionToSection])

  const goToPrevSection = useCallback(() => {
    const now = Date.now()
    if (now - lastScrollTime.current < 800 || isTransitioning) return
    if (currentSection > 0) {
      lastScrollTime.current = now
      transitionToSection(currentSection - 1)
    }
  }, [currentSection, isTransitioning, transitionToSection])

  const goToNextSection = useCallback(() => {
    const now = Date.now()
    if (now - lastScrollTime.current < 800 || isTransitioning) return
    if (currentSection < sections.length - 1) {
      lastScrollTime.current = now
      transitionToSection(currentSection + 1)
    }
  }, [currentSection, isTransitioning, transitionToSection])

  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSection < sections.length - 1) transitionToSection(currentSection + 1)
      else if (diff < 0 && currentSection > 0) transitionToSection(currentSection - 1)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goToNextSection() }
      else if (e.key === 'ArrowUp') { e.preventDefault(); goToPrevSection() }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNextSection, goToPrevSection])

  useEffect(() => {
    const container = containerRef.current
    if (container) { container.addEventListener('wheel', handleWheel, { passive: false }); return () => container.removeEventListener('wheel', handleWheel) }
  }, [handleWheel])

  const current = sections[currentSection]
  const next = sections[currentSection + 1]
  const prev = sections[currentSection - 1]

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
    >
      {/* 3D TUNNEL */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: `translateZ(${isTransitioning ? (direction === 'forward' ? transitionProgress * 800 : -transitionProgress * 800) : 0}px)` }}>
        {prev && (
          <div className="absolute inset-0" style={{ transform: 'translateZ(800px) scale(2)', opacity: direction === 'backward' && isTransitioning ? transitionProgress : 0, pointerEvents: 'none' }}>
            <SectionBackground section={prev} />
          </div>
        )}

        <div className="absolute inset-0" style={{
          transform: isTransitioning ? direction === 'forward' ? `translateZ(${transitionProgress * 800}px) scale(${1 + transitionProgress * 0.5})` : `translateZ(${-transitionProgress * 800}px) scale(${1 - transitionProgress * 0.3})` : 'translateZ(0) scale(1)',
          opacity: isTransitioning ? 1 - transitionProgress * 0.5 : 1,
        }}>
          <SectionBackground section={current} />
          <ParticleSystem section={current.id} isActive={!isTransitioning} />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            {current.id === 'hero' && <HeroContent stage={heroStage} lettersRevealed={lettersRevealed} fullName={fullName} />}
            {current.id === 'about' && <AboutContent onAtTop={goToPrevSection} onAtBottom={goToNextSection} />}
            {current.id === 'skills' && <SkillsContent onAtTop={goToPrevSection} onAtBottom={goToNextSection} />}
            {current.id === 'experience' && <ExperienceContent onAtTop={goToPrevSection} onAtBottom={goToNextSection} />}
            {current.id === 'projects' && <ProjectsContent onAtTop={goToPrevSection} onAtBottom={goToNextSection} />}
            {current.id === 'education' && <EducationContent onAtTop={goToPrevSection} onAtBottom={goToNextSection} />}
            {current.id === 'contact' && <ContactContent onAtTop={goToPrevSection} onAtBottom={goToNextSection} />}
          </div>
        </div>

        {next && (
          <div className="absolute inset-0" style={{
            transform: `translateZ(${-1000 + (isTransitioning && direction === 'forward' ? transitionProgress * 1000 : 0)}px) scale(${0.3 + (isTransitioning && direction === 'forward' ? transitionProgress * 0.7 : 0)})`,
            opacity: isTransitioning && direction === 'forward' ? 0.3 + transitionProgress * 0.7 : 0.3, pointerEvents: 'none',
          }}>
            <SectionBackground section={next} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs tracking-widest mb-2" style={{ color: next.color }}>{next.house}</p>
                <p className="text-2xl font-bold" style={{ color: next.accent }}>{next.name.toUpperCase()}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TUNNEL RINGS */}
      <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(10)].map((_, i) => (
          <div key={`ring-${i}`} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{
            width: `${120 + i * 80}%`, height: `${120 + i * 80}%`,
            borderColor: `${current.color}${Math.max(5, 25 - i * 3).toString(16).padStart(2, '0')}`,
            transform: `translate(-50%, -50%) translateZ(${-i * 150 - (isTransitioning && direction === 'forward' ? transitionProgress * 200 : 0)}px)`,
            transition: 'border-color 0.5s ease',
          }} />
        ))}
      </div>

      {/* VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none z-30" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)' }} />

      {/* NAVIGATION DOTS */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((section, i) => (
          <button key={section.id} onClick={() => !isTransitioning && transitionToSection(i)} className="group flex items-center gap-3" disabled={isTransitioning}>
            <span className="text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0" style={{ color: currentSection === i ? section.color : 'rgba(255,255,255,0.4)' }}>{section.name.toUpperCase()}</span>
            <div className="w-3 h-3 rounded-full border-2 transition-all duration-500" style={{
              borderColor: currentSection === i ? section.color : 'rgba(255,255,255,0.3)',
              background: currentSection === i ? section.color : 'transparent',
              transform: currentSection === i ? 'scale(1.3)' : 'scale(1)',
              boxShadow: currentSection === i ? `0 0 15px ${section.color}` : 'none',
            }} />
          </button>
        ))}
      </div>

      {/* HOUSE BADGE */}
      <motion.div className="fixed top-6 right-6 text-right z-50" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={current.house}>
        <motion.p className="text-sm font-bold tracking-widest" style={{ color: current.color }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>HOUSE {current.house}</motion.p>
        <motion.p className="text-xs text-white/50 italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>{current.motto}</motion.p>
      </motion.div>

      {/* SECTION COUNTER */}
      <div className="fixed bottom-6 left-6 z-50">
        <p className="text-xs text-white/30 tracking-wider">
          <span style={{ color: current.color }}>{String(currentSection + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(sections.length).padStart(2, '0')}</span>
        </p>
      </div>

      {/* SCROLL HINT */}
      <AnimatePresence>
        {currentSection === 0 && heroStage >= 6 && !isTransitioning && (
          <motion.div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <p className="text-xs tracking-widest text-amber-500/50 mb-3">SCROLL TO ENTER THE REALM</p>
            <motion.div className="w-6 h-10 border-2 border-amber-500/30 rounded-full mx-auto flex justify-center" animate={{ borderColor: ['rgba(245,158,11,0.3)', 'rgba(245,158,11,0.6)', 'rgba(245,158,11,0.3)'] }} transition={{ duration: 2, repeat: Infinity }}>
              <motion.div className="w-1.5 h-2.5 bg-amber-500/60 rounded-full mt-2" animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRANSITION FLASH */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div className="absolute inset-0 z-40 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.15, 0] }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            style={{ background: direction === 'forward' ? `radial-gradient(ellipse at 50% 50%, ${next?.color || '#fff'}50, transparent 70%)` : `radial-gradient(ellipse at 50% 50%, ${prev?.color || '#fff'}50, transparent 70%)` }} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================
// SECTION BACKGROUND
// ============================================================
function SectionBackground({ section }: { section: typeof sections[0] }) {
  const backgrounds: Record<string, string> = {
    hero: 'radial-gradient(ellipse at 50% 120%, #2a0800 0%, #120200 35%, #000000 70%)',
    about: 'radial-gradient(ellipse at 50% 0%, #1a3a5c 0%, #0a1628 40%, #000000 80%)',
    skills: 'radial-gradient(ellipse at 50% 100%, #2a0a00 0%, #1a0500 40%, #000000 80%)',
    experience: 'radial-gradient(ellipse at 50% 50%, #2a1a00 0%, #1a1000 40%, #000000 80%)',
    projects: 'radial-gradient(ellipse at 50% 0%, #1a1a1a 0%, #0a0a0a 40%, #000000 80%)',
    education: 'radial-gradient(ellipse at 50% 50%, #2a2410 0%, #1a1810 40%, #000000 80%)',
    contact: 'radial-gradient(ellipse at 50% 50%, #1a1a1a 0%, #0a0a0a 40%, #000000 80%)',
  }
  return <div className="absolute inset-0" style={{ background: backgrounds[section.id] || '#000' }} />
}

// ============================================================
// PARTICLE SYSTEM
// ============================================================
function ParticleSystem({ section, isActive }: { section: string; isActive: boolean }) {
  if (!isActive) return null

  if (section === 'hero' || section === 'skills') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {EMBER_DATA.map(ember => (
          <motion.div key={ember.id} className="absolute rounded-full" style={{ width: ember.size, height: ember.size, left: `${ember.x}%`, bottom: '-5%', background: 'radial-gradient(circle, #ffdd00 0%, #ff6600 40%, #ff4400 70%, transparent 100%)', boxShadow: `0 0 ${ember.size * 2}px #ff6600` }}
            animate={{ y: [0, -1200], x: [0, ember.wobble, 0, -ember.wobble, 0], opacity: [0, 1, 1, 0.6, 0], scale: [0.5, 1, 1, 0.8, 0.3] }}
            transition={{ duration: ember.speed, delay: ember.delay, repeat: Infinity, ease: 'linear' }} />
        ))}
        <motion.div className="absolute bottom-0 left-0 right-0 h-[50vh]" style={{ background: 'linear-gradient(to top, rgba(255,100,0,0.4) 0%, rgba(255,60,0,0.2) 30%, transparent 100%)' }} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
      </div>
    )
  }

  if (section === 'about') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {SNOW_DATA.map(snow => (
          <motion.div key={snow.id} className="absolute rounded-full" style={{ width: snow.size, height: snow.size, left: `${snow.x}%`, top: '-5%', background: 'radial-gradient(circle, #ffffff 0%, #a8d5ff 50%, transparent 100%)', boxShadow: '0 0 3px #fff' }}
            animate={{ y: [0, 1200], x: [0, snow.wobble, 0, -snow.wobble, 0], opacity: [0, snow.opacity, snow.opacity, snow.opacity * 0.5, 0] }}
            transition={{ duration: snow.speed, delay: snow.delay, repeat: Infinity, ease: 'linear' }} />
        ))}
      </div>
    )
  }

  if (section === 'experience') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {GOLD_DATA.map(gold => (
          <motion.div key={gold.id} className="absolute rounded-full" style={{ width: gold.size, height: gold.size, left: `${gold.x}%`, top: `${gold.y}%`, background: 'radial-gradient(circle, #ffd700 0%, #ffed4a 50%, transparent 100%)', boxShadow: '0 0 10px #ffd700' }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.5, 1.5, 0] }}
            transition={{ duration: gold.duration, delay: gold.delay, repeat: Infinity }} />
        ))}
      </div>
    )
  }

  if (section === 'projects') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STORM_DATA.slice(0, 5).map(storm => (
          <motion.div key={`lightning-${storm.id}`} className="absolute" style={{ left: `${storm.x}%`, top: 0, width: storm.width, height: '100%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,215,0,0.6), transparent)' }}
            animate={{ opacity: [0, 0, 1, 0, 0, 0, 0.5, 0] }} transition={{ duration: 4, delay: storm.delay * 2, repeat: Infinity, repeatDelay: 3 + storm.delay }} />
        ))}
      </div>
    )
  }

  if (section === 'education') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div key={`candle-${i}`} className="absolute rounded-full" style={{ width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2, left: `${5 + (i * 7) % 90}%`, top: `${15 + (i * 11) % 70}%`, background: 'radial-gradient(circle, #ffd700 0%, #ff8c00 50%, transparent 100%)', boxShadow: '0 0 15px #ffd700' }}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 2 + (i % 3), delay: i * 0.2, repeat: Infinity }} />
        ))}
      </div>
    )
  }

  return null
}

// ============================================================
// HERO CONTENT
// ============================================================
function HeroContent({ stage, lettersRevealed, fullName }: { stage: number; lettersRevealed: number; fullName: string }) {
  return (
    <div className="text-center px-6">
      <motion.p className="text-sm md:text-base tracking-[0.5em] text-amber-500/60 mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : -20 }} transition={{ duration: 1 }}>
        HOUSE TARGARYEN PRESENTS
      </motion.p>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider" style={{ textShadow: '0 0 30px #ff6600, 0 0 60px #ff4400, 0 0 90px #ff2200' }}>
        {fullName.split('').map((letter, i) => (
          <motion.span key={i} className="inline-block" initial={{ opacity: 0, y: 50, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: i < lettersRevealed ? 1 : 0, y: i < lettersRevealed ? 0 : 50, scale: i < lettersRevealed ? 1 : 0.5, rotateX: i < lettersRevealed ? 0 : -90, color: i < lettersRevealed ? '#ffd700' : 'transparent' }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}>
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </h1>

      <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.3em] mt-4" style={{ color: '#ffd700', textShadow: '0 0 25px #ff6600, 0 0 50px #ff4400' }}
        initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 30, scale: stage >= 5 ? 1 : 0.9 }} transition={{ duration: 1, ease: 'easeOut' }}>
        DASARI
      </motion.h2>

      <motion.div className="h-0.5 mx-auto mt-10 relative overflow-hidden" style={{ background: 'linear-gradient(90deg, transparent, #d4a056, #ffd700, #d4a056, transparent)' }}
        initial={{ width: 0, opacity: 0 }} animate={{ width: stage >= 6 ? 300 : 0, opacity: stage >= 6 ? 1 : 0 }} transition={{ duration: 1.5 }}>
        <motion.div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }} animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>

      <motion.p className="text-xl md:text-2xl tracking-[0.4em] mt-8 text-white" style={{ textShadow: '0 0 15px rgba(255,100,0,0.5)' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: stage >= 6 ? 1 : 0, y: stage >= 6 ? 0 : 20 }} transition={{ duration: 1 }}>
        SOFTWARE DEVELOPER
      </motion.p>

      <motion.p className="text-lg text-amber-500/70 mt-6 italic" initial={{ opacity: 0 }} animate={{ opacity: stage >= 6 ? [0.6, 1, 0.6] : 0 }} transition={{ duration: 2, repeat: Infinity }}>
        Fire and Blood
      </motion.p>
    </div>
  )
}

// ============================================================
// ABOUT CONTENT
// ============================================================
function AboutContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  return (
    <ScrollableSection color="#88ccff" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#a8d5ff', textShadow: '0 0 40px rgba(168,213,255,0.6)' }}
              animate={{ textShadow: ['0 0 40px rgba(168,213,255,0.6)', '0 0 60px rgba(168,213,255,0.8)', '0 0 40px rgba(168,213,255,0.6)'] }}
              transition={{ duration: 3, repeat: Infinity }}>
              ABOUT ME
            </motion.h2>
            <motion.span className="absolute -left-8 top-1/2 -translate-y-1/2 text-3xl" animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }}>❄️</motion.span>
            <motion.span className="absolute -right-8 top-1/2 -translate-y-1/2 text-3xl" animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }}>❄️</motion.span>
          </motion.div>
          <motion.p className="text-blue-200/70 italic mt-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Winter is Coming
          </motion.p>
        </motion.div>

        <motion.div className="relative p-8 rounded-2xl border border-blue-500/30 backdrop-blur-xl"
          style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.9) 0%, rgba(20,40,60,0.8) 100%)' }}
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          
          <motion.div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg, #88ccff, #a8d5ff, #ffffff, #a8d5ff, #88ccff)' }}
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />

          <motion.p className="text-lg md:text-xl text-blue-100/90 leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            {portfolioData.about}
          </motion.p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioData.stats.map((stat, index) => (
              <motion.div key={stat.label} className="relative group"
                initial={{ opacity: 0, y: 30, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.15, type: 'spring' as const }}>
                <motion.div className="text-center p-4 rounded-xl bg-linear-to-br from-blue-900/60 to-blue-800/40 border border-blue-500/30"
                  whileHover={{ scale: 1.08, borderColor: 'rgba(168,213,255,0.6)' }}>
                  <motion.span className="text-2xl block mb-2" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}>
                    {stat.icon}
                  </motion.span>
                  <motion.p className="text-3xl font-bold text-blue-300" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5, delay: 1 + index * 0.1 }}>
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-blue-200/60 mt-1">{stat.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </ScrollableSection>
  )
}

// ============================================================
// SKILLS CONTENT
// ============================================================
function SkillsContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const getSkillAnimation = (animation: string, index: number) => {
    const baseDelay = index * 0.05
    switch (animation) {
      case 'fire': return { initial: { opacity: 0, scale: 0, y: 20 }, animate: { opacity: 1, scale: 1, y: 0, transition: { delay: baseDelay, type: 'spring' as const, stiffness: 200, damping: 15 } }, hover: { scale: 1.15, boxShadow: '0 0 20px rgba(255,100,0,0.6)' } }
      case 'gold': return { initial: { opacity: 0, rotateY: -90 }, animate: { opacity: 1, rotateY: 0, transition: { delay: baseDelay, duration: 0.6 } }, hover: { scale: 1.1, boxShadow: '0 0 25px rgba(255,215,0,0.7)' } }
      case 'cloud': return { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0, transition: { delay: baseDelay } }, hover: { scale: 1.1, y: -5 } }
      case 'neural': return { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1, transition: { delay: baseDelay } }, hover: { scale: 1.15, boxShadow: '0 0 30px rgba(168,85,247,0.6)' } }
      case 'gear': return { initial: { opacity: 0, rotate: -180, scale: 0.5 }, animate: { opacity: 1, rotate: 0, scale: 1, transition: { delay: baseDelay, type: 'spring' as const, stiffness: 100 } }, hover: { scale: 1.1, rotate: 10 } }
      case 'scan': return { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: baseDelay, duration: 0.5 } }, hover: { scale: 1.1, boxShadow: '0 0 20px rgba(6,182,212,0.5)' } }
      default: return { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { delay: baseDelay } }, hover: { scale: 1.1 } }
    }
  }

  return (
    <ScrollableSection color="#ff6600" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div className="text-center mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3" style={{ color: '#ffaa00', textShadow: '0 0 30px rgba(255,170,0,0.5)' }}
            animate={{ textShadow: ['0 0 30px rgba(255,170,0,0.5)', '0 0 50px rgba(255,100,0,0.7)', '0 0 30px rgba(255,170,0,0.5)'] }}
            transition={{ duration: 2, repeat: Infinity }}>
            MY ARSENAL
          </motion.h2>
          <motion.p className="text-orange-300/70 italic" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>Fire and Blood</motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skillsData).map(([category, data], catIndex) => (
            <motion.div key={category} className="relative p-4 rounded-xl border overflow-hidden group"
              style={{ background: `linear-gradient(135deg, ${data.color}15, ${data.color}05)`, borderColor: activeCategory === category ? data.color : `${data.color}30` }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              onHoverStart={() => setActiveCategory(category)} onHoverEnd={() => setActiveCategory(null)}
              whileHover={{ scale: 1.02, boxShadow: `0 10px 40px ${data.color}30` }}>
              
              <div className="relative flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: `${data.color}30` }}>
                <motion.span className="text-2xl" animate={activeCategory === category ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.5 }}>{data.icon}</motion.span>
                <h3 className="text-sm font-bold tracking-wider" style={{ color: data.color }}>{category.toUpperCase()}</h3>
              </div>

              <div className="relative flex flex-wrap gap-2">
                {data.skills.map((skill, skillIndex) => {
                  const anim = getSkillAnimation(data.animation, skillIndex)
                  return (
                    <motion.span key={skill} className="relative px-3 py-1.5 text-sm rounded-lg cursor-default"
                      style={{ background: `linear-gradient(135deg, ${data.color}30, ${data.color}15)`, border: `1px solid ${data.color}40`, color: hoveredSkill === skill ? '#ffffff' : `${data.color}dd` }}
                      initial={anim.initial} animate={anim.animate} whileHover={anim.hover}
                      onHoverStart={() => setHoveredSkill(skill)} onHoverEnd={() => setHoveredSkill(null)}>
                      {skill}
                    </motion.span>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <p className="text-orange-400/60 text-sm">
            <motion.span className="text-2xl font-bold text-orange-400" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              {Object.values(skillsData).reduce((acc, cat) => acc + cat.skills.length, 0)}
            </motion.span>{' '}skills mastered and counting...
          </p>
        </motion.div>
      </div>
    </ScrollableSection>
  )
}

// ============================================================
// EXPERIENCE CONTENT
// ============================================================
function ExperienceContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  const [activeExp, setActiveExp] = useState<number | null>(null)

  return (
    <ScrollableSection color="#ffd700" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#ffd700', textShadow: '0 0 40px rgba(255,215,0,0.6)' }}
              animate={{ textShadow: ['0 0 40px rgba(255,215,0,0.6)', '0 0 60px rgba(255,215,0,0.9)', '0 0 40px rgba(255,215,0,0.6)'] }}
              transition={{ duration: 2, repeat: Infinity }}>
              EXPERIENCE
            </motion.h2>
            <motion.span className="absolute -left-10 top-1/2 -translate-y-1/2 text-3xl" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🦁</motion.span>
            <motion.span className="absolute -right-10 top-1/2 -translate-y-1/2 text-3xl" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🦁</motion.span>
          </motion.div>
          <motion.p className="text-yellow-300/70 italic mt-2" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>Hear Me Roar</motion.p>
        </motion.div>

        <div className="relative">
          <motion.div className="absolute left-0 md:left-6 top-0 bottom-0 w-1 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #ffd700, #ff8c00, #ffd700)' }}
            initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1.5, delay: 0.5 }} />

          <div className="space-y-8 pl-8 md:pl-16">
            {portfolioData.experience.map((exp, index) => (
              <motion.div key={`${exp.company}-${exp.role}`} className="relative"
                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.3 }}
                onHoverStart={() => setActiveExp(index)} onHoverEnd={() => setActiveExp(null)}>
                
                <motion.div className="absolute -left-8 md:-left-10 top-6 w-8 h-8 rounded-full border-4 border-yellow-500 bg-black flex items-center justify-center"
                  style={{ boxShadow: '0 0 20px rgba(255,215,0,0.6)' }}
                  animate={activeExp === index ? { scale: [1, 1.2, 1], boxShadow: ['0 0 20px rgba(255,215,0,0.6)', '0 0 40px rgba(255,215,0,0.9)', '0 0 20px rgba(255,215,0,0.6)'] } : {}}
                  transition={{ duration: 1, repeat: activeExp === index ? Infinity : 0 }}>
                  <span className="text-lg">{exp.icon}</span>
                </motion.div>

                <motion.div className="p-6 rounded-2xl border border-yellow-500/30 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(26,16,0,0.9) 0%, rgba(40,30,10,0.8) 100%)' }}
                  whileHover={{ borderColor: 'rgba(255,215,0,0.6)', scale: 1.02 }}>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 relative z-10">
                    <div>
                      <motion.h3 className="text-xl font-bold text-yellow-400">{exp.role}</motion.h3>
                      <p className="text-yellow-200/80 flex items-center gap-2">
                        <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>⚙️</motion.span>
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-yellow-300/80 text-sm">{exp.period}</p>
                      <p className="text-yellow-200/50 text-xs">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 relative z-10">
                    {exp.highlights.map((highlight, i) => (
                      <motion.li key={i} className="flex items-start gap-3 text-yellow-100/80 text-sm"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}>
                        <motion.span className="text-yellow-500 mt-0.5 shrink-0"
                          animate={activeExp === index ? { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5, delay: i * 0.1 }}>⚔️</motion.span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p className="text-center text-yellow-400/60 italic mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
          A Lannister always delivers quality code
        </motion.p>
      </div>
    </ScrollableSection>
  )
}

// ============================================================
// PROJECTS CONTENT
// ============================================================
function ProjectsContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <ScrollableSection color="#ffd700" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,215,0,0.4)' }}
              animate={{ textShadow: ['0 0 30px rgba(255,215,0,0.4)', '0 0 50px rgba(255,215,0,0.6)', '0 0 30px rgba(255,215,0,0.4)'] }}
              transition={{ duration: 3, repeat: Infinity }}>
              CONQUESTS
            </motion.h2>
            <motion.span className="absolute -left-10 top-1/2 -translate-y-1/2 text-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>⚡</motion.span>
            <motion.span className="absolute -right-10 top-1/2 -translate-y-1/2 text-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>⚡</motion.span>
          </motion.div>
          <motion.p className="text-gray-400 italic mt-2" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>Ours is the Fury</motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioData.projects.map((project, index) => (
            <motion.a key={project.name} href={project.github} target="_blank" rel="noopener noreferrer"
              className="relative p-5 rounded-2xl border border-gray-700/50 overflow-hidden group block"
              style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(30,30,30,0.9) 100%)' }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.name)} onHoverEnd={() => setHoveredProject(null)}
              whileHover={{ borderColor: '#ffd700', y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255,215,0,0.2)' }}>
              
              {hoveredProject === project.name && (
                <motion.div className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 0.3 }}
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.3) 0%, transparent 70%)' }} />
              )}
              
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.15) 0%, transparent 60%)' }} />

              <div className="flex items-start justify-between mb-3 relative z-10">
                <motion.div className="text-3xl" animate={hoveredProject === project.name ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}>{project.icon}</motion.div>
                {project.type && (
                  <motion.span className="text-xs px-2 py-1 rounded-full bg-gray-800/80 text-gray-400 border border-gray-700"
                    whileHover={{ borderColor: '#ffd700', color: '#ffd700' }}>{project.type}</motion.span>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1 relative z-10">{project.name}</h3>
              <p className="text-xs text-yellow-500/60 italic mb-2 relative z-10">{project.highlight}</p>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 relative z-10">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 relative z-10">
                {project.tech.map((tech, i) => (
                  <motion.span key={tech} className="px-2 py-0.5 text-xs rounded-full bg-gray-800/80 text-gray-300 border border-gray-700/50"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ borderColor: '#ffd700', color: '#ffd700', scale: 1.1 }}>{tech}</motion.span>
                ))}
              </div>

              <motion.div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <span className="text-gray-500 text-xs">View on GitHub</span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </ScrollableSection>
  )
}

// ============================================================
// EDUCATION CONTENT
// ============================================================
function EducationContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  return (
    <ScrollableSection color="#c9a227" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#f5e6c8', textShadow: '0 0 30px rgba(201,162,39,0.5)' }}
              animate={{ textShadow: ['0 0 30px rgba(201,162,39,0.5)', '0 0 50px rgba(201,162,39,0.8)', '0 0 30px rgba(201,162,39,0.5)'] }}
              transition={{ duration: 3, repeat: Infinity }}>
              KNOWLEDGE
            </motion.h2>
            <motion.span className="absolute -left-10 top-1/2 -translate-y-1/2 text-3xl" animate={{ rotateY: [0, 360] }} transition={{ duration: 4, repeat: Infinity }}>📚</motion.span>
            <motion.span className="absolute -right-10 top-1/2 -translate-y-1/2 text-3xl" animate={{ rotateY: [360, 0] }} transition={{ duration: 4, repeat: Infinity }}>📚</motion.span>
          </motion.div>
          <motion.p className="text-amber-300/70 italic mt-2" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>Knowledge is Power</motion.p>
        </motion.div>

        <div className="space-y-6">
          {portfolioData.education.map((edu, index) => (
            <motion.div key={edu.school} className="relative p-8 rounded-2xl border border-amber-700/30 overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, rgba(26,24,16,0.9) 0%, rgba(40,35,20,0.8) 100%)' }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ borderColor: 'rgba(201,162,39,0.6)', scale: 1.02 }}>
              
              <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.2) 0%, transparent 70%)' }}
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
                <div className="flex items-start gap-4">
                  <motion.span className="text-4xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}>
                    {edu.icon}
                  </motion.span>
                  <div>
                    <h3 className="text-xl font-bold text-amber-200">{edu.degree}</h3>
                    <p className="text-amber-300/80">{edu.school}</p>
                    <p className="text-amber-400/50 text-sm">{edu.location}</p>
                  </div>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <p className="text-amber-300/80">{edu.period}</p>
                  <motion.p className="text-3xl font-bold text-amber-400" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    GPA: {edu.gpa}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p className="text-center text-amber-400/60 italic mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
          The ink is dry, but the quest for knowledge never ends
        </motion.p>
      </div>
    </ScrollableSection>
  )
}

// ============================================================
// CONTACT CONTENT
// ============================================================
function ContactContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  return (
    <ScrollableSection color="#888888" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <motion.div className="mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#ffffff', textShadow: '0 0 20px rgba(150,150,150,0.4)' }}
              animate={{ textShadow: ['0 0 20px rgba(150,150,150,0.4)', '0 0 40px rgba(200,200,200,0.6)', '0 0 20px rgba(150,150,150,0.4)'] }}
              transition={{ duration: 3, repeat: Infinity }}>
              SEND A RAVEN
            </motion.h2>
            <motion.span className="absolute -left-12 top-1/2 -translate-y-1/2 text-4xl" animate={{ x: [0, -5, 0], rotate: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🦅</motion.span>
            <motion.span className="absolute -right-12 top-1/2 -translate-y-1/2 text-4xl" animate={{ x: [0, 5, 0], rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🦅</motion.span>
          </motion.div>
          <motion.p className="text-gray-400 italic mt-2" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>Bend the Knee... or Send a Message</motion.p>
        </motion.div>

        <motion.p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          Ready to forge alliances and build something legendary? The realm awaits your message.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          {[
            { icon: '📧', label: 'EMAIL', href: `mailto:${portfolioData.social.email}`, hoverColor: '#ffd700' },
            { icon: '💼', label: 'LINKEDIN', href: portfolioData.social.linkedin, hoverColor: '#0077b5' },
            { icon: '🐙', label: 'GITHUB', href: portfolioData.social.github, hoverColor: '#8b5cf6' },
          ].map((btn, i) => (
            <motion.a key={btn.label} href={btn.href} target={btn.label !== 'EMAIL' ? '_blank' : undefined} rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl border border-gray-600 text-white font-bold tracking-wider relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(40,40,40,0.9) 100%)' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: btn.hoverColor, color: btn.hoverColor, boxShadow: `0 0 30px ${btn.hoverColor}40` }}
              whileTap={{ scale: 0.95 }}>
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `radial-gradient(ellipse at 50% 100%, ${btn.hoverColor}20 0%, transparent 70%)` }} />
              <span className="relative z-10">{btn.icon} {btn.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.p className="text-gray-500 mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
          📍 {portfolioData.location}
        </motion.p>

        <motion.div className="mt-16 pt-8 border-t border-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
          <p className="text-gray-600 text-sm">© 2025 {portfolioData.name}. All rights reserved.</p>
          <p className="text-gray-700 text-xs mt-2 italic">When you play the game of jobs, you win or you learn. There is no middle ground.</p>
        </motion.div>
      </div>
    </ScrollableSection>
  )
}