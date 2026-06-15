# Testing and Deployment — Kawin's Books

## Build

```bash
npm run build
```

Must pass with zero errors. All 7 static pages must generate successfully.

(ESLint not configured — `npm run lint` prompts interactively and cannot run non-interactively.)

---

## Routes

| Route | Type | What |
|---|---|---|
| `/` | Static | Home — hero + slideshow + library index |
| `/books/deep-work` | SSG | Deep Work EN |
| `/books/deep-work/th` | SSG | Deep Work TH |
| `/books/ultralearning` | SSG | Ultralearning EN |
| `/books/ultralearning/th` | SSG | Ultralearning TH |
| `/gallery` | Static | 11 library photos in masonry grid |
| `/icon.svg` | Static | Favicon |
| `/opengraph-image` | Static | OG image route |

---

## Local Development

```bash
npm run dev -- --port 3001
```

---

## Deployment

**Platform:** Vercel (team: `kawin-s-projects1`)

**Auto-deploy:** Push to `main` triggers Vercel deploy.

**Domain alias:** After each deploy, update the alias:
```bash
npx vercel list --scope kawin-s-projects1                          # find latest deploy URL
npx vercel alias set <deploy-url> kawinsbooks.vercel.app --scope kawin-s-projects1
```

**Live:** https://kawinsbooks.vercel.app

---

## Manual Browser Testing

Check these pages:
- Homepage — hero typewriter, slideshow, library index, footer
- `/books/deep-work` — hero + iframe deck + fullscreen button
- `/books/deep-work/th` — Thai version
- `/books/ultralearning` — hero + iframe deck
- `/gallery` — PixelImage reveals on all 11 photos

---

## Responsive Testing

Check these widths:
```
375px  mobile
768px  tablet
1440px desktop
```

Look for:
- Horizontal overflow
- Text too large/small
- Broken grids (library index 12-col, gallery masonry)
- Slideshow dots positioning
- BookCard hover cover visibility (xl+ only)

---

## Theme Testing

Toggle Dark ↔ Paper on every page. Check:
- Text contrast readable in both modes
- Border visibility
- Background colors
- Accent colors (cream/rust/amber)
- AnimatedGridPattern visibility
- PixelImage grayscale→color transition
- No FOUC on page load

---

## Performance Checks

- Library photos: some are 500KB–1MB. Consider compression.
- Gallery: 11 PixelImage components each rendering 24 grid pieces = 264 DOM elements.
- AnimatedGridPattern: 40 animated squares + SVG pattern.
- Motion 12 is tree-shakeable — only imported features are bundled.
- Book pages are SSG (static), no runtime data fetching.

---

## Accessibility Checks

```
[ ] Images have alt text (gallery, slideshow, book covers)
[ ] Slide dots have aria-label
[ ] Fullscreen button has aria-label
[ ] Theme toggle has aria-label
[ ] Keyboard navigation works
[ ] Focus states visible in both themes
[ ] Text contrast meets WCAG AA
[ ] AnimatedGridPattern is aria-hidden
```

---

## Environment Variables

None required. The project uses no external APIs or secrets.

---

## Quick Commands

```bash
npm run dev -- --port 3001    # Local dev
npm run build                 # Production build check
git push origin main          # Deploy (Vercel auto-deploys)

# After deploy, update alias:
npx vercel list --scope kawin-s-projects1
npx vercel alias set <deploy-url>.vercel.app kawinsbooks.vercel.app --scope kawin-s-projects1
```

---

## Final Delivery Checklist

```
[ ] npm run build passes
[ ] No TypeScript errors
[ ] No console errors
[ ] Dark mode tested
[ ] Paper mode tested
[ ] Mobile tested
[ ] Desktop tested
[ ] All routes accessible
[ ] Images load correctly
[ ] PixelImage reveals work
[ ] Animated grid visible
[ ] Fullscreen button works
[ ] Theme toggle works
[ ] HANDOFF.md updated
[ ] Changes committed and pushed
```
