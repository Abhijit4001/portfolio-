'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial, OrbitControls, Sparkles } from '@react-three/drei'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Mail, MapPin, Menu, X, Download, ExternalLink, Code2, BrainCircuit, Database, Terminal, Layers3, Send, Sparkles as SparklesIcon } from 'lucide-react'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const profile = {
  name: 'Abhijit Singh',
  role: 'AI / ML Engineer',
  email: 'abhijitdarpan2004@gmail.com',
  phone: '+91 9485004900',
  linkedin: 'https://linkedin.com/in/abhijit-singh-9665b7210',
  github: 'https://github.com/Abhijit4001',
}

const skills = {
  Languages: ['Python', 'C', 'C++'],
  Frameworks: ['FastAPI', 'Streamlit'],
  Libraries: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
  'ML & Data': ['Data Preprocessing', 'EDA', 'Feature Engineering', 'Regression', 'Classification', 'NLP', 'Model Evaluation'],
  Databases: ['MySQL', 'MongoDB'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Kaggle', 'APIs'],
}

const projects = [
  { number: '01', name: 'SmartHire', label: 'AI RESUME ANALYSIS', description: 'An AI-powered career intelligence platform that parses resumes, extracts skills, and turns job matching into a personalized insight engine.', stack: 'Python · Node.js · Scikit-learn · NLP · Pandas', color: 'violet', href: 'https://github.com/Abhijit4001' },
  { number: '02', name: 'Feed Generator', label: 'GENERATIVE AI', description: 'A content generation tool that transforms prompts into polished social posts through LLMs, prompt engineering, and customizable templates.', stack: 'Python · Streamlit · Generative AI · OpenAI API', color: 'cyan', href: 'https://github.com/Abhijit4001' },
  { number: '03', name: 'Agri-Rent', label: 'FULL-STACK PLATFORM', description: 'A rental marketplace connecting farmers with equipment owners through listings, bookings, validation, and reliable rental tracking.', stack: 'Python · FastAPI · Streamlit · MongoDB · Pydantic', color: 'pink', href: 'https://github.com/Abhijit4001' },
]

function Orb() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.18
    ref.current.rotation.y = state.clock.elapsedTime * 0.24
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.45, 0.03)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.3, 0.03)
  })
  return <mesh ref={ref} scale={2.15}><icosahedronGeometry args={[1, 32]} /><MeshDistortMaterial color="#7c3aed" roughness={0.12} metalness={0.72} distort={0.42} speed={2.1} emissive="#32106b" emissiveIntensity={0.7} /></mesh>
}

function Scene() {
  return <Canvas camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
    <Suspense fallback={null}><ambientLight intensity={0.3} /><pointLight position={[4, 4, 4]} intensity={9} color="#c084fc" /><pointLight position={[-4, -2, 3]} intensity={7} color="#22d3ee" /><Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}><Orb /></Float><Sparkles count={100} scale={12} size={1.2} speed={0.4} color="#c4b5fd" /><Environment preset="night" /></Suspense>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
  </Canvas>
}

function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-100); const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 400, damping: 35 }); const sy = useSpring(y, { stiffness: 400, damping: 35 })
  useEffect(() => { const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setEnabled(true) }; window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move) }, [x, y])
  return <motion.div aria-hidden="true" className={`pointer-events-none fixed left-0 top-0 z-[100] hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/80 mix-blend-screen lg:block ${enabled ? 'opacity-100' : 'opacity-0'}`} style={{ x: sx, y: sy }} />
}

function SectionLabel({ index, children }: { index: string; children: string }) { return <div className="mb-10 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.28em] text-cyan-300"><span className="font-mono text-white/30">{index}</span><span className="h-px w-10 bg-cyan-300/50" />{children}</div> }

