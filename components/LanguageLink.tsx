'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

interface LanguageLinkProps {
  href: string
  children: ReactNode
  compact?: boolean
}

export function LanguageLink({ href, children, compact = false }: LanguageLinkProps) {
  return (
    <Link
      href={href}
      className={[
        'group relative inline-flex items-center font-display uppercase tracking-[0.2em] text-text-muted transition-colors duration-300 hover:text-text-primary',
        compact
          ? 'text-[11px]'
          : 'text-[11px] sm:text-xs',
      ].join(' ')}
    >
      {children}
      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-text-muted/40 transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  )
}
