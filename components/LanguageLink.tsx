'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'

interface LanguageLinkProps {
  href: string
  children: ReactNode
  compact?: boolean
}

export function LanguageLink({ href, children, compact = false }: LanguageLinkProps) {
  const [pressed, setPressed] = useState(false)

  return (
    <Link
      href={href}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className={[
        'group relative inline-flex items-center font-display uppercase tracking-[0.2em] text-text-muted transition-all duration-200 hover:text-text-primary',
        compact
          ? 'text-[11px]'
          : 'text-[11px] sm:text-xs',
        pressed ? 'scale-90' : 'scale-100',
      ].join(' ')}
    >
      {children}
      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-text-muted/40 transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  )
}
