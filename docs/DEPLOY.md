**[Leia em Português](DEPLOY.pt-br.md)**

# Deploy

## Where it runs

- **Hosting**: Vercel.
- **Production domain**: [cafelabs.net](https://cafelabs.net) (Café Labs'
  institutional site).
- **Repository**: `CafeLabsCorp/cafelabs-portifolio` on GitHub
  (`git remote -v` confirms `origin` pointing to
  `https://github.com/CafeLabsCorp/cafelabs-portifolio.git`).

There's no `vercel.json` file in this repo, nor a CI workflow of its own
(`.github/workflows` doesn't exist) — the project doesn't define a custom
pipeline. `TODO: confirmar` the exact project configuration in the Vercel
dashboard (build command, environment variables, if any), since it's not
observable from the source code.

## Pipeline (inferred from the standard Vercel + GitHub pattern)

This project follows Vercel's standard Git integration model, with no
custom CI/CD step in this repository:

1. Push/merge to `main` on GitHub → Vercel detects the commit via the Git
   integration and automatically triggers a new build.
2. Build: `npm install` + `next build` (the standard command for a Next.js
   project on Vercel; no override in `vercel.json`).
3. Automatic deploy of the result to the production domain (`cafelabs.net`)
   as soon as the build passes.
4. Pull requests (when they exist) get automatic Vercel Preview Deployments,
   on a per-PR domain — this is the platform's default behavior, not a
   repo-specific configuration.

`TODO: confirmar`: there's no evidence in the repo that Preview Deployments
are actually enabled/used in the current workflow — the project works
directly on `main` with no feature branches (see `.gitignore`/`git log`: the
only branch is `main`), so in practice the observed flow is
"push to `main` → build → deploy to production", with no preview step.

`TODO: confirmar`: on 2026-07-23, automatic Vercel deploys stopped
triggering on push for this project and the other 4 Café Labs sites hosted
on Vercel under the `CafeLabsCorp` org, requiring a manual deploy the day
before — root cause not confirmed as of that date (candidates under
investigation: the GitHub App installation/access for Vercel under
`CafeLabsCorp`, or a stricter Third-party Access policy on the org). Not
observable from this repo; check the Vercel dashboard/GitHub App settings
before assuming the "push → automatic build" flow above is currently
working end-to-end.

## Environments

There's no staging/production environment split configured in this repo — a
single environment (production, `cafelabs.net`), no versioned `.env` file
(`.env*` is in `.gitignore`), and no environment variables detected in the
code (`next.config.ts` is empty, with no `env`/`publicRuntimeConfig`).

## Domain / DNS

- The root domain `cafelabs.net` points to this Vercel deploy.
- Other Café Labs products use their own subdomains
  (`dindin.cafelabs.net`, `domo.cafelabs.net`, `forge.cafelabs.net`,
  `mind.cafelabs.net`), each with its own deploy/repo — this project only
  links to them from the bento grid (`docs/ARQUITETURA.md`), it doesn't host
  them.
- `TODO: confirmar` DNS configuration details (registrar, exact records) —
  not observable from this repository.

## Rollback

There's no custom rollback mechanism in this repo. If a deploy breaks, the
standard path is to use the Vercel dashboard to "promote" a previous
deployment to production, or revert the problematic commit on `main` via
Git (`git revert`) to trigger a new automatic build.
`TODO: confirmar` whether this is actually the process followed in practice.
