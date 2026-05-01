# CLAUDE.md — Outside the Boxplot

Operating manual for Claude. Architecture lives in [APP.md](APP.md). Commands live in [COMMANDS.md](COMMANDS.md).

---

## Quick facts

- **Stack:** Eleventy 3.x · Nunjucks · Markdown · vanilla CSS
- **Local dev:** `npm start` → http://localhost:8080
- **Entry point:** `.eleventy.js` — filters and passthrough copies; `src/` — all content, templates, and assets
- **Output:** `_site/` (not committed) → deployed to GitHub Pages via `deploy.yml`

---

## Before you change code

- Run `npm run build` — must exit zero errors, zero warnings
- Check browser console — no JS errors, no 404s
- Test the golden path: home page loads → category filter works → post opens → feed resolves

---

## Common traps

**`src/posts/posts.11tydata.js` sets `permalink: false` — do not remove it**
Without it, Eleventy generates a page directly from each `.md` file *and* from `post.njk`, producing duplicate output and broken URLs. Individual post pages come from `post.njk` via Eleventy pagination only.

**Categories are hardcoded in two places**
`src/_data/categories.js` drives the UI and templates. `src/admin/config.yml` drives the CMS dropdown. Adding a new category requires updating both — missing either one causes mismatches between the CMS and the rendered site.

**`published_date`, not `date`**
This codebase uses `published_date` as the frontmatter key (not `date` as in musings). All filters, sorts, and templates reference `published_date`. Do not introduce `date`.

**`feed.njk`, `sitemap.njk`, and `robots.njk` must have `layout: false`**
Without it, their output gets wrapped in the base HTML layout. Always confirm the front matter on these files.

**`src/_data/posts.js` reads from disk — no API**
Posts are read from `src/posts/*.md` at build time. There is no external CMS API. Content changes require a git commit (directly or via Sveltia) to trigger a new deploy.

**Newsletter form is currently non-functional**
The subscribe form POSTs to `/api/subscribe` which does not resolve on GitHub Pages (the Netlify function was removed). Do not add logic that depends on this endpoint. Replace with a Buttondown embed when wiring up the newsletter.

**`postbuild` regenerates the OG image on every build**
`scripts/generate-images.js` runs after every build via the `postbuild` npm hook. It reads `src/og-image.svg` and writes `src/og-image.png`. This is intentional. Do not suppress or skip it.

**`dotenv` in `.eleventy.js` is local-dev only**
A `.env` file is not required for production. Netlify/GitHub Actions provide `URL` automatically. Do not hardcode the production URL anywhere.

**Passthrough copies must be registered**
Any new asset directory or file type needs a corresponding `addPassthroughCopy` in `.eleventy.js`. Missing entries silently 404 in production.

---

## Review triggers

When adding a **new category**: update `src/_data/categories.js` AND `src/admin/config.yml`.

When adding a **new Eleventy filter**: document it in [APP.md](APP.md) under Eleventy config.

When adding a **new npm script**: add it to [COMMANDS.md](COMMANDS.md).

When changing **permalink or slug logic**: update [APP.md](APP.md) — these are URL-stability decisions.

When shipping a **new feature**: add an entry to [CHANGELOG.md](CHANGELOG.md) under UNRELEASED.

When adding a **new asset type to passthrough**: update the passthrough list in [APP.md](APP.md).

---

## Brief file map

Key files only. Full map: [README.md](README.md). Architecture: [APP.md](APP.md).

```
.eleventy.js                  Eleventy config — filters, passthrough copies
src/_data/posts.js            Reads all markdown posts from src/posts/ at build time
src/_data/categories.js       Hardcoded category definitions — UI source of truth
src/_data/metadata.js         Global site config (title, description, url, feedPath)
src/_includes/base.njk        HTML shell — head, nav, footer — affects every page
src/post.njk                  Individual post layout (Eleventy pagination)
src/feed.njk                  Atom feed → _site/feed.xml (must have layout: false)
src/admin/config.yml          Sveltia CMS collection definitions + backend config
src/css/styles.css            All styles — single file, CSS custom properties
scripts/generate-images.js    Converts og-image.svg → og-image.png (runs postbuild)
```

---

## Constraints and guardrails

- `_site/` is never committed
- `published_date` is the canonical date field — do not use `date`
- Categories are always one of: `median`, `box`, `whisker`, `outlier`
- `src/posts/posts.11tydata.js` must always set `permalink: false`
- `feed.njk`, `sitemap.njk`, `robots.njk` must always have `layout: false`
- `metadata.url` must have no trailing slash
- Do not introduce a bundler, framework, or server-side runtime

---

## Pre-push checklist

### Build
- [ ] `npm run build` — zero errors, zero warnings
- [ ] `_site/` not committed
- [ ] Browser console clean — no JS errors, no 404s

### Content
- [ ] New posts have `title`, `excerpt`, `category`, `published_date`
- [ ] Category slug is one of: `median`, `box`, `whisker`, `outlier`
- [ ] Post renders fully — no truncation (scroll to bottom in dev)

### Infrastructure
- [ ] `metadata.url` in `src/_data/metadata.js` — no trailing slash
- [ ] `feed.njk` has `layout: false`
- [ ] `_site/feed.xml` is valid XML — open in browser
- [ ] `_site/CNAME` is present and contains `otb.thedataareclean.com`
- [ ] `_site/sitemap.xml` lists all posts and static pages
- [ ] `_site/404.html` exists

---

## Release workflow

```sh
git tag -a v1.1.0 -m "Brief description"
git push origin v1.1.0
```

| Part | When to increment |
|---|---|
| MAJOR | Complete visual redesign or change in site concept |
| MINOR | New feature or page type |
| PATCH | Bug fix, copy tweak, infrastructure change |

Move UNRELEASED entries in [CHANGELOG.md](CHANGELOG.md) to a dated version block on each release.
Update `version` in `package.json` with `npm version <tag> --no-git-tag-version`.

**Commit convention:** `{Type}: {description}` — types: `Add` `Fix` `Update` `Redesign` `Refactor` `Docs` `Chore`
