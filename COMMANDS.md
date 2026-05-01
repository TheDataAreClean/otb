# COMMANDS.md — Outside the Boxplot

All runnable commands. Source: `package.json`.

---

## Tasks

| Task | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm start` |
| Build | `npm run build` |
| Generate OG image only | `npm run generate:images` |
| Check vulnerabilities | `npm audit` |
| List available updates | `npm outdated` |

---

## Notes

- Dev server runs at **http://localhost:8080** with live reload
- Build output → `_site/` (not committed)
- `npm run build` automatically runs `postbuild` (OG image generation) — no need to call it separately
- `npm ci` is used in CI (`deploy.yml`) — prefer `npm install` locally
- No `.env` file is required for local dev unless testing the `URL` variable (used in RSS feed and sitemap)
