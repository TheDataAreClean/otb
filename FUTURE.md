# FUTURE.md — Outside the Boxplot

Ideas and backlog. Not history — see [CHANGELOG.md](CHANGELOG.md) for shipped items.

---

## NOW

*(nothing urgent — site is launching)*

---

## NEXT

### Product
- **Newsletter** — wire up Buttondown: replace the placeholder subscribe form on post pages and `/newsletter/` with Buttondown's hosted embed or a direct form pointing at their subscribe URL. No serverless function needed.
- **RSS link in nav** — currently in the nav but could be more prominent

### Tech Debt
- **Newsletter form is a dead end** — the subscribe form currently POSTs to `/api/subscribe` which does not resolve on GitHub Pages. Replace with Buttondown embed before any readers try to subscribe.
- **`playwright` in devDependencies** — listed but unused; remove it

---

## LATER

### Product
- **Dark mode** — toggle with CSS custom property swap; persist in `sessionStorage`
- **Search** — client-side (Pagefind or similar); no server required
- **Reading time** — word count estimate in post meta

### DX
- **`npm run clean`** — delete `_site/` before a fresh build; currently missing
- **Feed validation in CI** — validate `/feed.xml` as part of `deploy.yml`
