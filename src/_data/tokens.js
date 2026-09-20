// Design tokens, read straight from the first :root block of src/css/styles.css
// at build time, so the /style/ page can never drift from the real values.
//
// Conventions this relies on (see APP.md): a `/* — Group title — */` comment on
// its own line starts a group, and each token is `--name: value; /* note */` on
// one line. Anything else in the block throws, so a broken styles.css fails the
// build instead of mis-grouping.
const fs = require('fs');
const path = require('path');

module.exports = function () {
  const css = fs.readFileSync(path.join(__dirname, '..', 'css', 'styles.css'), 'utf8');
  const start = css.indexOf(':root {');
  if (start < 0) throw new Error('tokens.js: no :root block found in styles.css');
  const root = css.slice(start, css.indexOf('\n}', start));

  const all = [];
  let group = '';

  for (const raw of root.split('\n')) {
    const line = raw.trim();
    if (line === '' || line === ':root {') continue;

    // A comment on its own line is a group title: "/* — Colour: surfaces — */"
    const heading = line.match(/^\/\*\s*—?\s*(.*?)\s*—?\s*\*\/$/);
    if (heading) {
      group = heading[1];
      continue;
    }

    const m = line.match(/^(--[\w-]+):\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?$/);
    if (!m) throw new Error("tokens.js: can't read this line of styles.css :root: " + line);
    if (!group) throw new Error('tokens.js: ' + m[1] + ' appears before any group comment in styles.css');
    all.push({ name: m[1], value: m[2].trim(), note: m[3] || '', group });
  }

  const named = (prefix) => all.filter((t) => t.name.startsWith(prefix));
  const colors = named('--color-');
  // "Colour: surfaces" → "Surfaces"
  const title = (g) => g.replace(/^Colour:\s*/, '').replace(/^./, (c) => c.toUpperCase());

  return {
    colorGroups: [...new Set(colors.map((t) => t.group))].map((g) => ({
      title: title(g),
      tokens: colors.filter((t) => t.group === g),
    })),
    fonts: named('--font-'),
    text: named('--text-'),
    leading: named('--leading-'),
    space: named('--space-'),
    shape: named('--radius-'),
    layout: all.filter((t) => /^--(max-width|grid-size|margin-note)/.test(t.name)),
  };
};
