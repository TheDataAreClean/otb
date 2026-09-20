# FUTURE.md — Outside the Boxplot

Ideas and backlog. Not history — see [CHANGELOG.md](CHANGELOG.md) for shipped items.

---

## NOW

*(nothing urgent — site is launching)*

---

## NEXT

### Product
- **Newsletter** — the placeholder signup form and `/newsletter/` page were removed in v1.1.0 because Buttondown was never activated. To bring it back: add Buttondown's hosted embed or a direct form pointing at their subscribe URL. No serverless function needed.

### Tech Debt
- **Unused dependencies** — `@resvg/resvg-js` and `opentype.js` are in `package.json` but nothing uses them (image generation moved to Playwright in v1.1.0); remove them. Keep `playwright` and `@fontsource/*` — `scripts/generate-images.js` needs them
- **CMS and category subfolders** — `src/admin/config.yml` uses `folder: src/posts` (flat), while posts historically lived in `src/posts/{category}/`. The site reads both, but check with the first real post that Sveltia lists and saves where expected; if not, set `nested`/`path` on the collection
- **Local build leaves diffs in tracked icons** — `postbuild` re-renders `src/apple-touch-icon.png`, `src/favicon.ico` and `src/images/*.png`; byte differences from local fonts/browser show up in `git status`. Consider writing them only when the artwork changed

---

## LATER

### Product
- **Dark mode** — toggle with CSS custom property swap; persist in `sessionStorage`
- **Search** — client-side (Pagefind or similar); no server required
- **Reading time** — word count estimate in post meta

### DX
- **`npm run clean`** — delete `_site/` before a fresh build; currently missing
- **Feed validation in CI** — validate `/feed.xml` as part of `deploy.yml`
