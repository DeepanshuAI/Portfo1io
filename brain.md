# Project Brain

## Project Overview
- **What the project does**: An immersive, high-end digital portfolio for Deepanshu Yadav, showcasing advanced software engineering, UI/UX design, and AI integration capabilities.
- **Target users**: Recruiters, founders, technical leads, and potential high-value clients looking for premium, boundary-pushing engineering talent.
- **Core value proposition**: Proving technical capability not just through case studies, but through the portfolio's architecture itself—demonstrating mastery over WebGL, complex animations, advanced React patterns, and cinematic storytelling.

## Business Goals
- **Primary goals**: Land senior/lead engineering roles or high-value freelance contracts by standing out in a crowded market.
- **Success metrics**: Time spent on site, interaction rates with 3D/interactive elements, and ultimately, conversion rate (inbound outreach from quality leads).
- **Important KPIs**: Zero perceived loading states, 60fps animations across devices, seamless narrative flow from hero to footer.

## Tech Stack
### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion, GSAP
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Scrolling**: Lenis (Smooth Scroll)

### Backend
- **Environment**: Node.js
- (Primarily statically generated/client-heavy portfolio, leveraging Next.js capabilities)

### Database
- (No database currently configured; content is largely managed via static configurations like `lib/site.ts`)

### Infrastructure
- Vercel (Standard Next.js deployment path)

## Architecture
- **High-level architecture**: Client-heavy Next.js application utilizing React Server Components where possible, but heavily relying on `"use client"` for advanced WebGL and Framer Motion orchestration.
- **Data flow**: Static configuration (`lib/site.ts`) acts as the single source of truth for projects, skills, and metadata, hydrating dynamic UI components.
- **Key modules**:
  - `components/hero`: Cinematic entry sequence.
  - `components/projects`: Continuous, scroll-driven artifact reveal system (5-layer stack).
  - `components/webgl`: Reactor scene and 3D environment components.
  - `components/sections`: Page layout sections (Skills, Playground, etc.).
- **Folder structure**: Standard Next.js App Router structure with feature-based component organization.

## Features
### Completed
- **Cinematic Hero Sequence**: Apple/Interstellar-inspired sequence using image sequences and canvas rendering.
- **Living Reactor (WebGL)**: Interactive, continuous particle system with hierarchical orbits.
- **Continuous Projects Experience**: A scroll-driven narrative replacing standard project cards with a unified, 5-layer architectural reveal process (Environment -> Core -> Architecture -> Knowledge -> Telemetry HUD).

### In Progress
- Performance optimization and hydration stability.
- Resolution of client-side infinite loop/hanging issues on hard reload.

### Planned
- **Playground Section**: Expanding the interactive WebGL experiments.
- **Process/Workflow Visualization**: Detailed breakdown of the engineering approach.

## UI/UX Principles
- **Visual style**: "Interstellar + Apple + Iron Man Lab + Advanced Research Facility." Dark mode native (bg-void).
- **Layout rules**: Avoid generic grids. Favour immersive, full-screen takeover states with depth and Z-axis layering.
- **Typography rules**: Monospace fonts for telemetry/data, sleek sans-serif (Display/Body) for narrative text. High contrast, precise tracking.
- **Spacing system**: Tailwind's default scale, heavily utilizing viewport units (`vh`, `vw`) for cinematic scaling.
- **Motion guidelines**: 
  - Restraint over spectacle. 
  - Earned reveals (Artifact -> Architecture -> UI -> Details).
  - Smooth, continuous interpolations using `useTransform` mapped to scroll progress.
- **Accessibility requirements**: Respect `prefers-reduced-motion` hooks where high-velocity animations exist.

