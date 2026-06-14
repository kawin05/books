# Design System Guide for Portfolio Website Agents

## Purpose

This file helps agents keep the website visually consistent.

The target style is a premium architecture / portfolio website:

- minimal
- elegant
- image-focused
- editorial
- spacious
- responsive
- subtle animation
- clean typography

---

## Design Principles

### 1. Less decoration, more space

Do not over-design.

Prefer:

- whitespace
- clean grids
- large images
- simple typography
- subtle interactions

Avoid:

- too many colors
- heavy shadows
- random gradients
- noisy backgrounds
- excessive animations

### 2. Images are the main visual element

For architecture and portfolio sites, images should feel premium.

Use:

- large image sections
- clean cropping
- consistent aspect ratios
- optimized files
- meaningful alt text

### 3. Typography should feel calm and confident

Use simple font hierarchy.

Example scale:

```txt
Hero title: text-5xl to text-7xl
Page title: text-4xl to text-6xl
Section title: text-2xl to text-4xl
Body text: text-base to text-lg
Caption/meta: text-sm
```

### 4. Layout should be responsive by default

Design mobile first.

Example:

```txt
Mobile: one column
Tablet: two columns
Desktop: three or four columns
```

Use Tailwind breakpoints:

```txt
sm
md
lg
xl
2xl
```

---

## Suggested Layout Components

Create reusable layout components:

```txt
Container
Section
SectionTitle
PageHeader
ProjectCard
ProjectGrid
ProjectGallery
```

Example:

```tsx
<Section>
  <Container>
    <SectionTitle>Selected Projects</SectionTitle>
    <ProjectGrid projects={projects} />
  </Container>
</Section>
```

---

## Spacing Guidelines

Keep spacing consistent.

Suggested defaults:

```txt
Page horizontal padding mobile: px-4 or px-6
Page horizontal padding desktop: lg:px-12 or xl:px-16

Section vertical padding mobile: py-16
Section vertical padding desktop: md:py-24 or lg:py-32

Grid gap mobile: gap-6
Grid gap desktop: gap-8 or gap-12
```

---

## Color Guidelines

For a minimal architecture website, prefer:

```txt
Background: white, off-white, near-black
Text: near-black, gray
Accent: one subtle accent color only
Borders: soft neutral gray
```

Avoid using too many accent colors.

---

## Animation Guidelines

Animations should feel premium, not distracting.

Good animations:

- fade up on scroll
- slow image reveal
- hover image scale
- page transition fade
- menu slide
- subtle text reveal

Avoid:

- bouncing
- spinning
- constant movement
- too many delays
- animations that block usability

Preferred animation tools:

```txt
Motion
Lenis for smooth scrolling
GSAP only when truly needed
```

---

## Interaction Guidelines

### Project cards

Project cards should include:

```txt
Image
Project title
Category
Location
Year
```

Hover effects can include:

```txt
subtle image scale
title underline
opacity change
cursor change
```

### Navigation

Navigation should be simple:

```txt
Projects
About
Concept
Team
Contact
```

Mobile navigation should be easy to open and close.

### Contact section

Keep contact simple:

```txt
Email
Phone
Location
Social links
Contact form if needed
```

---

## Do Not

Do not:

- use many font families
- add random colors
- use inconsistent card designs
- mix different button styles
- use complex effects without purpose
- make desktop look good but mobile broken
- make animations too fast or too playful
- use huge unoptimized images

---

## Visual QA Checklist

Before finishing, check:

```txt
[ ] Layout feels consistent
[ ] Typography hierarchy is clear
[ ] Images look high quality
[ ] Spacing is not cramped
[ ] Mobile layout is clean
[ ] Desktop layout is clean
[ ] Navigation is simple
[ ] Animations are subtle
[ ] Colors are consistent
[ ] No random one-off styles
```
