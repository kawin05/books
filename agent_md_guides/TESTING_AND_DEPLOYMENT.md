# Testing and Deployment Checklist for AI Agents

## Purpose

This file tells agents what to check before considering the website ready.

A website is not finished just because the code compiles. It must work across devices, browsers, and real content conditions.

---

## Basic Commands

Run these before final delivery:

```bash
npm run lint
npm run build
```

If tests exist:

```bash
npm test
```

If formatting is configured:

```bash
npm run format
```

---

## Manual Browser Testing

Check the website in a browser.

Test:

```txt
Homepage
Projects page
Individual project pages
About page
Contact section
Mobile menu
Footer links
External links
Download links
Contact form
Language switcher, if any
```

---

## Responsive Testing

Check these widths:

```txt
375px mobile
430px large mobile
768px tablet
1024px laptop
1440px desktop
1920px large desktop
```

Look for:

```txt
Horizontal overflow
Text too large
Text too small
Broken grids
Images cropped badly
Menu not working
Buttons too small
Content too cramped
```

---

## Content Stress Tests

Test with imperfect content.

Examples:

```txt
Very long project title
Missing project image
Many project images
Only one project image
Long description
Empty category
Different year formats
Long location name
```

The website should not break.

---

## Performance Checks

For image-heavy portfolio sites, check:

```txt
Image file size
Use of Next.js Image
Lazy loading
Unused JavaScript
Unused packages
Font loading
Animation performance
```

Recommendations:

```txt
Use WebP or AVIF
Compress images
Avoid giant images over 5MB
Avoid too many heavy animation libraries
Use next/image where possible
```

---

## Accessibility Checks

Check:

```txt
[ ] Page has one main h1
[ ] Headings are in logical order
[ ] Images have alt text
[ ] Buttons have readable labels
[ ] Links describe where they go
[ ] Keyboard navigation works
[ ] Focus states are visible
[ ] Text contrast is readable
[ ] Mobile menu can be closed
[ ] Forms have labels
```

---

## SEO Checks

For a portfolio website, check:

```txt
Page title
Meta description
Open Graph image
Project page metadata
Clean URLs
Sitemap if needed
Robots file if needed
Alt text on images
```

Project URLs should be readable:

```txt
/projects/casa-miquel
/projects/interior-studio
```

Avoid random URLs like:

```txt
/projects/item-123
```

---

## Deployment

Recommended deployment:

```txt
Vercel
```

Before deploying:

```txt
[ ] Environment variables are set
[ ] Build passes locally
[ ] No secrets are committed
[ ] Images are optimized
[ ] Production URL works
[ ] Contact form works
[ ] CMS webhook works, if using CMS
```

---

## Environment Variables

Never hardcode secrets in code.

Use:

```txt
.env.local
Vercel environment variables
```

Never commit:

```txt
API keys
CMS tokens
Private URLs
Email service secrets
Database credentials
```

---

## Final Delivery Checklist

Before saying the task is complete:

```txt
[ ] npm run lint passes
[ ] npm run build passes
[ ] No TypeScript errors
[ ] No obvious console errors
[ ] Mobile tested
[ ] Desktop tested
[ ] Navigation tested
[ ] Images optimized
[ ] Accessibility checked
[ ] SEO basics checked
[ ] README updated
[ ] Changes summarized
```

---

## Final Agent Response Template

Use this format:

```txt
Completed:
- ...

Tested:
- npm run lint: passed / failed / not run
- npm run build: passed / failed / not run
- Mobile check: passed / not run
- Desktop check: passed / not run

Notes:
- ...
```
