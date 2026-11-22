const assert = require('assert');
const calc = require('./src/calc_engine');
const {
  validateBuild,
  calculateBuildStats,
  serializeOffline,
  deserializeOffline,
  createEmptyBuild,
  normalizeRace
} = require('./src/build_engine');

console.log('--- Testing Build Engine Rules & Mathematical Formulas ---');

// 1. Semi-Stat Cross-Bonus Formula
const testBp = { reserves: 0, haste: 100, potency: 100, mettle: 50, shunpo: 0 };
const reservesBonus = calc.getSemiStatBonus('reserves', testBp);
assert.strictEqual(reservesBonus, 25, 'Sum of other BP is 250 -> 25 bonus');
const effReserves = calc.getEffectiveSemiStat('reserves', testBp);
assert.strictEqual(effReserves, 25, 'Effective reserves is 0 + 25 = 25');
console.log('[PASS] Semi-Stat cross-bonus math verified (25 bonus from 250 other BP)');

// 2. Health Calculation & Vasto Lorde Base
const standardHealth = calc.calculateBaseHealth({ level: 100, isVastoLorde: false, hpPenaltyPercent: 0 });
// 200 base + 227.5 level + 2.1% rank = 436.5
assert.strictEqual(standardHealth.totalHealth, 436.5, 'Expected 436.5 HP for standard lv 100');

const vastoHealth = calc.calculateBaseHealth({ level: 100, isVastoLorde: true, hpPenaltyPercent: 0 });
// 220 base + 227.5 level + 2.1% rank = 456.9
assert.strictEqual(vastoHealth.totalHealth, 456.9, 'Expected 456.9 HP for Vasto Lorde lv 100');
console.log(`[PASS] Base Health math verified: Standard (${standardHealth.totalHealth} HP) vs Vasto Lorde (${vastoHealth.totalHealth} HP)`);

// 3. Charm Notch Penalty & Kurotsuchi Clan
const testSlots = [
  { isMerge: true, instanceA: { charm: { tier: 'Tier 4' } }, instanceB: { charm: { tier: 'Tier 3' } } },
  { isMerge: false, instanceA: { charm: { tier: 'Tier 3' } }, instanceB: null }
]; // Total notches = 4 + 3 + 3 = 10 notches. Free = 3. Excess = 7.

const standardPenalty = calc.calculateCharmHpPenalty(testSlots, null, 3);
assert.strictEqual(standardPenalty.hpPenaltyPercent, 42, '7 excess notches * 6% = 42% standard penalty');

const kurotsuchiPenalty = calc.calculateCharmHpPenalty(testSlots, 'kurotsuchi', 3);
assert.strictEqual(kurotsuchiPenalty.hpPenaltyPercent, 28, '7 excess notches * 4% = 28% Kurotsuchi penalty');
console.log('[PASS] Charm Notch Penalty verified: Standard (-42% HP) vs Kurotsuchi (-28% HP)');

// 4. Damage 20% Soft-Cap Formula
const uncappedWeapon = calc.calculateWeaponDamage({ strengthAP: 150, effectivePotency: 0, percentBuff: 0 });
// 150 * 0.01 = 1.5% <= 20% -> uncapped
assert.strictEqual(uncappedWeapon.isSoftCapped, false);
assert.strictEqual(uncappedWeapon.effectivePercent, 1.5);

const softCappedKido = calc.calculateKidoDamage({ kidoAP: 400, effectivePotency: 0, percentBuff: 24, hasEnergized: false });
// raw = 400 * 0.00008 (0.032) + 0.24 = 0.272 (27.2%) > 20%
// soft-cap: 0.20 + (0.272 - 0.20) / 2 = 0.236 (23.6%)
assert.strictEqual(softCappedKido.isSoftCapped, true);
assert.strictEqual(softCappedKido.effectivePercent, 23.6);
console.log(`[PASS] 20% Soft-Cap verified: Raw 27.2% soft-caps to ${softCappedKido.effectivePercent}% with 50% decay`);

// 5. M1 Attack Damage Formula
const mockWeapon = { name: 'Test Blade', damage: 20, damageType: 'weapon' };
const m1Result = calc.calculateM1Damage(mockWeapon, {
  damageBonusPercent: 20,
  target: 'players'
});
// Base = 20 * 1.5 = 30. Mult = 1 + 0.20 = 1.2. Total = 30 * 1.2 = 36.
assert.strictEqual(m1Result.baseM1, 30);
assert.strictEqual(m1Result.total, 36);
console.log('[PASS] M1 Attack Damage calculation verified (Base 30 -> 36 DMG)');

// 6. Build Validation: Valid Build
const validBuild = createEmptyBuild('quincy');
validBuild.attributes = { speed: 40, strength: 0, kido: 360, hakuda: 0 };
validBuild.semiStats = { reserves: 100, haste: 150, potency: 50, mettle: 0, shunpo: 100 };
validBuild.nodeLevels = { nodeA: 7, nodeB: 7 };
const valRes = validateBuild(validBuild);
assert.strictEqual(valRes.valid, true, `Valid build should pass: ${valRes.errors.join(', ')}`);
console.log('[PASS] Valid Quincy build passes validation');

// 7. AP Budget Exceeded Violation (> 400 AP)
const invalidApBuild = {
  ...validBuild,
  attributes: { speed: 100, strength: 100, kido: 250, hakuda: 0 } // 450 AP > 400
};
const valAp = validateBuild(invalidApBuild);
assert.strictEqual(valAp.valid, false);
assert.ok(valAp.errors.some(e => e.includes('Attribute Points budget exceeded')));
console.log('[PASS] AP Budget Violation caught (>400 AP)');

// 8. Mastery Cap Violation (> 2 Skills at Level 7+)
const invalidMasteryBuild = {
  ...validBuild,
  nodeLevels: { nodeA: 7, nodeB: 7, nodeC: 7 } // 3 skills at level 7+ > 2!
};
const valMastery = validateBuild(invalidMasteryBuild);
assert.strictEqual(valMastery.valid, false);
assert.ok(valMastery.errors.some(e => e.includes('Mastery limit exceeded')));
console.log('[PASS] Mastery Limit Violation caught (>2 skills at Level 7+)');

// 9. Offline Serialization Round-Trip
const serialized = serializeOffline(validBuild);
assert.ok(typeof serialized === 'string' && serialized.length > 50);
const deserialized = deserializeOffline(serialized);
assert.strictEqual(deserialized.race, 'quincy');
assert.strictEqual(deserialized.attributes.kido, 360);
console.log('[PASS] Offline Base64 Serialization round-trip verified');

// 10. Race Alias Normalization
assert.strictEqual(normalizeRace('Shinigami'), 'soul-reaper');
assert.strictEqual(normalizeRace('soul reaper'), 'soul-reaper');
assert.strictEqual(normalizeRace('Quincy'), 'quincy');
assert.strictEqual(normalizeRace('Hollow'), 'hollow');
console.log('[PASS] Race alias normalization (Shinigami -> soul-reaper) verified');

console.log('--- ALL BUILD ENGINE TESTS PASSED ---');
