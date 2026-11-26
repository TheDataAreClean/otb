This document exists to show every formatting element this site can render. The page itself is one HTML block; in the editor, the same elements are the toolbar and slash-menu blocks, with callouts, margin notes and the section break noted below. It is a reference and a test. The content is real where it can be; instrumental where it must be.

## Inline text

Running prose can include **bold text** for emphasis, _italic text_ for titles and stress, and ~~strikethrough~~ for corrections or retractions. These can combine: **_bold italic_** works, as does _~~struck italic~~_.

Inline `code` renders in a monospace font with a faint background. It is for short technical terms, variable names, filenames — things that need to be distinguished from prose.

Links come in two kinds. [External links](https://www.example.com/) point away from this site. [Internal links](/about/) navigate within it. Both are underlined and use the accent green, darkening on hover.

Typographic characters are written as typed: use “curly quotes”, it’s, an en dash – or an em dash —, and an ellipsis… directly. Nothing converts straight quotes or double hyphens for you.

***

## Headings

Headings step down from h2 to h4, each a little smaller and staying close to body size and weight. Structure is in the spacing and in the words themselves as much as in visual hierarchy. This is a deliberate choice.

### Third-level heading

A third-level heading, introduced by `###`. Used for subsections within a section.

#### Fourth-level heading

A fourth-level heading, `####`. Use sparingly — if you need four levels of hierarchy in a single document, the document may need restructuring.

***

## Lists

An unordered list:

- The first item, which establishes the pattern
- A second item, continuing it
- A third item, closing the set
    - A nested item, indented one level
    - Another nested item at the same level
        - Nested two levels deep, which is usually too deep

An ordered list:

1. The first step, which must come first
2. The second step, which follows from it
3. The third step, which completes the sequence
    1. A sub-step within the third step
    2. Another sub-step

A list where items are full sentences should end each sentence with a full stop. A list where items are fragments should not. Mixing the two in a single list is the most common list error.

***

## Blockquote

A blockquote is for quotation — text that originates elsewhere. It is indented, in italic, with a faint left border. The source, if needed, follows as a regular paragraph.

> The test of a first-rate intelligence is the ability to hold two opposed ideas in mind at the same time and still retain the ability to function.

F. Scott Fitzgerald, _The Crack-Up_, 1936.

***

## Code block

A fenced code block, with syntax annotation:

```json
{
  "title": "A complete formatting reference",
  "date": "2026-03-26",
  "tags": ["meta", "design"]
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

Tables use the standard pipe syntax. Column alignment is set with colons in the separator row.

| Element | Markdown | Renders as |
| --- | --- | --- |
| Bold | `**text**` | **text** |
| Italic | `*text*` | *text* |
| Strikethrough | `~~text~~` | ~~text~~ |
| Inline code | `code` | `code` |
| Horizontal rule | `---` | a hand-drawn line |

Tables should be used for genuinely tabular data. If you find yourself merging cells or nesting tables, a list or prose is probably the right tool.

***

## Section break

The hand-drawn line between each section of this page is a section break. It is for a change of subject or a pause in the writing, lighter than a heading. In the editor, insert a **Divider** block (line style); in an HTML block, a bare `<hr>` draws one.

***` on a line of its own draws one.

Each one is a slightly different stroke, taken from the same five that separate posts in a list.

***

## Image

An image, constrained to the document width:

![sample.svg](/images/formatting-reference.svg)

Images are block-level. They sit on their own line with vertical spacing above and below. They do not float. In the editor, an image block has a caption field.

***

## Callout

A callout is an **HTML block** wrapping a `div` with the class `callout callout--note` or `callout callout--warning`.

<div class="callout callout--note"><p>A note callout. Use this for asides, clarifications, or additional context that is useful but not essential to the main argument. It has a faint yellow background.</p></div>

<div class="callout callout--warning"><p>A warning callout. Use this for things the reader should be careful about — exceptions, caveats, known failure modes. It has a faint orange background.</p></div>

***

## Margin note

A margin note is an **HTML block** holding an `aside` with the class `margin-note`, placed directly above the paragraph it belongs to. Add `data-anchor="phrase"` to highlight that phrase in the paragraph.

<aside class="margin-note" data-anchor="the words it is about"><p>This one names its phrase, so only those words are highlighted.</p></aside>

A margin note sits in the margin beside the paragraph it belongs to, with the words it is about highlighted. On a narrow screen the same note becomes a tinted box in the flow of the text, just above that paragraph. Without JavaScript the highlight is missing, but the note is still there.

<aside class="margin-note"><p>This one names no phrase, so it sits beside the whole paragraph that follows.</p></aside>

The paragraph that hosts a margin note should be self-contained — readable without the note. The note adds, it does not complete.
