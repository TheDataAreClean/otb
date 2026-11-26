# COMMANDS.md

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local site at http://localhost:4321 (admin at `/_emdash/admin`) |
| `npm run build` | Production build into `dist/` |
| `npm run seed` | Rebuild `seed/seed.json` from `seed/base.json` and `seed/content/*.md` |
| `npm run typecheck` | `astro check` |
| `npm run deploy` | Build and `wrangler deploy` |
| `npx emdash seed --validate seed/seed.json` | Validate the seed file |

Release: `git tag -a vX.Y.Z -m "…"` and `git push origin vX.Y.Z`. Commit convention: `{Type}: {description}`.
