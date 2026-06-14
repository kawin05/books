'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import type { BookSummary } from '@/lib/books'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BookCardProps {
  book: BookSummary
  index: number
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
} as const

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
} as const

/**
 * Editorial book card — big year number, project-style layout.
 * Matches the architecture-firm aesthetic of the reference site.
 */
export function BookCard({ book, index }: BookCardProps) {
  const yearLabel = book.year ? String(book.year).padStart(2, '0') : String(index + 1).padStart(2, '0')

  return (
    <motion.article
      variants={fadeUp}
      whileHover="hover"
      className="group relative grid grid-cols-12 gap-4 border-t border-border-subtle py-10 transition-colors hover:border-accent-rust/30"
    >
      {/* Year / index */}
      <div className="col-span-2 sm:col-span-1 font-display text-sm text-text-muted">
        ({yearLabel})
      </div>

      {/* Cover + title block */}
      <div className="col-span-10 sm:col-span-7">
        <Link href={`/books/${book.slug}`} className="block">
          <div className="flex items-baseline gap-4">
            {book.cover && (
              <span className="text-3xl sm:text-4xl" aria-hidden>
                {book.cover}
              </span>
            )}
            <h2 className="font-display text-3xl font-light text-text-primary sm:text-5xl">
              {book.title}
            </h2>
          </div>
          {book.author && (
            <p className="mt-2 font-body text-sm text-text-muted">
              — {book.author}
            </p>
          )}
        </Link>
      </div>

      {/* Summary + language links */}
      <div className="col-span-12 sm:col-span-4">
        <p className="mb-4 text-[15px] leading-relaxed text-text-secondary">
          {book.summary}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          {book.languages.includes('en') && (
            <Link
              href={`/books/${book.slug}`}
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'font-display text-text-secondary hover:bg-transparent hover:text-accent-rust')}
            >
              English →
            </Link>
          )}
          {book.languages.includes('th') && (
            <Link
              href={`/books/${book.slug}/th`}
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'font-display text-text-secondary hover:bg-transparent hover:text-accent-rust')}
            >
              ภาษาไทย →
            </Link>
          )}
        </div>
      </div>

      {/* Hover arrow that slides in from the right */}
      <motion.div
        variants={{
          hover: { x: 0, opacity: 1 },
        }}
        initial={{ x: 20, opacity: 0 }}
        className="absolute right-4 top-10 hidden text-accent-amber sm:block"
      >
        →
      </motion.div>
    </motion.article>
  )
}

export { stagger }
