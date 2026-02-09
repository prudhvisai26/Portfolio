'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================================
// MAGICAL CONFIGURATION
// ============================================================================
const MAGIC_CONFIG = {
  particles: { stars: 150, dust: 80, sparks: 60 },
  snitches: { count: 3 },
  transitions: { duration: 2000, apparitionParticles: 60 },
}

// ============================================================================
// SKILLS DATA
// ============================================================================
const skillsData = {
  'Charms & Incantations': {
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'TypeScript'],
    icon: '🪄', color: '#ff6b35', glow: 'rgba(255,107,53,0.6)', spell: 'Lumos',
  },
  'Potions & Elixirs': {
    skills: ['MySQL', 'DynamoDB', 'MongoDB', 'PostgreSQL', 'Redis', 'SQLite'],
    icon: '⚗️', color: '#2ed573', glow: 'rgba(46,213,115,0.6)', spell: 'Felix Felicis',
  },
  'Transfiguration': {
    skills: ['S3', 'DynamoDB', 'Lambda', 'CloudWatch', 'EC2', 'ECS', 'EKS', 'RDS', 'IAM'],
    icon: '✨', color: '#70a1ff', glow: 'rgba(112,161,255,0.6)', spell: 'Vera Verto',
  },
  'Divination Arts': {
    skills: ['scikit-learn', 'NLTK', 'TensorFlow', 'Keras', 'NLP', 'ML', 'LLM', 'llama.cpp'],
    icon: '🔮', color: '#a55eea', glow: 'rgba(165,94,234,0.6)', spell: 'Legilimens',
  },
  'Ancient Artifacts': {
    skills: ['FastAPI', 'Flask', 'Spring Boot', 'REST APIs', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'GitHub Actions', 'Jira'],
    icon: '⚙️', color: '#feca57', glow: 'rgba(254,202,87,0.6)', spell: 'Accio',
  },
  'Defense Against Dark Arts': {
    skills: ['OpenTelemetry', 'ELK Stack', 'Kibana', 'JUnit', 'Mockito', 'Logging', 'Metrics', 'Alerting'],
    icon: '🛡️', color: '#ff4757', glow: 'rgba(255,71,87,0.6)', spell: 'Protego',
  },
}

// ============================================================================
// PORTFOLIO DATA
// ============================================================================
const portfolioData = {
  name: "Prudhvi Sai Raj Dasari",
  wizardTitle: "Master of Digital Sorcery",
  email: "dasariprudhvisai26@gmail.com",
  location: "San Jose, California",
  
  about: `A dedicated wizard of the digital realm, conjuring elegant solutions with the precision of a perfectly cast spell. Like the greatest witches and wizards of Hogwarts, I believe in courage to tackle complex problems, wisdom to architect scalable systems, loyalty to my team, and ambition to push boundaries. Currently mastering advanced enchantments at San José State University while brewing innovative applications. Experienced in summoning low-latency backend services, optimizing distributed magical systems, and implementing powerful observability charms.`,
  
  stats: [
    { value: '2+', label: 'Years of Magic', icon: '⚡', color: '#ffd700' },
    { value: '10+', label: 'Spells Mastered', icon: '📜', color: '#ff6b6b' },
    { value: '3.5', label: 'N.E.W.T. Score', icon: '🦉', color: '#a55eea' },
    { value: '50+', label: 'Magical Skills', icon: '✨', color: '#2ed573' },
  ],
  
  experience: [
    {
      company: 'Accolite Digital', role: 'Senior Software Wizard', period: 'Jun 2022 – Jan 2024',
      location: 'Bangalore, India', icon: '🏰', houseColor: '#2ed573',
      highlights: [
        'Conjured and optimized microservices using ancient Java enchantments; improved spell-casting latency by 20% through advanced caching incantations',
        'Designed magical data workflows on MySQL with safe schema transformations; maintained code quality through rigorous spell-checking',
        'Protected services with powerful security wards (JWT/RBAC), input validation hexes, and rate-limiting charms',
        'Deployed containerized spells to the AWS cloud realm; automated magical releases via CI/CD portals',
      ],
    },
    {
      company: 'Accolite Digital', role: 'Apprentice Developer', period: 'Jan 2022 – Jun 2022',
      location: 'Hyderabad, India', icon: '📚', houseColor: '#70a1ff',
      highlights: [
        'Studied the ancient arts of Spring Boot and React under senior wizards; mastered pagination spells',
        'Practiced defensive coding through JUnit trials; maintained magical code quality standards',
        'Learned MySQL query optimization through powerful index enchantments',
        'Assisted in cloud deployments; managed secrets with the wisdom of a young wizard',
      ],
    },
  ],
  
  projects: [
    { name: 'Mind Clash', description: 'A magical dueling arena - real-time multiplayer quiz with 3D battle effects',
      tech: ['React', 'Python', 'SQLite', 'Three.js', 'Django', 'Socket.IO'],
      icon: '⚔️', github: 'https://github.com/CS161-Software-Project/MindClash',
      type: 'Triwizard', spell: 'Expelliarmus', color: '#ff6b6b' },
    { name: 'AI Scrum Master', description: 'Intelligent familiar for project management using ML prophecy',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'React', 'NLP'],
      icon: '🦉', github: 'https://github.com/prudhvisai26',
      type: 'Triwizard', spell: 'Accio Tasks', color: '#a55eea' },
    { name: 'IntentFlow', description: 'Magical translator using Mistral oracle for spoken incantations',
      tech: ['FastAPI', 'Python', 'LLM', 'llama.cpp', 'NLP'],
      icon: '🗣️', github: 'https://github.com/Shivankthakur/IntentFlow',
      type: 'Triwizard', spell: 'Legilimens', color: '#70a1ff' },
    { name: 'ShortUrl Service', description: 'Vanishing cabinet for URLs - long path in, short link out',
      tech: ['Node.js', 'Express', 'Sequelize', 'SQLite'],
      icon: '🚪', github: 'https://github.com/prudhvisai26/ShortUrl',
      type: 'O.W.L.', spell: 'Reducio', color: '#2ed573' },
    { name: 'Blog Application', description: 'Magical journal with authentication wards and self-updating chronicles',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      icon: '📖', github: 'https://github.com/prudhvisai26/BlogApp',
      type: 'O.W.L.', spell: 'Aparecium', color: '#feca57' },
    { name: 'Weather Oracle', description: 'Divination tool for atmospheric predictions - better than tea leaves',
      tech: ['JavaScript', 'REST API', 'CSS', 'HTML'],
      icon: '🌩️', github: 'https://github.com/prudhvisai26/Weather-App',
      type: 'O.W.L.', spell: 'Meteolojinx', color: '#5352ed' },
    { name: 'This Portfolio', description: 'The magical portal you are viewing - finest enchantments known',
      tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
      icon: '✨', github: 'https://github.com/prudhvisai26',
      type: 'O.W.L.', spell: 'Lumos Maxima', color: '#ffd700' },
  ],
  
  education: [
    { degree: 'M.S. Computer Science', school: 'San José State University', period: '2024 - 2026', gpa: '3.5', location: 'San Jose, CA', icon: '🎓' },
    { degree: 'B.Tech Computer Science', school: 'MLR Institute of Technology', period: '2018 - 2022', gpa: '8.61', location: 'Hyderabad, India', icon: '📚' },
  ],
  
  social: { github: 'https://github.com/prudhvisai26', linkedin: 'https://linkedin.com/in/prudhvisai26', email: 'dasariprudhvisai26@gmail.com' },
}

