# Arquitetura

Site institucional da Café Labs. Next.js App Router, uma única rota (`/`),
sem backend próprio — é conteúdo estático/SSR client-rendered, sem
persistência de dados nem chamadas a API.

## Camadas

```
src/app/layout.tsx   → RootLayout: carrega fontes, monta ThemeProvider, Header/Footer fixos em toda página
src/app/page.tsx     → única rota: compõe as 4 seções da home, em ordem
src/components/layout/  → uma seção de página cada (client components)
src/components/ui/      → peças pequenas reutilizáveis (toggle de tema, logos SVG)
src/providers/           → wrapper de contexto (tema)
```

Não há roteamento além da home — `src/app/page.tsx` é a única página, e a
navegação do Header (`Manifesto`, `Laboratório`, `Setores`) é scroll suave para
âncoras (`#manifesto`, `#laboratorio`, `#setores`) dentro da mesma página, não
rotas separadas.

### `layout.tsx` — RootLayout

- Carrega 3 fontes do Google via `next/font`: Inter (`--font-inter`, corpo/UI),
  Poppins (`--font-poppins`, headings/logo), Fira Code (`--font-fira-code`,
  texto estilo "código"/tags de status).
- Envolve tudo em `ThemeProvider` (`next-themes`, `attribute="class"`,
  `defaultTheme="system"`), o que habilita a classe `.dark` usada em
  `globals.css`.
- `Header` e `Footer` ficam fora de `{children}` mas dentro do `ThemeProvider`
  — aparecem em qualquer página que existisse, mesmo havendo só uma hoje.

### `page.tsx` — Home

Composição simples, em ordem de scroll:

```tsx
<Hero />
<Manifesto />
<BentoGrid />
<Setores />
```

(O `Footer` não está aqui — vem do `layout.tsx`.)

## Componentes de `layout/`

| Componente | Seção / âncora | O que faz |
| --- | --- | --- |
| `header.tsx` | fixo, sempre visível | Nav com scroll suave para as âncoras, logo condicional (troca `logo_dark.svg`/`logo_light.svg` conforme `resolvedTheme`), menu mobile (hambúrguer), `ThemeToggle`, CTA "Tomar um Café" → `#contato`. |
| `hero.tsx` | topo, sem âncora própria | Seção de abertura, `min-h-dvh` (tela cheia). Título + 2 CTAs (`#laboratorio`, `#manifesto`) e indicador de scroll animado no rodapé da seção. |
| `manifesto.tsx` | `#manifesto` | Duas colunas: texto do manifesto à esquerda, os 3 pilares da metodologia (Construir/Medir/Aprender) à direita. |
| `bento-grid.tsx` | `#laboratorio` | Grid "O Laboratório" — ver seção dedicada abaixo. |
| `setores.tsx` | `#setores` | Grid 2 colunas com as 4 frentes de negócio da Café Labs (Desenvolvimento ativo; E-commerce, Moda e Marketing marcados como `isLocked: true`, exibidos com blur + selo "Em teste"). |
| `footer.tsx` | `#contato` | CTA de contato: detecta mobile via `navigator.userAgent` pra decidir entre `mailto:` (mobile) ou link direto do Gmail web (desktop); botão secundário copia o e-mail para a área de transferência. Copyright e links para `cafelabs.net`/`cafelabs.net.br`. |

## O bento grid (`bento-grid.tsx`)

É o mecanismo que lista os produtos da Café Labs como cards clicáveis — o
principal ponto de integração deste repo com o resto do ecossistema.

- **Fonte de dados**: array `experimentos` hardcoded no topo do arquivo
  (não vem de CMS/API). Cada item:

  ```ts
  {
    id: number,
    title: string,
    logo?: string,              // caminho em /public, renderizado via next/image
    logoComponent?: React.ComponentType,  // ex.: MindLogo, componente SVG inline
    icon?: LucideIcon,           // fallback quando o produto não tem logo próprio ainda
    description: string,
    status: string,              // texto livre exibido como "[ status: X ]"
    stack: string[],              // badges de tecnologia no rodapé do card
    span: string,                 // classe Tailwind de col-span (controla o tamanho do card no grid)
    link?: string,                // URL externa do produto (torna o card inteiro clicável)
  }
  ```

