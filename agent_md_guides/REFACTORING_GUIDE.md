# Refactoring Guide for AI-Generated Website Code

## What Refactoring Means

Refactoring means improving the internal structure of code without changing what the user sees.

The website should look and behave the same after refactoring, but the code should become:

- easier to read
- easier to edit
- easier to debug
- easier to extend
- less repetitive
- more consistent

---

## Refactoring Priorities

### Priority 1: Make sure the site works

Before refactoring, confirm the website currently runs.

Use:

```bash
npm install
npm run dev
```

Then check the main pages in the browser.

### Priority 2: Commit before major changes

Before large refactors, create a Git commit.

Example:

```bash
git add .
git commit -m "checkpoint before refactor"
```

This makes it easy to recover if the refactor breaks something.

### Priority 3: Split large files

AI-generated code often puts too much into one file.

If `page.tsx` contains many sections, split it.

Before:

```txt
app/page.tsx
```

After:

```txt
components/sections/HeroSection.tsx
components/sections/FeaturedProjects.tsx
components/sections/AboutSection.tsx
components/sections/ContactSection.tsx
app/page.tsx
```

The page should mostly compose sections:

```tsx
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <AboutSection />
      <ContactSection />
    </>
  );
}
```

---

## Component Rules

### Keep components focused

A component should have one clear job.

Good:

```txt
ProjectCard
ProjectGrid
ProjectGallery
MobileMenu
ContactForm
```

Bad:

```txt
EverythingSection
MainComponent
PageStuff
```

### Avoid deeply nested JSX

If JSX becomes hard to read, extract smaller components.

### Prefer props over duplicated code

Instead of copying the same card layout multiple times, pass data through props.

Example:

```tsx
<ProjectCard project={project} />
```

---

## Data Cleanup

### Move repeated content into data files

For portfolio websites, move project data to a file like:

```txt
src/data/projects.ts
```

Example:

```ts
export const projects = [
  {
    title: "Casa Miquel",
    slug: "casa-miquel",
    category: "Housing",
    location: "Spain",
    year: "2024",
    images: ["/images/projects/casa-miquel-1.jpg"],
  },
];
```

### Use CMS later if content changes often

If the owner will add projects regularly, use a CMS such as:

- Sanity
- Payload CMS
- Strapi
- WordPress Headless

---

## TypeScript Cleanup

Create shared types.

Example:

```ts
export type Project = {
  title: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  description?: string;
  images: string[];
};
```

Use types in components:

```tsx
type ProjectCardProps = {
  project: Project;
};
```

---

## Styling Cleanup

### Use Tailwind consistently

Avoid mixing:

- Tailwind
- inline styles
- random CSS files
- CSS modules
- component library styles

Pick a clean pattern and stay consistent.

### Create reusable layout components

Useful components:

```txt
Container
Section
SectionTitle
PageHeader
```

Example:

```tsx
<Section>
  <Container>
    <SectionTitle>Projects</SectionTitle>
  </Container>
</Section>
```

### Standardize spacing

Choose consistent spacing for sections.

Example:

```txt
Mobile section padding: py-16
Desktop section padding: md:py-24 or lg:py-32
```

---

## Animation Cleanup

Animations should feel subtle and intentional.

Create reusable animation presets:

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
```

Avoid adding heavy animation libraries unless needed.

Preferred:

```txt
Motion for most React animations
Lenis for smooth scrolling if needed
GSAP only for complex advanced animations
```

---

## Performance Cleanup

Architecture and portfolio sites are image-heavy.

Check:

- image sizes
- image format
- lazy loading
- use of Next.js `<Image />`
- unnecessary JavaScript
- unused packages
- large animation libraries

Recommended:

```txt
Use WebP or AVIF
Compress large images
Use next/image
Avoid 5MB+ images
Lazy-load galleries
```

---

## Accessibility Cleanup

Check:

- headings use correct order
- links are real links
- buttons are buttons
- images have useful alt text
- mobile menu can be opened and closed by keyboard
- text contrast is readable
- focus states are visible

---

## Final Refactor Checklist

Use this before marking the refactor done:

```txt
[ ] Site still looks the same
[ ] Mobile layout works
[ ] Desktop layout works
[ ] Large files split
[ ] Repeated code removed
[ ] Components have clear names
[ ] Project data moved out of UI
[ ] TypeScript types added
[ ] Unused imports removed
[ ] Unused files removed
[ ] Console logs removed
[ ] npm run lint checked
[ ] npm run build checked
[ ] README updated if needed
```
