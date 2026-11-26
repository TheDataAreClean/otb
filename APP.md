# APP.md — architecture

Astro (server output) on Cloudflare Workers with the EmDash integration. Content lives in D1, media in R2, both bound in `wrangler.jsonc`. There is no build-time content step.

## Layout

```
astro.config.mjs        Astro + EmDash (d1 + r2 bindings)
wrangler.jsonc          Worker, D1, R2, cron, custom domain
src/worker.ts           Worker entry (EmDash handler + scheduled publishing)
src/live.config.ts      EmDash content loader
src/layouts/Base.astro  HTML shell: head, nav, footer
src/pages/              index, category/[slug], posts/[slug], [slug] (pages), style, rss.xml, 404
src/components/         Badge, FilterNav, PostList, Break, Body
src/utils/categories.ts The four categories, dividers, date format
src/utils/tokens.ts     Parses styles.css :root at build time → /style/
src/styles/styles.css   All styles; tokens in the first :root block
public/                 Favicon, icons, manifest, images, js/margin-notes.js
seed/                   base.json + content/*.md → seed.json (first setup only)
scripts/build-seed.mjs  Builds seed.json
```

## URLs

`/` list · `/category/{slug}/` · `/posts/{slug}/` · `/{slug}/` for pages (`/about/`, `/reference/`) · `/style/` (design tokens, read from the CSS, noindex, not in the nav) · `/rss.xml` · `/sitemap.xml` and `/robots.txt` from EmDash · `/_emdash/admin`.

## Categories

`median`, `box`, `whisker`, `outlier` are terms of the `category` taxonomy (a post's first term). Defined in three places that must agree: `seed/base.json`, `src/utils/categories.ts` (names, descriptions, browse labels) and `src/components/Badge.astro` (icons).

## Content features

| Feature | In the editor |
|---|---|
| Callout | HTML block: `<div class="callout callout--note">` or `callout--warning` |
| Margin note | HTML block: `<aside class="margin-note" data-anchor="phrase">`, directly above its paragraph; `public/js/margin-notes.js` highlights the phrase |
| Section break | Divider block (line). `Break.astro` draws it as the hand-drawn line |
| Draft | EmDash draft status; drafts are not public |
| Footnotes, heading anchors | Not supported |

HTML blocks are sanitized by EmDash (`div`, `aside`, `class`, `data-*` are allowed).

## Dropped in v2.0.0

Eleventy, GitHub Pages, Sveltia CMS, generated OG/icon images, the Atom feed (now RSS 2.0), heading anchors, footnotes.

## `/style/` token parser

`src/utils/tokens.ts` fails the build on any line in the first `:root` block of `styles.css` that isn't `--name: value; /* note */` or a `/* — Group — */` comment. Tokens appear by name prefix (`--font-`, `--text-`, `--leading-`, `--space-`, `--color-`, `--radius-`, and `--max-width`/`--grid-size`/`--margin-note*`); any other prefix needs adding to `tokens.ts`.
