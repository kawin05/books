# Handoff — kawin05/books (June 15, 2026)

## TL;DR

A previous session built a full **Next.js 15.5 + MDX + editorial design** rebuild on the `feat/nextjs-mdx` branch. It is **production-ready, builds clean, and matches the Septiembre Arquitectura aesthetic**. It has **never been merged to `main` or deployed** — `kawinsbooks.vercel.app` is still serving the old Vite build from `main`.

The user's most recent direction is: **port the editorial design to look like https://www.septiembrearquitectura.com/** and ship it. The foundation already does this. The missing piece is **shadcn/ui**, which the user explicitly asked for but the previous session skipped.

**Next agent: ship `feat/nextjs-mdx` to production with shadcn/ui wired in.** ~30–45 min of work.

---

## Current state of the repo

### Branches

- **`main`** — Vite + React 19.2 + Motion 12 build, **deployed to kawinsbooks.vercel.app**
  - Lives in `web/` subdirectory
  - 103KB gzipped JS, 3KB CSS
  - 8 commits ahead of original Vite work
- **`feat/nextjs-mdx`** — **Next.js 15.5.19 + React 19.2 + MDX + Motion 12**, **NOT deployed**
  - Full editorial design matching Septiembre Arquitectura
  - 4 static pages generated, 150KB First Load JS on home
  - MDX content for 2 books in 2 languages (534 lines)
  - Build verified working locally

### What `feat/nextjs-mdx` already has

| Piece | File(s) | Status |
|---|---|---|
| Next.js 15.5 App Router | `app/layout.tsx`, `app/page.tsx`, `app/books/[slug]/[[...lang]]/page.tsx` | ✅ Working |
| TypeScript strict | `tsconfig.json` | ✅ |
| Tailwind 3.4 with custom theme | `tailwind.config.ts` | ✅ Custom: rust/amber/cream accents, display-xl fluid type scale |
| Motion 12 | All `components/*.tsx` | ✅ Variants use `as const` + `ease: [number,number,number,number] as [number,number,number,number]` |
| MDX content layer | `lib/books.ts` | ✅ Reads from `content/books/<slug>/index.mdx` + `index.th.mdx` |
| 2 books × 2 langs MDX | `content/books/{deep-work,ultralearning}/index{,.th}.mdx` | ✅ 534 lines written |
| Custom cursor | `components/Cursor.tsx` | ✅ Spring-follow + grow on hover, hidden on touch |
| ScrollReveal primitive | `components/ScrollReveal.tsx` | ✅ Viewport-triggered fade-up, configurable `as` element |
| BookCard editorial layout | `components/BookCard.tsx` | ✅ 12-col grid: year index + title + summary + lang switcher |
| Home page | `components/HomeClient.tsx` + `app/page.tsx` | ✅ Split-line "My / Library" hero, index list |
| Google Fonts via next/font | `app/layout.tsx` | ✅ Kanit (display + Thai), Lexend (body), Instrument_Serif (italic editorial) |
| Bilingual routing | `app/books/[slug]/[[...lang]]/page.tsx` | ✅ `/books/deep-work` (EN), `/books/deep-work/th` (TH) |
| Legacy deck URLs | `public/Deepwork/`, `public/ultralearning-deck*.html` | ✅ Old paths still serve |
| OpenGraph metadata | `app/layout.tsx` | ✅ |

### What's missing

1. **shadcn/ui** — Never installed. User explicitly asked for it.
2. **`vercel.json`** — Currently **empty (0 bytes)**. Will fail to deploy or use wrong config. Needs a proper Next.js Vercel config.
3. **Deployment** — Branch never merged to main, never deployed. Live site is still Vite.
4. **`web/` folder on `feat/nextjs-mdx`** — Dead weight from the Vite attempt. Should be deleted before merge.
5. **`.next/` build artifact** — 135MB sitting in working dir. Already in `.gitignore` (`.next/`) but verify before commit.
6. **shadcn primitives in use** — None yet. The `Button`, `Card`, `Dialog`, `DropdownMenu` components from shadcn could replace the raw `<button>`/`<a>` tags in the back-to-top and language switcher.
7. **GSAP + Lenis** — Considered for smooth scroll. Motion alone is sufficient; skip these.

---

## File layout (target state, post-merge)

