import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBook, getAllBookSlugs } from '@/lib/books'
import { ScrollReveal } from '@/components/ScrollReveal'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  const slugs = getAllBookSlugs()
  const params: { slug: string; lang?: string[] }[] = []
  for (const slug of slugs) {
    params.push({ slug })
    params.push({ slug, lang: ['th'] })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang?: string[] }>
}): Promise<Metadata> {
  const { slug, lang } = await params
  const language = lang?.includes('th') ? 'th' : 'en'
  const book = getBook(slug, language)

  if (!book) {
    return {
      title: 'Book not found',
    }
  }

  const { frontmatter } = book

  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    openGraph: {
      title: `${frontmatter.title} — Kawin's Books`,
      description: frontmatter.summary,
      type: 'article',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${frontmatter.title} — Kawin's Books`,
        },
      ],
    },
  }
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
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'font-display text-xs uppercase tracking-widest text-accent-cream hover:bg-transparent hover:text-accent-cream/70'
          )}
        >
          ← Kawin
        </Link>
        {hasOtherLang && (
          <Link
            href={language === 'en' ? `/books/${slug}/th` : `/books/${slug}`}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'font-display text-xs uppercase tracking-widest text-text-secondary hover:bg-transparent hover:text-accent-rust'
            )}
          >
            {otherLangLabel}
          </Link>
        )}
      </nav>

      {/* Hero */}
      <section className="px-6 pt-40 pb-16 sm:px-12">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
          <div className="flex-1">
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
          {frontmatter.coverImage && (
            <ScrollReveal delay={0.2}>
              <img
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                width={192}
                height={288}
                decoding="async"
                fetchPriority="high"
                className="w-40 shrink-0 rounded-md object-cover shadow-2xl sm:w-48"
              />
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Deck or MDX content */}
      {frontmatter.deckUrl ? (
        <section className="relative mx-auto w-full max-w-7xl px-0 pb-24 sm:px-6">
          <iframe
            src={frontmatter.deckUrl}
            title={frontmatter.title}
            className="w-full rounded-lg border border-border-subtle bg-bg"
            style={{ height: 'calc(100vh - 120px)', minHeight: '600px' }}
            allowFullScreen
          />
        </section>
      ) : (
        <article className="px-6 pb-32 sm:px-12">
          <div className="mx-auto w-full max-w-3xl">
            <div className="prose-book">
              <MDXRemote source={book.content} />
            </div>
          </div>
        </article>
      )}

      <footer className="border-t border-border-subtle px-6 py-12 sm:px-12">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between font-body text-xs text-text-muted">
          <Link href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'font-display text-xs text-text-muted hover:bg-transparent hover:text-accent-rust')}>
            ← Back to library
          </Link>
          <span>© {new Date().getFullYear()} Kawin</span>
        </div>
      </footer>
    </main>
  )
}
