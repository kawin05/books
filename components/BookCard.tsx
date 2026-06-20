'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'motion/react'
import type { BookSummary } from '@/lib/books'
import { LanguageLink } from '@/components/LanguageLink'
import { fadeUp, stagger } from '@/lib/motion'

interface BookCardProps {
  book: BookSummary
  index: number
}

/**
 * Editorial book card — big year number, project-style layout.
 * Matches the architecture-firm aesthetic of the reference site.
 */
export function BookCard({ book, index }: BookCardProps) {
  const itemLabel = String(index + 1).padStart(2, '0')
  const [imgError, setImgError] = useState(false)

  return (
    <motion.article
      variants={fadeUp}
      whileHover="hover"
      className="group relative grid grid-cols-12 gap-x-4 gap-y-6 border-t border-border-subtle py-7 transition-colors hover:border-text-secondary/40 sm:py-9"
    >
      <div className="col-span-2 font-display text-[11px] uppercase tracking-[0.24em] text-text-muted sm:col-span-1">
        {itemLabel}
      </div>

      <div className="col-span-10 sm:col-span-5">
        <Link href={`/books/${book.slug}`} className="group/title block">
          <h3 className="font-display text-[clamp(1.75rem,4vw,4.2rem)] font-light uppercase leading-[0.9] tracking-normal text-text-primary transition-colors group-hover/title:text-accent-cream inline-block max-w-[12ch] whitespace-pre-line">
            {book.displayTitle}
          </h3>
          {book.author && (
            <p className="mt-3 font-display text-[10px] uppercase tracking-[0.28em] text-text-muted">
              {book.author}
            </p>
          )}
        </Link>
      </div>

      <div className="col-span-4 hidden font-display text-[11px] uppercase tracking-[0.24em] text-text-muted sm:col-span-2 sm:block">
        {book.year ?? 'Now'}
      </div>

      <div className="col-span-12 grid grid-cols-1 gap-5 sm:col-span-4">
        <p className="max-w-md font-body text-sm leading-relaxed text-text-secondary">
          {book.summary}
        </p>
        <div className="flex flex-wrap gap-x-7 gap-y-4">
          {book.languages.includes('en') && (
            <LanguageLink href={`/books/${book.slug}`} compact>
              English
            </LanguageLink>
          )}
          {book.languages.includes('th') && (
            <LanguageLink href={`/books/${book.slug}/th`} compact>
              ภาษาไทย
            </LanguageLink>
          )}
        </div>
      </div>

      {book.coverImage && !imgError && (
        <motion.img
          src={book.coverImage}
          alt=""
          aria-hidden
          onError={() => setImgError(true)}
          width={160}
          height={220}
          decoding="async"
          variants={{
            hover: { opacity: 0.92, x: 0, rotate: -1.5 },
          }}
          initial={{ opacity: 0, x: 18, rotate: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="pointer-events-none absolute right-24 top-1/2 z-10 hidden h-56 w-40 -translate-y-1/2 object-cover lg:block"
        />
      )}

      <motion.div
        variants={{
          hover: { x: 0, opacity: 1 },
        }}
        initial={{ x: 20, opacity: 0 }}
        className="absolute right-4 top-9 hidden font-display text-2xl text-accent-cream sm:block"
      >
        →
      </motion.div>
    </motion.article>
  )
}