// ============================================================================
// SECTIONS CONFIG
// ============================================================================
const sections = [
  { id: 'hero', name: 'Welcome', house: 'HOGWARTS', color: '#ffd700', accent: '#c9a227' },
  { id: 'about', name: 'The Wizard', house: 'GRYFFINDOR', color: '#ae0001', accent: '#eeba30' },
  { id: 'skills', name: 'Spell Book', house: 'RAVENCLAW', color: '#0e1a40', accent: '#946b2d' },
  { id: 'experience', name: 'Journey', house: 'SLYTHERIN', color: '#1a472a', accent: '#aaaaaa' },
  { id: 'projects', name: 'Creations', house: 'HUFFLEPUFF', color: '#ecb939', accent: '#372e29' },
  { id: 'education', name: 'Studies', house: 'LIBRARY', color: '#946b2d', accent: '#d4af37' },
  { id: 'contact', name: 'Owl Post', house: 'OWLERY', color: '#87ceeb', accent: '#c9a227' },
]

// ============================================================================
// SEEDED RANDOM FOR DETERMINISTIC VALUES
// ============================================================================
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// ============================================================================
// PARTICLE GENERATION (Deterministic)
// ============================================================================
const generateParticles = (count: number, config: { xRange?: [number, number]; yRange?: [number, number]; sizeRange?: [number, number]; durationRange?: [number, number] } = {}, seedOffset: number = 0) => {
  const { xRange = [0, 100], yRange = [0, 100], sizeRange = [1, 3], durationRange = [2, 5] } = config
  return Array.from({ length: count }, (_, i) => {
    const seed = i + seedOffset
    return {
      id: i, 
      x: xRange[0] + seededRandom(seed * 1) * (xRange[1] - xRange[0]), 
      y: yRange[0] + seededRandom(seed * 2) * (yRange[1] - yRange[0]),
      size: sizeRange[0] + seededRandom(seed * 3) * (sizeRange[1] - sizeRange[0]), 
      duration: durationRange[0] + seededRandom(seed * 4) * (durationRange[1] - durationRange[0]),
      delay: seededRandom(seed * 5) * 5, 
      seed: seededRandom(seed * 6),
    }
  })
}

// ============================================================================
// WAND CURSOR TRAIL
// ============================================================================
function WandCursorTrail() {
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number }>>([])
  const trailId = useRef(0)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      if (Math.sqrt(dx * dx + dy * dy) < 8) return
      lastPos.current = { x: e.clientX, y: e.clientY }
      setTrails(prev => [...prev.slice(-20), { id: trailId.current++, x: e.clientX, y: e.clientY }])
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-100">
      <svg className="w-full h-full">
        <defs>
          <radialGradient id="trailGlow"><stop offset="0%" stopColor="#ffd700" stopOpacity="0.9" /><stop offset="50%" stopColor="#ff8c00" stopOpacity="0.4" /><stop offset="100%" stopColor="#ff4500" stopOpacity="0" /></radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="2" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {trails.map((trail, i) => (
          <motion.circle key={trail.id} cx={trail.x} cy={trail.y} r={4 + (i / trails.length) * 6} fill="url(#trailGlow)" filter="url(#glow)"
            initial={{ opacity: 0.9, scale: 1 }} animate={{ opacity: 0, scale: 0.2 }} transition={{ duration: 0.7 }} />
        ))}
      </svg>
    </div>
  )
}

// ============================================================================
// GOLDEN SNITCHES
// ============================================================================
function GoldenSnitches({ active }: { active: boolean }) {
  const snitches = useMemo(() => generateParticles(MAGIC_CONFIG.snitches.count, { xRange: [10, 80], yRange: [15, 60], durationRange: [14, 22] }, 1000), [])
  if (!active) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {snitches.map((snitch) => (
        <motion.div key={snitch.id} className="absolute" style={{ left: `${snitch.x}%`, top: `${snitch.y}%` }}
          animate={{ x: [0, 130, -90, 200, -130, 70, 0], y: [0, -100, 80, -140, 60, -80, 0] }}
          transition={{ duration: snitch.duration, repeat: Infinity, ease: [0.4, 0, 0.2, 1], times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1] }}>
          <motion.div className="relative" animate={{ rotate: [0, 360] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}>
            <motion.div className="w-7 h-7 rounded-full relative" style={{ background: 'radial-gradient(circle at 25% 25%, #fff 0%, #ffd700 25%, #daa520 60%, #b8860b 100%)', boxShadow: '0 0 25px #ffd700, 0 0 50px rgba(255,215,0,0.5)' }}
              animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.4, repeat: Infinity }}>
              <div className="absolute inset-1.5 rounded-full border border-amber-600/40" />
            </motion.div>
            <motion.div className="absolute top-1/2 -left-7 -translate-y-1/2 origin-right" animate={{ rotateY: [-35, 35, -35] }} transition={{ duration: 0.07, repeat: Infinity }}>
              <div className="w-9 h-5" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.5) 100%)', clipPath: 'ellipse(100% 50% at 100% 50%)', filter: 'blur(0.3px)' }} />
            </motion.div>
            <motion.div className="absolute top-1/2 -right-7 -translate-y-1/2 origin-left" animate={{ rotateY: [35, -35, 35] }} transition={{ duration: 0.07, repeat: Infinity }}>
              <div className="w-9 h-5" style={{ background: 'linear-gradient(-90deg, transparent 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.5) 100%)', clipPath: 'ellipse(100% 50% at 0% 50%)', filter: 'blur(0.3px)' }} />
            </motion.div>
            {[...Array(5)].map((_, i) => (<motion.div key={i} className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: '#ffd700' }}
              animate={{ x: -12 - i * 10, opacity: [0.5 - i * 0.08, 0], scale: [1 - i * 0.1, 0.2] }} transition={{ duration: 0.35, delay: i * 0.025, repeat: Infinity }} />))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================================
