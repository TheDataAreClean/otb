# APP.md — Outside the Boxplot

Architecture and technical reference. Claude's operating manual lives in [CLAUDE.md](CLAUDE.md).

---

## Architecture at a glance

Static site generator (Eleventy 3.x) → HTML + CSS → GitHub Pages.

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
| Fonts | IBM Plex Serif (body) + IBM Plex Sans (UI), Google Fonts |
| Hosting | GitHub Pages + custom domain |
| CMS | Sveltia CMS (Git-based, via Cloudflare Worker OAuth) |
| Newsletter | TBD — Buttondown (not yet wired up) |

---

## Content model

Posts live in `src/posts/*.md`. The filename becomes the URL slug. Post URLs follow the pattern `/posts/{category}/{slug}/` — defined in `post.njk` and centralised via the `postUrl` Eleventy filter. Use `{{ post | postUrl }}` in all templates rather than constructing the path manually.

**Front matter:**
```yaml
title: The title
excerpt: One sentence — shown in post list and used for OG meta.
category: median   # median | box | whisker | outlier
published_date: 2026-04-10
```

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
src/about.njk             Static about page
src/newsletter.njk        Newsletter signup page (form placeholder — not yet wired up)
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
| `markdownify` | Renders markdown string to HTML |
| `readableDate` | `"April 10, 2026"` (UTC) |
| `htmlDateString` | `"2026-04-10"` (for `datetime` attributes) |
| `categoryLabel` | Slug → display name (`median` → `"Median"`) |
| `categoryBrowse` | Slug → browse label (`median` → `"More finished essays"`) |
| `categoryIcon` | Slug → inline SVG badge icon |
| `sortByDate` | Sorts post array newest-first by `published_date` |
| `filterByCategory` | Filters post array by category slug |
| `toDate` | Converts date string to JS `Date` |

**Passthrough copies:**
- `src/css/` — stylesheet
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

### Image generation (`scripts/generate-images.js`)

Runs automatically as `postbuild`. Converts `src/og-image.svg` → `src/og-image.png` using `@resvg/resvg-js`. Requires `opentype.js` for font handling. Output is committed to the repo.

### Feed

`/feed.xml` — Atom feed, all posts newest-first. Uses `dateToRfc3339` and `htmlToAbsoluteUrls` from `@11ty/eleventy-plugin-rss`. `feed.njk` must have `layout: false`.

---

## Environment variables

| Variable | Where set | Purpose |
|---|---|---|
| `URL` | Auto-set by GitHub Actions | Site's public URL, used in RSS feed and sitemap |

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
