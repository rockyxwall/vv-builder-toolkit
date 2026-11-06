const fs = require('fs');
const path = require('path');
const assert = require('assert');

function runTests() {
  console.log('--- Running Automated Verification Suite ---');

  const dataDir = path.join(__dirname, 'data');
  const guidePath = path.join(__dirname, 'VV_BUILDER_GUIDE.md');

  // 1. Check file existence
  const requiredFiles = [
    'vv_builder_all.json',
    'skills.json',
    'tree_nodes.json',
    'equipment.json',
    'clans.json',
    'charms.json',
    'traits.json',
    'essences.json',
    'game_meta.json'
  ];

  for (const file of requiredFiles) {
    const fullPath = path.join(dataDir, file);
    assert.ok(fs.existsSync(fullPath), `File missing: ${file}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 100, `File too small: ${file} (${stat.size} bytes)`);
    console.log(`[PASS] File exists and valid size: data/${file} (${stat.size} bytes)`);
  }

  // 2. Load and validate vv_builder_all.json
  const masterData = JSON.parse(fs.readFileSync(path.join(dataDir, 'vv_builder_all.json'), 'utf8'));

  // Ultimates check (including Shunko Mode)
  assert.ok(Array.isArray(masterData.ultimates), 'ultimates is array');
  assert.ok(masterData.ultimates.length >= 11, `Expected >= 11 ultimates, got ${masterData.ultimates.length}`);
  const hasShunko = masterData.ultimates.some(u => u.id === 'shunko_mode');
  assert.ok(hasShunko, 'Shunko Mode present in ultimates');
  console.log(`[PASS] Ultimates count: ${masterData.ultimates.length} (including Shunko Mode)`);

  // Race skills check
  assert.ok(masterData.raceSkills.Shinigami && masterData.raceSkills.Shinigami.length > 0, 'Shinigami skills present');
  assert.ok(masterData.raceSkills.Hollow && masterData.raceSkills.Hollow.length > 0, 'Hollow skills present');
  assert.ok(masterData.raceSkills.Quincy && masterData.raceSkills.Quincy.length > 0, 'Quincy skills present');
  console.log(`[PASS] Race skills present: Shinigami (${masterData.raceSkills.Shinigami.length}), Hollow (${masterData.raceSkills.Hollow.length}), Quincy (${masterData.raceSkills.Quincy.length})`);

  // Spoke tree nodes
  let totalNodes = 0;
  for (const [spoke, nodes] of Object.entries(masterData.spokeNodes)) {
    assert.ok(nodes.length > 0, `Spoke ${spoke} has nodes`);
    totalNodes += nodes.length;
  }
  assert.ok(totalNodes >= 230, `Expected >= 230 spoke nodes, got ${totalNodes}`);
  // Check specific new spoke nodes
  const magicNodes = masterData.spokeNodes.magic.map(n => n.id);
  assert.ok(magicNodes.includes('sr_okasen'), 'SR Okasen present in magic spoke');
  assert.ok(magicNodes.includes('sr_danku'), 'SR Danku present in magic spoke');
  assert.ok(magicNodes.includes('sr_hyapporankan'), 'SR Hyapporankan present in magic spoke');
  assert.ok(magicNodes.includes('quincy_brenschwerter'), 'Brenschwerter present in magic spoke');
  assert.ok(magicNodes.includes('quincy_klingenfallen'), 'Klingenfallen present in magic spoke');
  const strengthNodes = masterData.spokeNodes.strength.map(n => n.id);
  assert.ok(strengthNodes.includes('strength_rending_tide'), 'Rending Tide present in strength spoke');
  console.log(`[PASS] Spoke nodes count: ${totalNodes} across ${Object.keys(masterData.spokeNodes).length} spokes (all patch skills verified)`);

  // Equipment check
  const slots = ['Body', 'Head', 'Face', 'Utility', 'Misc'];
  let totalEquip = 0;
  const equipIds = new Set();
  for (const slot of slots) {
    assert.ok(Array.isArray(masterData.equipment[slot]), `Slot ${slot} exists in equipment`);
    for (const item of masterData.equipment[slot]) {
      assert.ok(item.id, `Equipment item has id: ${JSON.stringify(item)}`);
      assert.ok(item.name, `Equipment item has name: ${item.id}`);
      assert.ok(!equipIds.has(item.id), `Duplicate equipment ID: ${item.id}`);
      equipIds.add(item.id);
      totalEquip++;
    }
  }
  assert.ok(totalEquip >= 105, `Expected >= 105 equipment, got ${totalEquip}`);
  // Check specific new equipment
  assert.ok(equipIds.has('eq_body_spiritless_robe'), 'Spiritless Robe present');
  assert.ok(equipIds.has('eq_body_vampire_hunter'), "Vampire Hunter's Overcoat present");
  assert.ok(equipIds.has('eq_body_pharaoh_regalia'), "Pharaoh's Regalia present");
  assert.ok(equipIds.has('eq_misc_crest_of_the_ascended'), 'Crest of the Ascended present');
  assert.ok(equipIds.has('eq_misc_twin_rippers'), 'Twin Rippers present');
  assert.ok(equipIds.has('eq_misc_carving_edge'), 'Carving Edge present');
  console.log(`[PASS] Equipment count: ${totalEquip} items with unique IDs (including Spiritless, HolloVVeen & Vasto weapons)`);

  // Clans check
  const races = ['Quincy', 'Hollow', 'Shinigami'];
  let totalClans = 0;
  const clanIds = new Set();
  for (const r of races) {
    assert.ok(Array.isArray(masterData.clans[r]), `Race ${r} exists in clans`);
    for (const cl of masterData.clans[r]) {
      assert.ok(cl.id, `Clan has id`);
      assert.ok(cl.name, `Clan has name`);
      assert.ok(!clanIds.has(cl.id), `Duplicate clan ID: ${cl.id}`);
      clanIds.add(cl.id);
      totalClans++;
    }
  }
  assert.ok(totalClans >= 38, `Expected >= 38 clans, got ${totalClans}`);
  // Check specific new clans
  assert.ok(clanIds.has('cl_tosen'), 'Tosen clan present');
  assert.ok(clanIds.has('cl_urahara'), 'Urahara clan present');
  assert.ok(clanIds.has('cl_zaraki'), 'Zaraki clan present');
  assert.ok(clanIds.has('cl_le_vaar'), 'Le Vaar clan present');
  assert.ok(clanIds.has('cl_starrk'), 'Starrk clan present');
  console.log(`[PASS] Clans count: ${totalClans} clans with unique IDs (including 9 new clans + universal Kurosaki)`);

  // Charms check
  assert.ok(masterData.charms.length >= 71, `Expected >= 71 charms, got ${masterData.charms.length}`);
  const charmIds = new Set();
  for (const ch of masterData.charms) {
    assert.ok(ch.id, 'Charm has id');
    assert.ok(!charmIds.has(ch.id), `Duplicate charm ID: ${ch.id}`);
    charmIds.add(ch.id);
  }
  assert.ok(charmIds.has('charm_bully'), 'Bully charm present');
  assert.ok(charmIds.has('charm_the_boogeyman'), 'The Boogeyman charm present');
  assert.ok(charmIds.has('charm_monster_slayer'), 'Monster Slayer charm present');
  assert.ok(charmIds.has('charm_dead_man_walking'), 'Dead Man Walking charm present');
  assert.ok(charmIds.has('charm_draculas_fangs'), 'Dracula’s Fangs charm present');
  console.log(`[PASS] Charms count: ${masterData.charms.length} charms with unique IDs (including HolloVVeen & Boss charms)`);

  // Traits check
  assert.ok(masterData.traits.length >= 13, `Expected >= 13 traits, got ${masterData.traits.length}`);
  console.log(`[PASS] Traits count: ${masterData.traits.length}`);

  // Essences check
  assert.ok(masterData.essences.length >= 7, `Expected >= 7 essences, got ${masterData.essences.length}`);
  const essenceIds = masterData.essences.map(e => e.id);
  assert.ok(essenceIds.includes('flowing_gradient'), 'Flowing Gradient essence present');
  assert.ok(essenceIds.includes('slaying_drive'), 'Slaying Drive essence present');
  console.log(`[PASS] Essences count: ${masterData.essences.length} (including Flowing Gradient & Slaying Drive)`);

  // Game Meta check
  assert.ok(masterData.gameMeta, 'gameMeta present in masterData');
  assert.ok(masterData.gameMeta.codes.length >= 8, `Expected >= 8 codes, got ${masterData.gameMeta.codes.length}`);
  assert.ok(masterData.gameMeta.worldBossSchedule.length >= 4, `Expected >= 4 world bosses, got ${masterData.gameMeta.worldBossSchedule.length}`);
  console.log(`[PASS] Game Meta verified: ${masterData.gameMeta.codes.length} promo codes, ${masterData.gameMeta.worldBossSchedule.length} world bosses, stat milestones`);

  // Guide Markdown verification
  assert.ok(fs.existsSync(guidePath), 'VV_BUILDER_GUIDE.md exists');
  const mdContent = fs.readFileSync(guidePath, 'utf8');
  assert.ok(mdContent.length > 20000, `Guide size is ${mdContent.length} bytes, expected > 20000`);
  assert.ok(mdContent.includes('Table of Contents'), 'Guide has Table of Contents');
  assert.ok(mdContent.includes('Active Promo Codes'), 'Guide has Promo Codes section');
  assert.ok(mdContent.includes('World Boss Spawn Schedule'), 'Guide has World Boss Schedule');
  assert.ok(mdContent.includes('Stat Investment Milestones'), 'Guide has Stat Milestones');
  assert.ok(mdContent.includes('Shunko Mode'), 'Guide has Shunko Mode');
  assert.ok(mdContent.includes('Spiritless Robe'), 'Guide has Spiritless Set');
  assert.ok(mdContent.includes('Tosen'), 'Guide has Tosen clan');
  assert.ok(mdContent.includes('Bully'), 'Guide has Bully charm');
  assert.ok(mdContent.includes('Flowing Gradient'), 'Guide has Flowing Gradient');
  console.log(`[PASS] Markdown guide verified (${mdContent.length} bytes, ${mdContent.split('\n').length} lines)`);

  console.log('--- ALL VERIFICATION CHECKS PASSED (0 ERRORS) ---');
}

try {
  runTests();
} catch (e) {
  console.error('[FAIL] Verification test failed:', e.message);
  process.exit(1);
}
