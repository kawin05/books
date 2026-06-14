'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { BookCard, stagger } from '@/components/BookCard'
import { Cursor } from '@/components/Cursor'
import { ScrollReveal } from '@/components/ScrollReveal'
import type { BookSummary } from '@/lib/books'

interface HomeClientProps {
  books: BookSummary[]
}

export function HomeClient({ books }: HomeClientProps) {
  return (
    <main className="grain relative min-h-screen">
      <Cursor />

      {/* Minimal nav — like the reference site's top bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-difference sm:px-12">
        <Link href="/" className="font-display text-sm font-medium uppercase tracking-widest text-accent-cream">
          Kawin
        </Link>
        <span className="font-display text-xs uppercase tracking-widest text-text-muted">
          {books.length} books · {new Date().getFullYear()}
        </span>
      </nav>

      {/* Hero — editorial typography */}
      <section className="flex min-h-screen flex-col justify-center px-6 pt-32 pb-24 sm:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <p className="mb-8 font-display text-sm uppercase tracking-[0.3em] text-accent-rust">
              Book Summaries
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} as="h1">
            <span className="block font-display text-display-xl font-bold text-text-primary">
              My
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.3} as="h1">
            <span className="block font-serif text-display-xl italic text-accent-amber">
              Library
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <p className="mt-12 max-w-xl font-serif text-2xl italic leading-relaxed text-text-secondary">
              A collection of summaries I have written — practical ideas from
              the books that shaped how I work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Book index — editorial list layout */}
      <section className="px-6 pb-32 sm:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <div className="mb-4 flex items-baseline justify-between border-b border-border-subtle pb-4">
              <h2 className="font-display text-sm uppercase tracking-widest text-text-muted">
                Index
              </h2>
              <span className="font-display text-xs text-text-muted">
                {String(books.length).padStart(2, '0')}
              </span>
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

      <footer className="border-t border-border-subtle px-6 py-12 sm:px-12">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between font-body text-xs text-text-muted">
          <span>© {new Date().getFullYear()} Kawin</span>
          <span className="font-display uppercase tracking-widest">
            Built with care
          </span>
        </div>
      </footer>
    </main>
  )
}
