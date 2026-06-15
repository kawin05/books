'use client'

import { useState, useEffect, useCallback } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'

interface FullscreenButtonProps {
  targetId: string
  className?: string
}

export function FullscreenButton({ targetId, className = '' }: FullscreenButtonProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const toggle = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      const el = document.getElementById(targetId)
      if (el) el.requestFullscreen()
    }
  }, [targetId])

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-display text-xs uppercase tracking-[0.2em] text-text-secondary transition-all hover:border-text-muted/50 hover:text-text-primary ${className}`}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
    >
      {isFullscreen ? (
        <Minimize2 className="size-4" />
      ) : (
        <Maximize2 className="size-4" />
      )}
      {isFullscreen ? 'Exit' : 'Fullscreen'}
    </button>
  )
}
