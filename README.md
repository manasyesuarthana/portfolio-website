# Manasye's Portfolio

A personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. Features a dark-themed design with interactive animations, smooth scrolling, 3D elements, and an interactive simulated terminal.

**Live site:** [manasyesuarthana.com](https://manasyesuarthana-portfolio.vercel.app)

## Tech Stack

- **Framework:** [Next.js 14.2.35](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with `tailwindcss-animate`
- **Animations:** GSAP, Motion (Framer Motion), Lenis (smooth scroll)
- **3D:** React Three Fiber, Drei, Rapier (physics), Three.js, OGL
- **UI Components:** shadcn/ui, Lucide React, React Icons
- **Font:** Geist Sans & Geist Mono (local fonts via `next/font`)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (metadata, fonts, SmoothScroll wrapper)
│   ├── page.tsx            # Main page (intro animation, nav, section composition)
│   ├── globals.css         # Global styles
│   └── fonts/              # Geist font files
│
├── components/
│   ├── sections/           # Page sections (see below)
│   │   ├── Hero.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── AwardsSection.tsx
│   │   ├── TerminalSection.tsx
│   │   └── ContactSection.tsx
│   │
│   └── *.tsx               # Reusable UI/animation components (React Bits, etc.)
│
├── lib/
│   └── data/               # All portfolio content (typed data)
│       ├── index.ts        # Central re-exports
│       ├── education.ts    # Education entries
│       ├── experience.ts   # Work/org experience entries
│       ├── projects.ts     # Project entries
│       ├── awards.ts       # Awards & honors entries
│       ├── skills.ts       # Tech stack / skills
│       └── filesystem.ts   # Virtual filesystem for the terminal
│
└── public/
    ├── logos/              # Institution and company logos
    └── projects/           # Project screenshots
```

## Sections

The site loads with a short intro animation ("Hello, World!" → "Introducing...") before revealing the full page. The sections are rendered in this order:

| Section | Description |
|---------|-------------|
| **Hero** | Name, tagline, 3D lanyard card, galaxy background |
| **Tech Stack** | Skills grouped by category (languages, frameworks, devops, security) with a logo marquee |
| **Education** | Education cards with institution logos, degrees, and achievements |
| **Experience** | Work and organizational experience in a selectable animated list |
| **Projects** | Featured projects in an autoplay carousel with tags, links, and screenshots |
| **Awards** | Awards and honors displayed in a responsive card grid |
| **Terminal** | Interactive simulated shell with commands like `ls`, `cat`, `cd`, `neofetch`, and easter eggs |
| **Contact** | Social links via a flowing menu, footer with back-to-top |

Each section uses a consistent dark theme with glassmorphism cards (`bg-gray-900/50 backdrop-blur-sm`), scroll-triggered animations, and either a Particles or LightRays background.

> **Note:** The site is designed for tablet and desktop screens (768px+). Mobile visitors see a friendly message asking them to switch to a larger device.

## Data Model

All portfolio content lives in `lib/data/` as typed TypeScript arrays. To update your portfolio content, edit the corresponding data files. No changes to components are needed.

**Education** (`education.ts`):
```ts
{ id, degree, institution, logo, period, achievements: string[] }
```

**Experience** (`experience.ts`):
```ts
{ id, role, company, logo, period, highlights: string[] }
```

**Projects** (`projects.ts`):
```ts
{ id, title, description, image, tags: string[], github?, demo?, featured }
```

**Awards** (`awards.ts`):
```ts
{ id, title, issuer, date, description, icon? }
```

**Skills** (`skills.ts`):
```ts
{ name, logoUrl, category: 'languages' | 'frameworks' | 'devops' | 'security' }
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm/bun)

### Installation

```bash
git clone https://github.com/manasyesuarthana/portfolio-website.git
cd portfolio-website
npm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site. The page hot-reloads as you edit files.


## License

This project is for personal use. Feel free to use it as a reference or template for your own portfolio.
