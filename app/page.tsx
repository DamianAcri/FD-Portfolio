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

const techStack = [
  {
    id: 'backend',
    title: 'Backend Systems',
    summary:
      'Concurrency, data modeling, and orchestration to keep products fast and resilient.',
    focus: 'APIs - Distributed Systems',
    tokens: ['Go', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'gRPC', 'GraphQL', 'Kafka'],
  },
  {
    id: 'frontend',
    title: 'Product Interfaces',
    summary:
      'Design systems, animation, and accessible interfaces that translate technical rigor into clarity.',
    focus: 'UI Engineering - Motion',
    tokens: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Storybook', 'Zustand'],
  },
  {
    id: 'data',
    title: 'Data & Observability',
    summary:
      'Streaming pipelines, analytics, and telemetry that surface the right signals.',
    focus: 'Telemetry - Analytics',
    tokens: ['Python', 'Airflow', 'dbt', 'BigQuery', 'Grafana', 'Prometheus', 'Superset'],
  },
  {
    id: 'ops',
    title: 'Cloud & Ops',
    summary:
      'Infrastructure-as-code and automation to deploy confidently and iterate quickly.',
    focus: 'DevOps - Reliability',
    tokens: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Pulumi', 'Fly.io'],
  },
]

const experience = [
  {
    id: 'exp-1',
    company: 'Lambda Systems',
    role: 'Platform Engineer',
    period: '2024 - Now',
    note: 'Distributed task orchestration and platform observability.',
  },
  {
    id: 'exp-2',
    company: 'Orbit Analytics',
    role: 'Full-stack Developer',
    period: '2022 - 2024',
    note: 'Real-time analytics dashboards and growth experiments.',
  },
  {
    id: 'exp-3',
    company: 'Freelance',
    role: 'Product Engineer',
    period: '2020 - 2022',
    note: 'End-to-end product shipping for early-stage teams.',
  },
]

const education = [
  {
    id: 'edu-1',
    company: 'Universitat de les Illes Balears',
    role: 'B.S. Computer Engineering',
    period: '2021 - Present',
    note: 'Focus on distributed systems, data pipelines, and applied AI.',
  },
  {
    id: 'edu-2',
    company: 'University of Illinois Chicago',
    role: 'Exchange - Engineering',
    period: 'Fall 2024',
    note: 'Advanced databases, cloud infrastructure, and product studios.',
  },
  {
    id: 'edu-3',
    company: 'Google Cloud / Coursera',
    role: 'Professional Certificate - Data Engineering',
    period: '2023',
    note: 'Architecting pipelines with BigQuery, Dataflow, Terraform.',
  },
]

const profilePanels = {
  education: {
    title: 'Rooted in engineering fundamentals.',
    subtitle:
      'Formal programs and specialized tracks that ground my work in robust systems design.',
  },
  experience: {
    title: 'Shipping impact with lean teams.',
    subtitle:
      'From platform squads to product pods, operating end-to-end with pragmatism and speed.',
  },
}

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
  const [activeProfile, setActiveProfile] = useState<'education' | 'experience'>('education')
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
    <>
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
          SEE PROJECTS &#8595;
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

      <section className="experience" id="experience">
        <div className="experience__header">
          <span className="experience__eyebrow">Background</span>
          <h2 className="experience__title">{profilePanels[activeProfile].title}</h2>
          <p className="experience__subtitle">{profilePanels[activeProfile].subtitle}</p>
        </div>
        <div className="experience__content">
          <div className="experience__tabs" role="tablist" aria-label="Experience and education">
            {(['education', 'experience'] as const).map((section) => (
              <button
                key={section}
                type="button"
                role="tab"
                aria-selected={activeProfile === section}
                aria-controls={`profile-${section}`}
                id={`tab-${section}`}
                className={`experience__tab ${
                  activeProfile === section ? 'experience__tab--active' : ''
                }`}
                onClick={() => setActiveProfile(section)}
              >
                {section === 'education' ? 'Education' : 'Experience'}
              </button>
            ))}
          </div>
          <div
            className="experience__list"
            role="list"
            id={`profile-${activeProfile}`}
            aria-labelledby={`tab-${activeProfile}`}
          >
            {(activeProfile === 'education' ? education : experience).map((item) => (
              <article key={item.id} className="experience__item" role="listitem">
                <div className="experience__company">
                  <span className="experience__company-name">{item.company}</span>
                  <span className="experience__role">{item.role}</span>
                  {item.note ? <span className="experience__note">{item.note}</span> : null}
                </div>
                <span className="experience__period">{item.period}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tech" id="tech">
        <div className="tech__header">
          <span className="tech__eyebrow">Tech Stack</span>
          <h2 className="tech__title">Tools shaped by impact.</h2>
          <p className="tech__subtitle">
            A snapshot of the platforms and patterns I rely on to ship reliable products end to end.
          </p>
        </div>
        <div className="tech__grid">
          {techStack.map((group) => (
            <article key={group.id} className="tech-card">
              <div className="tech-card__heading">
                <span className="tech-card__focus">{group.focus}</span>
                <h3 className="tech-card__title">{group.title}</h3>
                <p className="tech-card__summary">{group.summary}</p>
              </div>
              <div className="tech-card__tokens" aria-label={`${group.title} tools`}>
                {group.tokens.map((token) => (
                  <span key={token} className="tech-card__token">
                    {token}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact__inner">
          <div className="contact__intro">
            <span className="contact__eyebrow">Contact</span>
            <h2 className="contact__title">Let&apos;s build shipping software together.</h2>
            <p className="contact__subtitle">
              Based in Chicago and Palma. I&apos;m available for summer 2026 internships and select collaborations that
              require end-to-end product execution.
            </p>
          </div>
          <div className="contact__panel">
            <div className="contact__row">
              <span className="contact__label">Email</span>
              <a className="contact__link" href="mailto:hello@damianacri.dev">
                hello@damianacri.dev
              </a>
            </div>
            <div className="contact__row">
              <span className="contact__label">Status</span>
              <span className="contact__value">Open to internship opportunities &middot; Summer 2026</span>
            </div>
            <div className="contact__row contact__row--social">
              <span className="contact__label">Social</span>
              <div className="contact__socials">
                <a className="contact__pill" href="https://www.linkedin.com/in/damianacri" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="contact__pill" href="https://github.com/damianacri" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a className="contact__pill" href="https://x.com/damianacri" target="_blank" rel="noreferrer">
                  X / Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer className="site-footer">
      <div className="site-footer__top">
        <span className="site-footer__brand">DAMIAN ACRI</span>
        <nav className="site-footer__nav" aria-label="secondary">
          {navLinks.map(({ label, href }) => (
            <a key={href} className="site-footer__link" href={href}>
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="site-footer__bottom">
        <span className="site-footer__note">Engineered with intention &middot; {new Date().getFullYear()}</span>
        <a className="site-footer__link site-footer__link--muted" href="mailto:hello@damianacri.dev">
          hello@damianacri.dev
        </a>
      </div>
    </footer>
  </>
)
}





