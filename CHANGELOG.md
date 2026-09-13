# CHANGELOG

Version bump policy: MAJOR = complete visual redesign or change in site concept; MINOR = new feature or page type; PATCH = bug fix, copy tweak, infrastructure change.

---

## UNRELEASED

- feat: SVG logo system — `logo.svg`, `logo-mark.svg`; all icons generated at build time via Playwright (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`)
- feat: OG image redesigned — left-aligned layout with logo, rule, title, subtitle
- feat: anatomy diagram saved as `images/anatomy-figure.svg` + `.png`; served via `<picture>` on about page
- feat: post permalinks changed to `/posts/{category}/{slug}/`
- feat: `about.md` replaces `.njk` page file
- infra: `generate-images.js` fully rewritten — Playwright for all raster output, resvg removed
- infra: `deploy.yml` — Playwright browser install + production `URL` env var added
- infra: `svgContents` filter for inlining SVG files in templates
- chore: removed newsletter signup (page, forms, nav link, CSS) — Buttondown was never wired up; revisit later
- chore: removed all blog posts to start fresh with new content
- feat: `/style/` page — internal reference (noindex, not in nav) rendering color tokens, type scale, spacing scale, category badges, and dividers
- feat: `/reference/` page — plain markdown file (`src/reference.md`), editable directly; mirrors [musings' formatting reference](https://musings.thedataareclean.com/ideas/2026-03-01-formatting-reference/), covering headings (h2-h4), nested lists, typographer, linkify, raw HTML passthrough, tables, code blocks, footnotes, callouts, margin notes, and custom heading IDs
- fix: `.post__body img`, `.post__body table`, and `.post__body h4` had no styling — added
- fix: Google Fonts link only loaded IBM Plex Serif at weight 400 — bold text and h3/h4 headings had no real bold face to render with; added weight 700 (roman + italic)
- feat: footnotes via `markdown-it-footnote` — numbered, bidirectionally linked
- feat: custom heading IDs/classes/data-attrs via `markdown-it-attrs`
- feat: `{% callout %}` and `{% marginnote %}` paired shortcodes — note/warning callouts with tinted backgrounds; margin notes that float left of content at ≥1100px and sit inline below that
- style: `--color-code-bg` and `--color-code-inline` now both alias `--color-accent-pale` instead of separate greys
- fix: `.post__body blockquote`'s child `<p>` kept its default bottom margin, which doesn't collapse through the blockquote's own padding — left a large gap after quoted text; zeroed on `:last-child`

---

## 2026-05-01 (v1.0.0)

- feat: initial site — Eleventy 3.x, Nunjucks templates, single-file CSS, four category types
- feat: post list with category filter nav on homepage
- feat: individual post pages with subscribe form and category browse link
- feat: category filtered list pages (`/category/{slug}/`)
- feat: about page with hand-drawn box plot anatomy SVG
- feat: Atom feed at `/feed.xml`
- feat: sitemap at `/sitemap.xml`
- feat: `404.html` — branded 404 page ("Outlier not found")
- feat: `robots.txt` — allows all, disallows `/admin/`
- feat: Sveltia CMS at `/admin/` (GitHub backend via Cloudflare Worker OAuth)
- feat: OG image generated from SVG at build time (`scripts/generate-images.js`)
- infra: GitHub Actions deploy to GitHub Pages (`deploy.yml`)
- infra: custom domain `otb.thedataareclean.com` via `src/CNAME`
- infra: Netlify removed — no serverless functions, no Git Gateway
