# APP.md — Outside the Boxplot

Architecture and technical reference. Claude's operating manual lives in [CLAUDE.md](CLAUDE.md).

---

## Architecture at a glance

Static site generator (Eleventy 3.x) → HTML + CSS (+ one small JS file) → GitHub Pages.

No build tools, no bundler. Eleventy reads markdown posts and Nunjucks templates, outputs static HTML.

**Author/deploy flow:**
1. Author writes `.md` in `src/posts/` (directly or via Sveltia CMS)
2. Commit to `main` triggers `deploy.yml`
3. GitHub Actions: `npm ci && npm run build` → `_site/`
4. Pages deploys `_site/` to `otb.thedataareclean.com`

---

## Stack

| Concern | Choice |
|---|---|
| Generator | Eleventy 3.x |
| Templates | Nunjucks + Markdown |
| Styling | Vanilla CSS (single file `src/css/styles.css`) |
| JavaScript | One small static file, `src/js/margin-notes.js` — no bundler |
| Fonts | IBM Plex Serif (body) + IBM Plex Sans (UI), Google Fonts |
| Hosting | GitHub Pages + custom domain |
| CMS | Sveltia CMS (Git-based, via Cloudflare Worker OAuth) |

---

## Content model

Posts live in `src/posts/*.md`. The filename becomes the URL slug. Post URLs follow the pattern `/posts/{category}/{slug}/` — defined in `post.njk` and centralised via the `postUrl` Eleventy filter. Use `{{ post | postUrl }}` in all templates rather than constructing the path manually.

**Front matter:**
```yaml
title: The title
excerpt: One sentence — shown in post list and used for OG meta.
category: median   # median | box | whisker | outlier
published_date: 2026-04-10
slug: optional-custom-url-slug   # omit to use the filename
draft: true                      # omit to publish
```

`slug` overrides the filename-derived slug in `posts.js`, so it changes the post's URL — treat it like a permalink. `draft: true` hides a post from the home list, category pages, feed and sitemap in a build (the `published` filter); the post's own page is still generated, so the URL works for preview. Under `npm start` drafts show everywhere.

`src/_data/posts.js` reads all `.md` files at build time (no API, no env vars needed for content). `src/posts/posts.11tydata.js` sets `permalink: false` so Eleventy does not also generate pages directly from the markdown files — individual pages come from `post.njk` via Eleventy pagination instead.

**Categories** (hardcoded in `src/_data/categories.js` and `src/admin/config.yml`):

| Slug | Label | Meaning |
|---|---|---|
| `median` | Median | Finished, definitive essays |
| `box` | Box | Dense, substantial analysis |
| `whisker` | Whisker | Recommendations and links |
| `outlier` | Outlier | Rough, half-formed seeds |

---

## Template hierarchy

```
src/_includes/base.njk    HTML shell — head, nav, footer — affects every page
src/index.njk             Homepage — full post list with category filter links
src/post.njk              Individual post pages (Eleventy pagination, one page per post)
src/category.njk          Category-filtered list (pagination over categories)
src/about.md              About page (layout: about.njk)
src/reference.md          /reference/ — every markdown element, copied from musings and adapted (layout: reference-page.njk)
src/style.njk             /style/ — design tokens and components, read from styles.css by src/_data/tokens.js
src/feed.njk              Atom feed → /feed.xml (must have layout: false)
src/sitemap.njk           Sitemap → /sitemap.xml (must have layout: false)
src/robots.njk            → /robots.txt (must have layout: false)
src/404.njk               → /404.html
```

---

## Eleventy config (`.eleventy.js`)

**Filters:**

| Filter | Output |
|---|---|
| `markdownify` | Renders markdown string to HTML. Also expands the `callout` and `marginnote` shortcodes first, because post bodies never pass through Nunjucks (see Shortcodes) |
| `feedContent` | Feed only: unwraps heading self-links, points `#fn1`-style links at the post's own URL, swaps the SVG section break for `<hr>` |
| `published` | Drops `draft: true` posts in a build; passes everything through under `npm start` |
| `readableDate` | `"April 10, 2026"` (UTC) |
| `htmlDateString` | `"2026-04-10"` (for `datetime` attributes) |
| `categoryLabel` | Slug → display name (`median` → `"Median"`) |
| `categoryBrowse` | Slug → browse label (`median` → `"More finished essays"`) |
| `categoryIcon` | Slug → inline SVG badge icon |
| `sortByDate` | Sorts post array newest-first by `published_date` |
| `filterByCategory` | Filters post array by category slug |
| `toDate` | Converts date string to JS `Date` |

**Shortcodes** (registered for Nunjucks *and* expanded inside `markdownify`, so they work in standalone pages and in post bodies alike):

| Shortcode | Output |
|---|---|
| `{% callout "note" %}…{% endcallout %}` | Callout block (`note` or `warning`); markdown works inside |
| `{% marginnote %}…{% endmarginnote %}` | `<aside class="margin-note">` beside the next block (left gutter from 1100px, tinted inline box below) |
| `{% marginnote "phrase" %}…{% endmarginnote %}` | Same, with `data-anchor="phrase"`; `src/js/margin-notes.js` highlights that phrase in the block right after the note and links the two on hover/focus. Not found → console warning, note left as is |

Only these two are expanded in post bodies (`expandShortcodes` in `.eleventy.js`); any other `{% %}` tag would print literally. Add a new shortcode in both places.

