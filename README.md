**[Leia em Português](README.pt-br.md)**

<div align="center">
  <img src="./public/logo_dark.svg" alt="Café Labs Logo" width="120" />

  # Café Labs — Portfolio

  **Café Labs' institutional website**

  Filtering the noise, extracting the pure technology, and accelerating your product's validation.
</div>

---

## About the project

This repository is the institutional website for **Café Labs**, published at
[cafelabs.net](https://cafelabs.net). It's the company's landing page (not a
specific product's): it presents Café Labs' manifesto/methodology ("Test.
Build. Validate.") and lists every product in the ecosystem (Domo, Dindin,
Forge Skill Library, mind) as cards in a bento grid, in the "O Laboratório"
block, each one linking to that product's own landing/site.

For anyone who wants to understand the business behind the code, see
[docs/ARQUITETURA.md](docs/ARQUITETURA.md) for the technical structure.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React + custom SVGs |
| Light/dark theme | `next-themes` |
| Internationalization | `next-intl` (locales: `pt` default, `en`) |
| Deploy | Vercel |

## Prerequisites

- Node.js 20+ (tested with v20.20.1)
- npm

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to
`/pt` (default locale); switch to `/en` from the language button in the
header, or open [http://localhost:3000/en](http://localhost:3000/en)
directly.

Other available scripts (`package.json`):

- `npm run build` — production build.
- `npm run start` — serves the production build.
- `npm run lint` — ESLint (`eslint-config-next`, core-web-vitals + TypeScript).

## Folder structure

```
src/
  proxy.ts             # next-intl middleware: resolves locale, redirects to /pt or /en
  i18n/
    routing.ts          # Locales (pt default, en) and routing config
    request.ts           # Loads messages/{locale}.json server-side
    navigation.ts         # Locale-aware Link/usePathname/useRouter
  app/
    [locale]/
      layout.tsx          # RootLayout: fonts, locale resolution, NextIntlClientProvider + ThemeProvider, fixed Header/Footer
      page.tsx             # Home: Hero + Manifesto + BentoGrid + Setores
      globals.css          # Design tokens (colors, fonts) via Tailwind v4's @theme
  components/
    layout/
      header.tsx        # Fixed nav, conditional dark/light logo, language switcher, mobile menu
      hero.tsx           # Opening section (100dvh) with CTAs
      manifesto.tsx      # Build/Measure/Learn methodology
      bento-grid.tsx     # "O Laboratório" grid — Café Labs' product cards
      setores.tsx        # Grid of the 4 business fronts (Dev, E-commerce, Fashion, Marketing)
      footer.tsx         # Contact CTA (email) + copyright
    ui/
      theme-toggle.tsx           # Light/dark theme toggle button
      language-switcher.tsx       # PT/EN toggle button
      mind-logo.tsx               # "mind" product's SVG wordmark
      forge-logo.tsx               # Forge Skill Library's SVG wordmark
      logo-*.tsx                  # Alternative Café Labs logo concepts (not currently used — see docs/ARQUITETURA.md)
  providers/
    theme-provider.tsx  # next-themes wrapper
messages/
  en.json / pt.json     # All UI strings, one namespace per component
public/
  logo_dark.svg / logo_light.svg   # Café Labs logo (Jarra-Erlenmeyer)
  dindin-logo.svg / domo-logo.svg  # Product logos used in the bento grid
```

## Documentation

- [docs/ARQUITETURA.md](docs/ARQUITETURA.md) — page/component structure, how the bento grid works, and how to add a new product.
- [docs/DESIGN.md](docs/DESIGN.md) — visual identity: palette, typography, tokens.
- [docs/DEPLOY.md](docs/DEPLOY.md) — Vercel deploy, domain.
- [CLAUDE.md](CLAUDE.md) — notes for anyone using an AI agent in this repo.

This project has no backend of its own — it's a static/SSR site with no data
persistence (the "products" listed in the bento grid are external links to
their own repos/deploys).
