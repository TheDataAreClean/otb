# COMMANDS.md — Outside the Boxplot

Shell commands and Claude Code prompts for working on this repo.

---

## Tasks

| Task | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm start` |
| Build | `npm run build` |
| Generate OG image only | `npm run generate:images` |
| Check vulnerabilities | `npm audit` |
| List available updates | `npm outdated` |

---

## Notes

- Dev server runs at **http://localhost:8080** with live reload
- Build output → `_site/` (not committed)
- `npm run build` automatically runs `postbuild` (OG image generation) — no need to call it separately
- `npm ci` is used in CI (`deploy.yml`) — prefer `npm install` locally
- No `.env` file is required for local dev unless testing the `URL` variable (used in RSS feed and sitemap)

---

## Claude Code prompts

Paste any prompt below directly into Claude Code. Append `Focus on: [feature/file/directory]` to scope further.

### Codebase review

```
Review the existing codebase and extend it based on patterns already established. Do not refactor or restructure — only add, fix, or optimize within the current architecture. Maintain naming conventions, file structure, and coding style already in use.
```

### Design system update

```
Review the existing design system (tokens, components, patterns) and extend it. Do not replace existing styles — only add missing components or update inconsistencies. Match the visual language, spacing scale, typography, and color palette already defined.
```

### Data model update

```
Review the existing data model and schema. Extend with new fields, tables, or relationships as needed. Do not alter existing field names or types — only add or optimize. Preserve all existing migrations and maintain backward compatibility.
```

### Infrastructure update

```
Review the existing infrastructure configuration and extend it. Do not replace or restructure — only add resources or update settings. Follow the naming conventions, environment patterns, and provider configurations already in place.
```

### Documentation update

```
Review the existing documentation structure and extend it. Match the current tone, format, and depth. Only add missing sections or update outdated content — do not rewrite docs that are already accurate.
```

### Full stack sync

```
Do a full review across codebase, design system, data model, infrastructure, and documentation. Identify gaps and inconsistencies only. Extend and align each layer to match the standards already established. No rewrites — additions and corrections only.
```

### Scope suffixes

Append to any prompt above to narrow focus:

- `Focus on: [feature name]`
- `Scope: [directory or file path]`
- `Priority: [what matters most]`
- `Skip: [what to leave untouched]`