```
books/
├── app/
│   ├── books/[slug]/[[...lang]]/page.tsx  # Book detail (EN/TH)
│   ├── globals.css                          # Tailwind + custom utilities
│   ├── layout.tsx                           # next/font, html shell
│   └── page.tsx                             # Home — server component fetches books
├── components/
│   ├── BookCard.tsx                         # Editorial list item
│   ├── Cursor.tsx                           # Custom cursor (client)
│   ├── HomeClient.tsx                       # Home page client wrapper
│   ├── ScrollReveal.tsx                     # Viewport fade-up primitive
│   └── ui/                                  # shadcn components go here
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── content/
│   └── books/
│       ├── deep-work/
│       │   ├── index.mdx                    # 229 lines, English
│       │   └── index.th.mdx                 # 208 lines, Thai
│       └── ultralearning/
│           ├── index.mdx                    # 58 lines, English
│           └── index.th.mdx                 # 39 lines, Thai
├── lib/
│   └── books.ts                             # MDX loader
├── public/
│   ├── Deepwork/                            # Legacy HTML decks (preserved URLs)
│   ├── ultralearning-deck.html
│   └── ultralearning-deck-thai.html
├── components.json                          # shadcn config (added in step 1)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── package.json
├── components.json
├── vercel.json                              # ⚠️ Currently empty — must fix
└── .gitignore
```

---

## Concrete steps to ship (in order)

### Step 1: Set up shadcn/ui

Currently on `feat/nextjs-mdx` branch. Run:

```bash
npx shadcn@latest init
```

When prompted:
- Style: **New York** (editorial feel)
- Base color: **Neutral** or **Stone** (dark-friendly, matches `--bg-default: #0E0F12`)
- CSS variables: **Yes**
- Server Components: **Yes** (Next.js App Router)

This creates:
- `components.json` — shadcn config
- `lib/utils.ts` — cn() helper
- `app/globals.css` updates — shadcn color tokens (auto-merged)

### Step 2: Install the shadcn primitives you'll actually use

```bash
npx shadcn@latest add button card dialog dropdown-menu separator
```

**Skip for now:** form, input, sheet, sidebar, table, etc. (overkill for current scope)

### Step 3: Wire shadcn Button into existing components

Replace raw `<Link>` in:
- `app/books/[slug]/[[...lang]]/page.tsx` — language switcher, back-to-library
- `components/BookCard.tsx` — language links inside the card

Use `<Button variant="ghost" size="sm" asChild>` with the existing `<Link>` as child. This keeps the editorial typography but adds the shadcn primitive for future form/dialog work.

**Don't replace the BookCard's main title link** — that's a custom layout, not a button. Just the language switchers and the back link.

### Step 4: Fix `vercel.json`

Current file is 0 bytes. For Next.js on Vercel, this is usually not needed (Vercel auto-detects), but to be safe and explicit:

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next"
}
```

Or simply delete `vercel.json` entirely — Vercel will detect Next.js and use defaults. **Either works.** The auto-detect path is cleaner.

### Step 5: Clean up dead weight

```bash
# On feat/nextjs-mdx branch
rm -rf web/                     # Dead Vite subdirectory
rm -rf .next/                   # 135MB build artifact
# Make sure .gitignore has these (it does, but verify):
cat .gitignore
# Should include: .next/, node_modules/, web/
```

### Step 6: Build and test locally

```bash
npm run build
npx next start --port 3000
# Test these routes:
#   /                          (200, home)
#   /books/deep-work           (200, English book)
#   /books/deep-work/th        (200, Thai book)
#   /books/ultralearning       (200)
#   /Deepwork/deep-work-deck.html  (200, legacy)
#   /ultralearning-deck.html       (200, legacy)
```

### Step 7: Merge to main, push, deploy

```bash
git checkout main
git merge feat/nextjs-mdx --no-ff -m "feat: Next.js 15 + MDX editorial design with shadcn/ui"
git push origin main
# Vercel auto-deploys
# Update alias:
vercel alias set <new-deployment-url>.vercel.app kawinsbooks.vercel.app
```

### Step 8: Delete the Vite history (optional)

After confirming the new site is live and the user is happy:

```bash
git branch -d feat/nextjs-mdx
git push origin --delete feat/nextjs-mdx
# Optionally: clean up `web/` from main history (don't bother — squashing future commits is fine)
```

---

## How to add a new book (for future agents)

1. Create `content/books/<slug>/index.mdx` (English, required)
2. Optionally create `content/books/<slug>/index.th.mdx` (Thai)
3. Each MDX file needs frontmatter:

```yaml
---
title: "Book Title"
author: "Author Name"
year: 2024
cover: "📚"  # emoji or short label
summary: "One-paragraph hook shown on the home page."
order: 1  # controls sort order on home (lower = first)
---
```

4. Add MDX body (the actual summary content)
5. Commit + push — Vercel auto-builds, new book appears on home + has its own `/books/<slug>` page

**No code changes needed** for new books. Pure content drop-in.

---

## Design system reference (for future agents)

### Color tokens (`tailwind.config.ts`)

| Token | Hex | Use |
|---|---|---|
| `bg.DEFAULT` | `#0E0F12` | Page background |
| `bg.deep` | `#08090B` | Deeper sections, footer |
| `bg.raised` | `#15171B` | Cards, raised surfaces |
| `accent.rust` | `#C85D4E` | Primary accent (labels, hover) |
| `accent.amber` | `#E8B85C` | Secondary accent (italics, highlights) |
| `accent.cream` | `#F0EBE0` | Text, cursor, mix-blend-difference targets |
| `text.primary` | `#F0EBE0` | Main text |
| `text.secondary` | `rgba(240,235,224,0.7)` | Body text |
| `text.muted` | `rgba(240,235,224,0.4)` | Labels, metadata |
| `border.subtle` | `rgba(240,235,224,0.06)` | Section dividers |