export default function Page() {
  const [loaded, setLoaded] = useState(false); const [progress, setProgress] = useState(0); const [menu, setMenu] = useState(false); const [sent, setSent] = useState(false)
  useEffect(() => { const id = setInterval(() => setProgress((p) => { if (p >= 100) { clearInterval(id); setTimeout(() => setLoaded(true), 500); return 100 } return p + 4 }), 35); return () => clearInterval(id) }, [])
  return <div className="portfolio-shell min-h-screen overflow-hidden bg-[#050510] text-white selection:bg-fuchsia-400 selection:text-black">
    {!loaded && <motion.div initial={{ opacity: 1 }} animate={{ opacity: loaded ? 0 : 1 }} className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#050510]"><div className="mb-5 font-mono text-xs uppercase tracking-[0.4em] text-white/40">Loading experience</div><div className="font-display text-7xl font-bold tracking-[-0.08em] text-white">{progress}<span className="text-fuchsia-400">%</span></div><div className="mt-7 h-px w-48 overflow-hidden bg-white/10"><motion.div className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ width: `${progress}%` }} /></div></motion.div>}
    <Cursor />
    <div className="fixed left-0 top-0 z-50 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500" style={{ width: '42%' }} />
    <header className="fixed left-1/2 top-5 z-40 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-[#0b0b19]/70 px-4 py-3 backdrop-blur-xl md:px-6"><a href="#top" className="font-display text-sm font-bold tracking-tight">AS<span className="text-cyan-300">.</span></a><nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.2em] text-white/55 md:flex">{['About', 'Work', 'Journey', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-white">{item}</a>)}</nav><button aria-label="Toggle navigation" onClick={() => setMenu(!menu)} className="rounded-full p-2 text-white/70 hover:bg-white/10 md:hidden">{menu ? <X /> : <Menu />}</button><a href={`mailto:${profile.email}`} className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-black transition-transform hover:scale-105 md:flex">Let&apos;s talk <ArrowUpRight size={14} /></a></header>
    {menu && <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-[#080817] text-3xl font-bold"><button className="absolute right-6 top-6" onClick={() => setMenu(false)}><X /></button>{['About', 'Work', 'Journey', 'Contact'].map((item) => <a key={item} onClick={() => setMenu(false)} href={`#${item.toLowerCase()}`}>{item}</a>)}</div>}
    <main id="top">
      <section className="relative flex min-h-screen items-center px-6 pb-16 pt-32 md:px-12 lg:px-20"><div className="absolute inset-0 opacity-80"><Scene /></div><div className="hero-grid absolute inset-0 opacity-30" /><div className="relative z-10 mx-auto w-full max-w-6xl"><div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-cyan-200/70"><span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_18px_#67e8f9]" /> Available for AI/ML opportunities</div><motion.h1 initial="hidden" animate={loaded ? 'show' : 'hidden'} variants={{ show: { transition: { staggerChildren: 0.07 } } }} className="font-display max-w-5xl text-[clamp(4.5rem,15vw,12rem)] font-bold leading-[0.8] tracking-[-0.09em]"><span className="block">ABHIJIT</span><span className="block pl-[8vw] text-gradient">SINGH<span className="text-fuchsia-400">.</span></span></motion.h1><div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"><p className="max-w-md text-base leading-relaxed text-white/55 md:text-lg">Building practical intelligence with <span className="text-white">Python, data, and imagination.</span> Computer Science graduate turning messy problems into scalable AI solutions.</p><div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/40"><span className="font-mono text-cyan-300">01</span><span className="h-px w-12 bg-white/20" /> Scroll to explore</div></div></div><div className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-bounce text-white/40"><ArrowDown size={20} /></div></section>
      <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40"><SectionLabel index="01">The person behind the models</SectionLabel><div className="grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-end"><div><h2 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.06em] md:text-8xl">Curious by<br /><span className="text-gradient">default.</span></h2><p className="mt-10 max-w-xl text-lg leading-relaxed text-white/55">I&apos;m Abhijit, a Computer Science and Engineering graduate focused on the space where thoughtful software meets machine learning. From preprocessing raw data to shipping API-driven products, I enjoy making complex systems feel useful, clear, and human.</p></div><div className="glass-panel relative overflow-hidden rounded-3xl p-7"><div className="absolute -right-12 -top-12 size-36 rounded-full bg-fuchsia-500/20 blur-3xl" /><div className="mb-12 flex items-center justify-between"><div className="font-mono text-xs text-white/35">PROFILE / 2026</div><BrainCircuit className="text-cyan-300" /></div><div className="grid grid-cols-2 gap-8"><div><div className="font-display text-4xl font-bold">8.68</div><div className="mt-2 text-xs uppercase tracking-widest text-white/35">GPA / 10</div></div><div><div className="font-display text-4xl font-bold">03</div><div className="mt-2 text-xs uppercase tracking-widest text-white/35">AI projects</div></div><div><div className="font-display text-4xl font-bold">02</div><div className="mt-2 text-xs uppercase tracking-widest text-white/35">Internships</div></div><div><div className="font-display text-4xl font-bold">20+</div><div className="mt-2 text-xs uppercase tracking-widest text-white/35">Core skills</div></div></div></div></div></section>
      <section id="skills" className="border-y border-white/5 bg-white/[0.015] px-6 py-28 md:px-12 md:py-36"><div className="mx-auto max-w-6xl"><SectionLabel index="02">The toolkit</SectionLabel><div className="mb-16 flex flex-col justify-between gap-7 md:flex-row md:items-end"><h2 className="font-display max-w-xl text-5xl font-bold leading-none tracking-[-0.06em] md:text-7xl">I speak fluent<br /><span className="text-cyan-300">machine.</span></h2><p className="max-w-xs text-sm leading-relaxed text-white/40">A practical stack for taking ideas from raw data to real-world interfaces.</p></div><div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">{Object.entries(skills).map(([category, list], i) => <div key={category} className="bg-[#080817] p-6 transition-colors hover:bg-[#0d0d24] md:p-8"><div className="mb-8 flex items-center justify-between"><span className="text-xs uppercase tracking-[0.2em] text-white/40">{category}</span><span className="font-mono text-xs text-fuchsia-400">0{i + 1}</span></div><div className="flex flex-wrap gap-2">{list.map((skill) => <span key={skill} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70">{skill}</span>)}</div></div>)}</div></div></section>
      <section id="work" className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40"><SectionLabel index="03">Selected experiments</SectionLabel><div className="mb-16 flex items-end justify-between"><h2 className="font-display text-5xl font-bold leading-none tracking-[-0.06em] md:text-8xl">Built to<br /><span className="text-gradient">matter.</span></h2><span className="hidden font-mono text-xs text-white/30 md:block">2024 — 2026</span></div><div className="flex flex-col gap-5">{projects.map((project) => <motion.a whileHover={{ y: -5 }} href={project.href} target="_blank" rel="noreferrer" key={project.name} className={`project-card group relative overflow-hidden rounded-3xl border border-white/10 p-7 md:p-10 ${project.color}`}><div className="relative z-10 grid gap-8 md:grid-cols-[0.16fr_0.52fr_0.32fr] md:items-end"><div className="font-mono text-sm text-white/35">{project.number}</div><div><div className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/45">{project.label}</div><h3 className="font-display text-4xl font-bold tracking-[-0.05em] md:text-6xl">{project.name}</h3><p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">{project.description}</p></div><div className="md:text-right"><div className="mb-7 text-xs leading-relaxed text-white/40">{project.stack}</div><span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">View project <ArrowUpRight size={15} /></span></div></div><div className="orb-bg absolute -right-12 -top-24 size-72 rounded-full blur-3xl" /></motion.a>)}</div></section>
      <section id="journey" className="border-y border-white/5 bg-[#070714] px-6 py-28 md:px-12 md:py-36"><div className="mx-auto max-w-6xl"><SectionLabel index="04">The journey so far</SectionLabel><div className="grid gap-14 md:grid-cols-[0.7fr_1.3fr]"><h2 className="font-display text-5xl font-bold leading-none tracking-[-0.06em] md:text-7xl">Learning.<br />Leading.<br /><span className="text-cyan-300">Shipping.</span></h2><div className="relative border-l border-white/10 pl-7 md:pl-12">{[['Sep 2026 — Present', 'AI Intern · CDAC Mohali', 'Working on government projects involving AI technologies, Python-based solutions, data processing, and automation.'], ['Jan 2026 — Jun 2026', 'AI/ML Trainee · ASB Academy', 'Training across Machine Learning, Deep Learning, NLP, Computer Vision, and Generative AI while building deployable applications.'], ['Jun 2026', 'B.Tech · I.K. Gujral Punjab Technical University', 'Computer Science and Engineering · GPA 8.68 / 10']].map(([date, title, desc]) => <div key={title} className="relative mb-12 last:mb-0"><span className="absolute -left-[2.05rem] top-1 size-3 rounded-full border-2 border-cyan-300 bg-[#070714] shadow-[0_0_16px_#67e8f9] md:-left-[3.05rem]" /><div className="font-mono text-xs text-fuchsia-300">{date}</div><h3 className="mt-3 font-display text-2xl font-bold">{title}</h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-white/45">{desc}</p></div>)}</div></div></div></section>
      <section id="contact" className="relative overflow-hidden px-6 py-32 md:px-12 md:py-48"><div className="absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[120px]" /><div className="relative z-10 mx-auto max-w-6xl"><SectionLabel index="05">Open channel</SectionLabel><div className="flex flex-col justify-between gap-14 md:flex-row md:items-end"><div><h2 className="font-display max-w-4xl text-6xl font-bold leading-[0.85] tracking-[-0.08em] md:text-9xl">Let&apos;s make<br /><span className="text-gradient">something real.</span></h2><div className="mt-10 flex flex-wrap gap-3"><a href={`mailto:${profile.email}`} className="pill-link"><Mail size={15} /> {profile.email}</a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="pill-link"><ArrowUpRight size={15} /> LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer" className="pill-link"><ArrowUpRight size={15} /> GitHub</a></div></div><div className="max-w-xs text-sm leading-relaxed text-white/40 md:pb-2"><MapPin size={18} className="mb-5 text-cyan-300" />Based in Mohali, India.<br />Currently open to entry-level AI/ML opportunities.</div></div><div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between"><a href={`mailto:${profile.email}`} onClick={() => setSent(true)} className="inline-flex items-center gap-3 text-lg font-medium transition-colors hover:text-cyan-300">{sent ? 'Message window opened' : 'Start a conversation'} <Send size={18} /></a><a href="/resume.pdf" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-white"><Download size={15} /> Download resume</a></div></div></section>
    </main>
    <footer className="flex flex-col justify-between gap-3 border-t border-white/10 px-6 py-8 text-[10px] uppercase tracking-[0.2em] text-white/30 md:flex-row md:px-12"><span>© 2026 Abhijit Singh</span><span>Designed with data & curiosity</span><span>AI / ML · Python · India</span></footer>
  </div>
}

// keep these imports used by the client bundle in a future contact form iteration
void [Code2, Database, Terminal, Layers3, SparklesIcon, ExternalLink]

const _unused = [motion]
void _unused
