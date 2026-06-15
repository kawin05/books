import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { GalleryGrid } from '@/components/GalleryGrid'
import { libraryImages } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Library architecture — a collection of the spaces that inspire deep work.',
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-bg text-text-primary">
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-end px-6 py-6 mix-blend-difference sm:px-12">
        <span className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">
          {libraryImages.length} Photos
        </span>
      </nav>

      <section className="px-6 pt-32 pb-12 sm:px-12 sm:pt-40">
        <div className="mx-auto w-full max-w-[1600px]">
          <p className="mb-6 font-display text-[11px] uppercase tracking-[0.34em] text-text-muted">
            Gallery
          </p>
          <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,6rem)] font-light uppercase leading-[0.9] text-text-primary">
            Library as architecture
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl italic leading-relaxed text-text-secondary">
            Spaces built for reading, thinking, and the slow accumulation of ideas.
          </p>
        </div>
      </section>

      <GalleryGrid />

      <Footer backLink />
    </main>
  )
}
