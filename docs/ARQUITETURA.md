**[Leia em Português](ARQUITETURA.pt-br.md)**

# Architecture

Café Labs institutional website. Next.js App Router, a single route (`/`),
no backend of its own — it's static/SSR client-rendered content, with no
data persistence and no API calls.

## Layers

```
src/app/layout.tsx   → RootLayout: loads fonts, sets up ThemeProvider, fixed Header/Footer on every page
src/app/page.tsx     → the only route: composes the 4 sections of the home page, in order
src/components/layout/  → one page section each (client components)
src/components/ui/      → small reusable pieces (theme toggle, SVG logos)
src/providers/           → context wrapper (theme)
```

There's no routing beyond the home page — `src/app/page.tsx` is the only
page, and the Header navigation (`Manifesto`, `Laboratório`, `Setores`) is
smooth-scroll to anchors (`#manifesto`, `#laboratorio`, `#setores`) within the
same page, not separate routes.

### `layout.tsx` — RootLayout

- Loads 3 Google fonts via `next/font`: Inter (`--font-inter`, body/UI),
  Poppins (`--font-poppins`, headings/logo), Fira Code (`--font-fira-code`,
  "code style" text/status tags).
- Wraps everything in `ThemeProvider` (`next-themes`, `attribute="class"`,
  `defaultTheme="system"`), which enables the `.dark` class used in
  `globals.css`.
- `Header` and `Footer` sit outside `{children}` but inside `ThemeProvider`
  — they'd appear on any page that existed, even though there's only one
  today.

### `page.tsx` — Home

Simple composition, in scroll order:

```tsx
<Hero />
<Manifesto />
<BentoGrid />
<Setores />
```

(`Footer` isn't here — it comes from `layout.tsx`.)

## `layout/` components

| Component | Section / anchor | What it does |
| --- | --- | --- |
| `header.tsx` | fixed, always visible | Nav with smooth-scroll to the anchors, conditional logo (swaps `logo_dark.svg`/`logo_light.svg` based on `resolvedTheme`), mobile menu (hamburger), `ThemeToggle`, "Tomar um Café" CTA → `#contato`. |
| `hero.tsx` | top, no anchor of its own | Opening section, `min-h-dvh` (full screen). Title + 2 CTAs (`#laboratorio`, `#manifesto`) and an animated scroll indicator at the bottom of the section. |
| `manifesto.tsx` | `#manifesto` | Two columns: manifesto text on the left, the 3 pillars of the methodology (Build/Measure/Learn) on the right. |
| `bento-grid.tsx` | `#laboratorio` | "O Laboratório" grid — see the dedicated section below. |
| `setores.tsx` | `#setores` | 2-column grid with Café Labs' 4 business fronts (Development active; E-commerce, Fashion and Marketing marked as `isLocked: true`, shown blurred with an "Em teste" badge). |
| `footer.tsx` | `#contato` | Contact CTA: detects mobile via `navigator.userAgent` to decide between `mailto:` (mobile) or a direct Gmail web link (desktop); a secondary button copies the email to the clipboard. Copyright and links to `cafelabs.net`/`cafelabs.net.br`. |

## The bento grid (`bento-grid.tsx`)

This is the mechanism that lists Café Labs' products as clickable cards — the
main integration point between this repo and the rest of the ecosystem.

- **Data source**: a hardcoded `experimentos` array at the top of the file
  (not sourced from a CMS/API). Each item:

  ```ts
  {
    id: number,
    title: string,
    logo?: string,              // path under /public, rendered via next/image
    logoComponent?: React.ComponentType,  // e.g. MindLogo, an inline SVG component
    icon?: LucideIcon,           // fallback when the product doesn't have its own logo yet
    description: string,
    status: string,              // free text shown as "[ status: X ]"
    stack: string[],              // technology badges at the bottom of the card
    span: string,                 // Tailwind col-span class (controls the card's size in the grid)
    link?: string,                // the product's external URL (makes the whole card clickable)
  }
  ```

- **Layout**: `grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(250px,auto)]`.
  Each card sets its own `span` (e.g. `md:col-span-2` for Domo, which gets a
  double-wide highlight; `md:col-span-1` for the rest) — that's how the bento
  grid varies card size instead of making them all equal.
- **Whole card clickable**: when `link` is present, an absolutely positioned
  `<a>` (`inset-0 z-10`) covers the entire card; the visual content sits
  underneath.
- **Animation**: Framer Motion with stagger (`containerVariants` /
  `cardVariants`), triggered via `whileInView` (animates when it enters the
  viewport, only once — `viewport={{ once: true }}`).
- **Card logo**: priority is `logo` (image under `/public`) → `logoComponent`
  (React component, e.g. `MindLogo`) → `icon` (generic Lucide icon, used for
  products that don't have their own visual identity yet, e.g. Forge Skill
  Library with the `Blocks` icon).

### Products currently listed (state of the array in `bento-grid.tsx`)

1. **Domo** — own logo (`/domo-logo.svg`), `span md:col-span-2`, link
   `https://domo.cafelabs.net`.
2. **Dindin** — own logo (`/dindin-logo.svg`), link
   `https://dindin.cafelabs.net`.
3. **Forge Skill Library** — no own logo yet, `Blocks` icon (Lucide),
   link `https://forge.cafelabs.net`.
4. **mind** — `MindLogo` (SVG component in `src/components/ui/mind-logo.tsx`),
   link `https://mind.cafelabs.net`.

### How to add a new product to Laboratório

1. If the product has its own logo, drop the SVG into `public/` (naming
   pattern: `<product>-logo.svg`, following `dindin-logo.svg`/`domo-logo.svg`).
2. Add an object to the `experimentos` array in
   `src/components/layout/bento-grid.tsx`, with `logo` (or `logoComponent`/
   `icon` as fallback), `link` to the product's landing/repo, and `span`
   according to the desired grid emphasis.
3. There's no extra build step — the grid renders the array directly.

Cross-reference: the Mind (the author's personal knowledge base) keeps a
record in `cafelabs/cafelabs.md` and
`projetos/produtos-cafelabs/cafelabs-portifolio.md` of which products this
repo references and why — relevant for understanding the business context
behind the links, but not required for working on the code.

## `ui/logo-*.tsx`

A set of SVG components (`logo-anel`, `logo-bloco`, `logo-centelha`,
`logo-chemex`, `logo-cubocl`, `logo-erlenmeier-cafeteira`, `logo-erlenmeyer`,
`logo-fluxo`, `logo-grao`, `logo-matriz`, `logo-nucleo`, `logo-orbital`,
`logo-xicara`) — alternative Café Labs logo concepts explored during brand
design. None of them is actively imported today; `header.tsx` only
references these variants inside a commented-out code block at the end of
the file (lines 149+), kept as a historical record of the options discarded
in favor of the current logo (Jarra-Erlenmeyer, in
`logo_dark.svg`/`logo_light.svg`).

`TODO: confirmar` — no commit documents why these variants were kept in the
repo instead of removed; if they're dead weight, worth cleaning up in a
future pass.

## `src/app/page.module.css`

A leftover CSS Module file from the standard `create-next-app` boilerplate
(sample page styles). It isn't imported by any active component (`page.tsx`
doesn't reference it) — looks like a residue from the project's initial
scaffold. `TODO: confirmar` whether it can be safely removed.