## Coding Standards
- **Naming conventions**: PascalCase for components, camelCase for functions/hooks, UPPER_SNAKE_CASE for constants.
- **Component structure**: Highly modular. Complex scenes (like Projects) must be broken down into composable layers (e.g., `CinematicEnvironments`, `PersistentCore`, `ArchitectureAssembly`).
- **State management patterns**: Framer Motion's `useScroll` and `useTransform` for scroll-linked state to avoid React re-render thrashing. React `useState` reserved for phase/discrete state changes.
- **API patterns**: Server Actions / API routes (if applicable in future).
- **Error handling patterns**: Next.js error boundaries.

## Important Decisions
### 2026-08-30
- **Decision**: Redesigned Projects section from a static grid to a continuous cinematic storytelling experience.
- **Reasoning**: Standard project cards feel generic. A scroll-driven narrative proves engineering capability and creates a memorable "classified archive" discovery experience.
- **Tradeoffs**: Significantly higher DOM complexity and performance overhead. Requires careful management of Z-indexes, fixed position tracking, and scroll-linked interpolations.

### 2026-08-30
- **Decision**: Rebuilt WebGL Reactor from static meshes to a dynamic particle system with continuous orbital behavior.
- **Reasoning**: The reactor needed to feel "alive" and systemic, rather than like a static decorative object.
- **Tradeoffs**: Increased GPU load. Required careful tuning of frame-rate and geometry counts.

## Constraints
- **Performance requirements**: Must maintain 60fps on modern devices despite heavy WebGL and canvas usage.
- **Browser support**: Modern browsers (Chrome, Safari, Edge, Firefox) with WebGL enabled.
- **Security requirements**: Standard web security practices. No sensitive data exposed.
- **Business limitations**: Fast iteration required; zero-tolerance for "AI-generated" or cheap aesthetics.

## Current Status
- **Current milestone**: Finalizing the "Earned Reveal" Projects section and stabilizing Next.js dev server performance.
- **Blockers**: Investigating a client-side freeze / Next.js dev server hang causing `localhost:3000` to timeout or render a blank page after 60s compiles.
- **Active tasks**: Debugging the root cause of the blank page/freeze (suspected hydration loop or framer-motion event listener loop).

## Known Issues
- **Issue**: Next.js Dev Server hangs / Page fails to load (Viewport 0x0).
- **Impact**: Critical. Prevents testing and local development.
- **Proposed solution**: Verify `useMotionValueEvent` and layout boundaries to ensure no infinite re-render loops are occurring on initial mount. Clear `.next` cache.

## Roadmap
### Short Term
- Fix the `localhost:3000` freezing issue.
- Polish the transitions between the 5 layers in the Projects section.

### Medium Term
- Complete the Playground and Process sections.
- Audit mobile responsiveness (currently highly optimized for desktop cinematic view).

### Long Term
- Implement a lightweight CMS or automated markdown pipeline for adding new projects without touching code.

## AI Assistant Instructions
- **How AI should make decisions**: Prioritize clarity over complexity. Choose storytelling over spectacle. Choose real project evidence over decorative animation. If a UI element has no purpose, remove it.
- **What AI should never change**: The core dark aesthetic (`bg-void`), the continuous scroll philosophy for projects, and the core identity details in `lib/site.ts`.
- **Preferred implementation patterns**: Use Framer Motion `useTransform` over React `useEffect` for animations to avoid render cycle thrashing. Use native Canvas or WebGL for dense particle systems.
- **Preferred design patterns**: "Earned reveals". Do not show UI immediately. Show the system/architecture first, then reveal the product.

## Project Knowledge
- **Domain-specific information**: The portfolio treats the user as an investigator discovering advanced technology. 
- **Client preferences**: High-end, premium feel. Nothing should feel "cheap" or "template-like".
- **Important context**: The user has extremely high standards for visual excellence. Micro-animations and layout hierarchy are critical.

## Changelog
### 2026-08-30
- **Added**: `ContinuousProjectsExperience.tsx` and 5 sub-layer components.
- **Added**: `brain.md` memory file.
- **Changed**: Projects section architecture to continuous scroll.
- **Changed**: WebGL Reactor to living particle system.
- **Fixed**: JSX unescaped quote error (`500 Internal Server Error`).
