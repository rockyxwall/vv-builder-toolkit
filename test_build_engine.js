const assert = require('assert');
const {
  validateBuild,
  generateShareCode,
  parseShareCode,
  calculateCharmHpPenalty
} = require('./src/build_engine');

console.log('--- Testing Build Engine Rules & Validation ---');

// 1. Valid Shinigami Kido Build
const validKidoBuild = {
  v: 3,
  r: 'Shinigami',
  b: { reserves: 200, haste: 100, potency: 100, mettle: 0, shunpo: 0 },
  a: { hakuda: 0, strength: 0, kido: 400, speed: 0 },
  s: [
    { i: 'sk_byakurai', l: 7, sp: 6, st: 0, af: 0, f: 0, ul: '' },
    { i: 'sk_sai', l: 7, sp: 7, st: 0, af: 0, f: 0, ul: '' }
  ],
  sr: [],
  es: ['kuro'],
  el: { kuro: 1 },
  fr: 1,
  fu: 1,
  sp: 75,
  fg: 6,
  st: 50000,
  ch: ['charm_aura_of_terror', 'charm_adrenaline_junkie'], // Tier 3 + Tier 3 = 6
  s12: 0,
  vc: 0,
  ht: [null, null, null, null],
  cl: 'cl_urahara',
  eq: {
    Body: 'eq_body_battle_haori',
    Head: 'eq_head_straw_hat'
  }
};

const resValid = validateBuild(validKidoBuild);
assert.strictEqual(resValid.valid, true, `Valid build should pass: ${resValid.errors.join(', ')}`);
console.log('[PASS] Valid Shinigami Kido build verified:', resValid.summary);

// 2. Share code round-trip verification
const shareCode = generateShareCode(validKidoBuild);
assert.ok(shareCode.startsWith('VV'), 'Share code starts with VV');
assert.ok(shareCode.length > 20, 'Share code valid length');
const decoded = parseShareCode(shareCode);
assert.strictEqual(decoded.r, 'Shinigami');
assert.strictEqual(decoded.a.kido, 400);
assert.strictEqual(decoded.es[0], 'kuro');
console.log(`[PASS] Share code round-trip verified (Code length: ${shareCode.length}): ${shareCode.substring(0, 30)}...`);

// 3. Charm Tier Cap Violation (> 9 tiers)
const invalidCharmBuild = {
  ...validKidoBuild,
  ch: [
    'charm_a_song_of_fire_and_thunder', // Tier 4
    'charm_dead_man_walking',           // Tier 4
    'charm_adrenaline_junkie'           // Tier 3 -> Sum = 11 > 9!
  ]
};
const resCharmInvalid = validateBuild(invalidCharmBuild);
assert.strictEqual(resCharmInvalid.valid, false, 'Build with > 9 charm tiers should fail');
assert.ok(resCharmInvalid.errors.some(e => e.includes('Charm Tier Cap exceeded')));
console.log('[PASS] Charm Tier Cap (>9) caught:', resCharmInvalid.errors.find(e => e.includes('Charm Tier Cap')));

// 4. Charm HP Penalty Calculation
// Tier 4 + Tier 3 + Tier 2 = 9 tiers. Clean = 3. Excess = 6. Penalty = 6 * -6% = -36%.
const penalty3Clean = calculateCharmHpPenalty(
  [{ tier: 'Tier 4' }, { tier: 'Tier 3' }, { tier: 'Tier 2' }],
  true,
  false // not squad 12
);
assert.strictEqual(penalty3Clean, -36, 'Expected -36% HP penalty for 9 tiers (standard)');
console.log('[PASS] Charm HP Penalty calculation verified (-36% for 9 tiers)');

// Shinigami Squad 12: Clean = 4. Excess = 5. Penalty = 5 * -6% = -30%.
const penaltySquad12 = calculateCharmHpPenalty(
  [{ tier: 'Tier 4' }, { tier: 'Tier 3' }, { tier: 'Tier 2' }],
  true,
  true // squad 12
);
assert.strictEqual(penaltySquad12, -30, 'Expected -30% HP penalty for 9 tiers with Squad 12');
console.log('[PASS] Shinigami Squad 12 HP bonus verified (-30% for 9 tiers)');

// 5. AP Budget Violation (> 400 AP)
const invalidApBuild = {
  ...validKidoBuild,
  a: { hakuda: 100, strength: 100, kido: 250, speed: 0 } // 450 > 400
};
const resApInvalid = validateBuild(invalidApBuild);
assert.strictEqual(resApInvalid.valid, false);
assert.ok(resApInvalid.errors.some(e => e.includes('Attribute Points budget exceeded')));
console.log('[PASS] AP Budget (>400) caught:', resApInvalid.errors.find(e => e.includes('Attribute Points')));

// 6. Mastery Cap Violation (> 2 Level 7+ skills)
const invalidMasteryBuild = {
  ...validKidoBuild,
  s: [
    { i: 'sk_byakurai', l: 7 },
    { i: 'sk_sai', l: 7 },
    { i: 'st1', l: 7 } // 3rd level 7 skill
  ]
};
const resMasteryInvalid = validateBuild(invalidMasteryBuild);
assert.strictEqual(resMasteryInvalid.valid, false);
assert.ok(resMasteryInvalid.errors.some(e => e.includes('Mastery cap exceeded')));
console.log('[PASS] Mastery Cap (>2 Level 7+ skills) caught:', resMasteryInvalid.errors.find(e => e.includes('Mastery cap')));

// 7. Essence Race Restriction
const invalidEssenceRace = {
  ...validKidoBuild,
  es: ['gran_ray'] // Hollow only, used on Shinigami
};
const resRaceInvalid = validateBuild(invalidEssenceRace);
assert.strictEqual(resRaceInvalid.valid, false);
assert.ok(resRaceInvalid.errors.some(e => e.includes('restricted to Hollow')));
console.log('[PASS] Essence Race Restriction caught:', resRaceInvalid.errors.find(e => e.includes('restricted to Hollow')));

console.log('--- ALL BUILD ENGINE TESTS PASSED (0 ERRORS) ---');
