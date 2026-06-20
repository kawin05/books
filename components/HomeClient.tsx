'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { BookCard } from '@/components/BookCard'
import { stagger } from '@/lib/motion'
import { Cursor } from '@/components/Cursor'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/HeroSection'
import { LibrarySlideshow } from '@/components/LibrarySlideshow'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ThemeToggle } from '@/components/ThemeToggle'
import type { BookSummary } from '@/lib/books'
import { libraryImages } from '@/lib/images'

interface HomeClientProps {
  books: BookSummary[]
}

export function HomeClient({ books }: HomeClientProps) {
  const featured = books[0]
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % libraryImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <Cursor />

      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-end px-6 py-6 mix-blend-difference sm:px-12">
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

      <HeroSection />
      <LibrarySlideshow featured={featured} currentIndex={currentIndex} onSelect={setCurrentIndex} />

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

      <Footer />
    </main>
  )
}
