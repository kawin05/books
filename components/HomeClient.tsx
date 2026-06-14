'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
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
    className: 'col-span-7 row-span-5',
  },
  {
    src: '/library-temple.jpg',
    alt: 'Warm multi-level wooden library with spiral staircase',
    className: 'col-span-5 row-span-3',
  },
  {
    src: '/library-vasconcelos.jpg',
    alt: 'Modern geometric library stacks with suspended walkways',
    className: 'col-span-5 row-span-2',
  },
  {
    src: '/library-warm-shelves.jpg',
    alt: 'Close view of old books and warm shelves',
    className: 'col-span-4 row-span-2',
  },
  {
    src: '/library-white.jpg',
    alt: 'Bright white contemporary library interior',
    className: 'col-span-3 row-span-2',
  },
]

export function HomeClient({ books }: HomeClientProps) {
  const featured = books[0]

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

      <section className="relative min-h-screen px-6 pt-28 sm:px-12">
        <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-[1600px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.72fr)] lg:items-end">
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

          {featured && (
            <ScrollReveal delay={0.28}>
              <Link
                href={`/books/${featured.slug}`}
                className="group relative mb-10 block aspect-[4/5] w-full overflow-hidden bg-bg-raised lg:mb-20"
              >
                <div className="grid h-full grid-cols-12 grid-rows-7 gap-1.5 p-1.5">
                  {libraryImages.map((image, index) => (
                    <div
                      key={image.src}
                      className={`${image.className} overflow-hidden bg-bg-deep`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={index === 0 ? 900 : 520}
                        height={index === 0 ? 650 : 420}
                        decoding="async"
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        className="h-full w-full object-cover opacity-80 grayscale transition duration-700 group-hover:scale-[1.04] group-hover:opacity-95 group-hover:grayscale-0"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 border border-border-subtle" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.28em] text-text-muted">
                      Featured archive
                    </p>
                    <p className="mt-2 font-display text-2xl font-light text-text-primary">
                      Library as architecture
                    </p>
                  </div>
                  <span className="font-display text-xl text-accent-cream">→</span>
                </div>
              </Link>
            </ScrollReveal>
          )}
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
