# DEPLOY.md — Cloudflare

Needs a Cloudflare account with the domain's DNS on it. Check Cloudflare's current pricing for Workers, D1 and R2 before relying on the free plan.

## First deploy

1. `npm install`
2. `npx wrangler login`
3. `npm run deploy` — builds, then deploys. The first run creates the D1 database `outside-the-boxplot` and the R2 bucket `outside-the-boxplot-media` named in `wrangler.jsonc`. If it asks you to create them by hand: `npx wrangler d1 create outside-the-boxplot` and `npx wrangler r2 bucket create outside-the-boxplot-media`.
4. The `routes` entry in `wrangler.jsonc` attaches `otb.thedataareclean.com` as a custom domain. Remove the GitHub Pages custom domain first (repo Settings → Pages) and any old DNS record for it.
5. Open `https://otb.thedataareclean.com/_emdash/admin` and finish the setup wizard (create the admin account). It loads `seed/seed.json`: the Posts and Pages collections, the four categories, the menu, and the About and Reference pages.

## Continuous deploy

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. Add repo secrets `CLOUDFLARE_API_TOKEN` (a token with *Edit Cloudflare Workers* permission) and `CLOUDFLARE_ACCOUNT_ID`. Content changes in the admin do not need a deploy; only code and `seed/` changes do, and the seed only runs at first setup.

## Writing

Each post gets one **Category** (Median, Box, Whisker, Outlier) and an **Excerpt**. Callouts and margin notes are HTML blocks, and the section break is a Divider block; see `/reference/`.

## Local development

`npm run dev` → http://localhost:4321. Open `/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin` to skip the setup wizard locally. Local data is a throwaway.

## Backups

`npx wrangler d1 export outside-the-boxplot --remote --output backup.sql`, and `npx emdash export-seed` for the schema and content as a seed file.
