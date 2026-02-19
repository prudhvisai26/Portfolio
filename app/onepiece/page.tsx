'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================================
// SEEDED RANDOM FOR DETERMINISTIC VALUES
// ============================================================================
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// ============================================================================
// ONE PIECE CONFIGURATION
// ============================================================================
const OP_CONFIG = {
  particles: { waves: 60, bubbles: 40, sparkles: 50 },
  transitions: { duration: 1800 },
}

// ============================================================================
// SKILLS DATA - One Piece Theme
// ============================================================================
const skillsData = {
  'Navigation Arts': {
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'TypeScript'],
    icon: '🧭', color: '#00bfff', glow: 'rgba(0,191,255,0.6)', power: 'Chart any course',
  },
  'Treasure Vaults': {
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite'],
    icon: '💎', color: '#ffd700', glow: 'rgba(255,215,0,0.6)', power: 'Store the riches',
  },
  'Sky Islands': {
    skills: ['S3', 'DynamoDB', 'Lambda', 'CloudWatch', 'EC2', 'ECS', 'EKS', 'RDS', 'IAM'],
    icon: '☁️', color: '#87ceeb', glow: 'rgba(135,206,235,0.6)', power: 'Cloud mastery',
  },
  'Devil Fruits': {
    skills: ['scikit-learn', 'NLTK', 'TensorFlow', 'Keras', 'NLP', 'ML', 'LLM', 'llama.cpp'],
    icon: '🍎', color: '#ff6b6b', glow: 'rgba(255,107,107,0.6)', power: 'Supernatural powers',
  },
  'Ship Mechanics': {
    skills: ['FastAPI', 'Flask', 'Spring Boot', 'REST APIs', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'GitHub Actions', 'Jira'],
    icon: '⚙️', color: '#10b981', glow: 'rgba(16,185,129,0.6)', power: 'Keep the ship running',
  },
  'Observation Haki': {
    skills: ['OpenTelemetry', 'ELK Stack', 'Kibana', 'JUnit', 'Mockito', 'Logging', 'Metrics', 'Alerting'],
    icon: '👁️', color: '#a855f7', glow: 'rgba(168,85,247,0.6)', power: 'See the unseen',
  },
}

// ============================================================================
// PORTFOLIO DATA
// ============================================================================
const portfolioData = {
  name: "Prudhvi Sai Raj Dasari",
  pirateTitle: "Captain of Code",
  bounty: "∞ Belly",
  email: "dasariprudhvisai26@gmail.com",
  location: "San Jose, California",
  
  about: `A fearless navigator of the digital seas, charting courses through the most treacherous codebases with the determination of the Straw Hat crew. Like Luffy pursuing the One Piece, I chase the dream of building legendary applications. Currently advancing my skills at the Grand Line Academy (San José State University) while recruiting nakama for epic adventures. Experienced in sailing through low-latency backend storms, optimizing distributed fleet systems, and implementing observation haki for system monitoring.`,
  
  stats: [
    { value: '2+', label: 'Years at Sea', icon: '⚓', color: '#00bfff' },
    { value: '10+', label: 'Voyages Complete', icon: '🗺️', color: '#ffd700' },
    { value: '3.5', label: 'Captain Rating', icon: '⭐', color: '#ff6b6b' },
    { value: '30+', label: 'Techniques Learned', icon: '💪', color: '#10b981' },
  ],
  
  experience: [
    {
      company: 'Accolite Digital', role: 'Senior Navigator', period: 'Jun 2022 – Jan 2024',
      location: 'Bangalore, India', icon: '🏴‍☠️', crew: 'Grand Fleet',
      highlights: [
        'Led expeditions to develop production-grade treasure management systems using Node.js, Express, MongoDB',
        'Charted incentive calculation routes with 30% improved accuracy in reward distribution',
        'Designed storm-proof backend APIs reducing latency by 20% during peak waves',
        'Deployed containerized ships across AWS waters with full CI/CD navigation',
      ],
    },
    {
      company: 'Accolite Digital', role: 'Cabin Boy Developer', period: 'Jan 2022 – Jun 2022',
      location: 'Hyderabad, India', icon: '⚓', crew: 'Training Fleet',
      highlights: [
        'Trained under senior navigators in Spring Boot and React combat',
        'Practiced defensive coding through rigorous JUnit trials',
        'Learned MySQL treasure optimization techniques',
        'Assisted in cloud deployments across the digital seas',
      ],
    },
  ],
  
  projects: [
    { name: 'Mind Clash', description: 'Battle arena where pirates duel with wits - real-time multiplayer combat',
      tech: ['React', 'Python', 'SQLite', 'Three.js', 'Django', 'Socket.IO'],
      icon: '⚔️', github: 'https://github.com/CS161-Software-Project/MindClash',
      type: 'Grand Line', bounty: '50M', color: '#ff6b6b' },
    { name: 'AI Scrum Master', description: 'Intelligent first mate for project navigation using ML',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'React', 'NLP'],
      icon: '🤖', github: 'https://github.com/prudhvisai26',
      type: 'Grand Line', bounty: '40M', color: '#a855f7' },
    { name: 'IntentFlow', description: 'Translator using Mistral for understanding crew commands',
      tech: ['FastAPI', 'Python', 'LLM', 'llama.cpp', 'NLP'],
      icon: '🗣️', github: 'https://github.com/Shivankthakur/IntentFlow',
      type: 'Grand Line', bounty: '35M', color: '#00bfff' },
    { name: 'ShortUrl Service', description: 'Portal doors for URLs - enter long, exit short',
      tech: ['Node.js', 'Express', 'Sequelize', 'SQLite'],
      icon: '🚪', github: 'https://github.com/prudhvisai26/ShortUrl',
      type: 'East Blue', bounty: '15M', color: '#10b981' },
    { name: 'Blog Application', description: 'Captain\'s log with authentication and crew updates',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      icon: '📖', github: 'https://github.com/prudhvisai26/BlogApp',
      type: 'East Blue', bounty: '12M', color: '#feca57' },
    { name: 'Weather Oracle', description: 'Nami-approved weather prediction for safe voyages',
      tech: ['JavaScript', 'REST API', 'CSS', 'HTML'],
      icon: '🌊', github: 'https://github.com/prudhvisai26/Weather-App',
      type: 'East Blue', bounty: '10M', color: '#87ceeb' },
    { name: 'This Portfolio', description: 'The Thousand Sunny of personal websites',
      tech: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
      icon: '🚢', github: 'https://github.com/prudhvisai26',
      type: 'New World', bounty: '∞', color: '#ffd700' },
  ],
  
  education: [
    { degree: 'M.S. Computer Science', school: 'San José State University', period: '2024 - 2026', gpa: '3.5', location: 'San Jose, CA', icon: '🎓', title: 'Grand Line Academy' },
    { degree: 'B.Tech Computer Science', school: 'MLR Institute of Technology', period: '2018 - 2022', gpa: '8.61', location: 'Hyderabad, India', icon: '📚', title: 'East Blue Institute' },
  ],
  
  social: { github: 'https://github.com/prudhvisai26', linkedin: 'https://linkedin.com/in/prudhvisai26', email: 'dasariprudhvisai26@gmail.com' },
}