// MAGICAL PARTICLES
// ============================================================================
function MagicalParticles({ section, color }: { section: string; color: string }) {
  const particles = useMemo(() => generateParticles(MAGIC_CONFIG.particles.dust, { sizeRange: [2, 7], durationRange: [3, 8] }, 2000), [])
  const getStyle = (p: typeof particles[0]) => {
    const colors: Record<string, string[]> = {
      about: ['#ff6b35', '#ffd700', '#ff4444'], experience: ['#2ed573', '#7bed9f', '#26de81'], skills: ['#70a1ff', '#a55eea', '#ffffff'],
      projects: ['#ffd700', '#feca57', '#ffffff'], default: [color, '#ffffff'],
    }
    const c = colors[section] || colors.default
    return { background: `radial-gradient(circle, ${c[Math.floor(p.seed * c.length)]}, transparent)`, boxShadow: `0 0 ${p.size * 3}px ${c[0]}` }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, ...getStyle(p) }}
          animate={{ y: section === 'experience' ? [0, 40, 0] : [0, -90 - p.seed * 50, 0], x: [0, (p.seed - 0.5) * 50, 0], opacity: [0, 0.9, 0], scale: [0.4, 1.6, 0.4] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}

// ============================================================================
// STARFIELD
// ============================================================================
function StarField() {
  const stars = useMemo(() => generateParticles(MAGIC_CONFIG.particles.stars, { sizeRange: [1, 3], durationRange: [2, 6] }, 3000), [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div key={star.id} className="absolute rounded-full" style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, background: star.seed > 0.85 ? '#ffd700' : star.seed > 0.6 ? '#add8e6' : '#ffffff' }}
          animate={{ opacity: [0.2, star.seed > 0.7 ? 1 : 0.6, 0.2], scale: [1, star.seed > 0.7 ? 1.9 : 1.3, 1], boxShadow: [`0 0 ${star.size}px rgba(255,255,255,0.3)`, `0 0 ${star.size * 4}px rgba(255,255,255,0.9)`, `0 0 ${star.size}px rgba(255,255,255,0.3)`] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity }} />
      ))}
    </div>
  )
}

