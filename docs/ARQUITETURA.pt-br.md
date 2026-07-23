**[Read in English](ARQUITETURA.md)**

# Arquitetura

Site institucional da Café Labs. Next.js App Router, roteamento com prefixo
de idioma (`/pt`, `/en`) via `next-intl`, sem backend próprio — é conteúdo
estático/SSR client-rendered, sem persistência de dados nem chamadas a API.

## Camadas

```
src/proxy.ts                    → middleware do next-intl: resolve o idioma pela URL/navegador e redireciona pra /pt ou /en
src/i18n/routing.ts              → config de idiomas: locales ["pt", "en"], defaultLocale "pt"
src/i18n/request.ts              → carrega messages/{locale}.json do idioma ativo (server-side)
src/i18n/navigation.ts           → Link/usePathname/useRouter cientes de idioma (encapsula next-intl/navigation)
src/app/[locale]/layout.tsx      → RootLayout: carrega fontes, resolve o param de idioma, monta NextIntlClientProvider + ThemeProvider, Header/Footer fixos em toda página
src/app/[locale]/page.tsx        → única rota: compõe as 4 seções da home, em ordem
src/app/[locale]/globals.css     → Tokens de design (cores, fontes) via @theme do Tailwind v4
src/components/layout/  → uma seção de página cada (client components)
src/components/ui/      → peças pequenas reutilizáveis (toggle de tema, seletor de idioma, logos SVG)
src/providers/           → wrapper de contexto (tema)
messages/                → en.json / pt.json — todas as strings de UI, uma chave de topo por componente (Header, Footer, Hero, Manifesto, BentoGrid, Setores, LanguageSwitcher, ThemeToggle)
```

Não há roteamento além da própria home — `src/app/[locale]/page.tsx` é a
única página de cada idioma, e a navegação do Header (`Manifesto`,
`Laboratório`, `Setores`) é scroll suave para âncoras (`#manifesto`,
`#laboratorio`, `#setores`) dentro da mesma página, não rotas separadas. O
único roteamento que existe é o próprio prefixo de idioma (`/pt/...` vs.
`/en/...`).

## Internacionalização (`next-intl`)

- **Idiomas**: `pt` (padrão) e `en`, definidos em `src/i18n/routing.ts`.
  Toda rota é servida sob um segmento dinâmico `[locale]`
  (`src/app/[locale]/...`); visitar `/` redireciona pra `/pt` (o prefixo do
  idioma padrão sempre aparece — comportamento padrão de `localePrefix` do
  `next-intl`, não sobrescrito aqui).
- **Middleware**: `src/proxy.ts` roda o `next-intl/middleware` com a config
  `routing`, casado contra todo path exceto `/api`, `/_next`, `/_vercel` e
  arquivos com extensão (`config.matcher`).
- **Mensagens**: um JSON por idioma em `messages/` (`en.json`, `pt.json`),
  carregado server-side por `src/i18n/request.ts`. Todo componente client
  que renderiza texto chama `useTranslations("<Namespace>")` (ex.:
  `useTranslations("Header")`) e lê as chaves dali — não há texto
  hardcoded direto no JSX para strings voltadas ao usuário (comentários de
  código nos componentes continuam em português, já que são para quem edita
  o código, não para quem visita o site).
- **Seletor de idioma**: `src/components/ui/language-switcher.tsx` alterna
  entre `pt`/`en` via `router.replace(pathname, { locale: nextLocale })`
  (de `src/i18n/navigation.ts`), exibido no `Header`.
- **Geração estática**: o `RootLayout` (`src/app/[locale]/layout.tsx`) chama
  `generateStaticParams()` pra pré-renderizar os dois idiomas, e chama
  `notFound()` se um segmento de idioma desconhecido for requisitado.
- **Não localizado**: o `<title>`/meta `description` em
  `export const metadata` (`src/app/[locale]/layout.tsx`) são strings fixas
  em português, não lidas de `messages/*.json` — não mudam conforme o
  idioma. `TODO: confirmar` se isso é intencional (ex.: estratégia de SEO
  mantém PT como metadata canônica) ou um esquecimento de antes do i18n ser
  adicionado.

### `layout.tsx` — RootLayout

- Server component assíncrono: lê `params: Promise<{ locale: string }>`,
  valida contra `routing.locales` via `hasLocale()` e chama `notFound()` se
  inválido.
- Carrega 3 fontes do Google via `next/font`: Inter (`--font-inter`, corpo/UI),
  Poppins (`--font-poppins`, headings/logo), Fira Code (`--font-fira-code`,
  texto estilo "código"/tags de status).
- Envolve tudo em `NextIntlClientProvider` (disponibiliza as traduções para
  componentes client), depois `ThemeProvider` (`next-themes`,
  `attribute="class"`, `defaultTheme="system"`, `enableSystem`), o que
  habilita a classe `.dark` usada em `globals.css`.
