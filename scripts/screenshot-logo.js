#!/usr/bin/env node
// Captures the nav logo from a real Chromium render.
// Run manually: node scripts/screenshot-logo.js
// Then commit src/logo.png if you're happy with it.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const MARK_PATHS = fs.readFileSync(
  path.join(__dirname, '../src/_includes/mark-paths.njk'),
  'utf8'
).replace(/\{\{[^}]*\}\}/g, '#d0e8c8'); // resolve markCircleFill

const HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&display=swap">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 512px;
      height: 512px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fafaf8;
    }
    .wrap {
      background: #fafaf8;
      border-radius: 20px;
      padding: 60px 56px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .glyph { display: block; flex-shrink: 0; color: #4a7c59; }
    .wordmark {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 60px;
      font-weight: 500;
      color: #4a7c59;
      letter-spacing: 0.04em;
      line-height: 1;
    }
  </style>
</head>
<body>
  <div class="wrap" id="logo">
    <svg class="glyph" viewBox="0 0 80 22" width="160" height="44" overflow="visible">
      <g stroke="currentColor" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${MARK_PATHS}
      </g>
      <text x="46" y="16"
        font-family="'IBM Plex Sans', sans-serif"
        font-size="15" font-weight="500"
        fill="currentColor" letter-spacing="1">tb</text>
    </svg>
  </div>
</body>
</html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 4 });

  await page.setContent(HTML, { waitUntil: 'networkidle' });

  // Give fonts a moment to settle
  await page.waitForTimeout(500);

  const el = await page.$('#logo');
  await el.screenshot({ path: path.join(__dirname, '../src/logo.png') });

  await browser.close();
  console.log('Saved src/logo.png — open it to review before committing.');
})();
