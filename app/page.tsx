'use client'

import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'TECH', href: '#tech' },
  { label: 'CONTACT', href: '#contact' },
]

const heroCopy = {
  prefix: 'Engineering',
  text: ' student from ',
  highlight: 'Palma',
  rest: ' building production-ready applications. ',
  highlight2: 'Full-stack development',
  rest2: ' with attention to detail.'
}

const tiles = [
  {
    id: 'tile-1',
    title: 'For the Struggle',
    subtitle: 'Visualizing a Bold, New Direction for a Nonprofit Combatting Social Injustice in Charlotte',
    tag: 'IDENTITY',
  },
  {
    id: 'tile-2',
    title: 'Amplify',
    subtitle: 'Harnessing Social Media Behaviors to Redefine the Landscape of Digital Activism',
    tag: 'UI/UX',
  },
]

type ClockState = {
  label: string
  iso: string
}

function makeClock(): ClockState {
  const now = new Date()
  return {
    label: new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/Chicago',
    }).format(now),
    iso: now.toISOString(),
  }
}

export default function Home() {
  const [clock, setClock] = useState<ClockState | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    setClock(makeClock())
    const id = window.setInterval(() => setClock(makeClock()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseLeave = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setShowTooltip(false)
      setIsLeaving(false)
    }, 200)
  }

  return (
    <main className="frame">
      <header className="frame__top">
        <span className="frame__brand">DAMIAN ACRI</span>
        <nav className="frame__nav" aria-label="principal">
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} className="frame__nav-link">
              {label}
            </a>
          ))}
        </nav>
        <div className="frame__meta">
          <span>Chicago, IL</span>
          {clock ? (
            <time dateTime={clock.iso}>{clock.label}</time>
          ) : (
            <span className="frame__time-placeholder">--:--:--</span>
          )}
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero__content">
          <h1 className="hero__headline">
            <span className="hero__glow">{heroCopy.prefix}</span>
            {heroCopy.text}
            <span
              className="hero__highlight"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              {heroCopy.highlight}
            </span>
            {heroCopy.rest}
            <span className="hero__dotted">{heroCopy.highlight2}</span>
            {heroCopy.rest2}
          </h1>
          <p className="hero__subtext">
            Computer Engineering student at UIB specializing in full-stack development and data engineering. I build complete products from scratch handling infrastructure, APIs, data pipelines, and user interfaces. Currently seeking summer 2026 internship opportunities.
          </p>
        </div>
        <a href="#projects" className="hero__cta">
          SEE PROJECTS ↓
        </a>
        {showTooltip && (
          <div
            className={`cursor-tooltip ${isLeaving ? 'leaving' : ''}`}
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
            }}
          />
        )}
      </section>

      <section className="grid" id="projects">
        {tiles.map(({ id, title, subtitle, tag }, index) => (
          <article key={id} className={`grid__item grid__item--${index + 1}`}>
            <div className="grid__item-media" aria-hidden="true" />
            <footer className="grid__item-footer">
              <span className="grid__item-tag">{tag}</span>
              <h2 className="grid__item-title">{title}</h2>
              <p className="grid__item-subtitle">{subtitle}</p>
            </footer>
          </article>
        ))}
      </section>
    </main>
  )
}
