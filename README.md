# Outside the Boxplot

Digital garden at [otb.thedataareclean.com](https://otb.thedataareclean.com). Writing about data communication and information design — how to make numbers legible to people who need to act on them.

Post types are named after box plot elements: Median (finished essays), Box (dense analysis), Whisker (recommendations), Outlier (rough ideas).

---

## Quickstart

```sh
npm install
npm start      # dev server → http://localhost:8080
```

Full command reference: [COMMANDS.md](COMMANDS.md)

---

## Top-level layout

```
src/              Content, templates, CSS, and static assets
  posts/          Markdown posts (one file = one post)
  _includes/      Nunjucks layouts and partials
  _data/          Global data — posts.js, categories.js, metadata.js
  css/            Single stylesheet (styles.css)
  admin/          Sveltia CMS entry point + config.yml
  images/         CMS-uploaded images
.eleventy.js      Eleventy config — filters, passthrough copies
.github/          Deploy workflow (GitHub Actions → GitHub Pages)
scripts/          Build-time image generation
```

---

## Docs

| File | Purpose |
|---|---|
| [README.md](README.md) | This file — what it is and how to start |
| [APP.md](APP.md) | Architecture and technical reference |
| [COMMANDS.md](COMMANDS.md) | All commands, copy-paste ready |
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [FUTURE.md](FUTURE.md) | Ideas backlog |
| [CLAUDE.md](CLAUDE.md) | Working instructions for Claude |