// ============================================================================
// SECTIONS CONFIG - One Piece Seas
// ============================================================================
const sections = [
  { id: 'hero', name: 'Wanted', sea: 'GRAND LINE', color: '#ffd700', accent: '#ff6b6b', motto: 'The King of Pirates!' },
  { id: 'about', name: 'Captain', sea: 'EAST BLUE', color: '#00bfff', accent: '#87ceeb', motto: 'I will be the Pirate King!' },
  { id: 'skills', name: 'Abilities', sea: 'PARADISE', color: '#10b981', accent: '#2ed573', motto: 'Gear Second!' },
  { id: 'experience', name: 'Voyages', sea: 'NEW WORLD', color: '#ff6b6b', accent: '#ffd700', motto: 'Adventure awaits!' },
  { id: 'projects', name: 'Treasures', sea: 'LAUGH TALE', color: '#ffd700', accent: '#ffffff', motto: 'The One Piece is real!' },
  { id: 'education', name: 'Training', sea: 'ACADEMY', color: '#a855f7', accent: '#d4a5ff', motto: 'Study the seas!' },
  { id: 'contact', name: 'Den Den', sea: 'COMMS', color: '#ff69b4', accent: '#ffb6c1', motto: 'Purupurupuru!' },
]

// ============================================================================
// PARTICLE GENERATION
// ============================================================================
const generateParticles = (count: number, config: { xRange?: [number, number]; yRange?: [number, number]; sizeRange?: [number, number]; durationRange?: [number, number] } = {}, seedOffset: number = 0) => {
  const { xRange = [0, 100], yRange = [0, 100], sizeRange = [1, 3], durationRange = [2, 5] } = config
  return Array.from({ length: count }, (_, i) => {
    const seed = i + seedOffset
    return { id: i, x: xRange[0] + seededRandom(seed * 1) * (xRange[1] - xRange[0]), y: yRange[0] + seededRandom(seed * 2) * (yRange[1] - yRange[0]), size: sizeRange[0] + seededRandom(seed * 3) * (sizeRange[1] - sizeRange[0]), duration: durationRange[0] + seededRandom(seed * 4) * (durationRange[1] - durationRange[0]), delay: seededRandom(seed * 5) * 5, seed: seededRandom(seed * 6) }
  })
}