// ============================================================================
// APPARITION EFFECT
// ============================================================================
function ApparitionEffect({ active, direction, color, targetColor }: { active: boolean; direction: 'forward' | 'backward'; color: string; targetColor: string }) {
  const particles = useMemo(() => Array.from({ length: MAGIC_CONFIG.transitions.apparitionParticles }, (_, i) => ({ id: i, angle: (i / MAGIC_CONFIG.transitions.apparitionParticles) * 360, distance: 100 + seededRandom(i + 1) * 180, size: 2 + seededRandom(i + 100) * 5, duration: 0.7 + seededRandom(i + 200) * 0.5 })), [])
  if (!active) return null

  return (
    <motion.div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute w-80 h-80 rounded-full" style={{ background: `conic-gradient(from 0deg, ${color}, ${targetColor}, ${color}, ${targetColor}, ${color})`, filter: 'blur(25px)' }}
        initial={{ scale: 0, rotate: 0, opacity: 0 }} animate={{ scale: [0, 2.5, 3.5], rotate: direction === 'forward' ? [0, 200, 400] : [400, 200, 0], opacity: [0, 0.7, 0] }} transition={{ duration: 1.1, ease: 'easeInOut' }} />
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full" style={{ width: p.size, height: p.size, background: p.id % 2 === 0 ? color : targetColor, boxShadow: `0 0 ${p.size * 2}px ${p.id % 2 === 0 ? color : targetColor}` }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{ x: Math.cos(p.angle * Math.PI / 180) * p.distance * (direction === 'forward' ? 1 : -1), y: Math.sin(p.angle * Math.PI / 180) * p.distance * (direction === 'forward' ? 1 : -1), scale: [0, 1.4, 0], opacity: [0, 1, 0], rotate: [0, direction === 'forward' ? 600 : -600] }}
          transition={{ duration: p.duration, delay: p.id * 0.007, ease: 'easeOut' }} />
      ))}
      <motion.div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${targetColor}50, transparent 60%)` }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.9, 0] }} transition={{ duration: 0.5, delay: 0.35 }} />
    </motion.div>
  )
}

// ============================================================================
// HOGWARTS SILHOUETTE
// ============================================================================
function HogwartsSilhouette() {
  return (
    <motion.div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none z-5" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 0.12, y: 0 }} transition={{ duration: 2.5 }}>
      <svg viewBox="0 0 1400 200" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
        <defs><linearGradient id="cg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#2a2a4a" /><stop offset="100%" stopColor="#0a0a15" /></linearGradient></defs>
        <path d="M0,200 L0,180 L50,180 L50,160 L80,140 L110,160 L110,180 L160,180 L160,140 L190,100 L220,80 L250,60 L280,80 L310,100 L340,140 L340,180 L400,180 L400,130 L430,90 L460,60 L490,40 L520,20 L550,40 L580,60 L610,90 L640,130 L640,180 L720,180 L720,120 L760,80 L800,50 L840,30 L880,50 L920,80 L960,120 L960,180 L1040,180 L1040,140 L1080,100 L1120,140 L1120,180 L1180,180 L1180,160 L1220,140 L1260,160 L1260,180 L1320,180 L1320,190 L1400,190 L1400,200 Z" fill="url(#cg)" />
        {[{x:490,y:50},{x:520,y:35},{x:550,y:50},{x:800,y:60},{x:840,y:45},{x:880,y:60},{x:310,y:110},{x:610,y:100},{x:920,y:90}].map((w,i) => (
          <motion.rect key={i} x={w.x} y={w.y} width="4" height="7" fill="#ffd700" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2 + seededRandom(i + 500) * 2, repeat: Infinity, delay: seededRandom(i + 600) * 2 }} />
        ))}
      </svg>
    </motion.div>
  )
}

// ============================================================================
// SCROLLABLE SECTION
// ============================================================================
function ScrollableSection({ children, color, onAtTop, onAtBottom }: { children: React.ReactNode; color: string; onAtTop: () => void; onAtBottom: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(true)

  useEffect(() => {
    const el = scrollRef.current
    if (el) { const check = () => { setCanScrollUp(el.scrollTop > 5); setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 5) }; check(); el.addEventListener('scroll', check, { passive: true }); return () => el.removeEventListener('scroll', check) }
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const el = scrollRef.current; if (!el) return
    const atTop = el.scrollTop <= 5; const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5
    if (e.deltaY < 0 && atTop) onAtTop(); else if (e.deltaY > 0 && atBottom) onAtBottom(); else e.stopPropagation()
  }, [onAtTop, onAtBottom])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div ref={scrollRef} onWheel={handleWheel} className="overflow-y-auto overflow-x-hidden max-h-[85vh] w-full hp-scroll" style={{ scrollbarWidth: 'thin', scrollbarColor: `${color}50 transparent` }}>
        <style>{`.hp-scroll::-webkit-scrollbar{width:8px}.hp-scroll::-webkit-scrollbar-track{background:rgba(0,0,0,0.3);border-radius:4px}.hp-scroll::-webkit-scrollbar-thumb{background:linear-gradient(180deg,${color}90,${color}50);border-radius:4px;box-shadow:0 0 10px ${color}60}`}</style>
        {children}
      </div>
      <AnimatePresence>
        {canScrollUp && (<motion.div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-20" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute top-3 left-1/2 -translate-x-1/2" animate={{ y: [0, -6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><span className="text-xl">✨</span></motion.div>
        </motion.div>)}
      </AnimatePresence>
      <AnimatePresence>
        {canScrollDown && (<motion.div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-20" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <motion.span className="text-xs mb-1 tracking-widest" style={{ color: `${color}aa` }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>SCROLL</motion.span>
            <motion.span className="text-xl" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🪄</motion.span>
          </motion.div>
        </motion.div>)}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function HarryPotterPortfolio() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionProgress, setTransitionProgress] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [heroStage, setHeroStage] = useState(0)
  const [lettersRevealed, setLettersRevealed] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(0)
  const touchStartY = useRef(0)
  const fullName = "PRUDHVI SAI RAJ DASARI"

  useEffect(() => {
    const timers = [setTimeout(() => setHeroStage(1), 500), setTimeout(() => setHeroStage(2), 2000), setTimeout(() => setHeroStage(3), 3500), setTimeout(() => setHeroStage(4), 4500), setTimeout(() => setHeroStage(5), 8000), setTimeout(() => setHeroStage(6), 9500)]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (heroStage >= 4 && lettersRevealed < fullName.length) { const timer = setTimeout(() => setLettersRevealed(p => p + 1), 65); return () => clearTimeout(timer) }
  }, [heroStage, lettersRevealed, fullName.length])

  const transitionToSection = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= sections.length || isTransitioning) return
    setDirection(newIndex > currentSection ? 'forward' : 'backward'); setIsTransitioning(true); setTransitionProgress(0)
    const duration = MAGIC_CONFIG.transitions.duration; const startTime = Date.now()
    const animate = () => { const elapsed = Date.now() - startTime; const progress = Math.min(elapsed / duration, 1); setTransitionProgress(1 - Math.pow(1 - progress, 4)); if (progress < 1) requestAnimationFrame(animate); else { setCurrentSection(newIndex); setIsTransitioning(false); setTransitionProgress(0) } }
    requestAnimationFrame(animate)
  }, [currentSection, isTransitioning])

  const handleWheel = useCallback((e: WheelEvent) => {
    const now = Date.now(); if (now - lastScrollTime.current < 2200 || isTransitioning) return
    const target = e.target as HTMLElement; if (target.closest('.hp-scroll')) return; e.preventDefault()
    if (e.deltaY > 30 && currentSection < sections.length - 1) { lastScrollTime.current = now; transitionToSection(currentSection + 1) }
    else if (e.deltaY < -30 && currentSection > 0) { lastScrollTime.current = now; transitionToSection(currentSection - 1) }
  }, [currentSection, isTransitioning, transitionToSection])

  const goToPrevSection = useCallback(() => { const now = Date.now(); if (now - lastScrollTime.current < 1200 || isTransitioning || currentSection <= 0) return; lastScrollTime.current = now; transitionToSection(currentSection - 1) }, [currentSection, isTransitioning, transitionToSection])
  const goToNextSection = useCallback(() => { const now = Date.now(); if (now - lastScrollTime.current < 1200 || isTransitioning || currentSection >= sections.length - 1) return; lastScrollTime.current = now; transitionToSection(currentSection + 1) }, [currentSection, isTransitioning, transitionToSection])

  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY }
  const handleTouchEnd = (e: React.TouchEvent) => { const diff = touchStartY.current - e.changedTouches[0].clientY; if (Math.abs(diff) > 50) { if (diff > 0) goToNextSection(); else goToPrevSection() } }

  useEffect(() => { const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goToNextSection() } else if (e.key === 'ArrowUp') { e.preventDefault(); goToPrevSection() } }; window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown) }, [goToNextSection, goToPrevSection])
  useEffect(() => { const container = containerRef.current; if (container) { container.addEventListener('wheel', handleWheel, { passive: false }); return () => container.removeEventListener('wheel', handleWheel) } }, [handleWheel])

  const current = sections[currentSection]; const next = sections[currentSection + 1]; const prev = sections[currentSection - 1]
  const backgrounds: Record<string, string> = {
    hero: 'radial-gradient(ellipse at 50% 100%, #1a1a3e 0%, #0d0d1a 40%, #050508 100%)', about: 'radial-gradient(ellipse at 30% 0%, #3a1010 0%, #150505 40%, #080202 100%)',
    skills: 'radial-gradient(ellipse at 70% 100%, #0a1535 0%, #050a1a 40%, #020408 100%)', experience: 'radial-gradient(ellipse at 50% 50%, #0a2515 0%, #051008 40%, #020503 100%)',
    projects: 'radial-gradient(ellipse at 50% 0%, #2a2510 0%, #151208 40%, #080602 100%)', education: 'radial-gradient(ellipse at 30% 70%, #1a1535 0%, #0a0815 40%, #030205 100%)',
    contact: 'radial-gradient(ellipse at 80% 20%, #151525 0%, #0a0a12 40%, #030305 100%)',
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ perspective: '2000px', perspectiveOrigin: '50% 50%' }}>
      <WandCursorTrail />
      <motion.div className="absolute inset-0" animate={{ background: backgrounds[current.id] }} transition={{ duration: 1.5 }} />
      <StarField />
      <HogwartsSilhouette />

      <GoldenSnitches active={current.id === 'projects'} />
      <MagicalParticles section={current.id} color={current.color} />
      <ApparitionEffect active={isTransitioning} direction={direction} color={current.color} targetColor={(direction === 'forward' ? next?.color : prev?.color) || current.color} />

      {/* 3D Portal */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: `translateZ(${isTransitioning ? (direction === 'forward' ? transitionProgress * 1500 : -transitionProgress * 1500) : 0}px)` }}>
        {prev && direction === 'backward' && isTransitioning && (
          <motion.div className="absolute inset-0" style={{ transform: 'translateZ(1500px) scale(3)', opacity: transitionProgress, pointerEvents: 'none', background: backgrounds[prev.id] }} />
        )}
        <div className="absolute inset-0" style={{ transform: isTransitioning ? direction === 'forward' ? `translateZ(${transitionProgress * 1500}px) scale(${1 + transitionProgress})` : `translateZ(${-transitionProgress * 1500}px) scale(${1 - transitionProgress * 0.5})` : 'translateZ(0) scale(1)', opacity: isTransitioning ? 1 - transitionProgress * 0.7 : 1 }}>
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
        {next && direction === 'forward' && (
          <motion.div className="absolute inset-0" style={{ transform: `translateZ(${-2000 + (isTransitioning ? transitionProgress * 2000 : 0)}px) scale(${0.1 + (isTransitioning ? transitionProgress * 0.9 : 0)})`, opacity: isTransitioning ? 0.1 + transitionProgress * 0.9 : 0.1, pointerEvents: 'none', background: backgrounds[next.id] }}>
            <div className="absolute inset-0 flex items-center justify-center"><div className="text-center"><motion.p className="text-lg tracking-widest mb-2" style={{ color: next.color }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>{next.house}</motion.p><p className="text-3xl font-bold" style={{ color: next.accent, textShadow: `0 0 20px ${next.color}` }}>{next.name}</p></div></div>
          </motion.div>
        )}
      </div>

      {/* Portal Rings */}
      <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(10)].map((_, i) => (<motion.div key={`ring-${i}`} className="absolute left-1/2 top-1/2 rounded-full" style={{ width: `${100 + i * 120}%`, height: `${100 + i * 120}%`, border: `2px solid ${current.color}${Math.max(5, 25 - i * 2).toString(16).padStart(2, '0')}`, transform: `translate(-50%, -50%) translateZ(${-i * 250}px) rotateX(${75 + i * 2}deg)`, boxShadow: `0 0 ${25 - i * 2}px ${current.color}20` }} animate={{ rotateZ: i % 2 === 0 ? [0, 360] : [360, 0], scale: [1, 1.02, 1] }} transition={{ rotateZ: { duration: 70 + i * 12, repeat: Infinity, ease: 'linear' }, scale: { duration: 4 + i, repeat: Infinity } }} />))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-30" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 10%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)' }} />

      {/* Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {sections.map((section, i) => (
          <motion.button key={section.id} onClick={() => !isTransitioning && transitionToSection(i)} className="group flex items-center gap-3" disabled={isTransitioning} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <span className="text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0" style={{ color: currentSection === i ? section.color : 'rgba(255,255,255,0.4)' }}>{section.name}</span>
            <motion.div className="relative w-4 h-4 rounded-full" style={{ background: currentSection === i ? `radial-gradient(circle, ${section.color}, ${section.color}80)` : 'transparent', border: `2px solid ${currentSection === i ? section.color : 'rgba(255,255,255,0.3)'}`, boxShadow: currentSection === i ? `0 0 20px ${section.color}, 0 0 40px ${section.color}50` : 'none' }}
              animate={currentSection === i ? { scale: [1, 1.3, 1], boxShadow: [`0 0 20px ${section.color}`, `0 0 40px ${section.color}`, `0 0 20px ${section.color}`] } : {}} transition={{ duration: 2, repeat: Infinity }} />
          </motion.button>
        ))}
      </div>

      {/* House Banner */}
      <motion.div className="fixed top-6 right-6 text-right z-50" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} key={current.house}>
        <motion.p className="text-lg font-bold tracking-[0.3em]" style={{ color: current.color, textShadow: `0 0 30px ${current.color}` }} animate={{ textShadow: [`0 0 30px ${current.color}`, `0 0 50px ${current.color}`, `0 0 30px ${current.color}`] }} transition={{ duration: 2, repeat: Infinity }}>{current.house}</motion.p>
      </motion.div>

      {/* Section Counter */}
      <div className="fixed bottom-6 left-6 z-50"><p className="text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}><motion.span style={{ color: current.color }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>{String(currentSection + 1).padStart(2, '0')}</motion.span><span className="mx-2">✦</span><span>{String(sections.length).padStart(2, '0')}</span></p></div>

      {/* Scroll Hint */}
      <AnimatePresence>
        {currentSection === 0 && heroStage >= 6 && !isTransitioning && (
          <motion.div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <motion.p className="text-sm tracking-[0.3em] text-amber-400/60 mb-4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>SCROLL TO APPARATE</motion.p>
            <motion.div className="text-3xl" animate={{ y: [0, 12, 0], rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>🪄</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// HERO CONTENT
// ============================================================================
function HeroContent({ stage, lettersRevealed, fullName }: { stage: number; lettersRevealed: number; fullName: string }) {
  return (
    <div className="text-center px-6 relative">
      <motion.div className="mb-8 relative" initial={{ opacity: 0, y: -80, rotateX: -90 }} animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : -80, rotateX: stage >= 2 ? 0 : -30, scale: stage >= 2 ? 1 : 1.2 }} transition={{ duration: 1.5, type: 'spring', bounce: 0.3 }}>
        <motion.div className="relative inline-block" animate={stage >= 2 ? { rotateY: [0, 180, 0] } : {}} transition={{ duration: 1 }}><span className="text-7xl md:text-8xl">📜</span>
          {stage >= 2 && (<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" initial={{ scale: 1.5, opacity: 1 }} animate={{ scale: [1.5, 2.5, 0], opacity: [1, 0.5, 0] }} transition={{ duration: 0.8 }}><span className="text-4xl">✨</span></motion.div>)}
        </motion.div>
        {stage >= 1 && [...Array(12)].map((_, i) => (<motion.span key={i} className="absolute text-lg" style={{ left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 70}%`, top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 70}%` }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }} transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}>✨</motion.span>))}
      </motion.div>

      <motion.p className="text-base md:text-lg tracking-[0.5em] text-amber-300/70 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 20 }} transition={{ duration: 1 }}>THE WIZARDING WORLD WELCOMES</motion.p>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wider mb-6">
        {fullName.split('').map((letter, i) => (
          <motion.span key={i} className="inline-block relative" initial={{ opacity: 0, y: 50, scale: 0, filter: 'blur(10px)' }}
            animate={{ opacity: i < lettersRevealed ? 1 : 0, y: i < lettersRevealed ? 0 : 50, scale: i < lettersRevealed ? 1 : 0, filter: i < lettersRevealed ? 'blur(0px)' : 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ color: i < lettersRevealed ? '#ffd700' : 'transparent', textShadow: i < lettersRevealed ? '0 0 25px #ffd700, 0 0 50px #ff8c00, 0 0 75px #ff6600' : 'none' }}>
            {letter === ' ' ? '\u00A0' : letter}
            {i === lettersRevealed - 1 && (<motion.span className="absolute -bottom-2 left-1/2 w-1 h-5 rounded-full bg-amber-500" initial={{ height: 0, opacity: 1 }} animate={{ height: [0, 20, 0], opacity: [1, 1, 0] }} transition={{ duration: 0.3 }} />)}
          </motion.span>
        ))}
      </h1>

      <motion.div className="flex items-center justify-center gap-4 my-8" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: stage >= 5 ? 1 : 0, scaleX: stage >= 5 ? 1 : 0 }} transition={{ duration: 1.5 }}>
        <motion.div className="h-0.5 w-28 md:w-36" style={{ background: 'linear-gradient(90deg, transparent, #ffd700, #ffffff)' }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.span className="text-3xl" animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }}>⚡</motion.span>
        <motion.div className="h-0.5 w-28 md:w-36" style={{ background: 'linear-gradient(90deg, #ffffff, #ffd700, transparent)' }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>

      <motion.p className="text-xl md:text-2xl tracking-[0.3em]" style={{ color: '#d4af37', textShadow: '0 0 20px rgba(212,175,55,0.5)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 20 }} transition={{ duration: 1 }}>{portfolioData.wizardTitle.toUpperCase()}</motion.p>

      <motion.div className="mt-10 flex items-center justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: stage >= 6 ? 1 : 0 }} transition={{ duration: 1 }}>
        <motion.span className="text-xl" animate={{ x: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }}>👣</motion.span>
        <motion.p className="text-sm text-amber-400/60 italic" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>I solemnly swear that I am up to no good</motion.p>
        <motion.span className="text-xl" animate={{ x: [2, -2, 2] }} transition={{ duration: 2, repeat: Infinity }}>👣</motion.span>
      </motion.div>
    </div>
  )
}

// ============================================================================
// ABOUT CONTENT
// ============================================================================
function AboutContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  return (
    <ScrollableSection color="#ae0001" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.span className="absolute -left-16 top-1/2 -translate-y-1/2 text-5xl" animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>🦁</motion.span>
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#eeba30', textShadow: '0 0 40px rgba(238,186,48,0.5), 0 0 80px rgba(174,0,1,0.3)' }} animate={{ textShadow: ['0 0 40px rgba(238,186,48,0.5)', '0 0 60px rgba(238,186,48,0.8)', '0 0 40px rgba(238,186,48,0.5)'] }} transition={{ duration: 2, repeat: Infinity }}>THE WIZARD</motion.h2>
            <motion.span className="absolute -right-16 top-1/2 -translate-y-1/2 text-5xl" animate={{ scale: [1, 1.2, 1], rotate: [5, -5, 5] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>🦁</motion.span>
          </motion.div>
          <motion.p className="text-red-300/70 italic mt-3 text-lg">Where dwell the brave at heart</motion.p>
        </motion.div>

        <motion.div className="relative p-8 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(174,0,1,0.15) 0%, rgba(20,5,5,0.95) 100%)' }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          <motion.div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(90deg, #ae0001, #eeba30, #ae0001, #eeba30, #ae0001)', backgroundSize: '200% 100%', padding: '2px' }} animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}><div className="w-full h-full rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(174,0,1,0.15) 0%, rgba(20,5,5,0.98) 100%)' }} /></motion.div>
          <div className="relative z-10">
            <motion.p className="text-lg md:text-xl text-red-100/90 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>{portfolioData.about}</motion.p>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
              {portfolioData.stats.map((stat, index) => (
                <motion.div key={stat.label} className="relative" initial={{ opacity: 0, y: 40, rotateY: -30 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ duration: 0.8, delay: 0.8 + index * 0.15 }}>
                  <motion.div className="text-center p-5 rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(174,0,1,0.3) 0%, rgba(238,186,48,0.1) 100%)', border: '2px solid rgba(238,186,48,0.3)' }} whileHover={{ scale: 1.08, borderColor: '#eeba30', boxShadow: '0 0 30px rgba(238,186,48,0.4)' }}>
                    <motion.span className="text-3xl block mb-2" animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}>{stat.icon}</motion.span>
                    <motion.p className="text-4xl font-bold" style={{ color: stat.color }}>{stat.value}</motion.p>
                    <p className="text-sm text-red-200/60 mt-1">{stat.label}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </ScrollableSection>
  )
}

// ============================================================================
// SKILLS CONTENT
// ============================================================================
function SkillsContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [castSpell, setCastSpell] = useState<string | null>(null)

  return (
    <ScrollableSection color="#946b2d" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.span className="absolute -left-14 top-1/2 -translate-y-1/2 text-5xl" animate={{ y: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>🦅</motion.span>
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#946b2d', textShadow: '0 0 40px rgba(148,107,45,0.5)' }}>SPELL BOOK</motion.h2>
            <motion.span className="absolute -right-14 top-1/2 -translate-y-1/2 text-5xl" animate={{ y: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>🦅</motion.span>
          </motion.div>
          <motion.p className="text-blue-300/70 italic mt-3 text-lg">Wit beyond measure is mans greatest treasure</motion.p>
        </motion.div>

        <AnimatePresence>{castSpell && (<motion.div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="text-4xl font-bold text-amber-400" style={{ textShadow: '0 0 30px #ffd700' }} initial={{ scale: 0, rotate: -180 }} animate={{ scale: [0, 1.5, 0], rotate: [0, 360] }} transition={{ duration: 1 }}>{castSpell}!</motion.div></motion.div>)}</AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skillsData).map(([category, data], catIndex) => (
            <motion.div key={category} className="relative p-5 rounded-xl overflow-hidden group cursor-pointer" style={{ background: `linear-gradient(135deg, ${data.color}25, rgba(5,10,20,0.95))`, border: `2px solid ${activeCategory === category ? data.color : `${data.color}40`}`, boxShadow: activeCategory === category ? `0 0 40px ${data.glow}` : 'none' }}
              initial={{ opacity: 0, y: 50, rotateY: -15 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ duration: 0.8, delay: catIndex * 0.1 }}
              onHoverStart={() => setActiveCategory(category)} onHoverEnd={() => setActiveCategory(null)} onClick={() => { setCastSpell(data.spell); setTimeout(() => setCastSpell(null), 1200) }} whileHover={{ scale: 1.03, y: -5 }}>
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ background: `linear-gradient(45deg, transparent 40%, ${data.color}30 50%, transparent 60%)` }} animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }} transition={{ duration: 2, repeat: Infinity }} />
              <div className="relative flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: `${data.color}40` }}>
                <motion.span className="text-3xl" animate={activeCategory === category ? { rotate: [0, 360], scale: [1, 1.3, 1] } : {}} transition={{ duration: 1 }}>{data.icon}</motion.span>
                <div><h3 className="text-base font-bold tracking-wider" style={{ color: data.color }}>{category}</h3><p className="text-xs text-white/40 italic">Cast: {data.spell}</p></div>
              </div>
              <div className="relative flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <motion.span key={skill} className="px-3 py-1.5 text-sm rounded-lg" style={{ background: `${data.color}20`, border: `1px solid ${data.color}40`, color: '#e0d5c0' }}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: catIndex * 0.1 + i * 0.03 }} whileHover={{ scale: 1.15, boxShadow: `0 0 15px ${data.glow}`, color: '#fff' }}>{skill}</motion.span>
                ))}
              </div>
              {activeCategory === category && (<motion.div className="absolute top-3 right-3" initial={{ scale: 0 }} animate={{ scale: 1 }}><motion.span className="text-xl" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>✨</motion.span></motion.div>)}
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <p className="text-blue-300/60"><motion.span className="text-3xl font-bold" style={{ color: '#946b2d' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>{Object.values(skillsData).reduce((acc, cat) => acc + cat.skills.length, 0)}</motion.span> spells mastered</p>
        </motion.div>
      </div>
    </ScrollableSection>
  )
}

// ============================================================================
// EXPERIENCE CONTENT
// ============================================================================
function ExperienceContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  const [activeExp, setActiveExp] = useState<number | null>(null)

  return (
    <ScrollableSection color="#2ed573" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.span className="absolute -left-14 top-1/2 -translate-y-1/2 text-5xl" animate={{ x: [0, 10, 0], rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🐍</motion.span>
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#aaaaaa', textShadow: '0 0 30px rgba(170,170,170,0.3)' }}>THE JOURNEY</motion.h2>
            <motion.span className="absolute -right-14 top-1/2 -translate-y-1/2 text-5xl" animate={{ x: [0, -10, 0], rotate: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>🐍</motion.span>
          </motion.div>
          <motion.p className="text-green-300/70 italic mt-3 text-lg">Those cunning folk use any means to achieve their ends</motion.p>
        </motion.div>

        <div className="relative">
          <motion.div className="absolute left-0 md:left-8 top-0 bottom-0 w-1" style={{ background: 'linear-gradient(to bottom, #2ed573, #1a472a, #aaaaaa, #1a472a, #2ed573)' }} initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 2, delay: 0.5 }} />
          <div className="space-y-10 pl-10 md:pl-20">
            {portfolioData.experience.map((exp, index) => (
              <motion.div key={`${exp.company}-${exp.role}`} className="relative" initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 + index * 0.4 }} onHoverStart={() => setActiveExp(index)} onHoverEnd={() => setActiveExp(null)}>
                <motion.div className="absolute -left-10 md:-left-12 top-8 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, #2ed573 0%, #1a472a 70%, #0a0f0a 100%)', boxShadow: '0 0 20px rgba(46,213,115,0.6)', border: '3px solid #aaaaaa' }}
                  animate={activeExp === index ? { scale: [1, 1.3, 1], boxShadow: ['0 0 20px rgba(46,213,115,0.6)', '0 0 50px rgba(46,213,115,1)', '0 0 20px rgba(46,213,115,0.6)'] } : {}} transition={{ duration: 1.5, repeat: activeExp === index ? Infinity : 0 }}>
                  <motion.span className="text-xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>{exp.icon}</motion.span>
                </motion.div>
                <motion.div className="p-6 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(26,71,42,0.4) 0%, rgba(10,25,20,0.95) 100%)', border: `2px solid ${activeExp === index ? '#2ed573' : 'rgba(26,71,42,0.5)'}` }} whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(46,213,115,0.3)' }}>
                  <motion.div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-30" style={{ background: 'linear-gradient(to top, rgba(46,213,115,0.3), transparent)' }} animate={{ opacity: activeExp === index ? [0.3, 0.5, 0.3] : 0.3 }} transition={{ duration: 2, repeat: Infinity }} />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div><motion.h3 className="text-xl font-bold" style={{ color: '#aaaaaa' }}>{exp.role}</motion.h3><p className="text-green-200/80">{exp.company}</p></div>
                      <div className="text-right mt-2 md:mt-0"><p className="text-green-300/80 text-sm">{exp.period}</p><p className="text-green-200/50 text-xs">{exp.location}</p></div>
                    </div>
                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <motion.li key={i} className="flex items-start gap-3 text-green-100/80 text-sm" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}>
                          <motion.span className="text-green-400 mt-0.5 shrink-0 text-lg" animate={activeExp === index ? { rotate: [0, 360], scale: [1, 1.3, 1] } : {}} transition={{ duration: 2, delay: i * 0.2 }}>✦</motion.span>
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScrollableSection>
  )
}

// ============================================================================
// PROJECTS CONTENT
// ============================================================================
function ProjectsContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [castSpell, setCastSpell] = useState<{ name: string; x: number; y: number } | null>(null)

  const handleProjectClick = (project: typeof portfolioData.projects[0], e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setCastSpell({ name: project.spell, x: rect.left + rect.width / 2, y: rect.top })
    setTimeout(() => { setCastSpell(null); window.open(project.github, '_blank') }, 1200)
  }

  return (
    <ScrollableSection color="#ecb939" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence>{castSpell && (<motion.div className="fixed pointer-events-none z-50" style={{ left: castSpell.x, top: castSpell.y }} initial={{ opacity: 1, scale: 0 }} animate={{ opacity: [1, 1, 0], scale: [0, 1.5, 2], y: -100 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}><span className="text-2xl font-bold text-amber-400 whitespace-nowrap" style={{ textShadow: '0 0 20px #ffd700' }}>{castSpell.name}!</span></motion.div>)}</AnimatePresence>

        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.span className="absolute -left-14 top-1/2 -translate-y-1/2 text-5xl" animate={{ rotate: [-10, 10, -10], y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>🦡</motion.span>
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#ecb939', textShadow: '0 0 40px rgba(236,185,57,0.5)' }}>MAGICAL CREATIONS</motion.h2>
            <motion.span className="absolute -right-14 top-1/2 -translate-y-1/2 text-5xl" animate={{ rotate: [10, -10, 10], y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>🦡</motion.span>
          </motion.div>
          <motion.p className="text-yellow-300/70 italic mt-3 text-lg">Those patient Hufflepuffs are true and unafraid of toil</motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, index) => (
            <motion.div key={project.name} className="relative p-5 rounded-2xl overflow-hidden group cursor-pointer" style={{ background: 'linear-gradient(135deg, rgba(60,55,35,0.4) 0%, rgba(15,12,8,0.98) 100%)', border: `2px solid ${hoveredProject === project.name ? project.color : 'rgba(236,185,57,0.25)'}` }}
              initial={{ opacity: 0, y: 60, rotateY: -20 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ duration: 0.8, delay: index * 0.12 }}
              onHoverStart={() => setHoveredProject(project.name)} onHoverEnd={() => setHoveredProject(null)} onClick={(e) => handleProjectClick(project, e)} whileHover={{ y: -12, scale: 1.03, boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 40px ${project.color}30` }}>
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}30, transparent 70%)` }} />
              {hoveredProject === project.name && [...Array(8)].map((_, i) => (<motion.div key={i} className="absolute w-2 h-2 rounded-full" style={{ background: project.color, left: `${15 + i * 10}%`, bottom: '10%' }} animate={{ y: [-10, -60], opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }} />))}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div className="text-4xl" animate={hoveredProject === project.name ? { rotate: [0, -15, 15, 0], scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.6 }}>{project.icon}</motion.div>
                  <motion.span className="text-xs px-3 py-1.5 rounded-full" style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>{project.type}</motion.span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                <motion.p className="text-sm italic mb-3" style={{ color: project.color }} animate={hoveredProject === project.name ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 1.5, repeat: Infinity }}>✨ {project.spell}</motion.p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (<motion.span key={tech} className="px-2.5 py-1 text-xs rounded-lg" style={{ background: `${project.color}15`, color: '#d0c5b0', border: `1px solid ${project.color}30` }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.05 }} whileHover={{ background: `${project.color}30`, scale: 1.1, color: '#fff' }}>{tech}</motion.span>))}
                </div>
                <motion.div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"><span className="text-xs" style={{ color: `${project.color}aa` }}>Cast Spell</span><motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1, repeat: Infinity }}>🪄</motion.span></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollableSection>
  )
}

// ============================================================================
// EDUCATION CONTENT
// ============================================================================
function EducationContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  return (
    <ScrollableSection color="#946b2d" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.span className="absolute -left-14 top-1/2 -translate-y-1/2 text-5xl" animate={{ rotateY: [0, 360] }} transition={{ duration: 4, repeat: Infinity }}>📚</motion.span>
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#946b2d', textShadow: '0 0 30px rgba(148,107,45,0.5)' }}>MAGICAL STUDIES</motion.h2>
            <motion.span className="absolute -right-14 top-1/2 -translate-y-1/2 text-5xl" animate={{ rotateY: [360, 0] }} transition={{ duration: 4, repeat: Infinity }}>📚</motion.span>
          </motion.div>
          <motion.p className="text-blue-300/70 italic mt-3 text-lg">Knowledge is the foundation of all magic</motion.p>
        </motion.div>

        <div className="space-y-8">
          {portfolioData.education.map((edu, index) => (
            <motion.div key={edu.school} className="relative p-8 rounded-2xl overflow-hidden group" style={{ background: 'linear-gradient(135deg, rgba(14,26,64,0.5) 0%, rgba(10,15,40,0.98) 100%)', border: '2px solid rgba(148,107,45,0.4)' }}
              initial={{ opacity: 0, y: 60, rotateX: -15 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1, delay: index * 0.3 }} whileHover={{ scale: 1.02, borderColor: '#946b2d', boxShadow: '0 0 50px rgba(148,107,45,0.3)' }}>
              <motion.div className="absolute top-2 right-4 text-2xl" animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}>📖</motion.div>
              <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(148,107,45,0.2) 0%, transparent 70%)' }} animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-start gap-5">
                  <motion.span className="text-5xl" animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, delay: index }}>{edu.icon}</motion.span>
                  <div><h3 className="text-2xl font-bold" style={{ color: '#946b2d', textShadow: '0 0 15px rgba(148,107,45,0.4)' }}>{edu.degree}</h3><p className="text-blue-200/80 text-lg mt-1">{edu.school}</p><p className="text-blue-300/50">{edu.location}</p></div>
                </div>
                <div className="text-right">
                  <p className="text-blue-300/80 text-lg">{edu.period}</p>
                  <motion.div className="mt-2" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}><span className="text-sm text-blue-300/60">N.E.W.T. Score</span><p className="text-4xl font-bold" style={{ color: '#946b2d', textShadow: '0 0 15px rgba(148,107,45,0.5)' }}>{edu.gpa}</p></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollableSection>
  )
}

// ============================================================================
// CONTACT CONTENT
// ============================================================================
function ContactContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  const [sendingOwl, setSendingOwl] = useState(false)

  const handleOwlSend = (href: string) => { setSendingOwl(true); setTimeout(() => { setSendingOwl(false); window.open(href, href.startsWith('mailto') ? '_self' : '_blank') }, 1500) }

  return (
    <ScrollableSection color="#ffd700" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <AnimatePresence>{sendingOwl && (<motion.div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"><motion.span className="text-6xl" initial={{ x: '-50vw', y: '50vh', rotate: -30 }} animate={{ x: '150vw', y: '-50vh', rotate: 30 }} transition={{ duration: 1.5, ease: 'easeInOut' }}>🦉</motion.span>{[...Array(10)].map((_, i) => (<motion.div key={i} className="absolute w-3 h-3 rounded-full bg-amber-400" initial={{ x: '-50vw', y: '50vh', opacity: 1 }} animate={{ x: `${-50 + i * 18}vw`, y: `${50 - i * 9}vh`, opacity: 0, scale: 0 }} transition={{ duration: 1.5, delay: i * 0.05 }} />))}</motion.div>)}</AnimatePresence>

        <motion.div className="mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-block relative">
            <motion.span className="absolute -left-16 top-1/2 -translate-y-1/2 text-5xl" animate={{ y: [0, -15, 0], x: [-5, 5, -5], rotate: [-10, 10, -10] }} transition={{ duration: 3, repeat: Infinity }}>🦉</motion.span>
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#ffd700', textShadow: '0 0 40px rgba(255,215,0,0.5)' }}>OWL POST</motion.h2>
            <motion.span className="absolute -right-16 top-1/2 -translate-y-1/2 text-5xl" animate={{ y: [0, -15, 0], x: [5, -5, 5], rotate: [10, -10, 10] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}>🦉</motion.span>
          </motion.div>
          <motion.p className="text-purple-300/70 italic mt-3 text-lg">Send your message through the magical network</motion.p>
        </motion.div>

        <motion.p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>Ready to collaborate on magical projects? Send an owl and lets create something extraordinary together.</motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-5 justify-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          {[{ icon: '📜', label: 'Parchment', subLabel: 'Email', href: `mailto:${portfolioData.social.email}`, color: '#ffd700' }, { icon: '🔮', label: 'Crystal Ball', subLabel: 'LinkedIn', href: portfolioData.social.linkedin, color: '#0077b5' }, { icon: '📖', label: 'Spell Book', subLabel: 'GitHub', href: portfolioData.social.github, color: '#a55eea' }].map((btn, i) => (
            <motion.button key={btn.label} className="px-8 py-5 rounded-xl relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, rgba(30,30,50,0.9) 0%, rgba(15,15,30,0.98) 100%)', border: `2px solid ${btn.color}40` }}
              onClick={() => handleOwlSend(btn.href)} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }} whileHover={{ scale: 1.08, borderColor: btn.color, boxShadow: `0 0 40px ${btn.color}40` }} whileTap={{ scale: 0.95 }}>
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(ellipse at 50% 100%, ${btn.color}30, transparent 70%)` }} />
              <div className="relative z-10 flex flex-col items-center"><motion.span className="text-4xl mb-2" animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>{btn.icon}</motion.span><span className="font-bold tracking-wider" style={{ color: btn.color }}>{btn.label}</span><span className="text-xs text-gray-500 mt-1">{btn.subLabel}</span></div>
            </motion.button>
          ))}
        </motion.div>

        <motion.p className="text-gray-500 mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>📍 {portfolioData.location}</motion.p>

        <motion.div className="mt-16 pt-8 border-t border-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
          <p className="text-gray-600 text-sm">© 2025 {portfolioData.name}. All rights reserved.</p>
          <motion.p className="text-gray-700 text-sm mt-3 italic" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 4, repeat: Infinity }}>Mischief Managed ⚡</motion.p>
        </motion.div>
      </div>
    </ScrollableSection>
  )
}