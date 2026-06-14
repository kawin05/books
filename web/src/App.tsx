import { motion } from 'motion/react'

interface Book {
  title: string
  cover?: string
  summary: string
  links: { label: string; href: string }[]
}

const books: Book[] = [
  {
    title: 'Deep Work',
    cover: '📚',
    summary: 'Why focused, uninterrupted thinking is the superpower of the 21st century — and how to actually build it into your day.',
    links: [
      { label: 'English', href: '/Deepwork/deep-work-deck.html' },
      { label: 'ภาษาไทย', href: '/Deepwork/deep-work-deck-th.html' },
    ],
  },
  {
    title: 'Ultralearning',
    cover: '🧠',
    summary: 'Self-directed, intense projects that teach you hard skills fast — without going back to school or quitting your job.',
    links: [
      { label: 'English', href: '/ultralearning-deck.html' },
      { label: 'ภาษาไทย', href: '/ultralearning-deck-thai.html' },
    ],
  },
]

// Stagger container — each child animates 120ms after the previous
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function BookCard({ book, index }: { book: Book; index: number }) {
  return (
    <motion.article
      variants={item}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-border-subtle bg-white/[0.025] p-8 backdrop-blur-sm transition-colors hover:border-accent-rust/30 hover:bg-white/[0.04]"
    >
      {/* Hover glow — only visible on hover, follows the cursor via gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(200,93,78,0.08), transparent 40%)',
        }}
      />

      <div className="relative">
        <div className="mb-5 flex items-center gap-3">
          <motion.span
            className="text-3xl"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
          >
            {book.cover}
          </motion.span>
          <h2 className="font-display text-2xl font-medium text-text-primary">{book.title}</h2>
        </div>

        <p className="mb-6 text-[15px] leading-relaxed text-text-secondary">{book.summary}</p>

        <div className="flex flex-col gap-2">
          {book.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group/link inline-flex items-center gap-2 font-display text-[17px] font-light text-text-secondary transition-colors hover:text-accent-rust"
            >
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent-rust transition-all duration-300 group-hover/link:w-full" />
              </span>
              <motion.span
                className="inline-block text-accent-amber"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                →
              </motion.span>
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export function App() {
  return (
    <main className="grain relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-3 font-display text-base uppercase tracking-[3px] text-accent-rust"
      >
        Book Summaries
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[clamp(3.5rem,11vw,7rem)] font-bold leading-[1.05] text-text-primary"
      >
        My <span className="italic text-accent-amber">Library</span>
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="my-12 h-[3px] w-[60px] origin-left bg-accent-gradient"
      />

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="flex w-full max-w-4xl flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:justify-center sm:gap-8"
      >
        {books.map((book, i) => (
          <BookCard key={book.title} book={book} index={i} />
        ))}
      </motion.section>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-20 font-body text-xs text-text-muted"
      >
        Built with care · {new Date().getFullYear()}
      </motion.footer>
    </main>
  )
}
