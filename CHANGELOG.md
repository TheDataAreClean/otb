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
