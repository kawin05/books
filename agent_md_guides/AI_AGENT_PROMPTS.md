# Useful Prompts for AI Agents — Kawin's Books

Use these prompts when asking an AI agent to clean, refactor, or extend this book-summary project.

---

## Full Code Review Prompt

```txt
Review this Next.js book-summary site for code quality, maintainability, performance,
responsive design, accessibility, and future scalability.

Do not rewrite code yet.

Return:
1. Biggest problems
2. Quick wins
3. Files that should be refactored
4. Unused or duplicated code
5. Suggested improvements
6. Risks before deployment
```

---

## Safe Refactor Prompt

```txt
Refactor this code safely.

Rules:
- Keep the visual design exactly the same
- Keep all behavior the same
- Do not remove features
- Split large files into smaller components
- Improve naming
- Remove duplicated code
- Add TypeScript types where useful
- Do not add new packages unless necessary
- Respect dark/paper theme system
- Never run `npx shadcn@latest` (targets TW4, breaks TW3 setup)
- Explain every major change
```

---

## Add a Book Prompt

```txt
Add a new book to this site.

Book details:
- Title: [title]
- Author: [author]
- Year: [year]
- Summary: [one-paragraph hook]
- Cover image: [path in public/]
- HTML deck URL: [path in public/] (optional — omit for MDX prose)
- Order: [sort number]

Create the MDX file(s) and any language variants needed.
The site auto-discovers new books from content/books/ — no config changes required.
```

---

## Component Extraction Prompt

```txt
This file is too large. Split it into clean reusable components.

Rules:
- Keep the page looking exactly the same
- Create components with clear names
- Keep props simple
- Move repeated UI into reusable components
- Do not change styling unless required
- Return the new file structure
```

---

## Tailwind Cleanup Prompt

```txt
Clean up the Tailwind classes in this project.

Goals:
- Use theme tokens: text-primary, text-secondary, text-muted, bg, bg-deep, bg-raised,
  border, border-subtle, accent-cream, accent-rust, accent-amber
- Make spacing consistent
- Remove duplicated class patterns
- Improve responsive behavior
- Keep the same visual design
- Do not introduce a new styling system
```

---

## Theme / Dark Mode Prompt

```txt
The project has a dark/paper theme system controlled by CSS variables and a ThemeToggle.
Dark mode is default. Paper mode is light beige.

When adding components:
- Use theme tokens, not hardcoded colors
- Test in both modes
- The initial script in layout.tsx prevents FOUC
- Theme is stored in localStorage.theme
- The <html> element uses data-theme="dark" or data-theme="light"
```

---

## Performance Prompt

```txt
Review this website for performance problems.

Focus on:
- image optimization (library photos are 50KB–1MB)
- large JavaScript bundles
- unnecessary packages
- animation performance (Motion 12, PixelImage, AnimatedGridPattern)
- layout shift
- slow loading pages

Give specific fixes and explain which are most important.
```

---

## Accessibility Prompt

```txt
Review this website for accessibility issues.

Check:
- headings (home has no visible h1 — verify screen reader experience)
- image alt text (library photos, book covers, gallery)
- buttons and links
- keyboard navigation
- focus states
- color contrast (dark theme: cream #F0EBE0 on #0E0F12)
- mobile menu behavior
- PixelImage alt text per grid piece
- AnimatedGridPattern has aria-hidden="true"
```

---

## README Generation Prompt

```txt
Create or improve the README for this project.

Include:
- project overview (Kawin's Books — personal book-summary archive)
- tech stack (Next.js 15, React 19, TypeScript, Tailwind 3.4, Motion 12, MDX)
- how to install and run locally (npm install, npm run dev -- --port 3001)
- folder structure
- how to add a new book
- how to add a Thai translation
- theme system (dark/paper)
- how to deploy (git push origin main → Vercel auto-deploy)
- common commands
```
