# COMMANDS.md

| Command | What it does |
|---|---|
| `npm install` | Installs `gscan` (theme validator) |
| `npm run theme:check` | Validates `theme/` with gscan. Must show no errors |
| `npm run theme:zip` | Builds `theme.zip` for a manual upload in Ghost Admin |
| `npm run ghost:import` | Rebuilds `ghost/import.json` from `ghost/content/*.md` |
| `docker compose -f docker-compose.dev.yml up` | Local Ghost on http://localhost:2368 with `theme/` mounted live |
| `docker compose up -d` | Production stack (needs `.env`) |
| `docker compose pull && docker compose up -d` | Update Ghost |

Release: `git tag -a vX.Y.Z -m "…"` and `git push origin vX.Y.Z`. Commit convention: `{Type}: {description}`.
