import type { Metadata } from 'next'
import { Kanit, Lexend, Instrument_Serif } from 'next/font/google'
import './globals.css'

const display = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Lexend({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-body',
  display: 'swap',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Kawin's Books",
  description: 'Book summaries I have written — practical ideas from the books that shaped how I work.',
  openGraph: {
    title: "Kawin's Books",
    description: 'Book summaries I have written.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
