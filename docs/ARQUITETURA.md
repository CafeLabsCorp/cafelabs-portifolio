**[Leia em Português](ARQUITETURA.pt-br.md)**

# Architecture

Café Labs institutional website. Next.js App Router, locale-prefixed routing
(`/pt`, `/en`) via `next-intl`, no backend of its own — it's static/SSR
client-rendered content, with no data persistence and no API calls.

## Layers

```
src/proxy.ts                    → next-intl middleware: resolves the locale from the URL/browser and redirects to /pt or /en
src/i18n/routing.ts              → locale config: locales ["pt", "en"], defaultLocale "pt"
src/i18n/request.ts              → loads messages/{locale}.json for the active locale (server-side)
src/i18n/navigation.ts           → locale-aware Link/usePathname/useRouter (wraps next-intl/navigation)
src/app/[locale]/layout.tsx      → RootLayout: loads fonts, resolves the locale param, sets up NextIntlClientProvider + ThemeProvider, fixed Header/Footer on every page
src/app/[locale]/page.tsx        → the only route: composes the 4 sections of the home page, in order
src/app/[locale]/globals.css     → Design tokens (colors, fonts) via Tailwind v4's @theme
src/components/layout/  → one page section each (client components)
src/components/ui/      → small reusable pieces (theme toggle, language switcher, SVG logos)
src/providers/           → context wrapper (theme)
messages/                → en.json / pt.json — every UI string, one top-level key per component (Header, Footer, Hero, Manifesto, BentoGrid, Setores, LanguageSwitcher, ThemeToggle)
```

There's no routing beyond the home page itself — `src/app/[locale]/page.tsx`
is the only page for each locale, and the Header navigation (`Manifesto`,
`Laboratório`, `Setores`) is smooth-scroll to anchors (`#manifesto`,
`#laboratorio`, `#setores`) within the same page, not separate routes. The
only routing that exists is the locale prefix itself (`/pt/...` vs.
`/en/...`).

## Internationalization (`next-intl`)

- **Locales**: `pt` (default) and `en`, defined in `src/i18n/routing.ts`.
  Every route is served under a `[locale]` dynamic segment
  (`src/app/[locale]/...`); visiting `/` redirects to `/pt` (the default
  locale prefix is always present — `next-intl`'s default `localePrefix`
  behavior, not overridden here).
- **Middleware**: `src/proxy.ts` runs `next-intl/middleware` with the
  `routing` config, matched against every path except `/api`, `/_next`,
  `/_vercel` and files with an extension (`config.matcher`).
- **Messages**: one JSON file per locale under `messages/` (`en.json`,
  `pt.json`), loaded server-side by `src/i18n/request.ts`. Every client
  component that renders text calls `useTranslations("<Namespace>")` (e.g.
  `useTranslations("Header")`) and reads keys off it — there's no text
  hardcoded directly in JSX for user-facing strings (component-level code
  comments are still in Portuguese, since they're for whoever edits the
  code, not for the visitor).
- **Language switcher**: `src/components/ui/language-switcher.tsx` toggles
  between `pt`/`en` via `router.replace(pathname, { locale: nextLocale })`
  (from `src/i18n/navigation.ts`), shown in the `Header`.
- **Static generation**: `RootLayout` (`src/app/[locale]/layout.tsx`) calls
  `generateStaticParams()` to pre-render both locales, and calls
  `notFound()` if an unknown locale segment is requested.
- **Not localized**: the `<title>`/meta `description` in
  `export const metadata` (`src/app/[locale]/layout.tsx`) are static
  Portuguese strings, not read from `messages/*.json` — they don't change
  with the locale. `TODO: confirmar` whether that's intentional (e.g. SEO
  strategy keeps PT as the canonical metadata) or an oversight from before
  i18n was added.

### `layout.tsx` — RootLayout

- Async server component: reads `params: Promise<{ locale: string }>`,
  validates it against `routing.locales` via `hasLocale()` and calls
  `notFound()` if invalid.
- Loads 3 Google fonts via `next/font`: Inter (`--font-inter`, body/UI),
  Poppins (`--font-poppins`, headings/logo), Fira Code (`--font-fira-code`,
  "code style" text/status tags).
- Wraps everything in `NextIntlClientProvider` (makes translations available
  to client components), then `ThemeProvider` (`next-themes`,
  `attribute="class"`, `defaultTheme="system"`, `enableSystem`), which
  enables the `.dark` class used in `globals.css`.
