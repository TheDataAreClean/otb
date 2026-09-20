require('dotenv').config();

const fs = require('fs');
const path = require('path');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const markdownIt = require('markdown-it');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const categoriesData = require('./src/_data/categories.js');
const categoryMap = Object.fromEntries(categoriesData.map((c) => [c.slug, c]));

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  const DIVIDERS = [
    'M 0,4 C 90,2 230,6 390,3 C 510,2 610,5 680,4',
    'M 0,5 C 110,3 250,7 390,4 C 500,2 605,6 680,5',
    'M 0,4 C 85,6 210,2 360,5 C 475,3 585,6 680,4',
    'M 0,5 C 130,3 270,7 410,4 C 515,3 600,6 680,5',
    'M 0,4 C 100,3 220,5 400,4 C 500,3 605,5 680,4',
  ];

  const md = markdownIt({ html: true, linkify: true, typographer: true })
    .use(markdownItFootnote)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
      slugify: (s) =>
        s
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-'),
    })
    .use(markdownItAttrs);
  // --- and *** draw one of the hand-drawn dividers used between posts in a
  // list. The variant comes from the source line, so it is stable per hr.
  md.renderer.rules.hr = (tokens, idx) => {
    const line = (tokens[idx].map || [0])[0];
    return `<svg class="section-break" viewBox="0 0 680 8" preserveAspectRatio="none" role="separator"><path d="${DIVIDERS[line % DIVIDERS.length]}" fill="none" stroke-width="1.5" stroke-linecap="round"/></svg>\n`;
  };

  eleventyConfig.setLibrary('md', md);

  const renderMarkdown = (str) => md.render((str || '').trim());

  const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  const callout = (content, type) => {
    const kind = (type || 'note').toLowerCase();
    return `<div class="callout callout--${kind}">\n${renderMarkdown(content)}</div>`;
  };

  // The optional phrase is the text to highlight in the paragraph right after
  // the note; src/js/margin-notes.js does the highlighting. Without it the
  // note simply sits beside the next block.
  const marginnote = (content, anchor) => {
    const attr = anchor ? ` data-anchor="${escAttr(anchor)}"` : '';
    return `<aside class="margin-note"${attr}>\n${renderMarkdown(content)}</aside>`;
  };

  eleventyConfig.addPairedShortcode('callout', callout);
  eleventyConfig.addPairedShortcode('marginnote', marginnote);

  // Post bodies are rendered by markdownify, which never passes through
  // Nunjucks, so the shortcodes above would print literally in a post.
  // Expand them here with the same functions. Only these two are supported.
  const shortcodeArgs = (raw) =>
    [...raw.matchAll(/"([^"]*)"|'([^']*)'/g)].map((m) => (m[1] !== undefined ? m[1] : m[2]));

  const expandShortcodes = (str) =>
    (str || '')
      .replace(
        /\{%-?\s*(callout|marginnote)((?:\s+"[^"]*"|\s+'[^']*'|\s*,)*)\s*-?%\}([\s\S]*?)\{%-?\s*end\1\s*-?%\}/g,
        (_, name, args, body) =>
          `\n\n${(name === 'callout' ? callout : marginnote)(body, ...shortcodeArgs(args))}\n\n`
      );

  eleventyConfig.addFilter('markdownify', (str) => renderMarkdown(expandShortcodes(str)));

  eleventyConfig.addFilter('readableDate', (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  );

  eleventyConfig.addFilter('htmlDateString', (dateStr) =>
    new Date(dateStr).toISOString().split('T')[0]
  );

  eleventyConfig.addFilter('categoryLabel', (cat) => categoryMap[cat]?.name || cat);

  eleventyConfig.addFilter('categoryBrowse', (cat) => categoryMap[cat]?.browse || `More ${cat} posts`);

  eleventyConfig.addFilter('toDate', (str) => new Date(str));

  eleventyConfig.addFilter('sortByDate', (arr) =>
    [...(arr || [])].sort(
      (a, b) => new Date(b.published_date) - new Date(a.published_date)
    )
  );

  // Drafts are hidden from lists, the feed and the sitemap in a build; their
  // own URL still resolves for preview. Under `npm start` they show everywhere.
  const isDev = process.env.ELEVENTY_RUN_MODE !== 'build';
  // Feed readers ignore styles.css and resolve `#id` links against the site
  // root, so: unwrap the heading self-links, point footnote links at the post,
  // and swap the inline-SVG section break (which needs CSS to draw) for an <hr>.
  eleventyConfig.addFilter('feedContent', (html, postUrl) =>
    (html || '')
      .replace(/<a class="header-anchor" href="#[^"]*">([\s\S]*?)<\/a>/g, '$1')
      .replace(/href="#/g, `href="${postUrl}#`)
      .replace(/<svg class="section-break"[\s\S]*?<\/svg>/g, '<hr>')
  );

  eleventyConfig.addFilter('published', (arr) =>
    isDev ? arr || [] : (arr || []).filter((p) => !p.draft)
  );

  eleventyConfig.addFilter('filterByCategory', (arr, slug) =>
    (arr || []).filter((p) => p.category === slug)
  );

  const ICONS = {
    median: '<svg class="badge-icon" width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true"><rect x="2" y="1" width="16" height="8" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="1" x2="10" y2="9" stroke="currentColor" stroke-width="1.5"/></svg>',
    box:    '<svg class="badge-icon" width="20" height="10" viewBox="0 0 20 10" aria-hidden="true"><rect x="2" y="1" width="16" height="8" fill="currentColor" opacity="0.35"/><rect x="2" y="1" width="16" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    whisker:'<svg class="badge-icon" width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true"><line x1="1" y1="5" x2="5" y2="5" stroke="currentColor" stroke-width="1.5"/><line x1="1" y1="3" x2="1" y2="7" stroke="currentColor" stroke-width="1.5"/><rect x="5" y="1" width="10" height="8" stroke="currentColor" stroke-width="1.5"/><line x1="15" y1="5" x2="19" y2="5" stroke="currentColor" stroke-width="1.5"/><line x1="19" y1="3" x2="19" y2="7" stroke="currentColor" stroke-width="1.5"/></svg>',
    outlier:'<svg class="badge-icon" width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true"><line x1="1" y1="5" x2="13" y2="5" stroke="currentColor" stroke-width="1.5"/><line x1="1" y1="3" x2="1" y2="7" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="5" r="2.5" fill="currentColor"/></svg>',
  };
  eleventyConfig.addFilter('categoryIcon', (cat) => ICONS[cat] || '');

  eleventyConfig.addFilter('postUrl', (post) => `/posts/${post.category}/${post.slug}/`);

  eleventyConfig.addFilter('postDivider', (i) => DIVIDERS[i % DIVIDERS.length]);

  eleventyConfig.addFilter('svgContents', (relPath) =>
    fs.readFileSync(path.join(__dirname, 'src', relPath), 'utf8')
  );

  // /style/ is built from the :root block of styles.css (src/_data/tokens.js),
  // so a token edit must rebuild it under `eleventy --serve`
  eleventyConfig.addWatchTarget('src/css/styles.css');

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/*.png');
  eleventyConfig.addPassthroughCopy('src/*.svg');
  eleventyConfig.addPassthroughCopy('src/*.ico');
  eleventyConfig.addPassthroughCopy('src/*.webmanifest');
  eleventyConfig.addPassthroughCopy('src/CNAME');

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
