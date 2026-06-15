'use client'

import { useState, useEffect, useCallback } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import { ShinyButton } from '@/components/ui/shiny-button'

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
    <ShinyButton
      onClick={toggle}
      className={`rounded-full gap-2 font-display text-xs uppercase tracking-[0.2em] ${className}`}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
    >
      {isFullscreen ? (
        <Minimize2 className="size-4" />
      ) : (
        <Maximize2 className="size-4" />
      )}
      {isFullscreen ? 'Exit' : 'Fullscreen'}
    </ShinyButton>
  )
}