// ============================================================================
// LOG POSE CURSOR - One Piece Theme! 🧭
// ============================================================================
function LogPoseCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number; type: 'bubble' | 'sparkle' }>>([])
  const [isClicking, setIsClicking] = useState(false)
  const [needleAngle, setNeedleAngle] = useState(0)
  const trailId = useRef(0)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Update needle angle based on movement direction
      if (distance > 2) {
        const angle = Math.atan2(dy, dx) * 180 / Math.PI
        setNeedleAngle(angle + 90)
      }
      
      if (distance > 5) {
        lastPos.current = { x: e.clientX, y: e.clientY }
        
        const newTrails: Array<{ id: number; x: number; y: number; type: 'bubble' | 'sparkle' }> = []
        
        // Bubbles
        for (let i = 0; i < 2; i++) {
          if (seededRandom(trailId.current + i) > 0.3) {
            newTrails.push({
              id: trailId.current++,
              x: e.clientX + (seededRandom(trailId.current) - 0.5) * 20,
              y: e.clientY + (seededRandom(trailId.current + 50) - 0.5) * 20,
              type: 'bubble',
            })
          }
        }
        
        // Sparkles occasionally
        if (seededRandom(trailId.current) > 0.7) {
          newTrails.push({
            id: trailId.current++,
            x: e.clientX + (seededRandom(trailId.current + 100) - 0.5) * 15,
            y: e.clientY + (seededRandom(trailId.current + 150) - 0.5) * 15,
            type: 'sparkle',
          })
        }
        
        setTrails(prev => [...prev.slice(-35), ...newTrails])
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-9999">
      <style>{`* { cursor: none !important; }`}</style>
      
      {/* Trail particles */}
      {trails.map((trail) => (
        trail.type === 'bubble' ? (
          <motion.div
            key={trail.id}
            className="absolute rounded-full"
            style={{
              left: trail.x,
              top: trail.y,
              width: 6 + seededRandom(trail.id) * 8,
              height: 6 + seededRandom(trail.id) * 8,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(135,206,235,0.4), transparent)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
            initial={{ opacity: 0.8, scale: 0.5, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              y: -40 - seededRandom(trail.id) * 30,
              x: (seededRandom(trail.id + 200) - 0.5) * 20,
            }}
            transition={{ duration: 1 + seededRandom(trail.id) * 0.5, ease: 'easeOut' }}
          />
        ) : (
          <motion.div
            key={trail.id}
            className="absolute"
            style={{ left: trail.x, top: trail.y }}
            initial={{ opacity: 1, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              rotate: 360,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <svg width="16" height="16" viewBox="-8 -8 16 16">
              <path d="M0,-6 L1,-1 L6,0 L1,1 L0,6 L-1,1 L-6,0 L-1,-1 Z" fill="#ffd700" />
            </svg>
          </motion.div>
        )
      ))}

      {/* Main Log Pose Compass */}
      <motion.div
        className="absolute"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-25px, -25px)',
        }}
        animate={{
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50">
          <defs>
            {/* Glass gradient */}
            <radialGradient id="glassGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="50%" stopColor="rgba(135,206,235,0.3)" />
              <stop offset="100%" stopColor="rgba(0,100,150,0.4)" />
            </radialGradient>
            
            {/* Gold ring gradient */}
            <linearGradient id="goldRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="30%" stopColor="#ffed4a" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="70%" stopColor="#b8860b" />
              <stop offset="100%" stopColor="#ffd700" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="compassGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer gold ring */}
          <circle cx="25" cy="25" r="24" fill="none" stroke="url(#goldRingGradient)" strokeWidth="3" />
          
          {/* Inner gold ring */}
          <circle cx="25" cy="25" r="20" fill="none" stroke="#b8860b" strokeWidth="1" />
          
          {/* Glass dome */}
          <circle cx="25" cy="25" r="19" fill="url(#glassGradient)" />
          
          {/* Compass markings */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1={25 + 15 * Math.cos((angle - 90) * Math.PI / 180)}
              y1={25 + 15 * Math.sin((angle - 90) * Math.PI / 180)}
              x2={25 + 18 * Math.cos((angle - 90) * Math.PI / 180)}
              y2={25 + 18 * Math.sin((angle - 90) * Math.PI / 180)}
              stroke={i % 2 === 0 ? '#ffd700' : '#b8860b'}
              strokeWidth={i % 2 === 0 ? '2' : '1'}
            />
          ))}
          
          {/* Needle */}
          <motion.g
            animate={{ rotate: needleAngle }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            style={{ transformOrigin: '25px 25px' }}
          >
            {/* North (red) */}
            <path d="M25,10 L28,25 L25,22 L22,25 Z" fill="#ff4444" filter="url(#compassGlow)" />
            {/* South (white) */}
            <path d="M25,40 L28,25 L25,28 L22,25 Z" fill="#ffffff" />
          </motion.g>
          
          {/* Center jewel */}
          <circle cx="25" cy="25" r="4" fill="#ffd700" />
          <circle cx="25" cy="25" r="2" fill="#ffed4a" />
          <circle cx="24" cy="24" r="1" fill="#ffffff" opacity="0.8" />
          
          {/* Glass shine */}
          <ellipse cx="20" cy="18" rx="6" ry="3" fill="rgba(255,255,255,0.4)" transform="rotate(-30 20 18)" />
        </svg>

        {/* Click effect - compass pulse */}
        <AnimatePresence>
          {isClicking && (
            <>
              {/* Expanding rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-cyan-400"
                  style={{
                    left: 25,
                    top: 25,
                    width: 0,
                    height: 0,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ width: 0, height: 0, opacity: 0.8 }}
                  animate={{ width: 80 + i * 20, height: 80 + i * 20, opacity: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              ))}
              
              {/* Directional indicators */}
              {['N', 'E', 'S', 'W'].map((dir, i) => (
                <motion.span
                  key={dir}
                  className="absolute text-xs font-bold text-cyan-300"
                  style={{
                    left: 25 + [0, 40, 0, -40][i],
                    top: 25 + [-40, 0, 40, 0][i],
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  {dir}
                </motion.span>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ocean glow around cursor */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: position.x - 60,
          top: position.y - 60,
          width: 120,
          height: 120,
          background: 'radial-gradient(circle, rgba(0,191,255,0.15) 0%, rgba(135,206,235,0.08) 40%, transparent 70%)',
        }}
        animate={{
          scale: isClicking ? [1, 1.4, 1] : [1, 1.1, 1],
          opacity: isClicking ? [0.5, 0.8, 0.5] : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: isClicking ? 0.3 : 2, repeat: Infinity }}
      />
    </div>
  )
}

// ============================================================================
// OCEAN WAVES EFFECT
// ============================================================================
function OceanWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none z-10">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: `linear-gradient(to top, rgba(0,100,150,${0.3 - i * 0.1}), transparent)`,
            borderRadius: '50% 50% 0 0 / 20% 20% 0 0',
          }}
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  )
}

// ============================================================================
// FLOATING BUBBLES
// ============================================================================
function FloatingBubbles() {
  const bubbles = useMemo(() => generateParticles(OP_CONFIG.particles.bubbles, { sizeRange: [4, 15], durationRange: [4, 8] }, 5000), [])
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            bottom: '-10%',
            width: bubble.size,
            height: bubble.size,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(135,206,235,0.3), transparent)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, (bubble.seed - 0.5) * 50, 0],
            opacity: [0, 0.8, 0.6, 0],
            scale: [0.5, 1, 1.2, 0.8],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
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
      <div ref={scrollRef} onWheel={handleWheel} className="overflow-y-auto overflow-x-hidden max-h-[85vh] w-full op-scroll" style={{ scrollbarWidth: 'thin', scrollbarColor: `${color}50 transparent` }}>
        <style>{`.op-scroll::-webkit-scrollbar{width:8px}.op-scroll::-webkit-scrollbar-track{background:rgba(0,50,100,0.3);border-radius:4px}.op-scroll::-webkit-scrollbar-thumb{background:linear-gradient(180deg,${color}90,${color}50);border-radius:4px;box-shadow:0 0 10px ${color}60}`}</style>
        {children}
      </div>
      <AnimatePresence>
        {canScrollUp && (<motion.div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-20" style={{ background: 'linear-gradient(to bottom, rgba(0,30,60,0.8), transparent)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute top-3 left-1/2 -translate-x-1/2" animate={{ y: [0, -6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><span className="text-xl">🔼</span></motion.div>
        </motion.div>)}
      </AnimatePresence>
      <AnimatePresence>
        {canScrollDown && (<motion.div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-20" style={{ background: 'linear-gradient(to top, rgba(0,30,60,0.8), transparent)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <motion.span className="text-xs mb-1 tracking-widest" style={{ color: `${color}aa` }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>SAIL ON</motion.span>
            <motion.span className="text-xl">⚓</motion.span>
          </motion.div>
        </motion.div>)}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function OnePiecePortfolio() {
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
    const timers = [setTimeout(() => setHeroStage(1), 500), setTimeout(() => setHeroStage(2), 1500), setTimeout(() => setHeroStage(3), 2500), setTimeout(() => setHeroStage(4), 3500), setTimeout(() => setHeroStage(5), 6500), setTimeout(() => setHeroStage(6), 8000)]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (heroStage >= 4 && lettersRevealed < fullName.length) { const timer = setTimeout(() => setLettersRevealed(p => p + 1), 60); return () => clearTimeout(timer) }
  }, [heroStage, lettersRevealed, fullName.length])

  const transitionToSection = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= sections.length || isTransitioning) return
    setDirection(newIndex > currentSection ? 'forward' : 'backward'); setIsTransitioning(true); setTransitionProgress(0)
    const duration = OP_CONFIG.transitions.duration; const startTime = Date.now()
    const animate = () => { const elapsed = Date.now() - startTime; const progress = Math.min(elapsed / duration, 1); setTransitionProgress(1 - Math.pow(1 - progress, 3)); if (progress < 1) requestAnimationFrame(animate); else { setCurrentSection(newIndex); setIsTransitioning(false); setTransitionProgress(0) } }
    requestAnimationFrame(animate)
  }, [currentSection, isTransitioning])

  const handleWheel = useCallback((e: WheelEvent) => {
    const now = Date.now(); if (now - lastScrollTime.current < 2000 || isTransitioning) return
    const target = e.target as HTMLElement; if (target.closest('.op-scroll')) return; e.preventDefault()
    if (e.deltaY > 30 && currentSection < sections.length - 1) { lastScrollTime.current = now; transitionToSection(currentSection + 1) }
    else if (e.deltaY < -30 && currentSection > 0) { lastScrollTime.current = now; transitionToSection(currentSection - 1) }
  }, [currentSection, isTransitioning, transitionToSection])

  const goToPrevSection = useCallback(() => { const now = Date.now(); if (now - lastScrollTime.current < 1000 || isTransitioning || currentSection <= 0) return; lastScrollTime.current = now; transitionToSection(currentSection - 1) }, [currentSection, isTransitioning, transitionToSection])
  const goToNextSection = useCallback(() => { const now = Date.now(); if (now - lastScrollTime.current < 1000 || isTransitioning || currentSection >= sections.length - 1) return; lastScrollTime.current = now; transitionToSection(currentSection + 1) }, [currentSection, isTransitioning, transitionToSection])

  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY }
  const handleTouchEnd = (e: React.TouchEvent) => { const diff = touchStartY.current - e.changedTouches[0].clientY; if (Math.abs(diff) > 50) { if (diff > 0) goToNextSection(); else goToPrevSection() } }

  useEffect(() => { const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goToNextSection() } else if (e.key === 'ArrowUp') { e.preventDefault(); goToPrevSection() } }; window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown) }, [goToNextSection, goToPrevSection])
  useEffect(() => { const container = containerRef.current; if (container) { container.addEventListener('wheel', handleWheel, { passive: false }); return () => container.removeEventListener('wheel', handleWheel) } }, [handleWheel])

  const current = sections[currentSection]; const next = sections[currentSection + 1]; const prev = sections[currentSection - 1]
  const backgrounds: Record<string, string> = {
    hero: 'linear-gradient(180deg, #0a1628 0%, #001830 50%, #002040 100%)',
    about: 'linear-gradient(180deg, #001525 0%, #002a4a 50%, #001830 100%)',
    skills: 'linear-gradient(180deg, #001a20 0%, #002530 50%, #001a25 100%)',
    experience: 'linear-gradient(180deg, #1a0a0a 0%, #2a1515 50%, #150808 100%)',
    projects: 'linear-gradient(180deg, #1a1505 0%, #2a2510 50%, #151005 100%)',
    education: 'linear-gradient(180deg, #150a20 0%, #251535 50%, #100815 100%)',
    contact: 'linear-gradient(180deg, #1a0a15 0%, #2a1525 50%, #150810 100%)',
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ perspective: '1500px' }}>
      {/* LOG POSE CURSOR */}
      <LogPoseCursor />
      
      <motion.div className="absolute inset-0" animate={{ background: backgrounds[current.id] }} transition={{ duration: 1.5 }} />
      <OceanWaves />
      <FloatingBubbles />

      {/* 3D Transition */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: `translateZ(${isTransitioning ? (direction === 'forward' ? transitionProgress * 1200 : -transitionProgress * 1200) : 0}px)` }}>
        {prev && direction === 'backward' && isTransitioning && (<motion.div className="absolute inset-0" style={{ transform: 'translateZ(1200px) scale(2.5)', opacity: transitionProgress, pointerEvents: 'none', background: backgrounds[prev.id] }} />)}
        <div className="absolute inset-0" style={{ transform: isTransitioning ? direction === 'forward' ? `translateZ(${transitionProgress * 1200}px) scale(${1 + transitionProgress * 0.8})` : `translateZ(${-transitionProgress * 1200}px) scale(${1 - transitionProgress * 0.4})` : 'translateZ(0) scale(1)', opacity: isTransitioning ? 1 - transitionProgress * 0.6 : 1 }}>
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
        {next && direction === 'forward' && (<motion.div className="absolute inset-0" style={{ transform: `translateZ(${-1500 + (isTransitioning ? transitionProgress * 1500 : 0)}px) scale(${0.2 + (isTransitioning ? transitionProgress * 0.8 : 0)})`, opacity: isTransitioning ? 0.2 + transitionProgress * 0.8 : 0.2, pointerEvents: 'none', background: backgrounds[next.id] }}>
          <div className="absolute inset-0 flex items-center justify-center"><div className="text-center"><motion.p className="text-lg tracking-widest mb-2" style={{ color: next.color }}>{next.sea}</motion.p><p className="text-3xl font-bold" style={{ color: next.accent }}>{next.name}</p></div></div>
        </motion.div>)}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-30" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,20,40,0.6) 60%, rgba(0,10,20,0.9) 100%)' }} />

      {/* Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {sections.map((section, i) => (
          <motion.button key={section.id} onClick={() => !isTransitioning && transitionToSection(i)} className="group flex items-center gap-3" disabled={isTransitioning} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <span className="text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0" style={{ color: currentSection === i ? section.color : 'rgba(255,255,255,0.4)' }}>{section.name}</span>
            <motion.div className="relative w-4 h-4 rounded-full" style={{ background: currentSection === i ? `radial-gradient(circle, ${section.color}, ${section.color}80)` : 'transparent', border: `2px solid ${currentSection === i ? section.color : 'rgba(255,255,255,0.3)'}`, boxShadow: currentSection === i ? `0 0 15px ${section.color}` : 'none' }}
              animate={currentSection === i ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 1.5, repeat: Infinity }} />
          </motion.button>
        ))}
      </div>

      {/* Sea Banner */}
      <motion.div className="fixed top-6 right-6 text-right z-50" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} key={current.sea}>
        <motion.p className="text-lg font-bold tracking-[0.2em]" style={{ color: current.color, textShadow: `0 0 20px ${current.color}` }}>{current.sea}</motion.p>
        <motion.p className="text-xs text-white/50 italic">{current.motto}</motion.p>
      </motion.div>

      {/* Section Counter */}
      <div className="fixed bottom-6 left-6 z-50"><p className="text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}><motion.span style={{ color: current.color }}>{String(currentSection + 1).padStart(2, '0')}</motion.span><span className="mx-2">⚓</span><span>{String(sections.length).padStart(2, '0')}</span></p></div>

      {/* Scroll Hint */}
      <AnimatePresence>
        {currentSection === 0 && heroStage >= 6 && !isTransitioning && (
          <motion.div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <motion.p className="text-sm tracking-[0.2em] text-cyan-400/60 mb-4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>SET SAIL!</motion.p>
            <motion.div className="text-3xl" animate={{ y: [0, 10, 0], rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>🚢</motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition wave effect */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div className="absolute inset-0 z-40 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.4, 0] }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} style={{ background: `radial-gradient(ellipse at 50% ${direction === 'forward' ? '100%' : '0%'}, ${(direction === 'forward' ? next?.color : prev?.color) || '#00bfff'}60, transparent 70%)` }} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// HERO CONTENT - Wanted Poster Style
// ============================================================================
function HeroContent({ stage, lettersRevealed, fullName }: { stage: number; lettersRevealed: number; fullName: string }) {
  return (
    <div className="text-center px-6 relative">
      {/* Wanted Poster Frame */}
      <motion.div className="relative inline-block p-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #f5e6c8 0%, #e8d5a8 50%, #d4c495 100%)', boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.1)' }}
        initial={{ opacity: 0, scale: 0.5, rotateX: -30 }} animate={{ opacity: stage >= 1 ? 1 : 0, scale: stage >= 1 ? 1 : 0.5, rotateX: stage >= 1 ? 0 : -30 }} transition={{ duration: 1.5, type: 'spring' }}>
        
        {/* Worn edges effect */}
        <div className="absolute inset-0 rounded-lg" style={{ background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.05\'/%3E%3C/svg%3E")', mixBlendMode: 'multiply', opacity: 0.3 }} />
        
        {/* WANTED header */}
        <motion.h3 className="text-2xl md:text-3xl font-black tracking-[0.3em] mb-2" style={{ color: '#8b0000', fontFamily: 'serif' }} initial={{ y: -30, opacity: 0 }} animate={{ y: stage >= 2 ? 0 : -30, opacity: stage >= 2 ? 1 : 0 }}>WANTED</motion.h3>
        
        <motion.div className="h-1 w-full mb-4" style={{ background: 'linear-gradient(90deg, transparent, #8b0000, transparent)' }} initial={{ scaleX: 0 }} animate={{ scaleX: stage >= 2 ? 1 : 0 }} transition={{ duration: 0.8 }} />
        
        {/* Dead or Alive */}
        <motion.p className="text-sm tracking-[0.5em] mb-4" style={{ color: '#4a3520' }} initial={{ opacity: 0 }} animate={{ opacity: stage >= 3 ? 1 : 0 }}>DEAD OR ALIVE</motion.p>
        
        {/* Name */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wider mb-4" style={{ color: '#1a1a1a' }}>
          {fullName.split('').map((letter, i) => (
            <motion.span key={i} className="inline-block" initial={{ opacity: 0, y: 30, scale: 0 }} animate={{ opacity: i < lettersRevealed ? 1 : 0, y: i < lettersRevealed ? 0 : 30, scale: i < lettersRevealed ? 1 : 0 }}
              transition={{ duration: 0.3 }} style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}>{letter === ' ' ? '\u00A0' : letter}</motion.span>
          ))}
        </h1>
        
        {/* Title */}
        <motion.p className="text-lg md:text-xl tracking-[0.2em] mb-4" style={{ color: '#4a3520' }} initial={{ opacity: 0 }} animate={{ opacity: stage >= 5 ? 1 : 0 }}>{portfolioData.pirateTitle}</motion.p>
        
        {/* Bounty */}
        <motion.div className="mt-4 pt-4 border-t-2" style={{ borderColor: '#8b0000' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: stage >= 6 ? 1 : 0, y: stage >= 6 ? 0 : 20 }}>
          <p className="text-sm tracking-[0.3em]" style={{ color: '#4a3520' }}>BOUNTY</p>
          <motion.p className="text-3xl md:text-4xl font-black" style={{ color: '#8b0000' }} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>{portfolioData.bounty}</motion.p>
        </motion.div>
        
        {/* Skull and crossbones decoration */}
        <motion.span className="absolute -top-4 -left-4 text-4xl" animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 3, repeat: Infinity }}>☠️</motion.span>
        <motion.span className="absolute -top-4 -right-4 text-4xl" animate={{ rotate: [10, -10, 10] }} transition={{ duration: 3, repeat: Infinity }}>☠️</motion.span>
      </motion.div>
    </div>
  )
}

// ============================================================================
// ABOUT CONTENT
// ============================================================================
function AboutContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  return (
    <ScrollableSection color="#00bfff" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div className="inline-block relative">
            <motion.span className="absolute -left-14 top-1/2 -translate-y-1/2 text-5xl" animate={{ x: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>🏴‍☠️</motion.span>
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#87ceeb', textShadow: '0 0 30px rgba(135,206,235,0.5)' }}>THE CAPTAIN</motion.h2>
            <motion.span className="absolute -right-14 top-1/2 -translate-y-1/2 text-5xl" animate={{ x: [5, -5, 5] }} transition={{ duration: 2, repeat: Infinity }}>🏴‍☠️</motion.span>
          </motion.div>
          <motion.p className="text-cyan-300/70 italic mt-3 text-lg">I will be the Pirate King!</motion.p>
        </motion.div>

        <motion.div className="relative p-8 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,50,100,0.4) 0%, rgba(0,30,60,0.9) 100%)', border: '2px solid rgba(135,206,235,0.3)' }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <motion.p className="text-lg md:text-xl text-cyan-100/90 leading-relaxed">{portfolioData.about}</motion.p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
            {portfolioData.stats.map((stat, index) => (
              <motion.div key={stat.label} className="text-center p-5 rounded-xl" style={{ background: 'linear-gradient(180deg, rgba(0,100,150,0.3) 0%, rgba(0,50,100,0.2) 100%)', border: '2px solid rgba(135,206,235,0.3)' }}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }} whileHover={{ scale: 1.05, borderColor: stat.color }}>
                <motion.span className="text-3xl block mb-2" animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}>{stat.icon}</motion.span>
                <motion.p className="text-4xl font-bold" style={{ color: stat.color }}>{stat.value}</motion.p>
                <p className="text-sm text-cyan-200/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
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

  return (
    <ScrollableSection color="#10b981" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#2ed573', textShadow: '0 0 30px rgba(46,213,115,0.5)' }}>DEVIL FRUIT POWERS</motion.h2>
          <motion.p className="text-emerald-300/70 italic mt-3 text-lg">Gear Second!</motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skillsData).map(([category, data], catIndex) => (
            <motion.div key={category} className="relative p-5 rounded-xl overflow-hidden group cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${data.color}20, rgba(0,30,30,0.9))`, border: `2px solid ${activeCategory === category ? data.color : `${data.color}40`}`, boxShadow: activeCategory === category ? `0 0 30px ${data.glow}` : 'none' }}
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: catIndex * 0.1 }}
              onHoverStart={() => setActiveCategory(category)} onHoverEnd={() => setActiveCategory(null)} whileHover={{ scale: 1.02, y: -5 }}>
              <div className="relative flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: `${data.color}40` }}>
                <motion.span className="text-3xl" animate={activeCategory === category ? { rotate: 360, scale: 1.3 } : {}} transition={{ duration: 0.5 }}>{data.icon}</motion.span>
                <div><h3 className="text-base font-bold tracking-wider" style={{ color: data.color }}>{category}</h3><p className="text-xs text-white/40 italic">{data.power}</p></div>
              </div>
              <div className="relative flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <motion.span key={skill} className="px-3 py-1.5 text-sm rounded-lg" style={{ background: `${data.color}20`, border: `1px solid ${data.color}40`, color: '#e0e5e0' }}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: catIndex * 0.1 + i * 0.03 }} whileHover={{ scale: 1.1, boxShadow: `0 0 10px ${data.glow}` }}>{skill}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollableSection>
  )
}

// ============================================================================
// EXPERIENCE CONTENT
// ============================================================================
function ExperienceContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  return (
    <ScrollableSection color="#ff6b6b" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#ffd700', textShadow: '0 0 30px rgba(255,215,0,0.5)' }}>VOYAGE LOG</motion.h2>
          <motion.p className="text-red-300/70 italic mt-3 text-lg">Adventure awaits!</motion.p>
        </motion.div>

        <div className="relative">
          <motion.div className="absolute left-0 md:left-8 top-0 bottom-0 w-1" style={{ background: 'linear-gradient(to bottom, #ff6b6b, #ffd700, #ff6b6b)' }} initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 2 }} />
          <div className="space-y-10 pl-10 md:pl-20">
            {portfolioData.experience.map((exp, index) => (
              <motion.div key={index} className="relative" initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.3 }}>
                <motion.div className="absolute -left-10 md:-left-12 top-8 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ffd700)', boxShadow: '0 0 20px rgba(255,107,107,0.5)' }}
                  animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}><span className="text-xl">{exp.icon}</span></motion.div>
                <motion.div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(50,20,20,0.6) 0%, rgba(30,10,10,0.9) 100%)', border: '2px solid rgba(255,107,107,0.4)' }} whileHover={{ scale: 1.02, borderColor: '#ffd700' }}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div><h3 className="text-xl font-bold text-red-300">{exp.role}</h3><p className="text-yellow-200/80 flex items-center gap-2">🏴‍☠️ {exp.company} - {exp.crew}</p></div>
                    <div className="text-right mt-2 md:mt-0"><p className="text-red-300/80 text-sm">{exp.period}</p><p className="text-red-200/50 text-xs">{exp.location}</p></div>
                  </div>
                  <ul className="space-y-3">
                    {exp.highlights.map((h, i) => (<li key={i} className="flex items-start gap-3 text-red-100/80 text-sm"><motion.span className="text-yellow-400 mt-0.5 shrink-0" animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}>⚓</motion.span><span>{h}</span></li>))}
                  </ul>
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

  return (
    <ScrollableSection color="#ffd700" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#ffd700', textShadow: '0 0 40px rgba(255,215,0,0.5)' }}>TREASURE MAP</motion.h2>
          <motion.p className="text-yellow-300/70 italic mt-3 text-lg">The One Piece is real!</motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, index) => (
            <motion.a key={project.name} href={project.github} target="_blank" rel="noopener noreferrer"
              className="relative p-5 rounded-2xl overflow-hidden group cursor-pointer block"
              style={{ background: 'linear-gradient(135deg, rgba(50,40,20,0.5) 0%, rgba(20,15,5,0.95) 100%)', border: `2px solid ${hoveredProject === project.name ? project.color : 'rgba(255,215,0,0.25)'}` }}
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.name)} onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -10, scale: 1.02, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${project.color}30` }}>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div className="text-4xl" animate={hoveredProject === project.name ? { rotate: [0, -15, 15, 0], scale: 1.2 } : {}} transition={{ duration: 0.5 }}>{project.icon}</motion.div>
                  <div className="text-right"><motion.span className="text-xs px-3 py-1.5 rounded-full inline-block" style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>{project.type}</motion.span>
                  <p className="text-xs mt-1 text-yellow-400/60">💰 {project.bounty} Belly</p></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (<motion.span key={tech} className="px-2.5 py-1 text-xs rounded-lg" style={{ background: `${project.color}15`, color: '#d0c5a0', border: `1px solid ${project.color}30` }} whileHover={{ background: `${project.color}30`, scale: 1.1 }}>{tech}</motion.span>))}
                </div>
                <motion.div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"><span className="text-xs text-yellow-400/60">View Treasure</span><motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1, repeat: Infinity }}>🗺️</motion.span></motion.div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </ScrollableSection>
  )
}


// EDUCATION CONTENT

function EducationContent({ onAtTop, onAtBottom }: { onAtTop: () => void; onAtBottom: () => void }) {
  return (
    <ScrollableSection color="#a855f7" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#d4a5ff', textShadow: '0 0 30px rgba(168,85,247,0.5)' }}>TRAINING GROUNDS</motion.h2>
          <motion.p className="text-purple-300/70 italic mt-3 text-lg">Study the seas!</motion.p>
        </motion.div>

        <div className="space-y-8">
          {portfolioData.education.map((edu, index) => (
            <motion.div key={edu.school} className="relative p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(50,20,70,0.5) 0%, rgba(20,10,30,0.95) 100%)', border: '2px solid rgba(168,85,247,0.4)' }}
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.3 }} whileHover={{ scale: 1.02, borderColor: '#a855f7' }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-start gap-5">
                  <motion.span className="text-5xl" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>{edu.icon}</motion.span>
                  <div><p className="text-sm text-purple-300/60">{edu.title}</p><h3 className="text-2xl font-bold text-purple-200">{edu.degree}</h3><p className="text-purple-300/80 text-lg mt-1">{edu.school}</p><p className="text-purple-400/50">{edu.location}</p></div>
                </div>
                <div className="text-right"><p className="text-purple-300/80 text-lg">{edu.period}</p><motion.div className="mt-2" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}><span className="text-sm text-purple-300/60">Captain Rating</span><p className="text-4xl font-bold" style={{ color: '#a855f7' }}>{edu.gpa}</p></motion.div></div>
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
  const [calling, setCalling] = useState(false)

  const handleCall = (href: string) => { setCalling(true); setTimeout(() => { setCalling(false); window.open(href, href.startsWith('mailto') ? '_self' : '_blank') }, 1500) }

  return (
    <ScrollableSection color="#ff69b4" onAtTop={onAtTop} onAtBottom={onAtBottom}>
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <AnimatePresence>{calling && (<motion.div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="text-8xl" animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.3, repeat: 5 }}>🐌</motion.div><motion.p className="absolute mt-32 text-2xl text-pink-400 font-bold" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.5, repeat: 3 }}>Purupurupuru!</motion.p></motion.div>)}</AnimatePresence>

        <motion.div className="mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div className="inline-block relative">
            <motion.span className="absolute -left-16 top-1/2 -translate-y-1/2 text-5xl" animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>🐌</motion.span>
            <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#ffb6c1', textShadow: '0 0 30px rgba(255,182,193,0.5)' }}>DEN DEN MUSHI</motion.h2>
            <motion.span className="absolute -right-16 top-1/2 -translate-y-1/2 text-5xl" animate={{ scale: [1.1, 1, 1.1], rotate: [5, -5, 5] }} transition={{ duration: 2, repeat: Infinity }}>🐌</motion.span>
          </motion.div>
          <motion.p className="text-pink-300/70 italic mt-3 text-lg">Purupurupuru! Calling all nakama!</motion.p>
        </motion.div>

        <motion.p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Ready to join the crew? Pick up your Den Den Mushi and lets sail together!</motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-5 justify-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          {[{ icon: '📧', label: 'Sea Mail', subLabel: 'Email', href: `mailto:${portfolioData.social.email}`, color: '#ff69b4' }, { icon: '🔗', label: 'Alliance', subLabel: 'LinkedIn', href: portfolioData.social.linkedin, color: '#00bfff' }, { icon: '🐙', label: 'Crew Log', subLabel: 'GitHub', href: portfolioData.social.github, color: '#a855f7' }].map((btn, i) => (
            <motion.button key={btn.label} className="px-8 py-5 rounded-xl relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, rgba(50,20,40,0.9) 0%, rgba(20,10,15,0.98) 100%)', border: `2px solid ${btn.color}40` }}
              onClick={() => handleCall(btn.href)} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.15 }} whileHover={{ scale: 1.08, borderColor: btn.color, boxShadow: `0 0 30px ${btn.color}40` }} whileTap={{ scale: 0.95 }}>
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(ellipse at 50% 100%, ${btn.color}30, transparent 70%)` }} />
              <div className="relative z-10 flex flex-col items-center"><motion.span className="text-4xl mb-2" animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>{btn.icon}</motion.span><span className="font-bold tracking-wider" style={{ color: btn.color }}>{btn.label}</span><span className="text-xs text-gray-500 mt-1">{btn.subLabel}</span></div>
            </motion.button>
          ))}
        </motion.div>

        <motion.p className="text-gray-500 mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>📍 {portfolioData.location}</motion.p>

        <motion.div className="mt-16 pt-8 border-t border-gray-800" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <p className="text-gray-600 text-sm">© 2025 {portfolioData.name}. All rights reserved.</p>
          <motion.p className="text-gray-700 text-sm mt-3 italic" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 4, repeat: Infinity }}>The voyage to become the Pirate King continues! 🏴‍☠️</motion.p>
        </motion.div>
      </div>
    </ScrollableSection>
  )
}