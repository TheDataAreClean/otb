# CHANGELOG

Version bump policy: MAJOR = complete visual redesign or change in site concept; MINOR = new feature or page type; PATCH = bug fix, copy tweak, infrastructure change.

---

## UNRELEASED

---

## 2026-09-20 (v1.3.0)

Brings the `/reference/` and `/style/` pages and the CMS editor in line with musings, adapted to this site's own design — plus heading anchors, phrase-highlighted margin notes, a hand-drawn section break, drafts and slug overrides, and fixes so shortcodes work inside posts and the Atom feed renders correctly.

- feat: `/reference/` is now musings' reference page content, adapted — `reference.md` replaced with musings' text; only sentences that described musings' own look (Docs chrome, grey desk, comment rail, browser link colour) or were wrong (`--` is an en dash, not an em dash) were reworded. The fourth-level heading sample now uses `####` (musings' source used `###`). The `intro` line and the "not implemented" notes are gone; `reference-page.njk` no longer prints an intro
- feat: heading anchors — `markdown-it-anchor` gives every heading an id and links it to itself; `{ #id }` still overrides
- feat: `{% marginnote "phrase" %}` — the phrase is highlighted in the paragraph after the note (`src/js/margin-notes.js`), hover/focus links the two
- feat: section break — `---` / `***` in markdown now draws one of the hand-drawn dividers used between posts in a list (`md.renderer.rules.hr`), instead of a plain 1px line. Musings' page break is not carried over: it only makes sense in a paginated-document look, so the reference page's "Page break" section became "Section break"
- fix: `callout` and `marginnote` shortcodes printed literally inside posts, because post bodies are rendered by `markdownify` without Nunjucks. `markdownify` now expands them
- fix: Atom feed showed literal HTML tags — `feed.njk` wrapped the post body in `<![CDATA[…]]>` but Nunjucks also HTML-escaped it. Body now goes in `<content type="html">` as escaped text (the standard form). Never noticed because no posts existed
- fix: feed links — heading anchors and footnote links resolved to `<site>/#id` (the home page). New `feedContent` filter unwraps heading self-links, points footnote links at the post, and swaps the SVG section break for an `<hr>`
- feat: `/style/` rebuilt in musings' structure and read from `styles.css`'s `:root` block by `src/_data/tokens.js` — no more hardcoded hex/scale lists. Adds line heights, shape and layout, and the components section (badges, dividers and section break, margin note, callouts); removes the unused `.styleguide-*` CSS
- feat: CMS editor — `draft` toggle, optional `slug` override, field hints, `label_singular`, ASCII slugs
- feat: `draft: true` posts are hidden from the home list, category pages, feed and sitemap in a build (`published` filter); `slug` front matter overrides the filename in `posts.js`
- feat: admin page — Sveltia is no longer pinned to `0.211.2`; it loads the latest from unpkg, as musings does. The admin is now named "OTB CMS" (login screen, tab title, `application-name`, `apple-mobile-web-app-title`); tab title pinned, `noindex, nofollow, noarchive, noimageindex`, theme colour and icon links
- fix: About page scrolled sideways on phones — the anatomy diagram is a fixed 520px `<img>` with no `max-width`; it now shrinks to fit
- infra: added `markdown-it-anchor`; `src/js/` is passthrough-copied
- docs: corrected the image-generation notes in APP.md/CLAUDE.md (Playwright + ImageMagick, not resvg; the OG PNG is build output, not committed) and the `URL` env var (set in `deploy.yml`); README layout and file map updated; FUTURE.md no longer lists the removed newsletter form or calls Playwright unused, and now tracks the unused `@resvg/resvg-js`/`opentype.js` dependencies

---

## 2026-09-13 (v1.2.0)

Fixes the Sveltia CMS admin interface, which was completely broken (blank page, then a rejected config) after an upstream package rename — and adds custom branding to it.

- fix: Sveltia CMS admin never rendered (blank page) — `admin/index.html` pointed at the old unscoped `sveltia-cms` npm package, which no longer exists (renamed to `@sveltia/cms`); also loaded the ESM build with `type="module"`, but the package's own docs specify the plain, non-module `dist/sveltia-cms.js`. Fixed and pinned to `@sveltia/cms@0.211.2`
- fix: once the CMS loaded, it rejected `config.yml` — `published_date`'s `widget: date` is deprecated/unsupported in Sveltia CMS. Changed to `widget: datetime, type: date` (outputs the same plain `YYYY-MM-DD`)
- feat: branded the CMS admin — `app_title: Outside the Boxplot Admin` replaces "Sveltia CMS" on the login screen and browser tab; `logo.src` set to `/favicon.svg` (the hardcoded-color one, not `logo-mark.svg`'s `currentColor` version, since Sveltia loads it standalone) — appears on the login page, admin header, and browser tab favicon while in the admin

---

## 2026-09-13 (v1.1.0)

Two new internal reference pages (`/style/`, `/reference/`) documenting the design system and markdown capabilities, expanded markdown support (footnotes, callouts, margin notes, custom heading IDs), a full content reset to start fresh, and a batch of styling and CI fixes.

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
- style: merged `--color-border-subtle` into `--color-border` and `--color-text-faint` into `--color-text-muted` — both were near-duplicates used in one place each, and `text-faint`'s original justification (placeholder-only, WCAG-exempt) no longer applied once the newsletter form was removed
- style: `/style/`'s color swatches now grouped under Surfaces/Text/Accent/Callouts subheadings, and include the callout colors that were missing from the list
- refactor: consolidated three copies of `p:last-child { margin-bottom: 0; }` (blockquote, callout, margin-note) into one grouped rule; consolidated `markdownify`/`callout`/`marginnote`'s duplicated `md.render()` calls into one `renderMarkdown` helper; removed now-dead `.sr-only` (only user was the removed newsletter form)
- fix: `.margin-note`'s wide-screen layout used a magic `-200px` offset unrelated to any token — reworked into non-overlapping narrow/wide rules driven by new `--margin-note-width`/`--margin-note-gap` tokens; breakpoint stays 1100px (verified: 230px gutter available there vs. 184px needed)
- fix: `favicon.svg` used `stroke="currentColor"`, which only resolves correctly when inlined into HTML with a CSS color cascade (as `logo.svg`/`logo-mark.svg` are) — loaded standalone via `<link rel="icon">` it fell back to black; hardcoded to `#4a7c59`
- fix: `deploy.yml` never installed ImageMagick — `generate-images.js`'s `magick`/`convert` auto-detect (added in an earlier fix) silently fell back to a binary that also doesn't exist on `ubuntu-latest`, failing every deploy at the `favicon.ico` step. Present locally on this machine the whole time, which is why it went unnoticed. Added an explicit `apt-get install imagemagick` step

---

## 2026-05-01 (v1.0.0)

Initial launch of Outside the Boxplot: a static Eleventy site with four post categories, an Atom feed and sitemap, a Git-based Sveltia CMS, and GitHub Pages deployment on a custom domain.

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