- `Header` e `Footer` ficam fora de `{children}` mas dentro dos dois
  providers — aparecem em qualquer página que existisse, mesmo havendo só
  uma hoje.

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
| `header.tsx` | fixo, sempre visível | Nav com scroll suave para as âncoras (labels via `useTranslations("Header")`), logo condicional (troca `logo_dark.svg`/`logo_light.svg` conforme `resolvedTheme`), menu mobile (hambúrguer), `LanguageSwitcher`, `ThemeToggle`, CTA → `#contato`. Usa `Link` de `src/i18n/navigation.ts` (não `next/link`) pra manter o link do logo/home ciente de idioma. |
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
    logoComponent?: React.ComponentType,  // ex.: MindLogo/ForgeLogo, componente SVG inline
    icon?: LucideIcon,           // fallback quando o produto não tem logo próprio ainda
    descriptionKey: string,       // chave resolvida via useTranslations("BentoGrid") — o texto vive em messages/{locale}.json, não no array
    statusKey: string,            // idem, chave resolvida exibida como "[ status: X ]" via o template statusLabel
    stack: string[],              // badges de tecnologia no rodapé do card
    span: string,                 // classe Tailwind de col-span (controla o tamanho do card no grid)
    link?: string,                // URL externa do produto (torna o card inteiro clicável)
  }
  ```

  O texto de fato (descrição/status por produto, por idioma) vive no
  namespace `BentoGrid` em `messages/en.json`/`messages/pt.json` (ex.:
  `domoDescription`, `domoStatus`, `forgeDescription`, `forgeStatus`, ...) —
  o `bento-grid.tsx` só guarda as chaves, então mudanças de tradução ou de
  texto não tocam este componente.

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
  (componente React, ex. `MindLogo`, `ForgeLogo`) → `icon` (ícone genérico
  Lucide, fallback pra produto que ainda não tem identidade visual própria —
  não usado hoje, ver lista de produtos abaixo).

### Produtos atualmente listados (estado do array em `bento-grid.tsx`)

1. **Domo** — logo própria (`/domo-logo.svg`), `span md:col-span-2`, status
   "beta", link `https://domo.cafelabs.net`.
2. **Dindin** — logo própria (`/dindin-logo.svg`), `span md:col-span-1`,
   status "ACTIVE", link `https://dindin.cafelabs.net`.
3. **Forge Skill Library** — logo própria (`ForgeLogo`, componente SVG em
   `src/components/ui/forge-logo.tsx` — hexágono âmbar fixo na cor de marca
   do orchestrator, pétalas em `currentColor` pra seguir claro/escuro),
   `span md:col-span-1`, status "coming soon", link
   `https://forge.cafelabs.net`.
4. **mind** — `MindLogo` (componente SVG em `src/components/ui/mind-logo.tsx`),
   `span md:col-span-2`, status "open source", link `https://mind.cafelabs.net`.

Nenhum dos 4 itens atuais usa o fallback `icon` (Lucide) — ele só continua
valendo pra produtos futuros que ainda não tenham identidade visual própria.

### Como adicionar um novo produto ao Laboratório

1. Se o produto tem logo própria, colocar o SVG em `public/` (padrão de nome:
   `<produto>-logo.svg`, seguindo `dindin-logo.svg`/`domo-logo.svg`) ou
   adicionar um componente SVG inline em `src/components/ui/` (seguindo
   `mind-logo.tsx`/`forge-logo.tsx`) se precisar herdar `currentColor` pra
   trocar de tema.
2. Adicionar as chaves `<produto>Description`/`<produto>Status` ao namespace
   `BentoGrid` em **ambos** `messages/en.json` e `messages/pt.json` —
   esquecer um idioma quebra o render daquele idioma.
3. Adicionar um objeto ao array `experimentos` em
   `src/components/layout/bento-grid.tsx`, com `logo` (ou `logoComponent`/
   `icon` como fallback), `descriptionKey`/`statusKey` batendo com as chaves
   adicionadas acima, `link` para a landing/repo do produto, e `span`
   conforme o destaque desejado no grid.
4. Não há passo de build adicional — o grid renderiza o array diretamente.

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
durante o design da marca. Nenhum é importado em lugar nenhum de `src` hoje —
nem sequer em comentário (uma passada anterior desta doc registrava uma
referência comentada em `header.tsx`; esse bloco não existe mais, então
esses arquivos estão totalmente órfãos agora, mantidos só como registro
histórico das opções descartadas em favor da logo atual (Jarra-Erlenmeyer, em
`logo_dark.svg`/`logo_light.svg`).

`TODO: confirmar` — não está documentado em nenhum commit por que essas
variantes foram mantidas no repo em vez de removidas; se forem lixo morto,
vale limpar numa próxima passada.

## `src/app/[locale]/page.module.css`

Arquivo CSS Module remanescente do boilerplate padrão do `create-next-app`
(estilos da página de exemplo). Não é importado por nenhum componente ativo
(`page.tsx` não o referencia) — parece resíduo do scaffold inicial do
projeto. `TODO: confirmar` se pode ser removido com segurança.
