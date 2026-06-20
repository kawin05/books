// Content loader for MDX book summaries.
// Each book can have an English and Thai version.
//
// File structure expected:
//   content/books/<slug>/index.mdx       (English, default)
//   content/books/<slug>/index.th.mdx    (Thai)

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'books')

export type BookFrontmatter = {
  title: string
  titleDisplay?: string // optional display override (e.g. for manual line breaks)
  author?: string
  year?: number
  cover?: string // emoji or short label (fallback)
  coverImage?: string // path to book cover image
  deckUrl?: string // path to HTML slide deck (replaces MDX content)
  summary: string
  language?: 'en' | 'th'
  order?: number
}

export type Book = {
  slug: string
  frontmatter: BookFrontmatter
  content: string // raw MDX
}

export type BookSummary = {
  slug: string
  title: string
  titleDisplay?: string
  /** Title to render (respects titleDisplay override, falls back to title) */
  displayTitle: string
  author?: string
  year?: number
  cover?: string
  coverImage?: string
  summary: string
  languages: ('en' | 'th')[]
  order: number
}

/**
 * Validate that raw gray-matter data conforms to BookFrontmatter.
 * Returns the typed frontmatter if valid, null otherwise.
 * Catches missing required fields at build/read time instead of runtime.
 */
function validateBookFrontmatter(data: Record<string, unknown>, lang: 'en' | 'th'): BookFrontmatter | null {
  if (typeof data.title !== 'string' || !data.title) {
    console.warn(`Book frontmatter missing required "title" field`)
    return null
  }
  if (typeof data.summary !== 'string' || !data.summary) {
    console.warn(`Book "${data.title}" frontmatter missing required "summary" field`)
    return null
  }
  return {
    title: data.title,
    titleDisplay: typeof data.titleDisplay === 'string' ? data.titleDisplay : undefined,
    author: typeof data.author === 'string' ? data.author : undefined,
    year: typeof data.year === 'number' ? data.year : undefined,
    cover: typeof data.cover === 'string' ? data.cover : undefined,
    coverImage: typeof data.coverImage === 'string' ? data.coverImage : undefined,
    deckUrl: typeof data.deckUrl === 'string' ? data.deckUrl : undefined,
    summary: data.summary,
    language: lang,
    order: typeof data.order === 'number' ? data.order : undefined,
  }
}

function readMDX(slug: string, lang: 'en' | 'th'): Book | null {
  const filename = lang === 'th' ? 'index.th.mdx' : 'index.mdx'
  const filePath = path.join(CONTENT_DIR, slug, filename)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = validateBookFrontmatter(data as Record<string, unknown>, lang)
  if (!frontmatter) return null

  return { slug, frontmatter, content }
}

export function getAllBookSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
}

function getAvailableLanguages(slug: string): ('en' | 'th')[] {
  const langs: ('en' | 'th')[] = []
  if (readMDX(slug, 'en')) langs.push('en')
  if (readMDX(slug, 'th')) langs.push('th')
  return langs
}

export function getBookSummaries(): BookSummary[] {
  const slugs = getAllBookSlugs()
  const books: BookSummary[] = []

  for (const slug of slugs) {
    const en = readMDX(slug, 'en')
    const source = en ?? readMDX(slug, 'th')
    if (!source) continue

    const fm = source.frontmatter
    const languages = getAvailableLanguages(slug)

    // Skip books with no valid language data
    if (languages.length === 0) continue

    books.push({
      slug,
      title: fm.title,
      titleDisplay: fm.titleDisplay,
      displayTitle: fm.titleDisplay ?? fm.title,
      author: fm.author,
      year: fm.year,
      cover: fm.cover,
      coverImage: fm.coverImage,
      summary: fm.summary,
      languages,
      order: fm.order ?? 999,
    })
  }

  return books.sort((a, b) => a.order - b.order)
}

export function getBook(slug: string, lang: 'en' | 'th' = 'en'): Book | null {
  return readMDX(slug, lang)
}

/** Resolve display title from frontmatter (respects titleDisplay override) */
export function displayTitle(fm: { title: string; titleDisplay?: string }): string {
  return fm.titleDisplay ?? fm.title
}
