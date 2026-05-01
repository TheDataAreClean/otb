#!/usr/bin/env node

const { Resvg } = require('@resvg/resvg-js');
const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

const SITE        = path.join(__dirname, '../_site');
const FONTS_SERIF     = path.join(__dirname, '../node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-400-normal.woff2');
const FONTS_SANS_400  = path.join(__dirname, '../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2');
const FONTS_SANS_500  = path.join(__dirname, '../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2');

const fonts = [FONTS_SERIF, FONTS_SANS_400, FONTS_SANS_500];

function generate(svgFile, pngFile, widthPx) {
  let svg = fs.readFileSync(path.join(SITE, svgFile), 'utf8');
  svg = svg.replace(/<style>[\s\S]*?<\/style>/gi, '<style></style>');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: widthPx },
    font: { fontFiles: fonts, loadSystemFonts: false },
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(path.join(SITE, pngFile), png);
  console.log(`  generated ${pngFile}`);
}

console.log('[images]');
generate('og-image.svg', 'og-image.png', 1200);
