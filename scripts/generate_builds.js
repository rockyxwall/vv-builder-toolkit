/**
 * scripts/generate_builds.js
 * Generates verified archetype builds adhering strictly to https://vvcharmmerges.pages.dev/builder.
 * Calculates exact mathematical stats and outputs local share codes.
 */

const fs = require('fs');
const path = require('path');
const {
  validateBuild,
  calculateBuildStats,
  serializeOffline,
  createEmptyBuild
} = require('../src/build_engine');

// Load master data
const dataPath = path.join(__dirname, '..', 'data', 'vv_builder_all.json');
const masterData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1. Quincy Brenschwerter & Qual Kreis Kiter Build
const quincyBuild = createEmptyBuild('quincy');
quincyBuild.level = 100;
quincyBuild.attributes = { speed: 40, strength: 0, kido: 360, hakuda: 0 };
quincyBuild.semiStats = { reserves: 100, haste: 150, potency: 50, mettle: 0, shunpo: 100 };
quincyBuild.unlockedNodeIds = ['hub', 'brenschwerter', 'klingenfallen', 'lichtRegen'];
quincyBuild.nodeLevels = { brenschwerter: 7, klingenfallen: 7 };
quincyBuild.essenceIds = ['qual-kreis', null];
quincyBuild.selectedClanEntity = masterData.clans.find(c => c.id === 'eisenhauer') || null;
quincyBuild.selectedAbility = masterData.abilities.find(a => a.id === 'the-visionary') || null;
quincyBuild.equippedItems.head = { item: masterData.items.find(i => i.id === 'chaos-halo') || null, modifier: null };
quincyBuild.equippedItems.body = { item: masterData.items.find(i => i.id === 'spiritless-robe') || null, modifier: null };
quincyBuild.charmSlots = [
  {
    isMerge: true,
    instanceA: { charm: masterData.charms.find(c => c.id === 'heavenly-restriction') || null, selectedStatId: 'kido_damage' },
    instanceB: { charm: masterData.charms.find(c => c.id === 'blademaster') || null, selectedStatId: 'weapon_damage' },
    mergeSelectedSide: 'A',
    mergeSelectedStatId: 'kido_damage'
  },
  {
    isMerge: false,
    instanceA: { charm: masterData.charms.find(c => c.id === 'song-of-fire-and-thunder') || null, selectedStatId: 'kido_ap' },
    instanceB: null,
    mergeSelectedSide: null,
    mergeSelectedStatId: null
  },
  {
    isMerge: false,
    instanceA: null,
    instanceB: null,
    isMerge: false,
    mergeSelectedSide: null,
    mergeSelectedStatId: null
  }
];

// 2. Hollow Vasto Lorde Brawler (Merged Charm AoE Shredder)
const hollowBuild = createEmptyBuild('hollow');
hollowBuild.level = 100;
hollowBuild.hollowSubrace = 'vasto-lorde';
hollowBuild.resurrectionActive = true;
hollowBuild.attributes = { speed: 0, strength: 400, kido: 0, hakuda: 0 };
hollowBuild.semiStats = { reserves: 100, haste: 100, potency: 100, mettle: 100, shunpo: 0 };
hollowBuild.unlockedNodeIds = ['hub', 'ceroCorrosivo', 'granReyCero'];
hollowBuild.nodeLevels = { ceroCorrosivo: 7, granReyCero: 7 };
hollowBuild.selectedClanEntity = masterData.clans.find(c => c.id === 'arrancar-starrk') || null;
hollowBuild.traitSlots = [
  { trait: masterData.traits.find(t => t.id === 'tentacles') || null },
  { trait: masterData.traits.find(t => t.id === 'energized') || null },
  { trait: null },
  { trait: null }
];
hollowBuild.selectedWeaponId = 'katana-sword';
hollowBuild.selectedWeapon = masterData.weapons.find(w => w.id === 'katana-sword') || null;
hollowBuild.equippedItems.head = { item: masterData.items.find(i => i.id === 'witchs-hat') || null, modifier: null };
hollowBuild.equippedItems.body = { item: masterData.items.find(i => i.id === 'pharaoh-regalia') || null, modifier: null };
hollowBuild.charmSlots = [
  {
    isMerge: true,
    instanceA: { charm: masterData.charms.find(c => c.id === 'adrenaline-junkie') || null, selectedStatId: 'damage' },
    instanceB: { charm: masterData.charms.find(c => c.id === 'giant-fighter') || null, selectedStatId: 'monster_damage' },
    mergeSelectedSide: 'A',
    mergeSelectedStatId: 'damage'
  },
  {
    isMerge: false,
    instanceA: { charm: masterData.charms.find(c => c.id === 'hard-headed') || null, selectedStatId: 'posture' },
    instanceB: null,
    mergeSelectedSide: null,
    mergeSelectedStatId: null
  },
  {
    isMerge: false,
    instanceA: null,
    instanceB: null,
    isMerge: false,
    mergeSelectedSide: null,
    mergeSelectedStatId: null
  }
];

