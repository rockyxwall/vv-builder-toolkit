/**
 * src/calc_engine.js
 * Pure mathematical formulas and game calculation engine reverse-engineered
 * directly from https://vvcharmmerges.pages.dev/builder Angular production client.
 */

const STAT_ALIASES = [
  { pattern: /health|hp\b/i, key: 'health' },
  { pattern: /posture regen/i, key: 'posture-regen' },
  { pattern: /shunpo stamina|shunpo stam\b/i, key: 'shunpo-stamina' },
  { pattern: /shunpo speed/i, key: 'shunpo-speed' },
  { pattern: /melee def(ense)?/i, key: 'melee-defense' },
  { pattern: /kido def(ense)?/i, key: 'kido-defense' },
  { pattern: /kido (damage|dmg)/i, key: 'kido-damage' },
  { pattern: /wep dmg|weapon (damage|dmg)/i, key: 'weapon-damage' },
  { pattern: /hakuda (damage|dmg)/i, key: 'hakuda-damage' },
  { pattern: /monster (damage|dmg)/i, key: 'monster-damage' },
  { pattern: /equipment load/i, key: 'equipment-load' },
  { pattern: /movement speed/i, key: 'movement-speed' },
  { pattern: /posture damage \(wep\.?\)/i, key: 'posture-damage-weapon' },
  { pattern: /posture damage \(hakuda\)/i, key: 'posture-damage-hakuda' },
  { pattern: /posture damage/i, key: 'posture-damage' },
  { pattern: /melee reiatsu regen/i, key: 'melee-reiatsu-regen' },
  { pattern: /flame damage/i, key: 'flame-damage' },
  { pattern: /lightning damage/i, key: 'lightning-damage' },
  { pattern: /ultimate gain/i, key: 'ultimate-gain' },
  { pattern: /sensing range/i, key: 'sensing-range' },
  { pattern: /reiatsu|\brei\b/i, key: 'reiatsu' },
  { pattern: /posture/i, key: 'posture' },
  { pattern: /aura gain/i, key: 'aura-gain' },
  { pattern: /cooldown reduction/i, key: 'cooldown-reduction' },
  { pattern: /max ap/i, key: 'max-ap' }
];

const SEMI_STATS = ['reserves', 'haste', 'potency', 'mettle', 'shunpo'];
const ATTRIBUTES = ['speed', 'strength', 'kido', 'hakuda'];

function parseBuffLine(line) {
  if (!line || typeof line !== 'string') {
    return { raw: line, stat: null, amount: 0, isPercent: false };
  }
  const match = line.match(/^([+-]?\s*\d+(?:\.\d+)?)\s*(%)?\s*(.+)$/);
  if (!match) {
    return { raw: line, stat: null, amount: 0, isPercent: false };
  }
  const amount = parseFloat(match[1].replace(/\s/g, ''));
  const isPercent = !!match[2];
  const desc = match[3].trim();
  const alias = STAT_ALIASES.find(a => a.pattern.test(desc));
  return {
    raw: line,
    stat: alias ? alias.key : desc.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    amount: isNaN(amount) ? 0 : amount,
    isPercent
  };
}

function parseNumericValue(str) {
  if (!str) return { amount: 0, isPercent: false };
  const s = String(str).trim();
  const isPercent = s.endsWith('%');
  const sign = s.startsWith('-') ? -1 : 1;
  const numbers = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number);
  return {
    amount: numbers.length ? sign * Math.min(...numbers) : 0,
    isPercent
  };
}

function getSemiStatBonus(statKey, semiStats = {}) {
  const sumOther = SEMI_STATS
    .filter(k => k !== statKey)
    .reduce((acc, k) => acc + (semiStats[k] || 0), 0);
  return Math.floor(sumOther / 10);
}

function getEffectiveSemiStat(statKey, semiStats = {}) {
  return (semiStats[statKey] || 0) + getSemiStatBonus(statKey, semiStats);
}

