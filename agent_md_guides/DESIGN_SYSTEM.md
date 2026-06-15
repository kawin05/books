# Design System — Kawin's Books

## Purpose

This file documents the visual design system so agents keep the site consistent.

The target style: **editorial library archive** — dark by default, warm paper light mode, typography-driven, architectural imagery, subtle motion.

---

## Design Principles

### 1. Typography does the heavy lifting

Three fonts:
- **Kanit** (display) — Thai + English headings, uppercase, light weight
- **Instrument Serif** (serif) — editorial quotes, italic accents
- **Lexend** (body) — readable body text

Hero text uses `clamp()` for fluid scaling: `text-[clamp(1.8rem,6vw,5rem)]`

### 2. Dark is default, paper is warm

Dark theme: `#0E0F12` background, cream `#F0EBE0` text, rust `#C85D4E` and amber `#E8B85C` accents.

Paper theme: warm beige background, dark brown text, same accent colors.

Theme toggle stores in `localStorage.theme`, initial script prevents flash.

### 3. Images are real library architecture

All 11 gallery/slideshow photos are real library interiors. No stock, no AI-generated, no illustration.

Book covers are actual book cover images.

### 4. Motion is subtle and editorial

- Scroll reveals: fade-up, 0.9s, cubic-bezier(0.16,1,0.3,1)
- Slideshow: 4s crossfade, Ken Burns zoom 1→1.06, floaty sway
- Cursor: spring-follow dot, hidden on touch
- PixelImage: clip-path grid reveal, grayscale→color bloom
- AnimatedGridPattern: angled 12°, 40 squares pulsing 0→25% on a 5%-opacity L-corner grid
- ShinyButton: spring-animated `--x` CSS variable for glossy border sweep

No bounce, no spin, no theater.

### 5. Links are typographic, not button-shaped

- Language switchers use underline-on-hover
- "Back to library" links use transition-colors
- Only the fullscreen button uses a visible button shape (ShinyButton)

---

## Color Tokens

Always use these Tailwind tokens — never hardcode colors:

| Token | Dark value | Paper value | Usage |
|---|---|---|---|
| `text-primary` | `#F0EBE0` | dark brown | Main text, headlines |
| `text-secondary` | cream at 70% | dark at 70% | Body, secondary info |
| `text-muted` | cream at 40% | dark at 48% | Labels, captions, meta |
| `bg` | `#0E0F12` | warm beige | Page background |
| `bg-deep` | darker | — | Overlay backgrounds |
| `bg-raised` | slightly lighter | — | Card backgrounds |
| `border` | cream at 10% | dark at 10% | Default borders |
| `border-subtle` | cream at 6% | dark at 6% | Subtle borders |
| `accent-cream` | `#F0EBE0` | — | Highlights, hover states |
| `accent-rust` | `#C85D4E` | — | Accent labels |
| `accent-amber` | `#E8B85C` | — | Secondary accent |

---

## Typography Scale

```
Hero:       text-[clamp(1.8rem,6vw,5rem)] font-light uppercase leading-[0.85]
Page title: text-[clamp(2.5rem,6vw,6rem)] font-light uppercase leading-[0.9]
BookCard:   text-[clamp(2.25rem,5vw,5.75rem)] font-light uppercase leading-[0.9]
Section:    font-display text-[10px] uppercase tracking-[0.26em]
Body:       font-body text-sm leading-relaxed
Serif:      font-serif text-3xl italic leading-tight
Caption:    font-display text-[9px] uppercase tracking-[0.28em]
```

---

## Spacing Guidelines

```
Page horizontal padding:  px-6 sm:px-12
Section vertical:         pt-28 pb-16 (hero), py-20 (method)
Container max-width:      max-w-[1600px]
Grid gap:                 gap-8
```

---

## Component Patterns

### Navigation
Fixed top, `mix-blend-difference`, `justify-end` (right-aligned, no logo/wordmark).

### Footer
Shared `Footer` component — two variants:
- `backLink={false}` (home): copyright left, "Bangkok / Online" right
- `backLink` (pages): "Back to library" link left, copyright right

### BookCard
12-column grid row with index number, title (linked), year, summary, language links, hover cover reveal (xl+).

### Cards (shadcn)
Only `button.tsx` and `shiny-button.tsx` remain. All other shadcn components were removed.

---

## Animation Presets

```ts
// Scroll reveal
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
}

// BookCard stagger
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
}
```

---

## Do Not

- Add random colors — use theme tokens
- Mix font families — Kanit/Serif/Lexend only
- Add heavy animations — subtle and editorial only
- Use `npx shadcn@latest` — targets Tailwind v4, breaks TW3 setup
- Hardcode `rgba()` colors — use CSS variables or Tailwind tokens
- Add packages without explicit approval
