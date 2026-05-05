#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE = path.join(__dirname, '../_site');
const SRC  = path.join(__dirname, '../src');
const FONTS_SANS_400 = path.join(__dirname, '../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2');
const FONTS_SANS_500 = path.join(__dirname, '../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2');
const FONTS_SERIF    = path.join(__dirname, '../node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-400-normal.woff2');


async function renderPage(browser, html, pngPath, width, height, scale) {
  const page = await browser.newPage({ deviceScaleFactor: scale });
  await page.setViewportSize({ width, height });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width, height } });
  await page.close();
  console.log(`  generated ${path.relative(path.join(__dirname, '..'), pngPath)}`);
}

// SVG at natural size on white background
async function renderSvgNatural(browser, svgPath, pngPath, width, height, extraStyles = '', scale = 3) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const html = `<!DOCTYPE html><html><head><style>
    ${extraStyles}
    * { margin:0; padding:0; } body { background:white; }
  </style></head><body>${svg}</body></html>`;
  await renderPage(browser, html, pngPath, width, height, scale);
}

// SVG centered on a square background (all icons)
async function renderIcon(browser, svgPath, pngPath, size, { padding = 0.15, bg = '#fafaf8' } = {}) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const padPx = Math.round(size * padding);
  const scale = size <= 64 ? 4 : 2;
  const html = `<!DOCTYPE html><html><head><style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:${size}px; height:${size}px; background:${bg}; color:#4a7c59; display:flex; align-items:center; justify-content:center; padding:${padPx}px; }
    svg { width:100%; height:100%; }
  </style></head><body>${svg}</body></html>`;
  await renderPage(browser, html, pngPath, size, size, scale);
}

(async () => {
  console.log('[images]');

  const { chromium } = require('playwright');
  const browser = await chromium.launch();

  const sans400 = fs.readFileSync(FONTS_SANS_400).toString('base64');
  const sans500 = fs.readFileSync(FONTS_SANS_500).toString('base64');
  const serif400 = fs.readFileSync(FONTS_SERIF).toString('base64');
  const fontFaces = `
    @font-face { font-family:'IBM Plex Sans'; font-weight:400; src:url('data:font/woff2;base64,${sans400}') format('woff2'); }
    @font-face { font-family:'IBM Plex Sans'; font-weight:500; src:url('data:font/woff2;base64,${sans500}') format('woff2'); }
    @font-face { font-family:'IBM Plex Serif'; font-weight:400; src:url('data:font/woff2;base64,${serif400}') format('woff2'); }
  `;

  const mark = path.join(SRC, 'images/logo-mark.svg');
  const logo = path.join(SRC, 'images/logo.svg');

  await renderSvgNatural(browser,
    path.join(SITE, 'images/og-image.svg'),
    path.join(SITE, 'images/og-image.png'),
    1200, 630, fontFaces, 1
  );

  await renderSvgNatural(browser,
    path.join(SRC, 'images/anatomy-figure.svg'),
    path.join(SRC, 'images/anatomy-figure.png'),
    520, 230, fontFaces
  );

  await renderIcon(browser, mark, path.join(SRC, 'apple-touch-icon.png'), 180);
  await renderIcon(browser, mark, path.join(SRC, 'images/icon-192.png'), 192);
  await renderIcon(browser, mark, path.join(SRC, 'images/icon-512.png'), 512);
  await renderIcon(browser, logo, path.join(SRC, 'images/logo.png'), 1088, { padding: 0.1 });

  // Favicon ICO from intermediate PNGs
  await renderIcon(browser, mark, path.join(SRC, 'favicon-32.png'), 32, { padding: 0.1 });
  await renderIcon(browser, mark, path.join(SRC, 'favicon-16.png'), 16, { padding: 0.1 });

  await browser.close();

  execSync(`magick ${path.join(SRC, 'favicon-16.png')} ${path.join(SRC, 'favicon-32.png')} ${path.join(SRC, 'favicon.ico')}`);
  fs.unlinkSync(path.join(SRC, 'favicon-16.png'));
  fs.unlinkSync(path.join(SRC, 'favicon-32.png'));
  console.log('  generated favicon.ico');
})();
