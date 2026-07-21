**[Read in English](DEPLOY.md)**

# Deploy

## Onde roda

- **Hosting**: Vercel.
- **Domínio de produção**: [cafelabs.net](https://cafelabs.net) (site
  institucional da Café Labs).
- **Repositório**: `CafeLabsDev/cafelabs-portifolio` no GitHub
  (`git remote -v` confirma `origin` apontando para
  `https://github.com/CafeLabsDev/cafelabs-portifolio.git`).

Não há arquivo `vercel.json` neste repo nem workflow de CI próprio
(`.github/workflows` não existe) — o projeto não define pipeline customizado.
`TODO: confirmar` a configuração exata do projeto no painel da Vercel (build
command, variáveis de ambiente, se houver), já que não é observável a partir
do código-fonte.

## Pipeline (inferido do padrão Vercel + GitHub)

Este projeto segue o modelo padrão de integração Git da Vercel, sem passo de
CI/CD customizado neste repositório:

1. Push/merge para `main` no GitHub → Vercel detecta o commit via integração
   Git e dispara um novo build automaticamente.
2. Build: `npm install` + `next build` (comando padrão de projeto Next.js na
   Vercel; não há override em `vercel.json`).
3. Deploy automático do resultado para o domínio de produção
   (`cafelabs.net`) assim que o build passa.
4. Pull requests (quando existirem) recebem Preview Deployments automáticos
   da Vercel, em domínio único por PR — comportamento padrão da plataforma,
   não configuração específica deste repo.

`TODO: confirmar`: não há evidência no repo de que Preview Deployments
estejam de fato habilitados/usados no fluxo de trabalho atual — o projeto
trabalha direto em `main` sem branches de feature (ver `.gitignore`/`git log`:
único branch é `main`), então na prática o fluxo observado é
"push em `main` → build → deploy em produção", sem etapa de preview.

## Ambientes

Não há separação entre ambiente de staging e produção configurada neste
repo — um único ambiente (produção, `cafelabs.net`), sem arquivo `.env`
versionado (`.env*` está no `.gitignore`) e sem variáveis de ambiente
detectadas no código (`next.config.ts` está vazio, sem `env`/`publicRuntimeConfig`).

## Domínio / DNS

- Domínio raiz `cafelabs.net` aponta para este deploy Vercel.
- Os demais produtos da Café Labs usam subdomínios próprios
  (`dindin.cafelabs.net`, `domo.cafelabs.net`, `forge.cafelabs.net`,
  `mind.cafelabs.net`), cada um com seu próprio deploy/repo — este projeto
  apenas linka para eles a partir do bento grid (`docs/ARQUITETURA.pt-br.md`), não
  os hospeda.
- `TODO: confirmar` detalhes de configuração de DNS (registrador, registros
  exatos) — não são observáveis a partir deste repositório.

## Rollback

Não há mecanismo de rollback customizado neste repo. Em caso de deploy
quebrado, o caminho padrão é usar o painel da Vercel para "promote" um
deployment anterior a produção, ou reverter o commit problemático em `main`
via Git (`git revert`) para disparar um novo build automático.
`TODO: confirmar` se esse é de fato o processo seguido na prática.
