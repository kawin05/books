# Handoff — kawin05/books (June 15, 2026 — final)

## TL;DR

The site is **live at https://kawinsbooks.vercel.app** on `main`. Next.js 15.5 App Router with Septiembre Arquitectura-inspired editorial design. Two books (Deep Work, Ultralearning) in EN + TH. HTML slide decks embedded in editorial shell. Light/dark theme toggle. shadcn/ui wired in. All QA issues patched.

**Next agent: polish and iterate on the live site.** No merge or deploy drama — just `git push origin main`.

---

## Current state (everything on `main`, deployed)

| Area | Status |
|---|---|
| Framework | Next.js 15.5.19, React 19.2, TypeScript strict |
| Styling | Tailwind 3.4, shadcn/ui (Radix primitives), CSS variables for light/dark |
| Animation | Motion 12 (`framer-motion` successor) |
| Content | MDX via `gray-matter` + `next-mdx-remote/rsc` (v6) |
| Deployment | Vercel (auto-deploy on push to main), alias `kawinsbooks.vercel.app` |
| Branch | `feat/nextjs-mdx` still exists but is stale — all work on `main` |

### Routes

| Route | Type | Description |
|---|---|---|
| `/` | Static | Home — editorial hero + book index |
| `/books/deep-work` | SSG | Deep Work EN — editorial shell + iframe deck |
| `/books/deep-work/th` | SSG | Deep Work TH — editorial shell + iframe deck |
| `/books/ultralearning` | SSG | Ultralearning EN — editorial shell + iframe deck |
| `/books/ultralearning/th` | SSG | Ultralearning TH — editorial shell + iframe deck |
| `/Deepwork/deep-work-deck.html` | Static | Legacy standalone deck (from `public/`) |
| `/ultralearning-deck.html` | Static | Legacy standalone deck |
| `/ultralearning-deck-thai.html` | Static | Legacy standalone deck (TH) |
| `/nonexistent` | Static | Custom dark editorial 404 |

---

## File layout

```
books/
├── app/
│   ├── books/[slug]/[[...lang]]/page.tsx  # Book detail — hero + iframe deck (or MDX fallback)
│   ├── globals.css                          # Tailwind + shadcn CSS vars + light/dark themes
│   ├── icon.svg                             # Favicon (gold "K" on dark square)
│   ├── layout.tsx                           # next/font, metadata (title template, OG, favicon)
│   ├── not-found.tsx                        # Custom 404 ("This page is not in the library.")
│   ├── opengraph-image.tsx                  # Auto-generated OG image route
│   └── page.tsx                             # Home — server component, passes books[] to client
├── components/
│   ├── BookCard.tsx                         # Editorial index row — cover image + title + summary + lang links
│   ├── Cursor.tsx                           # Custom cursor (spring-follow, hidden on touch)
│   ├── HomeClient.tsx                       # Home page client — hero, collage, library index
│   ├── LanguageLink.tsx                     # Language switcher link component
│   ├── ScrollReveal.tsx                     # Viewport-triggered fade-up wrapper
│   ├── ThemeToggle.tsx                      # Light/dark toggle ("Paper" / "Dark")
│   └── ui/                                  # shadcn components (Radix primitives)
│       ├── button.tsx                       # Button + buttonVariants (ghost, sm used throughout)
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       └── separator.tsx
├── content/
│   └── books/
│       ├── deep-work/
│       │   ├── index.mdx                    # EN frontmatter (title, author, year, coverImage, deckUrl, summary)
│       │   └── index.th.mdx                 # TH frontmatter
│       └── ultralearning/
│           ├── index.mdx
│           └── index.th.mdx
├── lib/
│   ├── books.ts                             # MDX loader, types (BookFrontmatter, Book, BookSummary)
│   └── utils.ts                             # cn() helper (clsx + tailwind-merge)
├── public/
│   ├── Deepwork/                            # Legacy deck files
│   │   ├── deep-work-deck.html
│   │   └── deep-work-deck-th.html
│   ├── ultralearning-deck.html
│   ├── ultralearning-deck-thai.html
│   ├── deep-work-cover.jpg                  # Book cover image
│   ├── ultralearning-cover.jpg
│   ├── library-trinity.jpg                  # Hero collage images
│   ├── library-white.jpg
│   ├── library-warm-shelves.jpg
│   ├── library-temple.jpg
│   ├── library-vasconcelos.jpg
│   └── icon.svg                             # Favicon (also in app/)
├── tailwind.config.ts                       # Custom colors + shadcn tokens + borderRadius
├── vercel.json                              # { "framework": "nextjs" }
├── package.json                             # Next 15.5, React 19.2, Motion 12, MDX v6, shadcn deps
└── .gitignore                               # .next/, node_modules/, web/
```

---

## Book frontmatter schema

Each `content/books/<slug>/index.mdx` (and `.th.mdx`):

```yaml
---
title: "Deep Work"
author: "Cal Newport"
year: 2016
cover: "📚"                              # emoji fallback if coverImage fails
coverImage: /deep-work-cover.jpg        # book cover in hero + index
deckUrl: /Deepwork/deep-work-deck.html  # HTML slide deck (rendered in iframe)
summary: "One-paragraph hook..."
order: 1                                # sort order (lower = first)
language: en                            # en or th
---
```

