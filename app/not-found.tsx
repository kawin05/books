import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-screen flex-col bg-bg text-text-primary">
      <nav className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-difference sm:px-12">
        <Link href="/" className="font-display text-sm font-medium uppercase tracking-widest text-accent-cream">
          Kawin
        </Link>
        <div className="flex items-center gap-6">
          <span className="font-display text-xs uppercase tracking-widest text-text-muted">
            404
          </span>
          <ThemeToggle />
        </div>
      </nav>

      <section className="flex flex-1 items-center px-6 py-32 sm:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-8 font-display text-sm uppercase tracking-[0.3em] text-accent-rust">
            Page not found
          </p>
          <h1 className="max-w-4xl font-display text-display-lg font-bold text-text-primary">
            This page is not in the library.
          </h1>
          <p className="mt-8 max-w-xl font-serif text-2xl italic leading-relaxed text-text-secondary">
            The book may have moved, or the link may be pointing at a shelf that does not exist yet.
          </p>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'mt-12 px-0 font-display text-xs uppercase tracking-widest text-accent-amber hover:bg-transparent hover:text-accent-rust'
            )}
          >
            Back to library
          </Link>
        </div>
      </section>
    </main>
  )
}
