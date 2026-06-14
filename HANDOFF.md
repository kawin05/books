# HANDOFF — kawin05/books

**Live:** https://kawinsbooks.vercel.app  
**Repo:** `kawin05/books` on GitHub  
**Stack:** Next.js 15.5 App Router · TypeScript · Tailwind 3.4 · Motion 12 · MDX v6 · shadcn/ui (Radix)  
**Deploy:** Vercel auto-deploy on push to `main`

---

## What this site is

Kawin's personal book-summary archive. Two books (Deep Work, Ultralearning) in English + Thai. HTML slide decks embedded inside an editorial shell. Library-architecture-inspired visual language. Dark/light theme toggle with a beige paper light mode.

---

## Routes

| Route | Type | What |
|---|---|---|
| `/` | Static | Home — KAWIN BOOKS hero + slideshow + library index |
| `/books/deep-work` | SSG | Deep Work EN — editorial hero + iframe deck |
| `/books/deep-work/th` | SSG | Deep Work TH |
| `/books/ultralearning` | SSG | Ultralearning EN |
| `/books/ultralearning/th` | SSG | Ultralearning TH |
| `/gallery` | Static | All 8 library photos in masonry grid |
| `/Deepwork/deep-work-deck.html` | Static | Legacy standalone deck |
| `/ultralearning-deck.html` | Static | Legacy standalone deck |
| `/ultralearning-deck-thai.html` | Static | Legacy standalone deck (TH) |

---

## File map (what matters)

```
books/
├── app/
│   ├── books/[slug]/[[...lang]]/page.tsx   # Book detail — hero + iframe deck (or MDX fallback)
│   ├── gallery/page.tsx                      # Masonry photo gallery
│   ├── globals.css                           # Tailwind + shadcn CSS vars + light/dark themes
│   ├── icon.svg                              # Favicon
│   ├── layout.tsx                            # Root layout — fonts, metadata, theme init
│   ├── not-found.tsx                         # Custom 404
│   ├── opengraph-image.tsx                   # OG image route
│   └── page.tsx                              # Home — passes books[] to HomeClient
├── components/
│   ├── BookCard.tsx                          # Library index row — title, year, summary, lang links, hover cover
│   ├── Cursor.tsx                            # Custom cursor (spring-follow, hidden on touch)
│   ├── FullscreenButton.tsx                  # Fullscreen toggle for deck iframes
│   ├── HomeClient.tsx                        # Home page — hero, slideshow, library index
│   ├── LanguageLink.tsx                      # Language switcher link
│   ├── ScrollReveal.tsx                      # Viewport-triggered fade-up wrapper
│   ├── ThemeToggle.tsx                       # Paper/Dark toggle
│   └── ui/                                   # shadcn components (manual, Tailwind 3)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       └── separator.tsx
├── content/books/
│   ├── deep-work/{index.mdx, index.th.mdx}   # Frontmatter: title, author, year, coverImage, deckUrl, summary
│   └── ultralearning/{index.mdx, index.th.mdx}
├── lib/
│   ├── books.ts                              # MDX loader, BookFrontmatter/Book/BookSummary types
│   └── utils.ts                              # cn() helper
├── public/
│   ├── Deepwork/deep-work-deck*.html         # Legacy decks (iframe source)
│   ├── ultralearning-deck*.html
│   ├── deep-work-cover.jpg                   # Book covers
│   ├── ultralearning-cover.jpg
│   ├── library-*.jpg                         # 8 library photos for slideshow/gallery
│   └── icon.svg
├── tailwind.config.ts                        # Custom colors + shadcn tokens + borderRadius
├── vercel.json                               # { "framework": "nextjs" }
└── HANDOFF.md                                # This file
```

---

## Book frontmatter schema

```yaml
---
title: "Deep Work"
author: "Cal Newport"
year: 2016
cover: "📚"                              # Emoji fallback
coverImage: /deep-work-cover.jpg        # Detail page hero + BookCard hover
deckUrl: /Deepwork/deep-work-deck.html  # Iframe embed (omit for MDX prose)
summary: "One-paragraph hook..."
order: 1                                # Sort order
language: en
---
```

---

## Theme system

- `:root` — dark theme (`#0E0F12` background, cream/rust/amber accents)
- `:root.light` — beige paper theme
- Tailwind tokens map to CSS variables: `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `ring`
- Toggle in `ThemeToggle.tsx` stores to `localStorage.theme`, falls back to `prefers-color-scheme`
- Initial script in `layout.tsx` prevents FOUC

---

## shadcn/ui notes

Manually installed for Tailwind 3 compatibility. Uses Radix primitives (`@radix-ui/react-slot`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-separator`).

