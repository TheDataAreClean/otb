# HOSTING.md — self-hosted Ghost

Ghost, MySQL and Caddy (automatic HTTPS) in Docker Compose. Any VPS with Docker, ports 80/443 open, and DNS for `otb.thedataareclean.com` pointing at it.

## First deploy

```sh
cp .env.example .env        # set DOMAIN, DB passwords, SMTP
docker compose up -d
```

1. Open `https://otb.thedataareclean.com/ghost/` and create the staff account.
2. **Settings → Labs**: upload `ghost/routes.yaml` (URLs `/posts/{category}/{slug}/` and `/category/{slug}/`) and `ghost/redirects.yaml`.
3. **Settings → Advanced → Import**: upload `ghost/import.json` (About, Reference, and the four category tags). Rebuild it with `npm run ghost:import` after editing `ghost/content/`.
4. **Settings → Design**: upload `theme.zip` (`npm run theme:zip`) once, activate **otb**. After that, CI deploys it.
5. **Settings → Navigation**: About (`/about/`) and RSS (`/rss/`).
6. **Settings → General**: title, description, icon (`ghost/brand/icon-512.png`), logo and social image.
7. **Settings → Integrations → Add custom integration**: copy the Admin API URL and key into repo secrets `GHOST_ADMIN_API_URL` and `GHOST_ADMIN_API_KEY`.

## Writing

Each post gets exactly one category as its **first tag**: `median`, `box`, `whisker` or `outlier`. The list excerpt is Ghost's *custom excerpt*. Callouts use the callout card (yellow = note, red = warning); margin notes are an HTML card — see `/reference/`. Drafts are Ghost drafts.

## Local development

```sh
docker compose -f docker-compose.dev.yml up    # http://localhost:2368/ghost/
```

The `theme/` folder is mounted live. Run steps 2–5 above against localhost.

## Backups and updates

- Back up the `db_data` and `ghost_content` volumes (`docker compose exec db mysqldump -uroot -p ghost > ghost.sql`).
- Update: `docker compose pull && docker compose up -d`.

## Cutover

Remove the GitHub Pages custom domain (repo Settings → Pages), then point the DNS A/AAAA record at the server.
