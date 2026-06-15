# AGENTS.md — Code Quality Instructions for AI Agents

## Purpose

This project (Kawin's Books — kawinsbooks.vercel.app) is a personal book-summary archive. AI agents modify it. The goal: keep it clean, maintainable, fast, and easy to add books to.

Agents must prioritize:

1. Correct behavior
2. Clean structure
3. Reusable components
4. Consistent styling (dark/paper theme)
5. Type safety
6. Mobile and desktop responsiveness
7. Performance
8. Accessibility
9. Clear documentation

Do not make large messy changes unless requested.

---

## Golden Rules

### 1. Do not change visual behavior unless asked

When refactoring, preserve the existing design, layout, animations, and user experience.

If a change affects visuals, explain it clearly.

### 2. Prefer small focused changes

Avoid rewriting the entire project unless the user asks for a full rebuild.

Good changes:
- split a large component into smaller components
- rename unclear variables
- remove duplicated code
- move repeated styles into reusable components
- add TypeScript types
- improve file organization

Bad changes:
- replacing the whole stack
- changing the design direction
- removing features silently
- adding unnecessary packages
- over-engineering simple pages

### 3. Keep files readable

Avoid files over 300 lines when possible.

### 4. Use clear names

Bad: `Box`, `Thing`, `Section1`, `ComponentA`
Good: `HeroSection`, `BookCard`, `LibrarySlideshow`, `GalleryGrid`, `ThemeToggle`

### 5. Reuse components

Components shared across pages: `Footer`, `ThemeToggle`, `Cursor`, `ScrollReveal`, `AnimatedGridPattern`.

### 6. Move content out of UI

Book data lives in `content/books/<slug>/index.mdx` with frontmatter. Image arrays live in `lib/images.ts`. Never hardcode content in components.

### 7. Keep styling consistent

Use Tailwind classes consistently. The project has a custom theme with CSS variables:
- `text-primary`, `text-secondary`, `text-muted`
- `bg`, `bg-deep`, `bg-raised`
- `border`, `border-subtle`
- `accent-cream`, `accent-rust`, `accent-amber`

### 8. Avoid unnecessary dependencies

Before adding a package, ask: is this really needed? Removed 3 unused Radix packages during refactor. Keep it lean.

### 9. Always check mobile and desktop

Every layout must work on mobile, tablet, laptop, and large desktop.

### 10. Run checks before finishing

```bash
npm run build
```

(ESLint not configured yet — `next lint` prompts interactively.)

---

## Preferred Stack

```
Next.js 15.5 (App Router)
React 19
TypeScript 5.7
Tailwind CSS 3.4
shadcn/ui (manual, TW3-compatible — do NOT use CLI)
Motion 12
MDX v6 (next-mdx-remote)
Vercel for deployment
```

Do not switch the stack without permission.

---

## Project Structure (actual)

```
books/
├── app/
│   ├── books/[slug]/[[...lang]]/page.tsx   # Book detail — hero + iframe deck (or MDX fallback)
│   ├── gallery/page.tsx                     # Masonry photo gallery with PixelImage
│   ├── globals.css                          # Tailwind + CSS vars + dark/paper themes
│   ├── layout.tsx                           # Root layout — fonts, metadata, theme init, AnimatedGridPattern
│   ├── not-found.tsx                        # Custom 404
│   ├── opengraph-image.tsx                  # OG image route
│   └── page.tsx                             # Home → passes books[] to HomeClient
│
├── components/
│   ├── AnimatedGridPattern.tsx              # SVG grid background (skewed, masked, animated squares)
│   ├── BookCard.tsx                         # Library index row — title, year, summary, lang links, hover cover
│   ├── Cursor.tsx                           # Custom spring-follow cursor (hidden on touch)
│   ├── Footer.tsx                           # Shared footer — home variant or backLink variant
│   ├── FullscreenButton.tsx                 # ShinyButton-based fullscreen toggle
│   ├── GalleryGrid.tsx                      # Client masonry grid using PixelImage
│   ├── HeroSection.tsx                      # Home hero — typewriter "Let's read together."
│   ├── HomeClient.tsx                       # Home orchestrator — nav + hero + slideshow + library index
│   ├── LanguageLink.tsx                     # EN/TH language switcher
│   ├── LibrarySlideshow.tsx                 # Image slideshow with Ken Burns + crossfade + dots
│   ├── PixelImage.tsx                       # Pixel-reveal image (clip-path grid, grayscale→color)
│   ├── ScrollReveal.tsx                     # Viewport-triggered fade-up wrapper
│   ├── ThemeToggle.tsx                      # Dark/Paper toggle
│   ├── TypewriterText.tsx                   # Typing animation (reusable, accepts className)
│   └── ui/
│       ├── button.tsx                       # shadcn button (only one kept after cleanup)
│       └── shiny-button.tsx                 # Glossy animated button (spring shine effect)
│
├── content/books/
│   ├── deep-work/{index.mdx, index.th.mdx}
│   └── ultralearning/{index.mdx, index.th.mdx}
│
├── lib/
│   ├── books.ts                             # MDX loader + BookFrontmatter/Book/BookSummary types
│   ├── images.ts                            # Shared libraryImages array (11 photos)
│   └── utils.ts                             # cn() helper
│
├── public/
│   ├── Deepwork/deep-work-deck*.html        # Legacy HTML slide decks (iframe source)
│   ├── ultralearning-deck*.html
│   ├── *-cover.jpg                          # Book covers
│   └── library-*.jpg                        # 11 library architecture photos
│
├── HANDOFF.md                               # Living project state document
├── tailwind.config.ts                       # Custom colors + shadcn tokens + font families
├── vercel.json                              # { "framework": "nextjs" }
└── package.json
```

---

## Book Frontmatter Schema

```yaml
---
title: "Deep Work"
author: "Cal Newport"
year: 2016
cover: "📚"                              # Emoji fallback (currently unused)
coverImage: /deep-work-cover.jpg        # Detail page hero + BookCard hover
deckUrl: /Deepwork/deep-work-deck.html  # Iframe embed (omit for MDX prose)
summary: "One-paragraph hook..."
order: 1                                # Sort order
language: en
---
```

---

## Theme System

- `:root` — dark theme (`#0E0F12` background, cream/rust/amber accents)
- `:root[data-theme="light"]` — beige paper theme
- Tailwind tokens map to CSS variables: `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `ring`
- Toggle in `ThemeToggle.tsx` stores to `localStorage.theme`
- Initial script in `layout.tsx` prevents FOUC by reading `data-theme` before paint

---

## Refactoring Checklist

1. Confirm the current behavior
2. Identify large files
3. Identify duplicated code
4. Identify unclear names
5. Split large files into components
6. Move data/content out of UI components
7. Add or improve TypeScript types
8. Standardize styling
9. Remove unused imports/files/packages
10. Run build check
11. Summarize what changed

---

## What Not To Do

Do not:
- silently delete features
- rewrite working code without reason
- add complex architecture for a small website
- mix many styling systems
- ignore TypeScript errors
- leave console logs
- leave commented-out dead code
- hardcode secrets or API keys
- make accessibility worse
- break mobile layout
- run `npx shadcn@latest` (targets Tailwind v4, breaks TW3 setup)
- modify `globals.css` color variables without understanding the theme cascade
