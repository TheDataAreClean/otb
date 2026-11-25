# CLAUDE.md — Outside the Boxplot

Operating manual for Claude. Architecture: [APP.md](APP.md). Commands: [COMMANDS.md](COMMANDS.md). Hosting: [HOSTING.md](HOSTING.md).

## Quick facts

- **Stack:** self-hosted Ghost 6 · Handlebars theme in `theme/` · vanilla CSS
- **Check:** `npm run theme:check` — no errors (the custom-fonts warning is known)
- **Deploy:** push to `main` → GitHub Action uploads `theme/` to Ghost. Content is edited in Ghost, not git

## Common traps

- **Categories are Ghost tags** with slugs `median`, `box`, `whisker`, `outlier`; a post's category is its *first* tag. Names/descriptions/icons are duplicated in `filter-nav.hbs`, `badge.hbs`, `post.hbs` and `scripts/build-ghost-import.js` — change all together.
- **`ghost/routes.yaml` is uploaded by hand** (Ghost Admin → Settings → Labs). Editing it in git changes nothing until uploaded. Changing URLs breaks links — update APP.md.
- **Tokens live in the first `:root` block** of `theme/assets/css/styles.css`. Hex values belong there only.
- **`hr` is drawn by a CSS mask** in `.post__body hr`; restyle that rule, not an SVG.
- **Callouts and margin notes** are Ghost callout cards / HTML cards. There are no shortcodes any more.
- **Never commit `.env`** or the Admin API key.
- Do not introduce a build step for the theme.

## Review triggers

- New category → update the four places above and `/reference/` copy if relevant.
- New npm script → COMMANDS.md. New content feature → APP.md. New feature → CHANGELOG.md UNRELEASED.

## Pre-push checklist

- [ ] `npm run theme:check` passes
- [ ] Theme tried in `docker-compose.dev.yml` (home, category, post, About, Reference, 404)
- [ ] `/rss/` valid, `/sitemap.xml` lists posts

**Commit convention:** `{Type}: {description}` — `Add` `Fix` `Update` `Redesign` `Refactor` `Docs` `Chore`. Release: tag `vX.Y.Z`, update `version` in `package.json`, move UNRELEASED to a dated block.
