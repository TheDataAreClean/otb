# APP.md — architecture

Ghost 6 (self-hosted) renders the site. Content lives in Ghost's database, not in git.

## Layout

```
theme/                    Ghost theme "otb"
  default.hbs             HTML shell: head, nav, footer
  index.hbs  tag.hbs      Home list; category list (a category is a Ghost tag)
  post.hbs  page.hbs      Post and static page
  error.hbs error-404.hbs
  partials/               badge (category icon), filter-nav, post-list, post-meta, dividers, logo
  assets/css/styles.css   All styles, CSS custom properties in the first :root block
  assets/js/margin-notes.js
ghost/
  routes.yaml             /posts/{primary_tag}/{slug}/ and /category/{slug}/
  redirects.yaml          /feed.xml → /rss/
  content/*.md            Source of About and Reference pages
  import.json             Generated from content/ + the four category tags
  brand/                  Favicon, icons, logo to upload in Ghost Admin
docker-compose*.yml       Production and local stacks
.github/workflows/deploy.yml   gscan on PRs; deploys theme/ to Ghost on push to main
```

## Categories

`median`, `box`, `whisker`, `outlier` are Ghost tags. A post's category is its **first (primary) tag**. Names, order, descriptions and browse labels are hardcoded in three places that must agree: `theme/partials/filter-nav.hbs`, `theme/post.hbs` (browse label) and `theme/partials/badge.hbs` (icons), plus the tags in Ghost (`scripts/build-ghost-import.js`).

## Content features

| Feature | In Ghost |
|---|---|
| Excerpt in lists | Custom excerpt |
| Draft | Ghost draft/scheduled; unpublished posts are not public |
| Callout | Callout card — yellow note, red warning (styled in `styles.css`) |
| Margin note | HTML card: `<aside class="margin-note" data-anchor="phrase"><p>…</p></aside>`, directly above its paragraph. `margin-notes.js` highlights the phrase |
| Section break | Divider card or `---`; the `hr` is drawn as a hand-drawn line by a CSS mask |
| Feed, sitemap, robots, OG/meta tags | Provided by Ghost (`/rss/`, `/sitemap.xml`, `{{ghost_head}}`) |

## Dropped in v2.0.0

Eleventy build, GitHub Pages, Sveltia CMS, the `/style/` token page, and generated OG/icon images (brand files are now static in `ghost/brand/`).