### Typography

- **Display** (`font-display`, Kanit): All UI labels, titles, headings
- **Serif** (`font-serif`, Instrument Serif): Italic editorial copy, the "Library" word in hero
- **Body** (`font-body`, Lexend): Paragraphs, footer text
- **Type scale:** `text-display-xl` (clamp 4-9rem), `display-lg` (3-6rem), `display-md` (2-3.5rem)

### Motion conventions

- **Easing:** `[0.16, 1, 0.3, 1]` (smooth ease-out) for almost everything. Always cast as `[number, number, number, number]` tuple.
- **Variants:** Always `as const` on the object literal to satisfy Motion 12 types
- **ScrollReveal:** Default `y: 32, duration: 0.9, delay: configurable`
- **BookCard stagger:** 0.15s between cards, 0.4s initial delay

---

## Things to watch out for

1. **Motion 12 type strictness** — If adding new variants, use the same `as const` + tuple cast pattern. Don't pass plain arrays to `ease:`.
2. **MDX content security** — `next-mdx-remote/rsc` is used in RSC mode. Don't `import()` MDX in client components or you'll break the server boundary.
3. **The `public/` directory** — Anything in here is served as-is. Legacy HTML decks need to stay here for the old `/Deepwork/...` paths to work.
4. **Vercel auto-detects Next.js** — Don't add a custom `buildCommand` unless you need to. Defaults are fine.
5. **Don't accidentally use `app/` route handlers for the legacy decks** — Next.js will try to handle `/Deepwork/deep-work-deck.html` as a route, but since the file exists in `public/`, Vercel serves it as static content. If you see 404s on legacy paths, check the file actually exists in `public/Deepwork/`.
6. **The `.next/` directory is 135MB** — Don't `git add .` blindly. The `.gitignore` already excludes it, but be paranoid.

---

## Quick reference: how to run things

```bash
# Local dev
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
# → http://localhost:3000

# Type check
npx tsc --noEmit

# Add a shadcn component
npx shadcn@latest add <name>

# Deploy
git push origin main
# Vercel auto-detects, builds, and deploys
# Then update the custom domain:
vercel alias set <new-url>.vercel.app kawinsbooks.vercel.app
```

---

## User context (from memory + this session)

- **Prefers English-only** communication
- **Direct, no-nonsense** — wants fix-oriented responses, not theory
- **Budget-conscious** — likes free/self-hosted (MDX over Sanity, Vercel free tier)
- **Tradesman mentality** — trusts but verifies, wants to understand the connection/token flow
- **Hates Vercel dashboard complexity** — keep deployments simple, one clean alias per project
- **Kanit font** is the Thai-language preference
- **Operating system:** Windows 10, uses git-bash/MSYS, Node 26.3.0, npm 11.16.0
- **Product:** "Kawin's Books" — book summaries of non-fiction he's read. Currently Deep Work (Cal Newport) and Ultralearning (Scott Young) in EN + TH.

---

## Open questions (for the user, when they return)

1. Confirm shadcn primitives needed: just `button card dialog dropdown-menu`, or add more (input, textarea, form) for a contact form?
2. Keep `feat/nextjs-mdx` branch name or rename to something like `feat/nextjs-shadcn`?
3. After merge — delete `feat/nextjs-mdx` branch and the `web/` folder from main history, or preserve for rollback?

---

## If something goes wrong

- **Build fails on Motion 12 type error** → check `ease:` is cast as `[number, number, number, number]` tuple and variants use `as const`
- **Fonts not loading** → check `app/layout.tsx` has `${display.variable} ${body.variable} ${serif.variable}` on `<html>` and `tailwind.config.ts` uses `var(--font-*)` not hardcoded names
- **MDX page 404** → check `content/books/<slug>/index.mdx` exists and frontmatter is valid YAML
- **Legacy deck 404** → file must be at `public/Deepwork/deep-work-deck.html` exactly, not at repo root `Deepwork/`
- **Vercel deploy fails** → check `package.json` `build` script is `next build`, not the Vite `vite build` from the dead `web/` subfolder

---

**Handoff written by:** Mark (Hermes agent) on June 15, 2026
**Branch state:** `feat/nextjs-mdx` ready, `main` stale (still Vite)
**Estimated time to ship:** 30–45 minutes if no surprises
