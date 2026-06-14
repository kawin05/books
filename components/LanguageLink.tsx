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
      onPointerCancel={() => setPressed(false)}
      onBlur={() => setPressed(false)}
      className={[
        'group/language relative inline-flex items-center overflow-hidden font-display uppercase text-text-primary transition-[letter-spacing,color,transform] duration-300 hover:text-accent-cream focus-visible:text-accent-cream',
        compact
          ? 'min-h-10 text-sm tracking-[0.24em] sm:text-base'
          : 'min-h-12 text-base tracking-[0.28em] sm:text-xl',
        pressed ? 'scale-[0.97] tracking-[0.36em]' : '',
      ].join(' ')}
    >
      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-border transition-transform duration-300 group-hover/language:scale-x-0" />
      <span className="absolute inset-0 -translate-x-[105%] skew-x-[-18deg] bg-accent-rust/18 transition-transform duration-500 ease-out group-hover/language:translate-x-0 group-focus-visible/language:translate-x-0" />
      <span className="absolute inset-y-1 left-0 w-px -translate-y-full bg-accent-amber transition-transform duration-500 group-hover/language:translate-y-0 group-focus-visible/language:translate-y-0" />
      <span className="relative inline-flex items-center gap-3 py-1">
        <span className="transition-transform duration-300 group-hover/language:-translate-y-0.5">
          {children}
        </span>
        <span
          aria-hidden
          className="inline-block translate-x-1 text-accent-rust opacity-0 transition-all duration-300 group-hover/language:translate-x-0 group-hover/language:opacity-100 group-focus-visible/language:translate-x-0 group-focus-visible/language:opacity-100"
        >
          /
        </span>
      </span>
    </Link>
  )
}
