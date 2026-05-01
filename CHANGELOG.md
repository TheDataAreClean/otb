# CHANGELOG

Version bump policy: MAJOR = complete visual redesign or change in site concept; MINOR = new feature or page type; PATCH = bug fix, copy tweak, infrastructure change.

---

## UNRELEASED

—

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
