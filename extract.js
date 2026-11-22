const fs = require('fs');
const path = require('path');
const { fetchAllDatasets, ENDPOINTS } = require('./src/fetcher');
const { buildRelationalIndexes } = require('./src/parser');
const { generateMarkdown } = require('./src/markdown');

async function main() {
  console.log('====================================================');
  console.log('   VV Builder Extractor & Catalog Generator');
  console.log('   Target: https://vvcharmmerges.pages.dev/builder');
  console.log('====================================================');

  const dataDir = path.join(__dirname, 'data');
  fs.mkdirSync(dataDir, { recursive: true });

  // 1. Fetch all 12 official datasets
  const rawDatasets = await fetchAllDatasets(true);

  // 2. Build indexes and master dataset
  console.log('[Extractor] Indexing and consolidating master dataset...');
  const masterData = buildRelationalIndexes(rawDatasets);

  // 3. Write individual JSON datasets to ./data/
  console.log('[Extractor] Writing individual JSON datasets to ./data/ ...');
  for (const endpoint of ENDPOINTS) {
    const key = endpoint.replace('.json', '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const targetFile = path.join(dataDir, endpoint);
    fs.writeFileSync(targetFile, JSON.stringify(rawDatasets[key], null, 2), 'utf8');
  }

  // 4. Write consolidated master dataset
  fs.writeFileSync(
    path.join(dataDir, 'vv_builder_all.json'),
    JSON.stringify(masterData, null, 2),
    'utf8'
  );

  // 5. Generate human-readable Markdown guide
  console.log('[Extractor] Generating comprehensive VV_BUILDER_GUIDE.md ...');
  const markdown = generateMarkdown(masterData);
  const guidePath = path.join(__dirname, 'VV_BUILDER_GUIDE.md');
  fs.writeFileSync(guidePath, markdown, 'utf8');

  console.log('====================================================');
  console.log('[Success] Fresh extraction & catalog generation complete!');
  console.log(`  - 12 JSON datasets written to: ./data/`);
  console.log(`  - Consolidated master dataset: ./data/vv_builder_all.json (${(fs.statSync(path.join(dataDir, 'vv_builder_all.json')).size / 1024).toFixed(1)} KB)`);
  console.log(`  - Markdown guide written to: ./VV_BUILDER_GUIDE.md (${markdown.split('\n').length} lines)`);
  console.log('====================================================');
}

main().catch(err => {
  console.error('[Error] Extraction failed:', err);
  process.exit(1);
});
