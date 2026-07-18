<div align="center">
  <img src="./public/logo_dark.svg" alt="Café Labs Logo" width="120" />

  # Café Labs — Portifólio

  **Site institucional da Café Labs**

  Filtrando o ruído, extraindo a tecnologia pura e acelerando a validação do seu produto.
</div>

---

## Sobre o projeto

Este repositório é o site institucional da **Café Labs**, publicado em
[cafelabs.net](https://cafelabs.net). É a landing da empresa (não de um produto
específico): apresenta o manifesto/metodologia da Café Labs ("Testar.
Construir. Validar.") e lista, no bloco "O Laboratório", todos os produtos do
ecossistema (Domo, Dindin, Forge Skill Library, mind) como cards num bento
grid, cada um linkando para a landing/site próprio daquele produto.

Para quem quer entender o negócio por trás do código, veja
[docs/ARQUITETURA.md](docs/ARQUITETURA.md) para a estrutura técnica.

## Tech stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| UI | React 19 |
| Estilização | Tailwind CSS v4 |
| Animações | Framer Motion |
| Ícones | Lucide React + SVGs customizados próprios |
| Tema claro/escuro | `next-themes` |
| Deploy | Vercel |

## Pré-requisitos

- Node.js 20+ (testado com v20.20.1)
- npm

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

Outros scripts disponíveis (`package.json`):

- `npm run build` — build de produção.
- `npm run start` — serve o build de produção.
- `npm run lint` — ESLint (`eslint-config-next`, core-web-vitals + TypeScript).

## Estrutura de pastas

```
src/
  app/
    layout.tsx        # RootLayout: fontes, ThemeProvider, Header/Footer fixos
    page.tsx           # Home: Hero + Manifesto + BentoGrid + Setores
    globals.css        # Tokens de design (cores, fontes) via @theme do Tailwind v4
  components/
    layout/
      header.tsx        # Nav fixa, logo condicional dark/light, menu mobile
      hero.tsx           # Seção de abertura (100dvh) com CTAs
      manifesto.tsx      # Metodologia Build/Measure/Learn
      bento-grid.tsx     # Grid "O Laboratório" — cards dos produtos da Café Labs
      setores.tsx        # Grid das 4 frentes de negócio (Dev, E-commerce, Moda, Marketing)
      footer.tsx         # CTA de contato (e-mail) + copyright
    ui/
      theme-toggle.tsx           # Botão de alternância claro/escuro
      mind-logo.tsx               # Wordmark SVG do produto "mind"
      logo-*.tsx                  # Conceitos de logo alternativos da Café Labs (não usados atualmente — ver docs/ARQUITETURA.md)
  providers/
    theme-provider.tsx  # Wrapper de next-themes
public/
  logo_dark.svg / logo_light.svg   # Logo da Café Labs (Jarra-Erlenmeyer)
  dindin-logo.svg / domo-logo.svg  # Logos dos produtos usados no bento grid
```

## Documentação

- [docs/ARQUITETURA.md](docs/ARQUITETURA.md) — estrutura de páginas/componentes, como o bento grid funciona e como adicionar um novo produto.
- [docs/DESIGN.md](docs/DESIGN.md) — identidade visual: paleta, tipografia, tokens.
- [docs/DEPLOY.md](docs/DEPLOY.md) — deploy na Vercel, domínio.
- [CLAUDE.md](CLAUDE.md) — notas para quem usa um agente de IA neste repo.

Este projeto não tem backend próprio — é um site estático/SSR sem persistência
de dados (os "produtos" listados no bento grid são links externos para seus
próprios repos/deploys).
