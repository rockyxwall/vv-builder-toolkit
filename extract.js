const fs = require('fs');
const path = require('path');
const { getClientBundle } = require('./src/fetcher');
const { parseAllData } = require('./src/parser');
const { applyUpdates } = require('./src/patch_updates');
const { generateMarkdown } = require('./src/markdown');

async function main() {
  console.log('====================================================');
  console.log('   VV Builder Extractor & Catalog Generator');
  console.log('====================================================');

  const dataDir = path.join(__dirname, 'data');
  fs.mkdirSync(dataDir, { recursive: true });

  // 1. Fetch bundle
  const bundleCode = await getClientBundle();

  // 2. Parse data
  const data = parseAllData(bundleCode);

  // 3. Apply updates & patches from official game announcements
  console.log('[Extractor] Merging game update patch logs (v5.0 - v5.2)...');
  applyUpdates(data);

  // 4. Write individual JSON datasets
  console.log('[Extractor] Saving structured JSON datasets to ./data/ ...');

  fs.writeFileSync(path.join(dataDir, 'vv_builder_all.json'), JSON.stringify(data, null, 2), 'utf8');

  // Consolidated skills (ultimates + race skills)
  const allSkills = {
    ultimates: data.ultimates,
    raceSkills: data.raceSkills
  };
  fs.writeFileSync(path.join(dataDir, 'skills.json'), JSON.stringify(allSkills, null, 2), 'utf8');

  // Spoke tree nodes
  fs.writeFileSync(path.join(dataDir, 'tree_nodes.json'), JSON.stringify(data.spokeNodes, null, 2), 'utf8');

  // Equipment
  fs.writeFileSync(path.join(dataDir, 'equipment.json'), JSON.stringify(data.equipment, null, 2), 'utf8');

  // Clans
  fs.writeFileSync(path.join(dataDir, 'clans.json'), JSON.stringify(data.clans, null, 2), 'utf8');

  // Charms
  fs.writeFileSync(path.join(dataDir, 'charms.json'), JSON.stringify(data.charms, null, 2), 'utf8');

  // Traits
  fs.writeFileSync(path.join(dataDir, 'traits.json'), JSON.stringify(data.traits, null, 2), 'utf8');

  // Essences & Attributes
  fs.writeFileSync(path.join(dataDir, 'essences.json'), JSON.stringify({
    essences: data.essences,
    attributes: data.attributes
  }, null, 2), 'utf8');

  // Game Meta (codes, boss schedules, mechanics)
  if (data.gameMeta) {
    fs.writeFileSync(path.join(dataDir, 'game_meta.json'), JSON.stringify(data.gameMeta, null, 2), 'utf8');
  }

  // 5. Generate Markdown guide
  console.log('[Extractor] Generating human-readable VV_BUILDER_GUIDE.md ...');
  const markdown = generateMarkdown(data);
  const guidePath = path.join(__dirname, 'VV_BUILDER_GUIDE.md');
  fs.writeFileSync(guidePath, markdown, 'utf8');

  console.log('====================================================');
  console.log(`[Success] Extraction & Update complete!`);
  console.log(`  - JSON datasets written to: ./data/`);
  console.log(`  - Markdown guide written to: ./VV_BUILDER_GUIDE.md (${markdown.split('\n').length} lines)`);
  console.log('====================================================');
}

main().catch(err => {
  console.error('[Error] Extraction failed:', err);
  process.exit(1);
});
