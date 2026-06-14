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
      className={`inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-[0.24em] text-text-muted transition-colors hover:text-accent-cream ${className}`}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
    >
      {isFullscreen ? (
        <Minimize2 className="size-3" />
      ) : (
        <Maximize2 className="size-3" />
      )}
      {isFullscreen ? 'Exit' : 'Fullscreen'}
    </button>
  )
}
