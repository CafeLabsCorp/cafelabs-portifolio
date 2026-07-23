**[Leia em Português](DESIGN.pt-br.md)**

# Design — Café Labs Visual Identity

Café Labs' institutional identity (distinct from each product's identity —
Domo and Dindin have their own palette/typography documented in their own
repos). Identity name: **Jarra-Erlenmeyer** ("Erlenmeyer Jar") — a fusion of
the lab flask (Erlenmeyer) with coffee, representing the company's "testing
sandbox" concept.

All tokens below are read directly from `src/app/[locale]/globals.css` and
`tailwind.config.ts` — they are not approximate values.

## How the tokens are exposed

`globals.css` defines the raw CSS variables in `@layer base` (once for the
light theme in `:root`, overridden in `.dark` for the dark theme) and then
maps them to semantic names inside a Tailwind v4 `@theme` block — that block
is what automatically generates the utility classes (`bg-background`,
`text-accent`, `border-borderUI`, etc.) used across every component.
`tailwind.config.ts` mirrors the same mapping (redundant with `@theme`, kept
for compatibility with Tailwind v3-style config).

Theme switching happens via `next-themes` (`attribute="class"`), adding/
removing the `.dark` class on `<html>`.

## Color palette

| Semantic token (Tailwind class) | CSS variable | Light | Dark |
| --- | --- | --- | --- |
| `bg-background` | `--bg-principal` | `#FFFBF7` | `#161414` |
| `text-foreground` | `--texto-principal` | `#231F20` | `#F5EFEB` |
| `text-accent` / `border-accent` | `--marca-accent` | `#FF5411` (Electric Orange) | `#FF5411` (fixed, doesn't vary by theme) |
| `text-sandbox` / `bg-sandbox` | `--verde-sandbox` | `#00E699` | `#00E699` (fixed, doesn't vary by theme) |
| `border-borderUI` | `--borda-sutil` | `#E5E0DA` | `#2A2626` |

- **Electric Orange (`#FF5411`)** — brand/action color: CTAs, active links,
  headline highlights ("Validar." in the Hero), Hero background glow
  (`bg-accent/20` with blur).
- **Sandbox Green (`#00E699`)** — used for "active" status indicators (the
  pulsing badge in the Hero, status badges on bento grid cards) and
  confirmations (e.g. "E-mail copiado com sucesso!" in the Footer).
- Background and text invert between themes; the brand color and the status
  green **do not change** between light/dark — they're the only fixed colors
  in the palette.

## Typography

| Token (Tailwind class) | Font | Usage |
| --- | --- | --- |
| `font-poppins` | Poppins (weights 400/600/700/900, via `next/font/google`) | Headings, logotype, section titles, CTAs |
| `font-inter` | Inter (via `next/font/google`) | Body text, UI, navigation — the `<body>`'s default font |
| `font-fira` | Fira Code (via `next/font/google`, `--font-fira-code` variable) | "Terminal style" elements: status badges (`[ status: ativo ]`), technology stack tags, decorative comments (`/* Diretriz Operacional v1.0 */`), footer copyright |

## Spacing and shape

- Standard content container: `max-w-6xl mx-auto px-6`.
- Generous vertical sections: `py-24 sm:py-32`.
- Cards with large radius (`rounded-3xl`) and a subtle border
  (`border-borderUI`) — a "lab card" look, consistent across the bento grid
  and the setores section.
- Pill-shaped primary buttons (`rounded-full`), with `hover:scale-105`.

## Logo

- Main file: `public/logo_dark.svg` / `public/logo_light.svg` — swapped
  dynamically by `Header` based on `resolvedTheme`.
- The favicon follows the same logic via `media: prefers-color-scheme` in
  `metadata.icons` in `src/app/[locale]/layout.tsx`.
- A set of alternative logo concepts lives in `src/components/ui/logo-*.tsx`
  (not currently used in the UI — see `docs/ARQUITETURA.md`).

## Accessibility / motion

- `scroll-behavior: smooth` on `html`, turned off under
  `@media (prefers-reduced-motion: reduce)` (falls back to `auto`) —
  consistent with Café Labs' structural landing page standard (see the
  `cafelabs/padroes-landing.md` node in the Mind, if available).
- Animated indicators (the Hero's pulsing badge, the scroll arrow) use
  `motion-safe:animate-bounce` / Framer Motion equivalents, but
  `TODO: confirmar` whether every Framer Motion animation in the repo
  respects `prefers-reduced-motion` — no explicit guard was found for the
  bento grid's and manifesto's `whileInView` transitions beyond
  `scroll-behavior`.
