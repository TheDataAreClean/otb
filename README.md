# Outside the Boxplot

A digital garden for thinking out loud about data communication. Self-hosted [Ghost](https://ghost.org) with a custom theme.

- `theme/` — the Ghost theme (Handlebars + one stylesheet). CI deploys it on push to `main`.
- `ghost/` — routes, redirects, starter content and brand assets to load into Ghost.
- `docker-compose.yml` — production stack (Ghost, MySQL, Caddy). `docker-compose.dev.yml` — local Ghost.
- [HOSTING.md](HOSTING.md) setup and operations · [APP.md](APP.md) architecture · [COMMANDS.md](COMMANDS.md) commands · [CLAUDE.md](CLAUDE.md) working rules.

Before v2.0.0 this was an Eleventy site on GitHub Pages; see [CHANGELOG.md](CHANGELOG.md).