If `deckUrl` is set, the book page renders an iframe. If omitted, it falls back to MDX prose content.

---

## Theme system

CSS variables in `app/globals.css`:

- `:root` — dark theme (default)
- `:root.light` — beige paper theme

Tailwind tokens (`tailwind.config.ts`) reference CSS variables:
- `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`
- Legacy custom tokens preserved: `bg`, `accent.rust/amber/cream`, `text.primary/secondary/muted`, `border.subtle`

Theme toggle (`components/ThemeToggle.tsx`):
- Stores preference in `localStorage.theme`
- Falls back to `prefers-color-scheme`
- Labels: "Paper" (light) / "Dark"
- Mounted in home nav, book page nav, and 404 nav

---

## shadcn/ui integration

Installed manually (not via CLI — Tailwind 3 compatibility). Uses Radix primitives:

| Component | Primitive | Where used |
|---|---|---|
| `Button` | `@radix-ui/react-slot` | `buttonVariants({variant:'ghost', size:'sm'})` on all language switchers, back links, footer |
| `Card` | native div | Available but not currently used |
| `Dialog` | `@radix-ui/react-dialog` | Available |
| `DropdownMenu` | `@radix-ui/react-dropdown-menu` | Available |
| `Separator` | `@radix-ui/react-separator` | Available |

Pattern for link-buttons:
```tsx
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

<Link href="/" className={cn(buttonVariants({variant:'ghost',size:'sm'}), 'custom-classes')}>
  ← Back
</Link>
```

Use `hover:bg-transparent` to override shadcn's default hover background when the design calls for text-only hover effects.

---

## How to add a new book

1. Create `content/books/<slug>/index.mdx` with frontmatter (see schema above)
2. Optionally create `index.th.mdx` for Thai
3. Add cover image to `public/`
4. Add HTML deck to `public/` if available (set `deckUrl` in frontmatter)
5. Commit + push → Vercel auto-deploys

**No code changes needed.** The book page, BookCard, and metadata are all data-driven.

---

## Dogfood QA report

Saved at `dogfood-output/report.md`. All 4 issues from the original report are fixed:

| # | Issue | Fix |
|---|-------|-----|
| 1 | 404 light theme | `app/not-found.tsx` — dark editorial 404 |
| 2 | Missing favicon | `app/icon.svg` + metadata icons |
| 3 | No per-page titles | `generateMetadata` in book page + layout title template |
| 4 | No OG image | `app/opengraph-image.tsx` + metadata references |

---

## Things to watch out for

1. **Tailwind 3, not 4** — shadcn components were manually written for Tailwind 3. Don't use `@theme inline`, `@custom-variant`, or `data-[state=*]:` variants.
2. **Motion 12 type strictness** — `ease:` must be `[number,number,number,number]`, variants must use `as const`.
3. **MDXRemote is RSC** — don't import MDX in client components.
4. **`public/` serves static files** — anything in `public/` is served at `/`. Deck files, covers, collage images all live here.
5. **`deckUrl` drives iframe vs MDX** — the book page checks `frontmatter.deckUrl`. If set, renders iframe; if not, renders MDXRemote.
6. **Theme toggle uses `localStorage`** — initial script in `layout.tsx` prevents FOUC. Toggle is client-only.
7. **Vercel auto-detects Next.js** via `vercel.json` (`"framework":"nextjs"`). No custom build config needed.
8. **`feat/nextjs-mdx` branch is stale** — all work is on `main`. Delete if cleanup is wanted.
9. **`components.json` does not exist** — shadcn was installed manually. Use `npx shadcn@latest add <name>` at your own risk (it targets Tailwind v4).
10. **`app/opengraph-image.tsx` and `app/icon.svg`** — Next.js auto-generates these as routes. Don't delete unless replacing.

---

## Quick reference

```bash
# Local dev (port 3001 to avoid conflicts)
npm run dev -- --port 3001

# Production build
npm run build

# Deploy
git push origin main
# Vercel auto-deploys, then:
vercel alias set <deploy-url>.vercel.app kawinsbooks.vercel.app --scope kawin-s-projects1

# Type check
npx tsc --noEmit

# Dogfood QA
# Report at dogfood-output/report.md
```

---

## User context

- **Prefers English-only** communication
- **Direct, no-nonsense** — wants fix-oriented responses, not theory
- **Visually steering** — judges by feel in browser, not technical explanation
- **Design taste:** editorial, architectural, elegant, premium, image-led, tactile beige paper light mode
- **Not** generic SaaS, blog, or app-like buttons where typographic links feel better
- **Budget-conscious** — free/self-hosted (MDX, Vercel free tier)
- **Kanit font** for Thai, Instrument Serif for editorial italics, Lexend for body
- **Windows 10**, git-bash/MSYS, Node 26.3.0, npm 11.16.0
- **Thai beauty e-commerce** background (separate from this project)
- **Vercel project:** `kawin-s-projects1/kawins-books`, alias `kawinsbooks.vercel.app`

---

**Handoff written by:** Mark (Hermes agent) on June 15, 2026
**Branch state:** `main` deployed and live, `feat/nextjs-mdx` stale
**Next action:** Polish, add books, or iterate on visual design

