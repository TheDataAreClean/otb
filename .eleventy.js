require('dotenv').config();

const pluginRss = require('@11ty/eleventy-plugin-rss');
const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  const md = markdownIt({ html: true, linkify: true, typographer: true });
  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addFilter('markdownify', (str) => md.render(str || ''));

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

  eleventyConfig.addFilter('categoryLabel', (cat) => {
    const labels = {
      median: 'Median',
      box: 'Box',
      whisker: 'Whisker',
      outlier: 'Outlier',
    };
    return labels[cat] || cat;
  });

  eleventyConfig.addFilter('categoryBrowse', (cat) => {
    const browse = {
      median:  'More finished essays',
      box:     'More dense analysis',
      whisker: 'More recommendations',
      outlier: 'More rough ideas',
    };
    return browse[cat] || `More ${cat} posts`;
  });

  eleventyConfig.addFilter('toDate', (str) => new Date(str));

  eleventyConfig.addFilter('sortByDate', (arr) =>
    [...(arr || [])].sort(
      (a, b) => new Date(b.published_date) - new Date(a.published_date)
    )
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

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/*.png');
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
