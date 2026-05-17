# SupaFlow — Premium Digital Agency

A high-end agency portfolio built with React, Vite, and Tailwind CSS. Featuring buttery smooth animations, a custom cursor system, horizontal scroll sections, and a fully content-driven architecture.

## Tech Stack

- **React 19** + TypeScript
- **Vite 8** with HMR
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** — scroll reveals, staggered entrances, spring physics, magnetic buttons
- **shadcn/ui** — customized component primitives (Button, Badge, Card)
- **React Router DOM v7** — multi-page routing
- **Cal.com Embed React** — scheduling integration
- **Iconify** — icon system (`@iconify/react`)
- **Lenis** — smooth scroll

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, services bento, horizontal scroll process, work showcase, capabilities, testimonial, CTA |
| `/book` | Booking — Cal.com calendar embed for scheduling intro calls |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `*` | 404 — styled not-found page |

## Project Structure

```
src/
├── components/       # UI sections (Hero, Navbar, Services, Process, Work, etc.)
│   └── ui/           # shadcn/ui primitives (Button, Badge, Card, Separator)
├── data/
│   └── content.json  # All page content — single source of truth
├── hooks/            # Custom hooks (useInteractions, useMobile)
├── lib/              # Utilities (motion primitives, cn helper)
├── pages/            # Route pages (Book, Privacy, Terms, NotFound)
├── App.tsx           # Home page layout
├── main.tsx          # Router setup + ScrollToTop
└── index.css         # Global styles, custom cursor, animations
```

## Content Management

All text content is centralized in `src/data/content.json`. Components import and render from this file — update copy in one place without touching components.

## Features

- Custom cursor with smooth hide/show over embedded content
- Magnetic button hover effects via `useMotionValue` / `useSpring`
- Horizontal scroll process section (desktop) with mobile column fallback
- Bento grid services with 3D tilt cards
- Staggered entrance animations with spring physics
- Responsive across all breakpoints (mobile-first)
- Accessibility: skip links, aria labels, focus-visible, prefers-reduced-motion
- Security: no XSS vectors, HTTPS-only assets, proper `rel="noopener noreferrer"`

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment

Optimized for Vercel. Add security headers via `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

## License

Private. All rights reserved.
