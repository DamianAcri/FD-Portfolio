import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blank Page',
  description: 'Clean white screen',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