- **Layout**: `grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(250px,auto)]`.
  Cada card define seu próprio `span` (ex.: `md:col-span-2` para o Domo, que
  ocupa destaque duplo; `md:col-span-1` para os demais) — é assim que o bento
  grid varia o tamanho dos cards em vez de todos serem iguais.
- **Card clicável inteiro**: quando existe `link`, um `<a>` absoluto
  (`inset-0 z-10`) cobre o card todo; o conteúdo visual fica por baixo.
- **Animação**: Framer Motion com stagger (`containerVariants` /
  `cardVariants`), disparada via `whileInView` (anima ao entrar no viewport,
  uma vez só — `viewport={{ once: true }}`).
- **Logo do card**: prioridade `logo` (imagem em `/public`) → `logoComponent`
  (componente React, ex. `MindLogo`) → `icon` (ícone genérico Lucide, usado
  para produtos que ainda não têm identidade visual própria, ex. Forge Skill
  Library com o ícone `Blocks`).

### Produtos atualmente listados (estado do array em `bento-grid.tsx`)

1. **Domo** — logo própria (`/domo-logo.svg`), `span md:col-span-2`, link
   `https://domo.cafelabs.net`.
2. **Dindin** — logo própria (`/dindin-logo.svg`), link
   `https://dindin.cafelabs.net`.
3. **Forge Skill Library** — sem logo própria ainda, ícone `Blocks` (Lucide),
   link `https://forge.cafelabs.net`.
4. **mind** — `MindLogo` (componente SVG em `src/components/ui/mind-logo.tsx`),
   link `https://mind.cafelabs.net`.

### Como adicionar um novo produto ao Laboratório

1. Se o produto tem logo própria, colocar o SVG em `public/` (padrão de nome:
   `<produto>-logo.svg`, seguindo `dindin-logo.svg`/`domo-logo.svg`).
2. Adicionar um objeto ao array `experimentos` em
   `src/components/layout/bento-grid.tsx`, com `logo` (ou `logoComponent`/
   `icon` como fallback), `link` para a landing/repo do produto, e `span`
   conforme o destaque desejado no grid.
3. Não há passo de build adicional — o grid renderiza o array diretamente.

Cross-referência: o Mind (base de conhecimento pessoal do autor) mantém em
`cafelabs/cafelabs.md` e `projetos/produtos-cafelabs/cafelabs-portifolio.md`
o registro de quais produtos este repo referencia e por quê — relevante para
quem for entender o contexto de negócio por trás dos links, mas não é
necessário para trabalhar no código.

## `ui/logo-*.tsx`

Um conjunto de componentes SVG (`logo-anel`, `logo-bloco`, `logo-centelha`,
`logo-chemex`, `logo-cubocl`, `logo-erlenmeier-cafeteira`, `logo-erlenmeyer`,
`logo-fluxo`, `logo-grao`, `logo-matriz`, `logo-nucleo`, `logo-orbital`,
`logo-xicara`) — conceitos alternativos de logotipo da Café Labs explorados
durante o design da marca. Nenhum é importado ativamente hoje;
`header.tsx` só referencia essas variantes dentro de um bloco de código
comentado no final do arquivo (linhas 149+), mantido como registro histórico
das opções descartadas em favor da logo atual (Jarra-Erlenmeyer, em
`logo_dark.svg`/`logo_light.svg`).

`TODO: confirmar` — não está documentado em nenhum commit por que essas
variantes foram mantidas no repo em vez de removidas; se forem lixo morto,
vale limpar numa próxima passada.

## `src/app/page.module.css`

Arquivo CSS Module remanescente do boilerplate padrão do `create-next-app`
(estilos da página de exemplo). Não é importado por nenhum componente ativo
(`page.tsx` não o referencia) — parece resíduo do scaffold inicial do
projeto. `TODO: confirmar` se pode ser removido com segurança.
