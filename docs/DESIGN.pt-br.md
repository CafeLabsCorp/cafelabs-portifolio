**[Read in English](DESIGN.md)**

# Design — Identidade Visual Café Labs

Identidade institucional da Café Labs (distinta da identidade de cada produto
— Domo e Dindin têm paleta/tipografia próprias documentadas em seus próprios
repos). Nome da identidade: **Jarra-Erlenmeyer** — fusão do frasco de
laboratório (Erlenmeyer) com o café, representando o conceito de "sandbox de
testes" da empresa.

Todos os tokens abaixo são lidos diretamente de `src/app/[locale]/globals.css`
e `tailwind.config.ts` — não são valores aproximados.

## Como os tokens são expostos

`globals.css` define as variáveis CSS cruas em `@layer base` (uma vez para o
tema claro em `:root`, sobrescritas em `.dark` para o tema escuro) e depois as
mapeia para nomes semânticos dentro de um bloco `@theme` do Tailwind v4 — é
esse bloco que gera automaticamente as classes utilitárias (`bg-background`,
`text-accent`, `border-borderUI`, etc.) usadas em todos os componentes.
`tailwind.config.ts` espelha o mesmo mapeamento (redundante com o `@theme`,
mantido por compatibilidade com Tailwind v3-style config).

Alternância de tema via `next-themes` (`attribute="class"`), aplicando/
removendo a classe `.dark` no `<html>`.

## Paleta de cores

| Token semântico (classe Tailwind) | Variável CSS | Claro | Escuro |
| --- | --- | --- | --- |
| `bg-background` | `--bg-principal` | `#FFFBF7` | `#161414` |
| `text-foreground` | `--texto-principal` | `#231F20` | `#F5EFEB` |
| `text-accent` / `border-accent` | `--marca-accent` | `#FF5411` (Laranja Elétrico) | `#FF5411` (fixo, não varia por tema) |
| `text-sandbox` / `bg-sandbox` | `--verde-sandbox` | `#00E699` | `#00E699` (fixo, não varia por tema) |
| `border-borderUI` | `--borda-sutil` | `#E5E0DA` | `#2A2626` |

- **Laranja Elétrico (`#FF5411`)** — cor de marca/ação: CTAs, links ativos,
  destaques de título ("Validar." no Hero), glow de fundo da Hero
  (`bg-accent/20` com blur).
- **Verde Sandbox (`#00E699`)** — usado para indicadores de status "ativo"
  (badge piscante na Hero, badges de status nos cards do bento grid) e
  confirmações (ex.: "E-mail copiado com sucesso!" no Footer).
- Fundo e texto se invertem entre os temas; a cor de marca e o verde de status
  **não mudam** entre claro/escuro — são as únicas cores fixas da paleta.

## Tipografia

| Token (classe Tailwind) | Fonte | Uso |
| --- | --- | --- |
| `font-poppins` | Poppins (pesos 400/600/700/900, via `next/font/google`) | Headings, logotipo, títulos de seção, CTAs |
| `font-inter` | Inter (via `next/font/google`) | Corpo de texto, UI, navegação — fonte padrão do `<body>` |
| `font-fira` | Fira Code (via `next/font/google`, variável `--font-fira-code`) | Elementos "estilo terminal": badges de status (`[ status: ativo ]`), tags de stack tecnológica, comentários decorativos (`/* Diretriz Operacional v1.0 */`), copyright do rodapé |

## Espaçamento e forma

- Container padrão de conteúdo: `max-w-6xl mx-auto px-6`.
- Seções verticais generosas: `py-24 sm:py-32`.
- Cards com raio grande (`rounded-3xl`) e borda sutil (`border-borderUI`) —
  visual de "cartão de laboratório", consistente entre bento grid e setores.
- Botões primários em pílula (`rounded-full`), com `hover:scale-105`.

## Logotipo

- Arquivo principal: `public/logo_dark.svg` / `public/logo_light.svg` — trocado
  dinamicamente pelo `Header` conforme `resolvedTheme`.
- Favicon segue a mesma lógica via `media: prefers-color-scheme` no
  `metadata.icons` de `src/app/[locale]/layout.tsx`.
- Um conjunto de conceitos alternativos de logo existe em
  `src/components/ui/logo-*.tsx` (não usado atualmente na UI — ver
  `docs/ARQUITETURA.pt-br.md`).

## Acessibilidade / motion

- `scroll-behavior: smooth` no `html`, desligado sob
  `@media (prefers-reduced-motion: reduce)` (volta para `auto`) —
  em conformidade com o padrão estrutural de landing pages da Café Labs
  (ver nó `cafelabs/padroes-landing.md` no Mind, se disponível).
- Indicadores animados (badge pulsante da Hero, seta de scroll) usam
  `motion-safe:animate-bounce` / equivalentes do Framer Motion, mas
  `TODO: confirmar` se todas as animações Framer Motion do repo respeitam
  `prefers-reduced-motion` — não foi encontrado um guard explícito para as
  transições `whileInView` do bento grid e do manifesto além do `scroll-behavior`.
