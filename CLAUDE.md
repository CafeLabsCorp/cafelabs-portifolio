# CLAUDE.md

Site institucional da Café Labs. Comece por [README.md](README.md) — o que o
projeto é, stack, como rodar. Aprofunde em:

- [docs/ARQUITETURA.md](docs/ARQUITETURA.md) — rotas, componentes, e como o
  bento grid ("O Laboratório") lista os produtos da Café Labs.
- [docs/DESIGN.md](docs/DESIGN.md) — identidade visual, paleta, tipografia.
- [docs/DEPLOY.md](docs/DEPLOY.md) — deploy Vercel, domínio.

Sem backend próprio (sem `docs/BACKEND.md`).

## Específico para trabalhar aqui com um agente

- Único branch é `main` — não há fluxo de feature branch/PR neste repo hoje.
- Ao adicionar um novo produto ao bento grid (`src/components/layout/bento-grid.tsx`),
  o link deve apontar para a landing/repo próprio daquele produto, não para
  este repo — este projeto não hospeda os produtos, só os lista.
- Todo texto de UI vem de `messages/en.json`/`messages/pt.json` (via
  `next-intl`) — ao adicionar ou mudar uma chave, edite **os dois** arquivos
  na mesma passada; esquecer um deles quebra o render daquele idioma em
  produção.
- Mudanças futuras significativas neste projeto (nova seção, novo fluxo,
  refatoração maior) devem passar pelo Forge (o time de agentes especializados
  do repo `forge`) em vez de serem feitas ad-hoc por um agente avulso aqui.
