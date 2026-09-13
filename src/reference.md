---
layout: reference-page.njk
title: Reference
permalink: /reference/
eleventyExcludeFromCollections: true
noindex: true
intro: >
  Internal reference, not linked in navigation. Renders this markdown file
  through the same pipeline and <code>.post__body</code> styles a real post
  uses — a preview of what a new post can contain, and an honest account of
  what this site's markdown setup does and doesn't support. Edit this file
  directly to change it. For design tokens (colors, type, spacing, badges),
  see <a href="/style/">/style/</a>.
---

This page exists to show every formatting element this site's markdown setup can render, and to say plainly which ones it can't. It mirrors the shape of [musings' formatting reference](https://musings.thedataareclean.com/ideas/2026-03-01-formatting-reference/), adapted to what's actually installed here.

## Inline text

Running prose can include **bold text** for emphasis, *italic text* for titles and stress, and ~~strikethrough~~ for corrections or retractions. These can combine: **_bold italic_** works.

Inline `code` renders in a monospace font with a faint background. It is for short technical terms, variable names, filenames — things that need to be distinguished from prose.

Links come in two kinds. [External links](https://example.com) point away from this site. [Internal links](/about/) navigate within it. Both are underlined by default, in the accent color, darkening on hover. A bare URL like https://example.com also auto-links, no markdown syntax needed — linkify is on.

Raw HTML passes through directly, since it's enabled in the markdown config: <mark>this is highlighted</mark> using a literal `<mark>` tag.

The typographer is on. "Straight quotes" become "curly quotes" automatically, and so do apostrophes in contractions — it's, they're. A double hyphen -- becomes an en dash; a triple hyphen --- becomes an em dash. Three dots... become an ellipsis. (A leading apostrophe, as in '90s, does not convert — a known limitation.)

***

## Headings

Headings step down from h2 through h4, each a little smaller and staying close to body size and weight — structure comes from spacing as much as size. `#` (h1) is reserved for the page title itself and isn't used inside post bodies.

### Third-level heading

A third-level heading, introduced by `###`. Used for subsections within a section.

#### Fourth-level heading

A fourth-level heading, `####`. Use sparingly — if a post needs four levels of hierarchy, it may need restructuring.

***

## Lists

An unordered list:

- The first item, which establishes the pattern
- A second item, continuing it
- A third item, closing the set
    - A nested item, indented one level
    - Another nested item at the same level

An ordered list:

1. The first step, which must come first
2. The second step, which follows from it
3. The third step, which completes the sequence
    1. A sub-step within the third step
    2. Another sub-step

A list where items are full sentences should end each sentence with a full stop. A list where items are fragments should not. Mixing the two in a single list is the most common list error.

***

## Blockquote

A blockquote is for quotation — text that originates elsewhere. It renders indented, in italic, with a faint left border. The source, if needed, follows as a regular paragraph.

> Every sentence has a job. If it isn't doing one, cut it.

***

## Code block

A fenced code block, with syntax annotation:

```json
{
  "title": "Reference",
  "category": "median",
  "published_date": "2026-01-01"
}
```

A shell example:

```bash
npm start
# → Server at http://localhost:8080
```

Code blocks scroll horizontally if the content is wider than the page. They do not wrap.

***

## Table

Tables use the standard pipe syntax.

| Element | Markdown | Renders as |
| --- | --- | --- |
| Bold | `**text**` | **text** |
| Italic | `*text*` | *text* |
| Strikethrough | `~~text~~` | ~~text~~ |
| Inline code | `` `code` `` | `code` |
| Horizontal rule | `---` | a plain divider line |

Tables should be used for genuinely tabular data. If you find yourself merging cells or nesting tables, a list or prose is probably the right tool.

***

## Horizontal rule / page break

A plain `---` renders as the divider line above and below this section — there's no lighter typographic "\* \* \*" variant here. musings also supports a full-bleed `<hr class="page-break">` for long, paginated documents; raw HTML would pass through here too, but no `.page-break` style exists in `styles.css`, so it would render as the exact same plain divider line, not a full-bleed band. Not implemented.

***

## Image

An image, constrained to the document width:

![Box plot anatomy diagram](/images/anatomy-figure.png)

*The anatomy diagram from the About page, standing in for a real photograph. A following paragraph in italic like this one can serve as a caption — captions aren't a built-in feature.*

***

## Callouts

musings has a callout shortcode for asides and warnings, with faint colored backgrounds. Not implemented here — would need a custom Eleventy shortcode or a markdown-it container plugin.

***

## Margin notes

musings can place a short aside in the margin on wide screens, inline on narrow ones. Not implemented here — same as callouts, this needs a dedicated shortcode.

***

## Custom heading IDs

musings uses `markdown-it-attrs` to override auto-generated heading slugs for stable deep links. Not installed here — and there's no heading-anchor plugin either, so headings in a real post get no `id` attribute at all. No deep-linking to a specific section is possible today.

***

## Footnotes

musings numbers and links footnotes automatically via a markdown-it footnote plugin. Not installed here — a footnote written in the source would render as literal text, not a linked reference.
