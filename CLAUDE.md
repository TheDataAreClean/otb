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

**`{#` is a Nunjucks comment delimiter**
`reference.md`, `about.md` and every other standalone `.md` page run through Nunjucks before markdown. Never write `{#` in one — not in prose, not in a code block. It silently swallows everything up to the next `#}` and truncates the page with no build error. Write heading IDs as `{ #id }` (with a space).

**Post bodies never pass through Nunjucks**
`post.njk` renders `post.body | markdownify`, which is `md.render()` only. The `callout` and `marginnote` shortcodes work there only because `markdownify` expands those two itself (`expandShortcodes` in `.eleventy.js`, calling the same functions the Nunjucks shortcodes use). Any other `{% %}` tag in a post prints literally. A new shortcode must be added in both places.

**Markdown `---` is not an `<hr>`**
`md.renderer.rules.hr` in `.eleventy.js` turns it into the hand-drawn `<svg class="section-break">` (paths from `DIVIDERS`, shared with the post-list dividers). Only raw HTML `<hr>` and the footnotes separator reach the plain `.post__body hr` rule. Don't restyle `hr` expecting to change markdown rules.

**`/style/` parses `styles.css`'s first `:root` block**
`src/_data/tokens.js` fails the build on any line in that block that isn't `--name: value; /* note */` or a `/* — Group — */` comment. Keep to that shape when adding tokens. Hex values belong in `:root` only.

**Drafts are hidden, not unpublished**
`draft: true` removes a post from lists, category pages, the feed and the sitemap in a build (via the `published` filter — use it in any new template that lists posts), but `post.njk` still generates the page, so the URL works. New posts default to `draft: false` in the CMS and publish on save.

**`published_date`, not `date`**
This codebase uses `published_date` as the frontmatter key (not `date` as in musings). All filters, sorts, and templates reference `published_date`. Do not introduce `date`.

**`feed.njk`, `sitemap.njk`, and `robots.njk` must have `layout: false`**
Without it, their output gets wrapped in the base HTML layout. Always confirm the front matter on these files.

**`src/_data/posts.js` reads from disk — no API**
Posts are read from `src/posts/*.md` at build time. There is no external CMS API. Content changes require a git commit (directly or via Sveltia) to trigger a new deploy.

**`postbuild` regenerates the OG image on every build**
`scripts/generate-images.js` runs after every build via the `postbuild` npm hook. It renders `_site/images/og-image.svg` to `_site/images/og-image.png` (build output, not committed) and re-renders the tracked icon PNGs and `favicon.ico` in `src/` using Playwright's Chromium and ImageMagick. This is intentional. Do not suppress or skip it. Locally it can leave byte-level diffs in those tracked icons — `git checkout` them unless the artwork changed. Details in [APP.md](APP.md) → Image generation.

**`dotenv` in `.eleventy.js` is local-dev only**
A `.env` file is not required for production. `deploy.yml` sets `URL` for the build. Do not hardcode the production URL anywhere else.

**Passthrough copies must be registered**
Any new asset directory or file type needs a corresponding `addPassthroughCopy` in `.eleventy.js`. Missing entries silently 404 in production.

---

## Review triggers

When adding a **new category**: update `src/_data/categories.js` AND `src/admin/config.yml`.

When adding a **new shortcode**: register it in `.eleventy.js` for Nunjucks *and* in `expandShortcodes`, and document it in [APP.md](APP.md) under Eleventy config.

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
src/_data/tokens.js           Parses styles.css :root at build time → /style/
src/js/margin-notes.js        Highlights a margin note's phrase (loaded only where needed)
src/reference.md              /reference/ — musings' reference content, adapted
src/_data/metadata.js         Global site config (title, description, url, feedPath)
src/_includes/base.njk        HTML shell — head, nav, footer — affects every page
src/post.njk                  Individual post layout (Eleventy pagination)
src/feed.njk                  Atom feed → _site/feed.xml (must have layout: false)
src/admin/config.yml          Sveltia CMS collection definitions + backend config
src/css/styles.css            All styles — single file, CSS custom properties
scripts/generate-images.js    Renders og-image.png and the icon PNGs/favicon (runs postbuild)
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
