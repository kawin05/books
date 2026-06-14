import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBook, getAllBookSlugs } from '@/lib/books'
import { ScrollReveal } from '@/components/ScrollReveal'

export function generateStaticParams() {
  // Pre-render every (slug, language) combo at build time
  const slugs = getAllBookSlugs()
  const params: { slug: string; lang?: string[] }[] = []
  for (const slug of slugs) {
    params.push({ slug })
    params.push({ slug, lang: ['th'] })
  }
  return params
}

interface BookPageProps {
  params: Promise<{ slug: string; lang?: string[] }>
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug, lang } = await params
  const language = lang?.includes('th') ? 'th' : 'en'
  const book = getBook(slug, language)

  if (!book) notFound()

  const { frontmatter } = book
  const otherLang = language === 'en' ? 'th' : 'en'
  const otherLangLabel = language === 'en' ? 'ภาษาไทย' : 'English'
  const hasOtherLang = getBook(slug, otherLang) !== null

  return (
    <main className="grain relative min-h-screen">
      {/* Top nav — back + language switcher */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-difference sm:px-12">
        <Link
          href="/"
          className="font-display text-sm font-medium uppercase tracking-widest text-accent-cream transition-opacity hover:opacity-70"
        >
          ← Kawin
        </Link>
        {hasOtherLang && (
          <Link
            href={language === 'en' ? `/books/${slug}/th` : `/books/${slug}`}
            className="font-display text-xs uppercase tracking-widest text-text-secondary transition-colors hover:text-accent-rust"
          >
            {otherLangLabel}
          </Link>
        )}
      </nav>

      {/* Hero */}
      <section className="px-6 pt-40 pb-16 sm:px-12">
        <div className="mx-auto w-full max-w-3xl">
          <ScrollReveal>
            <p className="mb-6 font-display text-sm uppercase tracking-[0.3em] text-accent-rust">
              {frontmatter.year ?? ''} {frontmatter.author && `· ${frontmatter.author}`}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} as="h1">
            <span className="block font-display text-display-lg font-bold text-text-primary">
              {frontmatter.title}
            </span>
          </ScrollReveal>

          {frontmatter.summary && (
            <ScrollReveal delay={0.3}>
              <p className="mt-8 font-serif text-xl italic leading-relaxed text-text-secondary">
                {frontmatter.summary}
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* MDX content */}
      <article className="px-6 pb-32 sm:px-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="prose-book">
            <MDXRemote source={book.content} />
          </div>
        </div>
      </article>

      <footer className="border-t border-border-subtle px-6 py-12 sm:px-12">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between font-body text-xs text-text-muted">
          <Link href="/" className="hover:text-accent-rust">
            ← Back to library
          </Link>
          <span>© {new Date().getFullYear()} Kawin</span>
        </div>
      </footer>
    </main>
  )
}