Pattern for link-buttons:
```tsx
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
<Link href="/" className={cn(buttonVariants({variant:'ghost',size:'sm'}), 'hover:bg-transparent')}>
  ← Back
</Link>
```

Do NOT use `npx shadcn@latest` — it targets Tailwind v4. The `components.json` file does not exist.

---

## Home page slideshow

`HomeClient.tsx` lines ~122-188. Uses `AnimatePresence` + `motion.img`:
- 8 library images rotate every 4 seconds (`setInterval`)
- Crossfade: 0.8s `easeInOut`
- Ken Burns zoom: `scale: 1 → 1.06` over slide duration
- Floaty sway: `y: [0, -8, 0]`, `rotate: [-0.4, 0.4, -0.4]` (infinite, 6-7s cycle)
- Dark gradient overlay for text readability
- "Library as architecture" links to `/gallery`
- Slide dots: clickable, active dot is wider + cream-colored

On mobile: text and dots stack vertically. On desktop: side-by-side.

---

## Things to watch out for

1. **Tailwind 3, not 4** — shadcn was manually written. No `@theme`, `@custom-variant`, or `data-[state=*]:` variants.
2. **Motion 12 type strictness** — `ease:` must be `[number,number,number,number]` tuple. Variants use `as const`.
3. **MDXRemote is RSC** — never import MDX in client components.
4. **`public/` serves static files** — decks, covers, library photos, favicon all live here. Served at root `/`.
5. **`deckUrl` drives iframe vs MDX** — if set in frontmatter, book page renders iframe. Otherwise renders `MDXRemote`.
6. **Theme toggle uses `localStorage`** — initial script in layout prevents flash. Toggle is client-only.
7. **`feat/nextjs-mdx` branch is stale** — all work is on `main`.
8. **No `components.json`** — shadcn was manual. CLI will target Tailwind v4 and break things.
9. **Book page title uses layout template** — `generateMetadata` returns just `title: frontmatter.title`. Layout adds `" — Kawin's Books"` suffix. Don't double-suffix.
10. **Gallery images are duplicated** — `HomeClient.tsx` and `app/gallery/page.tsx` each define the same 8-image array. Refactor into a shared `lib/images.ts`.

---

## ⚠️ Refactor needed

The codebase has accumulated changes across multiple sessions and needs cleanup before adding more features:

### Immediate

1. **Duplicate image arrays** — `libraryImages` is defined in both `HomeClient.tsx` and `app/gallery/page.tsx`. Extract to `lib/images.ts`.
2. **`HomeClient.tsx` is too large** — 247 lines doing hero, slideshow, library index, and footer. Split into:
   - `components/HeroSection.tsx` — hero text
   - `components/LibrarySlideshow.tsx` — slideshow section  
   - `HomeClient.tsx` — orchestrator
3. **Unused shadcn components** — `card`, `dialog`, `dropdown-menu` are not used anywhere. Either use them or remove.
4. **`components.json` is missing** — if anyone ever needs shadcn CLI, create one manually for Tailwind 3.
5. **`app/opengraph-image.tsx` may be stale** — verify it generates images matching current design.

### When adding more books

6. **BookCard cover hover** — currently `xl:block` only (hidden below 1280px). Consider making it visible on smaller screens.
7. **MDX fallback path** — the MDX prose styling (`.prose-book`) hasn't been tested since decks took over. Remove if unused.
8. **TypeScript strictness** — `getBookSummaries()` has `as ('en' | 'th')[]` casts. Tighten with proper type guards.

### General

9. **Mobile testing** — the slideshow and gallery haven't been tested on real devices. Verify touch targets ≥44px, no horizontal overflow, readable text sizes.
10. **Accessibility** — slideshow needs `aria-live` region for screen readers. Slide dots need larger touch targets on mobile. Gallery images need better `alt` text audit.

---

## Design principles (the vibe)

- Editorial, architectural, premium — not SaaS, not blog, not generic
- Dark mode is the default; light mode is warm beige paper
- Typography does the heavy lifting: Kanit (display/Thai), Instrument Serif (editorial), Lexend (body)
- Motion is subtle — scroll reveals, crossfades, gentle sways. No bounce, no spin, no theater.
- Images are real library architecture photos. No stock, no illustration, no AI-generated.
- Links are typographic, not button-shaped. The few buttons (language switchers, back links) use shadcn `ghost` variant with `hover:bg-transparent`.

---

## Quick commands

```bash
npm run dev -- --port 3001    # Local dev
npm run build                 # Production build
git push origin main          # Deploy (Vercel auto-deploys)

# After deploy, update alias:
vercel alias set <deploy-url>.vercel.app kawinsbooks.vercel.app --scope kawin-s-projects1
```

---

**Last updated:** June 15, 2026  
**Current commit:** `c087ae7` (main)
