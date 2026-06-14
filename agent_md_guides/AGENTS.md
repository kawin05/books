# AGENTS.md — Code Quality Instructions for AI Agents

## Purpose

This project may be generated or modified by AI agents. The goal is not only to make the website work, but to keep it clean, maintainable, fast, and easy to update in the future.

Agents must prioritize:

1. Correct behavior
2. Clean structure
3. Reusable components
4. Consistent styling
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

Avoid rewriting the entire project unless the user specifically asks for a full rebuild.

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

If a file becomes too large, split it into:

- layout components
- section components
- UI components
- data files
- utility files
- type files

### 4. Use clear names

Bad names:

```ts
Box
Thing
Section1
DataItem
ComponentA
```

Good names:

```ts
HeroSection
ProjectGrid
ProjectCard
ProjectGallery
TeamMemberCard
ContactForm
MobileMenu
```

### 5. Reuse components

If UI appears more than once, consider making it a reusable component.

Examples:

```tsx
<ProjectCard project={project} />
<SectionTitle>Projects</SectionTitle>
<PageContainer>...</PageContainer>
```

### 6. Move content out of UI when possible

Do not hardcode large amounts of project data inside React components.

Prefer:

```txt
src/data/
src/content/
CMS
```

or typed data files.

### 7. Keep styling consistent

Use Tailwind classes consistently.

Avoid random one-off spacing, colors, and font sizes unless necessary.

Prefer shared patterns for:

- section spacing
- page width
- typography
- buttons
- cards
- image layouts
- hover effects
- animations

### 8. Avoid unnecessary dependencies

Before adding a package, ask:

- Is this really needed?
- Can this be done with existing tools?
- Will it make maintenance harder?
- Is it actively maintained?

### 9. Always check mobile and desktop

Every layout must work on:

- mobile
- tablet
- laptop
- large desktop

Use responsive Tailwind utilities intentionally.

### 10. Run checks before finishing

Before saying the task is complete, agents should run or recommend:

```bash
npm run lint
npm run build
```

If tests exist:

```bash
npm test
```

---

## Preferred Stack

For this project, prefer:

```txt
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Motion
Sanity or another CMS if content editing is needed
Vercel for deployment
```

Do not switch the stack without permission.

---

## Target Project Structure

Use a clear structure like this:

```txt
src/
  app/
    page.tsx
    projects/
      page.tsx
      [slug]/
        page.tsx

  components/
    layout/
      Navbar.tsx
      Footer.tsx
      MobileMenu.tsx

    sections/
      HeroSection.tsx
      FeaturedProjects.tsx
      AboutSection.tsx
      ContactSection.tsx

    projects/
      ProjectCard.tsx
      ProjectGrid.tsx
      ProjectGallery.tsx
      ProjectMeta.tsx

    ui/
      Button.tsx
      Container.tsx
      Section.tsx
      SectionTitle.tsx

  data/
    projects.ts

  lib/
    utils.ts
    animations.ts

  types/
    project.ts

  styles/
    globals.css
```

Adjust if the project already has a better structure.

---

## Refactoring Checklist

When asked to clean or refactor code, follow this order:

1. Confirm the current behavior
2. Identify large files
3. Identify duplicated code
4. Identify unclear names
5. Split large files into components
6. Move data/content out of UI components
7. Add or improve TypeScript types
8. Standardize styling
9. Remove unused imports/files/packages
10. Run lint/build checks
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

---

## Final Response Format for Agents

When completing a cleanup task, summarize:

```txt
Changed:
- ...

Kept the same:
- ...

Checks:
- lint: passed/failed/not run
- build: passed/failed/not run

Notes:
- ...
```
