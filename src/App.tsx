import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, ArrowRight, Github, Instagram, Menu, X, Plus } from 'lucide-react'
import { profile, projects, type Project } from './config'

const ease = [0.22, 1, 0.36, 1] as const

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduce ? 0 : 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.tone}`}>
      <div className="visual-topline"><span>FIELD NOTE / {project.number}</span><span>{project.year}</span></div>
      {project.tone === 'lime' && <div className="visual-orbit"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="orbit-core">01</div><span className="orbit-label">BEGIN<br />ANYWHERE</span></div>}
      {project.tone === 'blue' && <div className="visual-type"><span>make</span><em>room</em><span>to think.</span><div className="type-line" /></div>}
      {project.tone === 'pink' && <div className="visual-shape-wrap"><div className="shape shape-a" /><div className="shape shape-b" /><div className="shape shape-c" /><span className="shape-caption">FORM STUDY — 003</span></div>}
      <div className="visual-bottom"><span>INDEPENDENT WORK</span><span>↗</span></div>
    </div>
  )
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"
            initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} transition={{ duration: 0.35, ease }}
            onMouseDown={(e) => e.stopPropagation()}>
            <div className="dialog-head"><span>PROJECT / {project.number}</span><button className="icon-button" onClick={onClose} aria-label="Close project details"><X size={19} /></button></div>
            <ProjectVisual project={project} />
            <div className="dialog-copy"><div><p className="eyebrow">{project.category} · {project.year}</p><h2 id="dialog-title">{project.title}</h2></div><p>{project.details}</p></div>
            <div className="tag-row">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
            {project.link && <a className="text-link" href={project.link} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={16} /></a>}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)
  const [scroll, setScroll] = useState(0)
  const [time, setTime] = useState('')
  const reduce = useReducedMotion()

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? window.scrollY / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()))
    update()
    const id = window.setInterval(update, 30000)
    return () => window.clearInterval(id)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const nav = [{ label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Interests', href: '#interests' }, { label: 'Contact', href: '#contact' }]

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${scroll})` }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top"><span className="brand-mark">Y.</span><span>{profile.name}</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <div className="header-right"><span className="header-time">{time || '—'} <i>LOCAL</i></span><a className="header-cta" href={`mailto:${profile.email}`}>Let’s talk <ArrowUpRight size={14} /></a></div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <AnimatePresence>
        {menuOpen && <motion.nav className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} aria-label="Mobile navigation">
          {nav.map((item, i) => <motion.a key={item.href} href={item.href} onClick={closeMenu} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>{item.label}<ArrowUpRight size={18} /></motion.a>)}
        </motion.nav>}
      </AnimatePresence>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-meta"><span><i className="status-dot" /> {profile.availability}</span><span>PERSONAL SPACE — 2026</span></div>
          <div className="hero-main">
            <motion.div className="hero-copy" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.25 } } }}>
              <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>A DIGITAL SPACE BY {profile.name}</motion.p>
              <h1>{profile.headline.map((line, i) => <motion.span key={line} variants={{ hidden: { opacity: 0, y: 70, rotate: 2 }, show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.95, ease } }}>{line}{i === 0 && <br />}</motion.span>)}</h1>
              <motion.p className="hero-intro" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}>{profile.intro}</motion.p>
              <motion.a className="round-link" href="#about" aria-label="Scroll to about section" variants={{ hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } }}><ArrowDown size={19} /></motion.a>
            </motion.div>
            <motion.div className="hero-art" initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: 5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.4, delay: reduce ? 0 : 0.35, ease }}>
              <div className="art-grid" /><div className="art-sun" /><div className="art-arc arc-a" /><div className="art-arc arc-b" /><div className="art-orbit-dot" />
              <span className="art-index">FIG. 001<br />FORM & SPACE</span><span className="art-coordinate">31° 13' N<br />121° 28' E</span>
              <div className="art-caption"><span>IDEAS IN MOTION</span><span>EST. 2026</span></div>
            </motion.div>
          </div>
          <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span className="hero-foot-line" /><span>01 / 05</span></div>
        </section>

        <section className="about section-shell section-pad" id="about">
          <div className="section-heading"><span className="eyebrow">01 — A LITTLE ABOUT ME</span><span className="section-aside">THE PERSON BEHIND THE PIXELS</span></div>
          <div className="about-grid">
            <Reveal className="about-statement"><h2>Curiosity is<br />a <em>way of life.</em></h2><div className="about-stamp">ALWAYS<br />BECOMING <Plus size={17} /></div></Reveal>
            <Reveal delay={0.12} className="about-copy"><p className="about-lead">{profile.about[0]}</p>{profile.about.slice(1).map((p) => <p key={p}>{p}</p>)}<div className="about-location"><span className="eyebrow">CURRENTLY BASED</span><span>{profile.location}</span></div></Reveal>
          </div>
        </section>

        <section className="projects-section section-pad" id="projects">
          <div className="section-shell">
            <div className="section-heading"><span className="eyebrow">02 — SELECTED WORK</span><span className="section-aside">A FEW THINGS I’VE MADE / {projects.length.toString().padStart(2, '0')}</span></div>
            <div className="projects-intro"><h2>Made with<br /><em>intention.</em></h2><p>A collection of experiments, ideas, and work in progress. Each one is a small step toward something better.</p></div>
            <div className="project-list">
              {projects.map((project) => <button className="project-row" key={project.number} onClick={() => setSelected(project)}>
                <div className="project-number">{project.number}</div><div className="project-main"><span className="eyebrow">{project.category} · {project.year}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>
                <div className="project-thumb"><ProjectVisual project={project} /></div><span className="project-arrow"><ArrowUpRight size={20} /></span>
              </button>)}
            </div>
          </div>
        </section>

        <section className="interests section-shell section-pad" id="interests">
          <div className="section-heading"><span className="eyebrow">03 — CURIOSITY INDEX</span><span className="section-aside">ALWAYS A STUDENT</span></div>
          <div className="interest-layout"><h2>Things I’m<br /><em>drawn to.</em></h2><div className="interest-list">
            {[
              ['01', 'Technology & the web', 'Understanding how digital things are built.'],
              ['02', 'Design & visual culture', 'Noticing the details that make experiences feel right.'],
              ['03', 'Language & communication', 'Learning to connect across places and perspectives.'],
              ['04', 'Travel & new places', 'Finding inspiration beyond the familiar.'],
            ].map(([n, title, desc]) => <Reveal key={n} className="interest-item"><span className="interest-no">{n}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={17} /></Reveal>)}
          </div></div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-shell contact-inner">
            <div className="section-heading"><span className="eyebrow">04 — WHAT’S NEXT?</span><span className="section-aside">THE GOOD THINGS START WITH A HELLO</span></div>
            <Reveal className="contact-main"><p className="eyebrow">HAVE AN IDEA, A QUESTION, OR JUST WANT TO SAY HI?</p><h2>Let’s make<br /><em>something matter.</em></h2><a className="contact-button" href={`mailto:${profile.email}`}>Get in touch <ArrowUpRight size={18} /></a></Reveal>
            <div className="contact-bottom"><div><span className="eyebrow">EMAIL</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div><div><span className="eyebrow">ELSEWHERE</span><div className="social-links">{profile.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}<ArrowUpRight size={13} /></a>)}</div></div><div><span className="eyebrow">BASED IN</span><span>{profile.location}</span></div></div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell"><a className="brand" href="#top"><span className="brand-mark">Y.</span><span>{profile.name}</span></a><span>DESIGNED & BUILT WITH CURIOSITY.</span><a href="#top" className="back-top">BACK TO TOP ↑</a><span>© 2026</span></footer>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  )
}