'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import type { BookSummary } from '@/lib/books'
import { libraryImages } from '@/lib/images'

interface LibrarySlideshowProps {
  featured: BookSummary | undefined
  currentIndex: number
  onSelect: (index: number) => void
}

const INTERVAL_MS = 4000

export function LibrarySlideshow({ featured, currentIndex, onSelect }: LibrarySlideshowProps) {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'clamp(360px, 70vw, 900px)' }}>
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <motion.img
            src={libraryImages[currentIndex].src}
            alt={libraryImages[currentIndex].alt}
            className="h-full w-full object-cover"
            initial={{ scale: 1, y: 0, rotate: 0 }}
            animate={{
              scale: 1.06,
              y: [0, -8, 0],
              rotate: [-0.4, 0.4, -0.4],
            }}
            transition={{
              scale: { duration: INTERVAL_MS / 1000, ease: 'linear' },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />

      {/* Overlay text + dots stacked on mobile */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 px-4 pb-16 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pb-10">
        {featured && (
          <Link href="/gallery" className="group">
            <p className="font-display text-[9px] uppercase tracking-[0.28em] text-text-muted">
              Featured archive
            </p>
            <p className="mt-1.5 max-w-xs font-display text-xl font-light leading-tight text-text-primary transition-colors group-hover:text-accent-cream sm:text-3xl">
              Library as architecture
            </p>
          </Link>
        )}

        {/* Slide indicators */}
        <div className="flex gap-1.5 sm:gap-2">
          {libraryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-6 bg-accent-cream sm:w-8'
                  : 'w-1.5 bg-text-muted/40 hover:bg-text-muted/60 sm:w-2'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