- `Header` and `Footer` sit outside `{children}` but inside both providers
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
| `header.tsx` | fixed, always visible | Nav with smooth-scroll to the anchors (labels via `useTranslations("Header")`), conditional logo (swaps `logo_dark.svg`/`logo_light.svg` based on `resolvedTheme`), mobile menu (hamburger), `LanguageSwitcher`, `ThemeToggle`, CTA → `#contato`. Uses `Link` from `src/i18n/navigation.ts` (not `next/link`) so the logo/home link stays locale-aware. |
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
    logoComponent?: React.ComponentType,  // e.g. MindLogo/ForgeLogo, an inline SVG component
    icon?: LucideIcon,           // fallback when the product doesn't have its own logo yet
    descriptionKey: string,       // key resolved via useTranslations("BentoGrid") — text lives in messages/{locale}.json, not in the array
    statusKey: string,            // same, resolved key shown as "[ status: X ]" via the statusLabel template
    stack: string[],              // technology badges at the bottom of the card
    span: string,                 // Tailwind col-span class (controls the card's size in the grid)
    link?: string,                // the product's external URL (makes the whole card clickable)
  }
  ```

  The actual copy (description/status per product, per locale) lives under
  the `BentoGrid` namespace in `messages/en.json`/`messages/pt.json` (e.g.
  `domoDescription`, `domoStatus`, `forgeDescription`, `forgeStatus`, ...) —
  `bento-grid.tsx` only holds the keys, so translating or wording changes
  don't touch this component.

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
  (React component, e.g. `MindLogo`, `ForgeLogo`) → `icon` (generic Lucide
  icon, fallback for a product that doesn't have its own visual identity yet
  — unused today, see the product list below).

### Products currently listed (state of the array in `bento-grid.tsx`)

1. **Domo** — own logo (`/domo-logo.svg`), `span md:col-span-2`, status
   "beta", link `https://domo.cafelabs.net`.
2. **Dindin** — own logo (`/dindin-logo.svg`), `span md:col-span-1`, status
   "ACTIVE", link `https://dindin.cafelabs.net`.
3. **Forge Skill Library** — own logo (`ForgeLogo`, SVG component in
   `src/components/ui/forge-logo.tsx` — amber hexagon fixed to the
   orchestrator's brand color, petals in `currentColor` so they follow
   light/dark), `span md:col-span-1`, status "coming soon", link
   `https://forge.cafelabs.net`.
4. **mind** — `MindLogo` (SVG component in `src/components/ui/mind-logo.tsx`),
   `span md:col-span-2`, status "open source", link `https://mind.cafelabs.net`.

None of the 4 current entries use the `icon` (Lucide) fallback — it only
still applies to products added in the future that don't have their own
visual identity yet.

### How to add a new product to Laboratório

1. If the product has its own logo, drop the SVG into `public/` (naming
   pattern: `<product>-logo.svg`, following `dindin-logo.svg`/`domo-logo.svg`)
   or add an inline SVG component under `src/components/ui/` (following
   `mind-logo.tsx`/`forge-logo.tsx`) if it needs to inherit `currentColor`
   for theme switching.
2. Add the `<product>Description`/`<product>Status` keys to the `BentoGrid`
   namespace in **both** `messages/en.json` and `messages/pt.json` — missing
   one locale throws at render time for that locale.
3. Add an object to the `experimentos` array in
   `src/components/layout/bento-grid.tsx`, with `logo` (or `logoComponent`/
   `icon` as fallback), `descriptionKey`/`statusKey` matching the keys added
   above, `link` to the product's landing/repo, and `span` according to the
   desired grid emphasis.
4. There's no extra build step — the grid renders the array directly.

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
design. None of them is imported anywhere in `src` today — not even in a
comment (a previous pass of this doc noted a commented-out reference in
`header.tsx`; that block no longer exists, so these files are fully
orphaned now, kept only as a historical record of the options discarded in
favor of the current logo, Jarra-Erlenmeyer, in
`logo_dark.svg`/`logo_light.svg`).

`TODO: confirmar` — no commit documents why these variants were kept in the
repo instead of removed; if they're dead weight, worth cleaning up in a
future pass.

## `src/app/[locale]/page.module.css`

A leftover CSS Module file from the standard `create-next-app` boilerplate
(sample page styles). It isn't imported by any active component (`page.tsx`
doesn't reference it) — looks like a residue from the project's initial
scaffold. `TODO: confirmar` whether it can be safely removed.
