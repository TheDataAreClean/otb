This document exists to show every formatting element this site can render. Everything here is written in one Ghost markdown card; the Ghost equivalents of the callout, margin note and section break are noted in their sections. It is a reference and a test. The content is real where it can be; instrumental where it must be.

## Inline text

Running prose can include **bold text** for emphasis, _italic text_ for titles and stress, and ~~strikethrough~~ for corrections or retractions. These can combine: **_bold italic_** works, as does _~~struck italic~~_.

Inline `code` renders in a monospace font with a faint background. It is for short technical terms, variable names, filenames — things that need to be distinguished from prose.

Links come in two kinds. [External links](https://www.example.com/) point away from this site. [Internal links](/about/) navigate within it. Both are underlined and use the accent green, darkening on hover.

The typographer is on. This means "straight quotes" become "curly quotes" automatically. Apostrophes too: it's, they're, don't. A double hyphen -- becomes an en dash and a triple hyphen --- an em dash. Three dots... become an ellipsis.

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

The hand-drawn line between each section of this page is a section break. It is for a change of subject or a pause in the writing, lighter than a heading. In the Ghost editor, insert a divider card; in a markdown card, a `---` or `***` on a line of its own draws one.

***

## Image

An image, constrained to the document width:

![sample.svg](/assets/images/formatting-reference.svg)

Images are block-level. They sit on their own line with vertical spacing above and below. They do not float. In the Ghost editor, an image card has a caption field; in a markdown card, a following paragraph in _italic_ can serve as one.

_An SVG placeholder standing in for a real photograph._

***

## Callout

In the Ghost editor, use a callout card: yellow is a note, red is a warning. In a markdown card, wrap the text in `<div class="callout callout--note">` (or `callout--warning`), with blank lines around the text.

<div class="callout callout--note">

A note callout. Use this for asides, clarifications, or additional context that is useful but not essential to the main argument. It has a faint yellow background.

</div>

<div class="callout callout--warning">

A warning callout. Use this for things the reader should be careful about — exceptions, caveats, known failure modes. It has a faint orange background.

</div>

***

## Margin note

A margin note is an HTML card (or raw HTML in a markdown card) placed directly above its paragraph: `<aside class="margin-note" data-anchor="phrase"><p>The note.</p></aside>`. Leave out `data-anchor` to sit beside the whole paragraph.

<aside class="margin-note" data-anchor="the words it is about"><p>This one names its phrase, so only those words are highlighted.</p></aside>

A margin note sits in the margin beside the paragraph it belongs to, with the words it is about highlighted. On a narrow screen the same note becomes a tinted box in the flow of the text, just above that paragraph. Without JavaScript the highlight is missing, but the note is still there.

<aside class="margin-note"><p>This one names no phrase, so it sits beside the whole paragraph that follows.</p></aside>

The paragraph that hosts a margin note should be self-contained — readable without the note. The note adds, it does not complete. This is the difference between a margin note and a footnote: margin notes are optional; footnotes are referenced.[^1]

***

## Footnotes

Footnotes are numbered automatically and linked bidirectionally.[^2] The reference appears inline as a superscript; the note appears at the bottom of the document with a return link.

They are for genuine supplementary material — citations, extended asides, qualifications that would slow the prose if embedded in it. If you find yourself writing footnotes longer than the paragraphs they annotate, reconsider whether the footnote belongs in the body or in a separate section.

[^1]: The footnote itself, demonstrating its own form. The text above references this note; this note does not assume you read the text above in order to make sense. That is the test.

[^2]: A second footnote. The numbering is automatic — add or remove footnotes anywhere in the document and the numbers update.
