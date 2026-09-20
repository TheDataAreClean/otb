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

function getAllMdFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...getAllMdFiles(full));
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

module.exports = function () {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return getAllMdFiles(POSTS_DIR)
    .map((file) => {
      const raw = fs.readFileSync(file, 'utf8');
      const { data, body } = parseFrontmatter(raw);
      return {
        title: data.title || '',
        slug: data.slug || path.basename(file, '.md'),
        excerpt: data.excerpt || '',
        body,
        category: data.category || 'other',
        published_date: data.published_date || '',
        draft: data.draft === 'true',
      };
    })
    .sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
};
