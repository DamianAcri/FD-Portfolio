'use client'

import { useEffect, useState, useRef } from 'react'

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

const projects = [
  {
    id: 'project-1',
    title: 'Distributed Task Queue System',
    summary:
      'High-throughput workers orchestrating over 10k jobs per minute with proactive retry logic, observability, and autoscaling.',
    client: 'Internal Platform',
    scope: 'Backend Infrastructure',
    stack: 'Go / Redis / Docker',
    year: '2025',
    mediaClass: 'project-card__media--queue',
  },
  {
    id: 'project-2',
    title: 'Real-time Analytics Pipeline',
    summary:
      'Event-driven ingestion processing 2M+ signals daily with streaming transformations and sub-second drilldowns for analysts.',
    client: 'Insights Squad',
    scope: 'Data Engineering',
    stack: 'Python / Kafka / PostgreSQL',
    year: '2024',
    mediaClass: 'project-card__media--analytics',
  },
  {
    id: 'project-3',
    title: 'API Gateway with Rate Limiting',
    summary:
      'Unified entrypoint with adaptive rate limiting, auth, and service discovery powering customer-facing APIs with 99.99% uptime.',
    client: 'Product APIs',
    scope: 'Platform Services',
    stack: 'Node.js / Express / MongoDB',
    year: '2024',
    mediaClass: 'project-card__media--gateway',
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
  const [showCta, setShowCta] = useState(true)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setClock(makeClock())
    const id = window.setInterval(() => setClock(makeClock()), 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!heroRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show CTA only if hero is more than 85% visible
        setShowCta(entry.intersectionRatio > 0.85)
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 1] }
    )

    observer.observe(heroRef.current)

    return () => observer.disconnect()
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

      <section className="hero" id="home" ref={heroRef}>
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
        <a
          href="#projects"
          className={`hero__cta ${!showCta ? 'hero__cta--hidden' : ''}`}
        >
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

      <section className="projects" id="projects">
        <div className="projects__header">
          <span className="projects__eyebrow">Selected Work</span>
          <h2 className="projects__title">Projects</h2>
          <p className="projects__subtitle">
            Systems and products crafted with the same care and precision you see in the hero: robust, intentional, and production ready.
          </p>
        </div>
        <div className="projects__grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-card__media-wrapper">
                <div
                  className={`project-card__media ${project.mediaClass}`}
                  aria-hidden="true"
                />
                <span className="project-card__badge">{project.year}</span>
              </div>
              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__summary">{project.summary}</p>
                <div className="project-card__footer">
                  <span>{project.client}</span>
                  <span className="project-card__divider" aria-hidden="true" />
                  <span>{project.scope}</span>
                </div>
                <span className="project-card__stack">{project.stack}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