**Section break:** `---` or `***` renders as `<svg class="section-break">` — one of the five hand-drawn paths from the `postDivider` filter (the ones between posts in a list), chosen by the hr's source line. It is a `md.renderer.rules.hr` override in `.eleventy.js`, so it applies to standalone pages and post bodies alike. A raw `<hr>` and the footnotes separator stay a thin 1px line. There is no page-break element.

**Markdown extensions:** `markdown-it-footnote` (`[^1]`), `markdown-it-attrs` (`{ .class }`, `{ #id }` — space required), `markdown-it-anchor` (every heading gets an auto id and links to itself; override with `{ #id }`).

**Passthrough copies:**
- `src/css/` — stylesheet
- `src/js/` — `margin-notes.js`, loaded (`defer`) by `base.njk` only on pages whose content has a margin note
- `src/admin/` — CMS entry point
- `src/images/` — CMS-uploaded images
- `src/*.png` — favicon, OG image, logo, apple-touch-icon
- `src/*.webmanifest` — web app manifest
- `src/CNAME` — required for custom domain to survive GitHub Pages deploys

---

## Infrastructure

### Deployment

`deploy.yml` triggers on push to `main` — `npm ci → npm run build` → deploys `_site/` to GitHub Pages.

`src/CNAME` is passthrough-copied to `_site/CNAME` — required for the custom domain to survive deploys.

### Sveltia CMS

Access: `https://otb.thedataareclean.com/admin/` — sign in with GitHub.

- Cloudflare Worker at `https://sveltia-cms-auth.thedataareclean.workers.dev` proxies the GitHub OAuth flow
- GitHub OAuth App callback URL points to the Worker
- Every CMS save commits a markdown file to `main`, which triggers `deploy.yml`
- Images land in `src/images/` and are served from `/images/`
- `src/admin/config.yml` fields: title, optional slug override, excerpt, category, published date, draft toggle, body — each with an editor hint. `slug.encoding: ascii` keeps filenames URL-safe
- `src/admin/index.html` is `noindex`, is named "OTB CMS" (`app_title` in `config.yml`; the title, `application-name` and `apple-mobile-web-app-title` tags match), pins the tab title to that name (Sveltia rewrites `<title>` as it loads, so a `MutationObserver` on `<head>` puts it back — it deliberately does not override `document.title`), and loads `@sveltia/cms` unpinned from unpkg (always the latest, same as musings) — if a Sveltia release ever breaks the admin, pin it again by putting `@<version>` after the package name

### Image generation (`scripts/generate-images.js`)

Runs automatically as `postbuild`, after Eleventy has written `_site/`. It renders with Playwright's Chromium (IBM Plex loaded from `@fontsource`, inlined as base64):

- `_site/images/og-image.svg` (built from `src/og-image.njk`) → `_site/images/og-image.png` — build output only, not committed
- `src/apple-touch-icon.png`, `src/images/icon-192.png`, `src/images/icon-512.png`, `src/images/logo.png`, `src/images/anatomy-figure.png` — from `logo-mark.svg`, `logo.svg` and `anatomy-figure.svg`; these *are* tracked in git
- `src/favicon.ico` — 16px and 32px renders combined with ImageMagick (`magick`, or `convert`)

Needs `npx playwright install chromium` and ImageMagick locally (`deploy.yml` installs both). A local run re-renders the tracked PNGs and can leave byte-level diffs from your machine's fonts and browser; don't commit those unless the artwork actually changed. `scripts/screenshot-logo.js` is a manual helper, not part of the build.

### Feed

`/feed.xml` — Atom feed, all posts newest-first. Uses `dateToRfc3339` and `htmlToAbsoluteUrls` from `@11ty/eleventy-plugin-rss`, plus the `feedContent` filter (feed readers ignore `styles.css` and resolve `#id` links against the site root). Post HTML goes in `<content type="html">` as escaped text — not wrapped in CDATA, which combined with Nunjucks' autoescape would show literal tags. `feed.njk` must have `layout: false`.

---

## Environment variables

| Variable | Where set | Purpose |
|---|---|---|
| `URL` | Set in `deploy.yml` (`https://otb.thedataareclean.com`) | Site's public URL, used in feed, sitemap and canonical/OG tags. Falls back to `http://localhost:8080` |

Content is stored in the git repo — no CMS API keys needed. No other env vars required for production.

`dotenv` is loaded in `.eleventy.js` for local development convenience only (reads from `.env` if present).

---

## Design system

- **Accent color:** `#4a7c59` (green)
- **Reading column:** 680px max-width
- **Body font:** IBM Plex Serif (Georgia-feel serif)
- **UI font:** IBM Plex Sans
- **Background:** graph paper grid (green, subtle)
- All design values are CSS custom properties in `src/css/styles.css`

**`/style/` is generated from the CSS.** `src/_data/tokens.js` parses the first `:root` block of `styles.css` at build time and feeds `style.njk` (fonts, type scale, line heights, colour groups, spacing, shape and layout), so the page cannot drift from the real values. The parser expects the existing conventions: a `/* — Group title — */` comment on its own line starts a group, and each token is `--name: value; /* note */` on one line — anything else in that block fails the build. Tokens appear on the page by name prefix (`--font-`, `--text-`, `--leading-`, `--space-`, `--color-`, `--radius-`, and `--max-width`/`--grid-size`/`--margin-note*`); any other prefix needs adding to `tokens.js`. Components (badges, dividers, callouts, margin note, breaks) are written by hand in `style.njk`.

**`/reference/`** is `src/reference.md`, taken from [musings' reference](https://musings.thedataareclean.com/reference/) and reworded only where a sentence described musings' own look (Docs chrome, grey desk, comment rail) rather than this site's. Both pages are `noindex` and not linked in nav.
