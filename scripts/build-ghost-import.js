// Builds ghost/import.json from ghost/content/*.md: the About and Reference
// pages (each one Ghost markdown card) and the four category tags.
// Import it in Ghost Admin → Settings → Advanced → Import/Export → Import.
//   npm run ghost:import
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, 'ghost/content', f), 'utf8');

const lexical = (markdown) =>
  JSON.stringify({
    root: {
      children: [{ type: 'markdown', version: 1, markdown }],
      direction: null, format: '', indent: 0, type: 'root', version: 1,
    },
  });

const now = new Date().toISOString();
const page = (id, title, slug, file, extra = {}) => ({
  id, title, slug, type: 'page', status: 'published', visibility: 'public',
  lexical: lexical(read(file)), created_at: now, updated_at: now, published_at: now,
  ...extra,
});

const categories = [
  ['median', 'Median', 'Finished, definitive essays — the central argument'],
  ['box', 'Box', 'Dense, substantial analysis — the main body'],
  ['whisker', 'Whisker', 'Recommendations and links — reaching outward'],
  ['outlier', 'Outlier', 'Rough ideas and seeds — outside the expected range'],
];

const data = {
  db: [{
    meta: { exported_on: Date.now(), version: '6.0.0' },
    data: {
      posts: [
        page('otb-about', 'About', 'about', 'about.md'),
        page('otb-reference', 'Reference', 'reference', 'reference.md', {
          custom_excerpt: "Every element this site's posts support, in one place.",
          meta_title: 'Reference',
        }),
      ],
      tags: categories.map(([slug, name, description]) => ({
        id: `otb-tag-${slug}`, slug, name, description, visibility: 'public',
        created_at: now, updated_at: now,
      })),
    },
  }],
};

fs.writeFileSync(path.join(root, 'ghost/import.json'), JSON.stringify(data, null, 2) + '\n');
console.log('Wrote ghost/import.json');
