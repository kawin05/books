'use client'

import { useState, useEffect } from 'react'

const PHRASES = [
  "Let's read together",
  'มาอ่านด้วยกัน',
]

interface TypewriterTextProps {
  className?: string
}

export function TypewriterText({ className = 'text-sm font-medium tracking-[0.12em] text-accent-cream' }: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIndex]
    const speed = deleting ? 40 : 80
    const pause = !deleting && charIndex === phrase.length ? 2000 : 0

    if (pause) {
      const timer = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      if (deleting) {
        if (charIndex === 0) {
          setDeleting(false)
          setPhraseIndex((i) => (i + 1) % PHRASES.length)
        } else {
          setCharIndex((i) => i - 1)
        }
      } else {
        setCharIndex((i) => i + 1)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [charIndex, deleting, phraseIndex])

  const phrase = PHRASES[phraseIndex]

  return (
    <span className={`font-display ${className}`} aria-label={phrase}>
      <span>{phrase.slice(0, charIndex)}</span>
      <span className="inline-block w-[1px] h-[1em] -mb-[0.1em] bg-current animate-pulse" aria-hidden />
    </span>
  )
}