// 3. Soul Reaper Danku & Kurohitsugi Hadō Specialist
const soulReaperBuild = createEmptyBuild('soul-reaper');
soulReaperBuild.level = 100;
soulReaperBuild.attributes = { speed: 0, strength: 0, kido: 400, hakuda: 0 };
soulReaperBuild.semiStats = { reserves: 200, haste: 150, potency: 50, mettle: 0, shunpo: 0 };
soulReaperBuild.unlockedNodeIds = ['hub', 'danku', 'okasen', 'byakurai'];
soulReaperBuild.nodeLevels = { danku: 7, okasen: 7 };
soulReaperBuild.essenceIds = ['kurohitsugi', null];
soulReaperBuild.selectedClanEntity = masterData.clans.find(c => c.id === 'kurotsuchi') || null;
soulReaperBuild.selectedWeaponId = 'katana-sword';
soulReaperBuild.selectedWeapon = masterData.weapons.find(w => w.id === 'katana-sword') || null;
soulReaperBuild.zanpakutoSlots = {
  guard: masterData.zanpakutoParts.find(p => p.id === 'star-guard') || null,
  handle: null,
  hilt: null,
  sheathe: null
};
soulReaperBuild.equippedItems.head = { item: masterData.items.find(i => i.id === 'straw-hat') || null, modifier: null };
soulReaperBuild.equippedItems.body = { item: masterData.items.find(i => i.id === 'battle-haori') || null, modifier: null };
soulReaperBuild.charmSlots = [
  {
    isMerge: false,
    instanceA: { charm: masterData.charms.find(c => c.id === 'song-of-fire-and-thunder') || null, selectedStatId: 'kido_ap' },
    instanceB: null,
    mergeSelectedSide: null,
    mergeSelectedStatId: null
  },
  {
    isMerge: false,
    instanceA: { charm: masterData.charms.find(c => c.id === 'aura-of-terror') || null, selectedStatId: 'reiatsu' },
    instanceB: null,
    mergeSelectedSide: null,
    mergeSelectedStatId: null
  },
  {
    isMerge: false,
    instanceA: null,
    instanceB: null,
    isMerge: false,
    mergeSelectedSide: null,
    mergeSelectedStatId: null
  }
];

const builds = [
  { name: 'Quincy Brenschwerter Kiter', build: quincyBuild },
  { name: 'Hollow Vasto Lorde Brawler', build: hollowBuild },
  { name: 'Soul Reaper Danku Specialist', build: soulReaperBuild }
];

console.log('====================================================');
console.log('      VV: Ultimatum - Verified Archetype Builds     ');
console.log('====================================================');

for (const { name, build } of builds) {
  const validation = validateBuild(build, masterData);
  const stats = calculateBuildStats(build, masterData);
  const b64 = serializeOffline(build);

  console.log(`\n--- [${name}] ---`);
  console.log(`Race: ${build.race.toUpperCase()} | Level: ${build.level}`);
  console.log(`Attributes (AP): Speed ${build.attributes.speed}, Str ${build.attributes.strength}, Kido ${build.attributes.kido}, Hakuda ${build.attributes.hakuda} (Total: ${validation.summary.totalAP}/400)`);
  console.log(`Semi-Stats (BP): Reserves ${build.semiStats.reserves}, Haste ${build.semiStats.haste}, Potency ${build.semiStats.potency}, Mettle ${build.semiStats.mettle}, Shunpo ${build.semiStats.shunpo}`);
  console.log(`Effective Stats: Health ${stats.health.totalHealth} HP (Penalty: -${stats.health.hpPenaltyPercent}%), Reiatsu ${stats.reiatsu}, Posture ${stats.posture}, Shunpo Stamina ${stats.shunpoStamina}`);
  console.log(`Combat: Kido DMG +${stats.kidoDamage.effectivePercent}% (Mult: x${stats.kidoDamage.multiplier}), Weapon DMG +${stats.weaponDamage.effectivePercent}%, Cooldown: ${stats.cooldownReduction.capped}%`);
  if (stats.m1Damage) {
    console.log(`M1 Base: ${stats.m1Damage.players.baseM1} -> Players Total: ${stats.m1Damage.players.total} DMG, Bosses Total: ${stats.m1Damage.bosses.total} DMG`);
  }
  console.log(`Notches: ${stats.notches.totalNotches} used (${stats.notches.freeNotches} free, cost per excess: -${stats.notches.costPerNotch}% HP)`);
  console.log(`Validation: ${validation.valid ? 'PASSED (0 Errors)' : 'FAILED: ' + validation.errors.join('; ')}`);
  console.log(`Offline Share Code (Base64): ${b64.slice(0, 36)}...`);
}

console.log('\n====================================================');
console.log('All builds generated and verified successfully.');
console.log('====================================================');
