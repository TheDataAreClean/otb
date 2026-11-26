# CLAUDE.md — Outside the Boxplot

Operating manual for Claude. Architecture: [APP.md](APP.md). Commands: [COMMANDS.md](COMMANDS.md). Deploy: [DEPLOY.md](DEPLOY.md).

## Quick facts

- **Stack:** EmDash (Astro CMS) on Cloudflare Workers · D1 · R2 · vanilla CSS
- **Local dev:** `npm run dev` → http://localhost:4321; skip setup with `/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin`
- **Deploy:** push to `main` → GitHub Action builds and runs `wrangler deploy`. Content is edited in the admin, not git

## Common traps

- **Seed runs once.** `seed/seed.json` is applied by the first-run wizard only. Editing it changes nothing on the live site; use the admin (or add a migration of your own).
- **`seed/seed.json` is generated** — edit `seed/base.json` or `seed/content/*.md`, then `npm run seed`.
- **Categories** live in `seed/base.json`, `src/utils/categories.ts` and `src/components/Badge.astro`. Change all together.
- **Never change `wrangler.jsonc` names** (D1, R2) after the first deploy; that points the site at a new empty database.
- **Tokens live in the first `:root` block** of `src/styles/styles.css`. Hex values belong there only. `/style/` parses that block and fails the build on any line that isn't `--name: value; /* note */` or a `/* — Group — */` comment.
- **Callouts, margin notes** are HTML blocks; the **section break** is the `break` block overridden in `Break.astro`. HTML is sanitized — stick to `div`, `aside`, `class`, `data-*`.
- **Never commit** `.env`, `.dev.vars`, `data.db` or Cloudflare tokens.
- The sandboxed build can't reach Google Fonts; a `Noto Sans` font warning there is harmless.

## Review triggers

- New category → the three places above. New npm script → COMMANDS.md. New content feature → APP.md. New feature → CHANGELOG.md UNRELEASED. URL changes → APP.md.

## Pre-push checklist

- [ ] `npm run build` succeeds
- [ ] `npm run dev`: home, a category, a post, /about/, /reference/, /rss.xml, 404 all render
- [ ] `npx emdash seed --validate seed/seed.json` passes if the seed changed

**Commit convention:** `{Type}: {description}` — `Add` `Fix` `Update` `Redesign` `Refactor` `Docs` `Chore`. Release: tag `vX.Y.Z`, update `version` in `package.json`, move UNRELEASED to a dated block.
