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
  author?: string
  year?: number
  cover?: string // emoji or short label
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
  author?: string
  year?: number
  cover?: string
  summary: string
  languages: ('en' | 'th')[]
  order: number
}

function readMDX(slug: string, lang: 'en' | 'th'): Book | null {
  const filename = lang === 'th' ? 'index.th.mdx' : 'index.mdx'
  const filePath = path.join(CONTENT_DIR, slug, filename)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: { ...data, language: lang } as BookFrontmatter,
    content,
  }
}

export function getAllBookSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
}

export function getBookSummaries(): BookSummary[] {
  const slugs = getAllBookSlugs()
  const books: BookSummary[] = []

  for (const slug of slugs) {
    const en = readMDX(slug, 'en')
    const th = readMDX(slug, 'th')

    // Use English as the canonical source for listing
    const source = en ?? th
    if (!source) continue

    const fm = source.frontmatter
    books.push({
      slug,
      title: fm.title,
      author: fm.author,
      year: fm.year,
      cover: fm.cover,
      summary: fm.summary,
      languages: [en ? 'en' : null, th ? 'th' : null].filter(Boolean) as ('en' | 'th')[],
      order: fm.order ?? 999,
    })
  }

  return books.sort((a, b) => a.order - b.order)
}

export function getBook(slug: string, lang: 'en' | 'th' = 'en'): Book | null {
  return readMDX(slug, lang)
}
