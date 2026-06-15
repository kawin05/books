# Refactoring Guide — Kawin's Books

## What Refactoring Means

Refactoring means improving the internal structure of code without changing what the user sees.

The site should look and behave the same after refactoring, but the code should become:
- easier to read
- easier to edit
- easier to debug
- easier to extend (add books)
- less repetitive
- more consistent

---

## Refactoring Priorities

### Priority 1: Confirm the site works

```bash
npm install
npm run build
```

If build fails, fix that first — don't refactor broken code.

### Priority 2: Commit before major changes

```bash
git add .
git commit -m "checkpoint before refactor"
```

### Priority 3: Follow the checklist

1. Confirm current behavior
2. Identify large files (>200 lines is a flag)
3. Identify duplicated code
4. Identify unclear names
5. Split large files into components
6. Move data/content out of UI components
7. Add or improve TypeScript types
8. Standardize styling (use theme tokens)
9. Remove unused imports/files/packages
10. Run `npm run build`
11. Summarize what changed

---

## Component Rules

### Keep components focused

A component should have one clear job.

Good:
```
BookCard
LibrarySlideshow
HeroSection
GalleryGrid
Footer
ThemeToggle
```

Bad:
```
EverythingSection
MainComponent
PageStuff
```

### Avoid deeply nested JSX

If JSX becomes hard to read, extract smaller components.

### Prefer props over duplicated code

Instead of copying markup, pass data through props.

---

## Data Cleanup

### Book data lives in content/

```
content/books/<slug>/index.mdx       (English)
content/books/<slug>/index.th.mdx    (Thai)
```

Frontmatter: `title`, `author`, `year`, `coverImage`, `deckUrl`, `summary`, `order`.

### Image data lives in lib/

`lib/images.ts` — shared `libraryImages` array used by HomeClient slideshow and GalleryGrid.

---

## TypeScript Cleanup

Types are in `lib/books.ts`:
```ts
BookFrontmatter  // Raw MDX frontmatter
Book             // Full book with content
BookSummary      // Listing-optimized subset
```

Add types for new data structures here. Use type guards over `as` casts.

---

## Styling Cleanup

### Use theme tokens

Always use Tailwind classes that map to CSS variables:
- Text: `text-text-primary`, `text-text-secondary`, `text-text-muted`
- Background: `bg-bg`, `bg-bg-deep`, `bg-bg-raised`
- Borders: `border-border`, `border-border-subtle`
- Accents: `text-accent-cream`, `text-accent-rust`, `text-accent-amber`

Never hardcode colors like `text-gray-400`.

### Use Tailwind consistently

Avoid mixing Tailwind with inline styles or random CSS. Inline styles are acceptable only for dynamic values (e.g., `clipPath`, `transitionDelay`).

---

## Animation Cleanup

Animations should feel subtle and intentional.

Preferred:
- Motion 12 for React animations
- Spring physics for interactive elements (cursor, shiny button)
- Cubic-bezier(0.16, 1, 0.3, 1) for scroll reveals

Avoid:
- Adding new animation libraries
- Over-animating (bounce, spin, constant movement)
- Blocking usability with animations

---

## Performance Cleanup

The site is image-heavy (11 library photos, 2 book covers).

Check:
- Image sizes (some library photos are 1MB+)
- Use of `<img>` vs `next/image` (currently `<img>` — intentional for now)
- Lazy loading on gallery
- Unused packages
- Animation performance (Motion 12 is tree-shakeable)

---

## shadcn/ui Notes

- Manually installed for Tailwind 3 compatibility
- Only `button.tsx` and `shiny-button.tsx` remain
- Pattern for link-buttons:
  ```tsx
  <Link href="/" className={cn(buttonVariants({variant:'ghost',size:'sm'}), 'hover:bg-transparent')}>
  ```
- NEVER run `npx shadcn@latest` — targets TW4, breaks the project

---

## Theme System Gotchas

- CSS variables use `rgba()` format with built-in alpha
- Tailwind opacity modifiers (`/5`, `/10`) don't work on `rgba()` CSS variables — use `opacity-*` classes instead
- Dark theme variables are in `:root`
- Light theme overrides are in `:root[data-theme="light"]`
- Theme is set via `data-theme` attribute on `<html>`

---

## Final Refactor Checklist

```
[ ] Site still looks the same
[ ] Dark mode works
[ ] Paper mode works
[ ] Mobile layout works
[ ] Desktop layout works
[ ] Large files split
[ ] Repeated code removed
[ ] Components have clear names
[ ] Book data in content/, not UI
[ ] Image data in lib/images.ts
[ ] TypeScript types added/improved
[ ] Unused imports removed
[ ] Unused files removed
[ ] Console logs removed
[ ] npm run build passes
[ ] HANDOFF.md updated
```
