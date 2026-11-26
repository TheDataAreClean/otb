# Outside the Boxplot

A digital garden for thinking out loud about data communication. [EmDash](https://github.com/emdash-cms/emdash) (an Astro CMS) running on Cloudflare Workers, with D1 for content and R2 for media.

- `src/` — Astro pages, layouts and components. `src/styles/styles.css` is the whole stylesheet.
- `seed/` — the content model and starter pages EmDash loads on first setup.
- `wrangler.jsonc` — Cloudflare bindings (D1, R2, cron, custom domain).
- [DEPLOY.md](DEPLOY.md) setup · [APP.md](APP.md) architecture · [COMMANDS.md](COMMANDS.md) commands · [CLAUDE.md](CLAUDE.md) working rules.

Posts are written in the admin at `/_emdash/admin`, not in git. Before v2.0.0 this was an Eleventy site on GitHub Pages; see [CHANGELOG.md](CHANGELOG.md).
