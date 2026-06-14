'use client'

import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    setTheme(getInitialTheme())
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'paper' : 'dark'} mode`}
      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-text-secondary transition-colors hover:border-text-muted/50 hover:text-text-primary"
    >
      <span className={`h-1.5 w-1.5 rounded-full ${theme === 'dark' ? 'bg-text-muted' : 'bg-accent-amber'}`} />
      {theme === 'dark' ? 'Dark' : 'Paper'}
    </button>
  )
}
