const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../posts');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    data[key] = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: match[2].trim() };
}

module.exports = function () {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data, body } = parseFrontmatter(raw);
      return {
        title: data.title || '',
        slug: path.basename(file, '.md'),
        excerpt: data.excerpt || '',
        body,
        category: data.category || 'other',
        published_date: data.published_date || '',
      };
    })
    .sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
};
