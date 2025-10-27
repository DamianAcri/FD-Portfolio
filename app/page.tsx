'use client'

import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'INFO', href: '#info' },
  { label: 'INDEX', href: '#work' },
  { label: 'EMAIL', href: 'mailto:hi@ch.sh' },
  { label: 'INSTAGRAM', href: 'https://instagram.com' },
]

const heroCopy =
  'Albert Chang is a designer + art director from CA. Currently he is based in NYC and design manager at Squarespace.'

const tiles = [
  {
    id: 'tile-1',
    title: 'SQSP COLLECTION / JEFF KOONS',
    subtitle: 'Brand, Film, Website, OOH',
  },
  {
    id: 'tile-2',
    title: 'DESIGN INTELLIGENCE',
    subtitle: 'Brand, Art Direction, Website',
  },
  {
    id: 'tile-3',
    title: 'IDEAS ARE WEIRD',
    subtitle: 'Film, Art Direction, AI',
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

  useEffect(() => {
    setClock(makeClock())
    const id = window.setInterval(() => setClock(makeClock()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <main className="frame">
      <header className="frame__top">
        <div className="frame__brand">DAMIAN</div>
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

      <section className="hero" id="info">
        <h1 className="hero__headline">{heroCopy}</h1>
      </section>

      <section className="grid" id="work">
        {tiles.map(({ id, title, subtitle }, index) => (
          <article key={id} className={`grid__item grid__item--${index + 1}`}>
            <header className="grid__item-header">
              <span className="grid__item-title">{title}</span>
              <span className="grid__item-subtitle">{subtitle}</span>
            </header>
            <div className="grid__item-media" aria-hidden="true" />
          </article>
        ))}
      </section>
    </main>
  )
}
