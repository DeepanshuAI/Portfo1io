# Portfolio Project Notes

## Purpose

This is Deepanshu Yadav's personal portfolio for junior frontend, junior full-stack, and design-focused frontend roles. The site should make the projects, their source code, and contact details quick to find. Use only claims supported by the implementation or project repositories.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS
- Framer Motion for interface animation
- Three.js and React Three Fiber for selected 3D scenes
- Lenis for smooth scrolling
- Vercel deployment configured through the existing Next.js app

There is no portfolio backend or database. Site and project presentation data live in `lib/site.ts`.

## Main areas

- `components/hero/`: scroll-linked image sequence and introduction.
- `components/projects/`: scroll-driven presentation of featured projects.
- `components/sections/`: project links, skills, process, contact, and footer.
- `components/webgl/`: shared WebGL scene and interactive technology display.
- `public/hero/` and `public/projects/`: local visual assets.

## Project evidence

- Student Management System: React frontend and Express/MongoDB API. On 2026-10-15, the hosted frontend URL responded, but the linked API health route timed out twice; do not present the app as a verified working demo until it is checked again.
- Kairos: resort website concept with 3D scenes and browser-local seeded data.
- FlowPilot AI: workflow interface concept with a client-side simulation and illustrative sample content.

See each linked repository's README for setup instructions and project scope. Treat fictional product content and local simulations as concept/demo data, not real customers, business outcomes, or external integrations.

## Implementation principles

- Keep the existing dark visual identity and scroll-led presentation where it helps visitors inspect the work.
- Put role fit, projects, source links, and contact access ahead of decorative details.
- Describe technologies through the projects that use them; do not assign unsupported mastery or years of experience.
- Respect `prefers-reduced-motion` and preserve useful content when motion or WebGL is unavailable.
- Keep project demos and external claims labeled according to what has been verified.

## Known documentation and evidence limits

- A resume PDF is published at `/resume.pdf` and linked from the hero. The supplied PDF's embedded LinkedIn URL appears to be missing its first character; verify and correct that link in the source resume before replacing the published copy.
- There is no automated test script in `package.json`.
- The lint script currently requires ESLint configuration that is not present.
- Performance targets require browser measurement before they can be claimed.
