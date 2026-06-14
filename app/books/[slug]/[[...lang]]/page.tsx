import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBook, getAllBookSlugs } from '@/lib/books'
import { LanguageLink } from '@/components/LanguageLink'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ThemeToggle } from '@/components/ThemeToggle'
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
    <main className="grain relative min-h-screen overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-difference sm:px-12">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'px-0 font-display text-[11px] uppercase tracking-[0.28em] text-accent-cream hover:bg-transparent hover:text-accent-cream/70'
          )}
        >
          Kawin Books
        </Link>
        <div className="flex items-center gap-6">
          {hasOtherLang && (
            <LanguageLink
              href={language === 'en' ? `/books/${slug}/th` : `/books/${slug}`}
            >
              {otherLangLabel}
            </LanguageLink>
          )}
          <ThemeToggle />
        </div>
      </nav>

      <section className="px-6 pt-28 sm:px-12">
        <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="pb-8 lg:col-span-7 lg:pb-20">
            <ScrollReveal>
              <p className="mb-8 font-display text-[11px] uppercase tracking-[0.34em] text-text-muted">
                Book study / {language === 'th' ? 'Thai edition' : 'English edition'}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15} as="h1">
              <span className="block max-w-5xl font-display text-[clamp(4.2rem,11vw,12rem)] font-light uppercase leading-[0.82] tracking-normal text-text-primary">
                {frontmatter.title}
              </span>
            </ScrollReveal>

            {frontmatter.summary && (
              <ScrollReveal delay={0.3}>
                <div className="mt-12 grid max-w-4xl grid-cols-1 gap-8 border-t border-border-subtle pt-6 sm:grid-cols-[0.6fr_1fr]">
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-5 font-display text-[10px] uppercase tracking-[0.24em] text-text-muted sm:grid-cols-1">
                    <div>
                      <dt className="text-text-muted/70">Author</dt>
                      <dd className="mt-2 text-text-secondary">{frontmatter.author ?? 'Unknown'}</dd>
                    </div>
                    <div>
                      <dt className="text-text-muted/70">Year</dt>
                      <dd className="mt-2 text-text-secondary">{frontmatter.year ?? 'N/A'}</dd>
                    </div>
                    <div>
                      <dt className="text-text-muted/70">Language</dt>
                      <dd className="mt-2 text-text-secondary">{language.toUpperCase()}</dd>
                    </div>
                  </dl>
                  <p className="font-serif text-2xl italic leading-tight text-text-primary sm:text-3xl">
                    {frontmatter.summary}
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>

          {frontmatter.coverImage && (
            <div className="pb-10 lg:col-span-5 lg:pb-20">
              <ScrollReveal delay={0.2}>
                <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden bg-bg-raised sm:max-w-none">
                  <img
                    src={frontmatter.coverImage}
                    alt={frontmatter.title}
                    width={640}
                    height={800}
                    decoding="async"
                    fetchPriority="high"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 border border-border-subtle" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-bg-deep/80 px-5 py-4 backdrop-blur">
                    <span className="font-display text-[10px] uppercase tracking-[0.26em] text-text-muted">
                      Source text
                    </span>
                    <span className="font-display text-[10px] uppercase tracking-[0.26em] text-text-secondary">
                      {frontmatter.author}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-border-subtle px-6 py-5 sm:px-12">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-4 font-display text-[10px] uppercase tracking-[0.24em] text-text-muted sm:grid-cols-4">
          <span>Summary</span>
          <span>{frontmatter.author ?? 'Author'}</span>
          <span>{frontmatter.year ?? 'Year'}</span>
          <Link href="/" className="justify-self-start transition-colors hover:text-accent-cream sm:justify-self-end">
            Back to index
          </Link>
        </div>
      </section>

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
        <article className="px-6 pb-32 pt-24 sm:px-12">
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28 border-t border-border-subtle pt-5 font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">
                <p>Notes</p>
                <p className="mt-8 max-w-[14rem] leading-relaxed text-text-secondary">
                  Extracted ideas, practices, and working principles.
                </p>
              </div>
            </aside>
            <div className="lg:col-span-7 lg:col-start-5">
            <div className="prose-book">
              <MDXRemote source={book.content} />
            </div>
            </div>
          </div>
        </article>
      )}

      <footer className="px-6 pb-10 sm:px-12">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between border-t border-border-subtle pt-6 font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">
          <Link href="/" className="transition-colors hover:text-accent-cream">
            Back to library
          </Link>
          <span>© {new Date().getFullYear()} Kawin</span>
        </div>
      </footer>
    </main>
  )
}