function getCharmTier(tierStr) {
  if (!tierStr) return 0;
  const m = String(tierStr).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function getCharmSlotCost(slot) {
  if (!slot) return 0;
  const tierA = slot.instanceA && slot.instanceA.charm ? getCharmTier(slot.instanceA.charm.tier) : 0;
  const tierB = slot.instanceB && slot.instanceB.charm ? getCharmTier(slot.instanceB.charm.tier) : 0;
  return slot.isMerge ? tierA + tierB : tierA;
}

function calculateCharmHpPenalty(charmSlots = [], clanId = null, freeNotches = 3) {
  const costPerNotch = clanId === 'kurotsuchi' ? 4 : 6;
  const totalNotches = charmSlots.reduce((acc, s) => acc + getCharmSlotCost(s), 0);
  const excess = Math.max(0, totalNotches - freeNotches);
  const penaltyPercent = excess * costPerNotch;
  return {
    totalNotches,
    freeNotches,
    costPerNotch,
    excessNotches: excess,
    hpPenaltyPercent: penaltyPercent,
    maxHpPercent: Math.max(0, 100 - penaltyPercent)
  };
}

function calculateBaseHealth({
  level = 100,
  isVastoLorde = false,
  flatHealth = 0,
  hpPenaltyPercent = 0,
  factionRank = 3,
  factionRankHealthFactor = 0.007
} = {}) {
  const healthBase = isVastoLorde ? 220 : 200;
  const levelHealth = level * 2.275;
  const healthBeforeFactionRank = healthBase + levelHealth + flatHealth;
  const factionRankHealthValue = healthBeforeFactionRank * (factionRank * factionRankHealthFactor);
  const totalHealthBeforePenalty = healthBeforeFactionRank + factionRankHealthValue;
  const healthPenaltyDecrease = 1 - (hpPenaltyPercent / 100);
  const totalHealth = totalHealthBeforePenalty * healthPenaltyDecrease;

  return {
    healthBase,
    levelHealth,
    flatHealth,
    healthBeforeFactionRank,
    factionRankHealthValue,
    totalHealthBeforePenalty,
    hpPenaltyPercent,
    healthPenaltyDecrease,
    totalHealth: Math.round(totalHealth * 10) / 10
  };
}

function calculateReiatsu({
  level = 100,
  effectiveReserves = 0,
  flatReiatsu = 0
} = {}) {
  const base = 55;
  const perLevel = level * 0.15;
  const reservesContribution = (effectiveReserves / 100) * 4.5;
  const total = base + perLevel + reservesContribution + flatReiatsu;
  return Math.round(total * 10) / 10;
}

function calculatePosture({
  effectiveMettle = 0,
  flatPosture = 0
} = {}) {
  const base = 92;
  const mettleContribution = (effectiveMettle / 100) * 5.0;
  const total = base + mettleContribution + flatPosture;
  return Math.round(total * 10) / 10;
}

function calculateShunpoStamina({
  level = 100,
  speedAP = 0,
  effectiveShunpo = 0,
  flatStamina = 0
} = {}) {
  const base = 30;
  const levelContrib = level * 0.55;
  const speedContrib = speedAP * 0.06;
  const shunpoContrib = effectiveShunpo * 0.07;
  const total = base + levelContrib + speedContrib + shunpoContrib + flatStamina;
  return Math.round(total * 10) / 10;
}

function calculateShunpoSpeed({
  level = 100,
  speedAP = 0,
  effectiveShunpo = 0,
  flatSpeed = 0
} = {}) {
  const base = 50;
  const shunpoContrib = effectiveShunpo * 0.03;
  const speedContrib = speedAP * 0.015;
  const levelContrib = (level - 1) * 0.1;
  const total = base + shunpoContrib + speedContrib + levelContrib + flatSpeed;
  return Math.round(total * 10) / 10;
}

function calculateMovementSpeed(percentBuff = 0) {
  return 100 + percentBuff;
}

function calculateCooldownReduction(effectiveHaste = 0, percentBuff = 0) {
  const raw = (effectiveHaste * 0.042) + percentBuff;
  const capped = Math.min(30, raw);
  return {
    raw: Math.round(raw * 100) / 100,
    capped: Math.round(capped * 100) / 100,
    isCapped: raw > 30
  };
}

function calculateKidoDamage({
  kidoAP = 0,
  effectivePotency = 0,
  percentBuff = 0,
  hasEnergized = false
} = {}) {
  const coeff = hasEnergized ? 0.00011 : 0.00008;
  const potencyScaling = effectivePotency * kidoAP * 0.000025;
  const raw = (kidoAP * coeff) + (potencyScaling / 100) + (percentBuff / 100);
  const cap = 0.20;
  const bonus = raw <= cap ? raw : cap + (raw - cap) / 2;
  return {
    coeff,
    potencyScalingPercent: potencyScaling,
    rawPercent: Math.round(raw * 10000) / 100,
    effectivePercent: Math.round(bonus * 10000) / 100,
    multiplier: Math.round((1 + bonus) * 10000) / 10000,
    isSoftCapped: raw > cap
  };
}

function calculateWeaponDamage({
  strengthAP = 0,
  effectivePotency = 0,
  percentBuff = 0
} = {}) {
  const strengthScaling = strengthAP * 0.01;
  const potencyScaling = effectivePotency * strengthAP * 0.00002;
  const raw = strengthScaling + potencyScaling + percentBuff;
  const cap = 20;
  const bonus = raw <= cap ? raw : cap + (raw - cap) / 2;
  return {
    strengthScalingPercent: strengthScaling,
    potencyScalingPercent: potencyScaling,
    rawPercent: Math.round(raw * 100) / 100,
    effectivePercent: Math.round(bonus * 100) / 100,
    isSoftCapped: raw > cap
  };
}

function calculateHakudaDamage({
  hakudaAP = 0,
  effectivePotency = 0,
  percentBuff = 0
} = {}) {
  const hakudaScaling = hakudaAP * 0.01;
  const potencyScaling = effectivePotency * hakudaAP * 0.00002;
  const raw = hakudaScaling + potencyScaling + percentBuff;
  const cap = 20;
  const bonus = raw <= cap ? raw : cap + (raw - cap) / 2;
  return {
    hakudaScalingPercent: hakudaScaling,
    potencyScalingPercent: potencyScaling,
    rawPercent: Math.round(raw * 100) / 100,
    effectivePercent: Math.round(bonus * 100) / 100,
    isSoftCapped: raw > cap
  };
}

function calculateM1Damage(weapon, {
  damageBonusPercent = 0,
  target = 'players', // 'players' | 'npcs' | 'bosses'
  isMonster = false,
  monsterDamagePercent = 0,
  npcDamagePercent = 0,
  bossDamagePercent = 0,
  outputMultipliers = [],
  flawlessDamagePercent = 0,
  heatArmsAblaze = false,
  blutArterieLevel = 0,
  giantFighter = false
} = {}) {
  if (!weapon || !weapon.damage) return null;

  const baseM1 = weapon.damage * 1.5;
  const isHakuda = weapon.damageType === 'hakuda';

  const factors = [];
  factors.push({ label: `${weapon.name} base (${weapon.damage} \xD7 1.5)`, text: baseM1.toFixed(1), mult: 1 });

  // Damage bonus
  const damageMult = 1 + (damageBonusPercent / 100);
  factors.push({ label: isHakuda ? 'Hakuda Damage' : 'Weapon Damage', text: `\xD7${damageMult.toFixed(4)}`, mult: damageMult });

  // Output multipliers
  for (const out of outputMultipliers) {
    factors.push({ label: out.name || 'Output', text: `\xD7${out.mult.toFixed(4)}`, mult: out.mult });
  }

  // Flawless
  if (flawlessDamagePercent > 0) {
    const flMult = 1 + (flawlessDamagePercent / 100);
    factors.push({ label: 'Flawless Damage', text: `\xD7${flMult.toFixed(4)}`, mult: flMult });
  }

  // Heat arms ablaze (1.075 * 1.075)
  if (heatArmsAblaze) {
    const heatMult = 1.075 * 1.075;
    factors.push({ label: 'Heat (arms ablaze)', text: `\xD7${heatMult.toFixed(4)}`, mult: heatMult });
  }

  // Blut Arterie
  if (!isHakuda && blutArterieLevel >= 4) {
    const blutTable = { 4: 4, 5: 6, 6: 8, 7: 11, 8: 15 };
    const blutBonus = blutTable[Math.min(blutArterieLevel, 8)] || 0;
    if (blutBonus > 0) {
      const blutMult = 1 + (blutBonus / 100);
      factors.push({ label: 'Blut Arterie', text: `\xD7${blutMult.toFixed(4)}`, mult: blutMult });
    }
  }

  // Target-specific multipliers
  if (target !== 'players') {
    if (isMonster && monsterDamagePercent > 0) {
      const monMult = 1 + (monsterDamagePercent / 100);
      factors.push({ label: 'Monster Damage', text: `\xD7${monMult.toFixed(4)}`, mult: monMult });
    }
    if (npcDamagePercent > 0) {
      const npcMult = 1 + (npcDamagePercent / 100);
      factors.push({ label: 'NPC Damage', text: `\xD7${npcMult.toFixed(4)}`, mult: npcMult });
    }
  }

  if (target === 'bosses' && bossDamagePercent > 0) {
    const bossMult = 1 + (bossDamagePercent / 100);
    factors.push({ label: 'Boss Damage', text: `\xD7${bossMult.toFixed(4)}`, mult: bossMult });
  }

  if (target === 'npcs' && giantFighter) {
    factors.push({ label: 'Giant Fighter (non-boss)', text: '\xD70.975', mult: 0.975 });
  }

  const total = factors.reduce((acc, f) => acc * f.mult, baseM1);

  return {
    baseM1,
    total: Math.round(total * 10) / 10,
    factors
  };
}

module.exports = {
  STAT_ALIASES,
  SEMI_STATS,
  ATTRIBUTES,
  parseBuffLine,
  parseNumericValue,
  getSemiStatBonus,
  getEffectiveSemiStat,
  getCharmTier,
  getCharmSlotCost,
  calculateCharmHpPenalty,
  calculateBaseHealth,
  calculateReiatsu,
  calculatePosture,
  calculateShunpoStamina,
  calculateShunpoSpeed,
  calculateMovementSpeed,
  calculateCooldownReduction,
  calculateKidoDamage,
  calculateWeaponDamage,
  calculateHakudaDamage,
  calculateM1Damage
};
