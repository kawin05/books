# Useful Prompts for Code Cleanup Agents

Use these prompts when asking an AI agent to clean, refactor, or review the project.

---

## Full Code Review Prompt

```txt
Review this Next.js project for code quality, maintainability, performance, responsive design, accessibility, and future scalability.

Do not rewrite code yet.

Return:
1. Biggest problems
2. Quick wins
3. Files that should be refactored
4. Unused or duplicated code
5. Suggested folder structure
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
- Explain every major change
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
- Make spacing consistent
- Remove duplicated class patterns
- Improve responsive behavior
- Keep the same visual design
- Create reusable layout components if useful
- Do not introduce a new styling system
```

---

## TypeScript Cleanup Prompt

```txt
Improve the TypeScript quality of this project.

Goals:
- Add proper types for project data
- Remove unnecessary any types
- Create shared types where useful
- Keep components easy to read
- Do not over-engineer the types
```

---

## Performance Prompt

```txt
Review this website for performance problems.

Focus on:
- image optimization
- large JavaScript bundles
- unnecessary packages
- animation performance
- layout shift
- slow loading pages

Give specific fixes and explain which are most important.
```

---

## Accessibility Prompt

```txt
Review this website for accessibility issues.

Check:
- headings
- image alt text
- buttons and links
- keyboard navigation
- focus states
- color contrast
- form labels
- mobile menu behavior

Suggest fixes without changing the design direction.
```

---

## Architecture Portfolio Prompt

```txt
Improve this architecture portfolio website.

Target style:
- minimal
- premium
- image-focused
- editorial
- responsive
- subtle animation

Rules:
- Do not make it colorful or playful
- Keep typography clean
- Improve spacing and layout
- Make project pages easy to update
- Make mobile experience excellent
```

---

## README Generation Prompt

```txt
Create or improve the README for this project.

Include:
- project overview
- tech stack
- how to install
- how to run locally
- folder structure
- how to add a new project
- how to update images
- how to deploy
- environment variables
- common commands
```
