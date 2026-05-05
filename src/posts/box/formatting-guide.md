---
title: Formatting Guide
excerpt: A reference post demonstrating every supported formatting element — headings, lists, blockquotes, code, and more.
category: box
published_date: 2025-12-01
---

This post exists as a formatting reference. It exercises every markdown element the site supports so you can see how each one renders before using it in real writing.

---

## Headings

The post title renders as an `h1`. Use `h2` for major sections and `h3` for sub-sections within them. Avoid deeper nesting — if you need `h4`, the section probably wants to be its own post.

### This is an h3

It renders smaller and lighter than an h2, suitable for a subdivision within a section.

---

## Prose and emphasis

Plain paragraph text is set in IBM Plex Serif at 17px with a comfortable line height. You can use *italic* for titles of works, technical terms on first use, or light stress. Use **bold** for genuinely important terms or key phrases — not for general emphasis.

Avoid using bold or italic as decoration. If everything is emphasized, nothing is.

---

## Links

Links are [rendered in the accent green](/) and underline on hover. Internal links use relative paths. External links should go to the actual source — [like this one](/).

---

## Lists

Unordered list — for items without a meaningful order:

- First item in the list
- Second item, which is a bit longer to show how the text wraps when it runs past the end of the line and continues on the next
- Third item
- Fourth item

Ordered list — when sequence matters:

1. Start with the claim
2. Provide the evidence
3. Acknowledge the strongest counterargument
4. Restate the claim with the counterargument absorbed

---

## Blockquotes

Use blockquotes for direct quotations or for passages you want to set apart from the main text.

> The greatest value of a picture is when it forces us to notice what we never expected to see.
>
> — John Tukey

Blockquotes are set in italic with a green left border. They are for quotations, not for calling out your own text — that's what prose structure is for.

---

## Code

Inline code uses a monospace face with a light background: `published_date`, `filterByCategory()`, `--accent`.

Code blocks are for multi-line examples:

```
title: My Post Title
excerpt: A short description of the post.
category: median
published_date: 2026-01-15
```

The site does not load a syntax highlighting library, so code blocks render in plain monospace without color.

---

## Horizontal rules

The `---` separator above and in this section creates a full-width rule. Use it to mark a major thematic break — a scene change, a shift in register, or a transition between a setup and a payoff. Don't use it as a substitute for a heading.

---

## Badge types for reference

Posts are tagged with one of four types, each named after a box plot element:

- **Median** — finished, definitive essays
- **Box** — dense, substantial analysis (this post)
- **Whisker** — recommendations and pointers outward
- **Outlier** — rough ideas, seeds, short provocations
