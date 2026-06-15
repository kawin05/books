import type { Metadata } from 'next'
import { Kanit, Lexend, Instrument_Serif } from 'next/font/google'
import { AnimatedGridPattern } from '@/components/AnimatedGridPattern'
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
  metadataBase: new URL('https://kawinsbooks.vercel.app'),
  title: {
    default: "Kawin's Books",
    template: "%s — Kawin's Books",
  },
  description: 'Book summaries I have written — practical ideas from the books that shaped how I work.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: "Kawin's Books",
    description: 'Book summaries I have written.',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: "Kawin's Books",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var storedTheme = window.localStorage.getItem('theme');
                var systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                document.documentElement.dataset.theme = storedTheme || (systemLight ? 'light' : 'dark');
              } catch (_) {
                document.documentElement.dataset.theme = 'dark';
              }
            `,
          }}
        />
      </head>
      <body className="relative min-h-screen antialiased">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        />
        {children}
      </body>
    </html>
  )
}
