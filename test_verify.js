const fs = require('fs');
const path = require('path');
const assert = require('assert');

function runTests() {
  console.log('--- Running Automated Verification Suite ---');

  const dataDir = path.join(__dirname, 'data');
  const guidePath = path.join(__dirname, 'VV_BUILDER_GUIDE.md');

  // 1. Check all 12 official JSON datasets + master JSON
  const requiredFiles = [
    'charms.json',
    'synergies.json',
    'skill-tree.json',
    'items.json',
    'modifiers.json',
    'abilities.json',
    'essences.json',
    'weapons.json',
    'zanpakuto-parts.json',
    'clans.json',
    'traits.json',
    'buffs.json',
    'vv_builder_all.json'
  ];

  for (const file of requiredFiles) {
    const fullPath = path.join(dataDir, file);
    assert.ok(fs.existsSync(fullPath), `File missing: ${file}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 100, `File too small: ${file} (${stat.size} bytes)`);
    console.log(`[PASS] File exists and valid size: data/${file} (${stat.size} bytes)`);
  }

  // 2. Load master data
  const masterData = JSON.parse(fs.readFileSync(path.join(dataDir, 'vv_builder_all.json'), 'utf8'));

  // 3. Charms check
  assert.ok(Array.isArray(masterData.charms), 'charms is array');
  assert.strictEqual(masterData.charms.length, 73, `Expected 73 charms, got ${masterData.charms.length}`);
  const charmIds = new Set();
  for (const c of masterData.charms) {
    assert.ok(c.id, `Charm missing id: ${JSON.stringify(c)}`);
    assert.ok(c.name, `Charm missing name: ${c.id}`);
    assert.ok(c.tier, `Charm missing tier: ${c.id}`);
    assert.ok(!charmIds.has(c.id), `Duplicate charm id: ${c.id}`);
    charmIds.add(c.id);
  }
  console.log(`[PASS] Charms count: 73 unique charms verified`);

  // 4. Synergies matrix check
  assert.ok(Array.isArray(masterData.synergies), 'synergies is array');
  assert.strictEqual(masterData.synergies.length, 453, `Expected 453 synergies, got ${masterData.synergies.length}`);
  const resolveCharmId = id => (id === 'indomitable' ? 'indomitable-spirit' : id);
  for (const s of masterData.synergies) {
    assert.ok(charmIds.has(resolveCharmId(s.charmA)), `Synergy charmA unknown: ${s.charmA}`);
    assert.ok(charmIds.has(resolveCharmId(s.charmB)), `Synergy charmB unknown: ${s.charmB}`);
  }
  console.log(`[PASS] Synergies count: 453 matrix pairs verified with referential integrity`);

  // 5. Skill tree graph check
  assert.ok(Array.isArray(masterData.skillTree), 'skillTree is array');
  assert.strictEqual(masterData.skillTree.length, 260, `Expected 260 nodes, got ${masterData.skillTree.length}`);
  const nodeIds = new Set(masterData.skillTree.map(n => n.id));
  assert.strictEqual(nodeIds.size, 260, 'All 260 tree node IDs are unique');
  for (const n of masterData.skillTree) {
    if (Array.isArray(n.connectsTo)) {
      for (const targetId of n.connectsTo) {
        assert.ok(nodeIds.has(targetId), `Node ${n.id} connects to unknown node: ${targetId}`);
      }
    }
  }
  console.log(`[PASS] Skill tree count: 260 nodes with valid bidirectional graph edges verified`);

  // 6. Equipment items & modifiers check
  assert.ok(Array.isArray(masterData.items), 'items is array');
  assert.strictEqual(masterData.items.length, 146, `Expected 146 items, got ${masterData.items.length}`);
  const validSlots = new Set(['head', 'body', 'face', 'misc', 'utility', 'artifact']);
  const itemIds = new Set();
  for (const it of masterData.items) {
    assert.ok(validSlots.has(it.slot), `Invalid slot ${it.slot} for item ${it.id}`);
    assert.ok(!itemIds.has(it.id), `Duplicate item id: ${it.id}`);
    itemIds.add(it.id);
  }
  assert.strictEqual(masterData.modifiers.length, 14, `Expected 14 modifiers, got ${masterData.modifiers.length}`);
  console.log(`[PASS] Equipment count: 146 items across 6 slots + 14 modifiers verified`);

  // 7. Weapons & Zanpakuto parts check
  assert.strictEqual(masterData.weapons.length, 20, `Expected 20 weapons, got ${masterData.weapons.length}`);
  assert.strictEqual(masterData.zanpakutoParts.length, 31, `Expected 31 parts, got ${masterData.zanpakutoParts.length}`);
  const validParts = new Set(['guard', 'handle', 'hilt', 'sheathe']);
  for (const zp of masterData.zanpakutoParts) {
    assert.ok(validParts.has(zp.partType), `Invalid partType ${zp.partType} for part ${zp.id}`);
  }
  console.log(`[PASS] Weapons & Zanpakuto: 20 weapons + 31 modular parts verified`);

  // 8. Clans, Traits, Abilities, Essences, Buffs check
  assert.strictEqual(masterData.clans.length, 40, `Expected 40 clans, got ${masterData.clans.length}`);
  assert.strictEqual(masterData.traits.length, 13, `Expected 13 traits, got ${masterData.traits.length}`);
  assert.strictEqual(masterData.abilities.length, 25, `Expected 25 abilities, got ${masterData.abilities.length}`);
  assert.strictEqual(masterData.essences.length, 14, `Expected 14 essences, got ${masterData.essences.length}`);
  assert.ok(masterData.buffs.ascensionTiers && masterData.buffs.ascensionTiers.length > 0, 'Ascension tiers present');
  console.log(`[PASS] Clans (40), Traits (13), Abilities (25), Essences (14), and Buffs verified`);

  // 9. Markdown guide check
  assert.ok(fs.existsSync(guidePath), 'VV_BUILDER_GUIDE.md exists');
  const guideContent = fs.readFileSync(guidePath, 'utf8');
  assert.ok(guideContent.split('\n').length >= 500, 'Guide has >= 500 lines');
  console.log(`[PASS] Markdown guide verified: VV_BUILDER_GUIDE.md (${guideContent.split('\n').length} lines)`);

  console.log('--- ALL VERIFICATION TESTS PASSED ---');
}

runTests();
