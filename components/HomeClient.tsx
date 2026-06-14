'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BookCard, stagger } from '@/components/BookCard'
import { Cursor } from '@/components/Cursor'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ThemeToggle } from '@/components/ThemeToggle'
import type { BookSummary } from '@/lib/books'

interface HomeClientProps {
  books: BookSummary[]
}

const libraryImages = [
  {
    src: '/library-trinity.jpg',
    alt: 'Historic long library with arched wooden ceiling',
  },
  {
    src: '/library-temple.jpg',
    alt: 'Warm multi-level wooden library with spiral staircase',
  },
  {
    src: '/library-vasconcelos.jpg',
    alt: 'Modern geometric library stacks with suspended walkways',
  },
  {
    src: '/library-warm-shelves.jpg',
    alt: 'Close view of old books and warm shelves',
  },
  {
    src: '/library-white.jpg',
    alt: 'Bright white contemporary library interior',
  },
  {
    src: '/library-abbey.jpg',
    alt: 'Baroque Abbey Library of Saint Gallen with ornate ceiling',
  },
  {
    src: '/library-morgan.jpg',
    alt: 'Morgan Library Museum New York grand hall',
  },
  {
    src: '/library-sharjah.jpg',
    alt: 'Sharjah House of Wisdom modern floating library',
  },
]

export function HomeClient({ books }: HomeClientProps) {
  const featured = books[0]
  const [currentIndex, setCurrentIndex] = useState(0)
  const interval = 4000

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % libraryImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next])

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <Cursor />

      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-difference sm:px-12">
        <Link href="/" className="font-display text-sm font-medium uppercase tracking-[0.28em] text-accent-cream">
          Kawin Books
        </Link>
        <div className="hidden items-center gap-8 font-display text-[11px] uppercase tracking-[0.24em] text-text-secondary sm:flex">
          <a href="#library" className="transition-colors hover:text-accent-cream">
            Library
          </a>
          <span>{String(books.length).padStart(2, '0')} Studies</span>
          <ThemeToggle />
        </div>
        <div className="sm:hidden">
          <ThemeToggle />
        </div>
      </nav>

      <section className="relative px-6 pt-28 pb-16 sm:px-12">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="pb-14 lg:pb-20">
            <ScrollReveal>
              <p className="mb-8 font-display text-[11px] uppercase tracking-[0.36em] text-text-muted">
                Reading archive / selected notes
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.12} as="h1">
              <span className="block max-w-5xl font-display text-[clamp(4.7rem,15vw,15rem)] font-light uppercase leading-[0.78] tracking-normal text-text-primary">
                Kawin
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.22} as="h1">
              <span className="block max-w-5xl font-display text-[clamp(4.7rem,15vw,15rem)] font-light uppercase leading-[0.78] tracking-normal text-text-primary">
                Books
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.36}>
              <div className="mt-12 grid max-w-3xl grid-cols-1 gap-8 border-t border-border-subtle pt-6 sm:grid-cols-[0.65fr_1fr]">
                <p className="font-display text-[11px] uppercase tracking-[0.3em] text-accent-rust">
                  Notes on attention, skill, and durable work.
                </p>
                <p className="font-body text-sm leading-relaxed text-text-secondary sm:text-base">
                  A small collection of book studies arranged like project records:
                  each one is a way of looking, practicing, and building.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

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
                scale: { duration: interval / 1000, ease: 'linear' },
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
            <Link
              href="/gallery"
              className="group"
            >
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
                onClick={() => setCurrentIndex(i)}
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

      <section id="library" className="px-6 pb-36 pt-8 sm:px-12">
        <div className="mx-auto w-full max-w-[1600px]">
          <ScrollReveal>
            <div className="mb-0 grid grid-cols-12 border-y border-border-subtle py-4 font-display text-[10px] uppercase tracking-[0.26em] text-text-muted">
              <span className="col-span-2 sm:col-span-1">No.</span>
              <h2 className="col-span-10 sm:col-span-5">
                Book
              </h2>
              <span className="hidden sm:col-span-2 sm:block">Year</span>
              <span className="hidden sm:col-span-4 sm:block">Field notes</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10 mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-light uppercase leading-[0.9] tracking-normal text-text-primary lg:col-span-7">
                Library Index
              </h2>
              <p className="max-w-md self-end font-body text-sm leading-relaxed text-text-secondary lg:col-span-4 lg:col-start-9">
                Browse the studies as a working catalogue: summaries, Thai and English versions,
                and the older deck formats preserved as source material.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            {books.map((book, i) => (
              <BookCard key={book.slug} book={book} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border-subtle px-6 py-20 sm:px-12">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 sm:grid-cols-12">
          <p className="font-display text-[10px] uppercase tracking-[0.28em] text-text-muted sm:col-span-3">
            Method
          </p>
          <p className="max-w-3xl font-serif text-3xl italic leading-tight text-text-primary sm:col-span-8">
            Read slowly, compress the useful parts, and return to the ideas when the work asks for them.
          </p>
        </div>
      </section>

      <footer className="px-6 pb-10 sm:px-12">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between border-t border-border-subtle pt-6 font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">
          <span>© {new Date().getFullYear()} Kawin</span>
          <span>
            Bangkok / Online
          </span>
        </div>
      </footer>
    </main>
  )
}
