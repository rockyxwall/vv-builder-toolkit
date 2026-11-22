/**
 * src/build_engine.js
 * Comprehensive build calculation, validation, charm merge synergies,
 * and share code generation reverse-engineered from https://vvcharmmerges.pages.dev/builder.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const calc = require('./calc_engine');

const MAX_ATTR_POINTS = 400;     // speed + strength + kido + hakuda
const MAX_BUILD_POINTS = 400;    // reserves + haste + potency + mettle + shunpo
const MAX_SKILL_POINTS = 100;    // starting SP budget
const MAX_FRAGMENTS = 6;         // Ascension fragments
const MAX_ESSENCES = 2;          // Max essences equipped
const HIGH_LEVEL_THRESHOLD = 7;  // Level 7+ counts as high-level mastery
const MAX_HIGH_LEVEL_NODES = 2;  // At most 2 skills at level 7+
const SHARE_WORKER_URL = 'https://build-share-worker.yurkt12.workers.dev/builds';

let masterDataCache = null;

function loadMasterData() {
  if (masterDataCache) return masterDataCache;
  const dataPath = path.join(__dirname, '..', 'data', 'vv_builder_all.json');
  if (fs.existsSync(dataPath)) {
    masterDataCache = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return masterDataCache;
  }
  return null;
}

function normalizeRace(race) {
  if (!race) return null;
  const r = String(race).toLowerCase().trim();
  if (r === 'shinigami' || r === 'soul-reaper' || r === 'soul reaper') return 'soul-reaper';
  if (r === 'quincy') return 'quincy';
  if (r === 'hollow') return 'hollow';
  return race;
}

/**
 * Validates build against all VV Builder rules and constraints.
 */
function validateBuild(build, customData = null) {
  const data = customData || loadMasterData();
  const errors = [];
  const warnings = [];

  // 1. Race validation
  const normRace = normalizeRace(build.race);
  const validRaces = ['quincy', 'soul-reaper', 'hollow'];
  if (!normRace || !validRaces.includes(normRace)) {
    errors.push(`Invalid race: "${build.race}". Must be one of: ${validRaces.join(', ')}.`);
  }

  // 2. Attribute Points (AP)
  const ap = build.attributes || {};
  const totalAP = (ap.speed || 0) + (ap.strength || 0) + (ap.kido || 0) + (ap.hakuda || 0);
  if (totalAP > MAX_ATTR_POINTS) {
    errors.push(`Attribute Points budget exceeded: ${totalAP} / ${MAX_ATTR_POINTS} AP.`);
  }

  // 3. Build Points / SemiStats (BP)
  const bp = build.semiStats || {};
  const totalBP = (bp.reserves || 0) + (bp.haste || 0) + (bp.potency || 0) + (bp.mettle || 0) + (bp.shunpo || 0);
  if (totalBP > MAX_BUILD_POINTS) {
    errors.push(`Build Points (semiStats) budget exceeded: ${totalBP} / ${MAX_BUILD_POINTS} BP.`);
  }

  // 4. Fragments & Skill Points
  const spBudget = build.totalSkillPoints !== undefined ? build.totalSkillPoints : MAX_SKILL_POINTS;
  const fragBudget = build.totalFragments !== undefined ? build.totalFragments : MAX_FRAGMENTS;
  if (spBudget > MAX_SKILL_POINTS) {
    warnings.push(`Starting SP exceeds standard budget: ${spBudget} / ${MAX_SKILL_POINTS} SP.`);
  }
  if (fragBudget > MAX_FRAGMENTS) {
    warnings.push(`Ascension fragments exceed standard budget: ${fragBudget} / ${MAX_FRAGMENTS}.`);
  }

  // 5. Mastery Limit (Level 7+ cap)
  const nodeLevels = build.nodeLevels || {};
  let highLevelCount = 0;
  for (const [nodeId, lvl] of Object.entries(nodeLevels)) {
    if (lvl >= HIGH_LEVEL_THRESHOLD) {
      highLevelCount++;
    }
  }
  if (highLevelCount > MAX_HIGH_LEVEL_NODES) {
    errors.push(`Mastery limit exceeded: ${highLevelCount} nodes at Level 7+ (maximum allowed: ${MAX_HIGH_LEVEL_NODES}).`);
  }

  // 6. Essences
  const essenceIds = (build.essenceIds || []).filter(Boolean);
  if (essenceIds.length > MAX_ESSENCES) {
    errors.push(`Too many essences equipped: ${essenceIds.length} / ${MAX_ESSENCES} maximum.`);
  }
  if (data && data.essences) {
    for (const esId of essenceIds) {
      const es = data.essences.find(e => e.id === esId);
      if (!es) {
        warnings.push(`Unknown essence ID: "${esId}".`);
        continue;
      }
      if (es.requiredRace && normalizeRace(es.requiredRace) !== normRace) {
        errors.push(`Essence "${es.name || es.id}" requires race ${es.requiredRace}, cannot be used by ${normRace}.`);
      }
      if (Array.isArray(es.requiredStats)) {
        for (const req of es.requiredStats) {
          if ((ap[req.stat] || 0) < req.value) {
            errors.push(`Essence "${es.name || es.id}" requires ${req.stat.toUpperCase()} ${req.value}, but build only has ${ap[req.stat] || 0}.`);
          }
        }
      }
    }
  }

  // 7. Charm slots & Notch calculations
  const charmSlots = build.charmSlots || [];
  const maxCharmSlots = 3;
  if (charmSlots.length > maxCharmSlots) {
    errors.push(`Too many charm slots: ${charmSlots.length} / ${maxCharmSlots} allowed.`);
  }

  // Check charm merges and synergy ratings
  const clanId = build.selectedClanEntity ? build.selectedClanEntity.id : null;
  const penalty = calc.calculateCharmHpPenalty(charmSlots, clanId);

  // 8. Calculate complete character stats if data available
  let calculatedStats = null;
  if (data) {
    calculatedStats = calculateBuildStats(build, data);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    summary: {
      race: normRace,
      level: build.level || 100,
      totalAP,
      totalBP,
      highLevelCount,
      charmPenalty: penalty,
      stats: calculatedStats
    }
  };
}

/**
 * Calculates complete character stats for a given build.
 */
function calculateBuildStats(build, data = null) {
  const master = data || loadMasterData();
  const level = build.level || 100;
  const normRace = normalizeRace(build.race);
  const isVasto = normRace === 'hollow' && build.hollowSubrace === 'vasto-lorde';

  const ap = build.attributes || {};
  const bp = build.semiStats || {};

  const effReserves = calc.getEffectiveSemiStat('reserves', bp);
  const effHaste = calc.getEffectiveSemiStat('haste', bp);
  const effPotency = calc.getEffectiveSemiStat('potency', bp);
  const effMettle = calc.getEffectiveSemiStat('mettle', bp);
  const effShunpo = calc.getEffectiveSemiStat('shunpo', bp);

  // Flat & percent stat accumulators from equipped gear, clan, traits, zanpakuto
  const flatBuffs = {};
  const percentBuffs = {};

  function addBuff(stat, amount, isPercent) {
    if (!stat) return;
    if (isPercent) {
      percentBuffs[stat] = (percentBuffs[stat] || 0) + amount;
    } else {
      flatBuffs[stat] = (flatBuffs[stat] || 0) + amount;
    }
  }

  // Clan buffs
  if (build.selectedClanEntity && Array.isArray(build.selectedClanEntity.buffs)) {
    for (const b of build.selectedClanEntity.buffs) {
      const parsed = calc.parseBuffLine(b);
      addBuff(parsed.stat, parsed.amount, parsed.isPercent);
    }
  }

  // Equipment buffs & modifiers
  if (build.equippedItems) {
    for (const slot of Object.values(build.equippedItems)) {
      if (slot && slot.item && Array.isArray(slot.item.buffs)) {
        for (const b of slot.item.buffs) {
          const parsed = calc.parseBuffLine(b);
          addBuff(parsed.stat, parsed.amount, parsed.isPercent);
        }
      }
      if (slot && slot.modifier && slot.modifier.buffs && slot.item) {
        const slotLevelList = slot.modifier.buffs[slot.item.slot] || [];
        for (const tier of slotLevelList) {
          if (tier.level <= level && Array.isArray(tier.buffs)) {
            for (const b of tier.buffs) {
              const parsed = calc.parseBuffLine(b);
              addBuff(parsed.stat, parsed.amount, parsed.isPercent);
            }
          }
        }
      }
    }
  }

  // Traits
  const traitsActive = normRace === 'hollow' && (isVasto || build.resurrectionActive);
  if (traitsActive && Array.isArray(build.traitSlots)) {
    for (const ts of build.traitSlots) {
      if (ts && ts.trait && Array.isArray(ts.trait.buffs)) {
        for (const b of ts.trait.buffs) {
          const parsed = calc.parseBuffLine(b);
          addBuff(parsed.stat, parsed.amount, parsed.isPercent);
        }
      }
    }
  }

  // Zanpakuto parts (for Soul Reaper / Hollow)
  if ((normRace === 'soul-reaper' || normRace === 'hollow') && build.zanpakutoSlots) {
    for (const part of Object.values(build.zanpakutoSlots)) {
      if (part && Array.isArray(part.buffs)) {
        for (const b of part.buffs) {
          const parsed = calc.parseBuffLine(b);
          addBuff(parsed.stat, parsed.amount, parsed.isPercent);
        }
      }
    }
  }

  // Charm HP penalty
  const clanId = build.selectedClanEntity ? build.selectedClanEntity.id : null;
  const charmSlots = build.charmSlots || [];
  const penalty = calc.calculateCharmHpPenalty(charmSlots, clanId);

  // Derived core stats
  const health = calc.calculateBaseHealth({
    level,
    isVastoLorde: isVasto,
    flatHealth: flatBuffs['health'] || 0,
    hpPenaltyPercent: penalty.hpPenaltyPercent
  });

  const reiatsu = calc.calculateReiatsu({
    level,
    effectiveReserves: effReserves,
    flatReiatsu: flatBuffs['reiatsu'] || 0
  });

  const posture = calc.calculatePosture({
    effectiveMettle: effMettle,
    flatPosture: flatBuffs['posture'] || 0
  });

  const shunpoStamina = calc.calculateShunpoStamina({
    level,
    speedAP: ap.speed || 0,
    effectiveShunpo: effShunpo,
    flatStamina: flatBuffs['shunpo-stamina'] || 0
  });

  const shunpoSpeed = calc.calculateShunpoSpeed({
    level,
    speedAP: ap.speed || 0,
    effectiveShunpo: effShunpo,
    flatSpeed: flatBuffs['shunpo-speed'] || 0
  });

  const cooldownReduction = calc.calculateCooldownReduction(effHaste, percentBuffs['cooldown-reduction'] || 0);

  // Has energized kido trait?
  const hasEnergized = traitsActive && Array.isArray(build.traitSlots) && build.traitSlots.some(t => t?.trait?.id === 'energized');

  const kidoDamage = calc.calculateKidoDamage({
    kidoAP: ap.kido || 0,
    effectivePotency: effPotency,
    percentBuff: percentBuffs['kido-damage'] || 0,
    hasEnergized
  });

  const weaponDamage = calc.calculateWeaponDamage({
    strengthAP: ap.strength || 0,
    effectivePotency: effPotency,
    percentBuff: percentBuffs['weapon-damage'] || 0
  });

  const hakudaDamage = calc.calculateHakudaDamage({
    hakudaAP: ap.hakuda || 0,
    effectivePotency: effPotency,
    percentBuff: percentBuffs['hakuda-damage'] || 0
  });

  // M1 Damage (if weapon equipped)
  let m1Damage = null;
  let selectedWeapon = build.selectedWeapon;
  if (!selectedWeapon && build.selectedWeaponId && master && master.weapons) {
    selectedWeapon = master.weapons.find(w => w.id === build.selectedWeaponId);
  }
  if (selectedWeapon) {
    m1Damage = {
      players: calc.calculateM1Damage(selectedWeapon, {
        damageBonusPercent: selectedWeapon.damageType === 'hakuda' ? hakudaDamage.effectivePercent : weaponDamage.effectivePercent,
        target: 'players',
        flawlessDamagePercent: percentBuffs['flawless-damage'] || 0
      }),
      bosses: calc.calculateM1Damage(selectedWeapon, {
        damageBonusPercent: selectedWeapon.damageType === 'hakuda' ? hakudaDamage.effectivePercent : weaponDamage.effectivePercent,
        target: 'bosses',
        bossDamagePercent: percentBuffs['boss-damage'] || 0,
        flawlessDamagePercent: percentBuffs['flawless-damage'] || 0
      })
    };
  }

  return {
    health,
    reiatsu,
    posture,
    shunpoStamina,
    shunpoSpeed,
    movementSpeed: calc.calculateMovementSpeed(percentBuffs['movement-speed'] || 0),
    cooldownReduction,
    kidoDamage,
    weaponDamage,
    hakudaDamage,
    m1Damage,
    notches: penalty
  };
}

/**
 * Creates an empty build data object adhering strictly to the live Angular schema.
 */
function createEmptyBuild(race = 'quincy') {
  return {
    race: normalizeRace(race),
    level: 100,
    hollowSubrace: null,
    resurrectionActive: false,
    attributes: { speed: 0, strength: 0, kido: 0, hakuda: 0 },
    semiStats: { reserves: 0, haste: 0, potency: 0, mettle: 0, shunpo: 0 },
    unlockedNodeIds: ['hub'],
    nodeLevels: {},
    nodeUpgradeHistory: {},
    totalSkillPoints: 100,
    totalFragments: 6,
    selectedClanEntity: null,
    traitSlots: [{ trait: null }, { trait: null }, { trait: null }, { trait: null }],
    equippedItems: {
      head: { item: null, modifier: null },
      body: { item: null, modifier: null },
      face: { item: null, modifier: null },
      misc: { item: null, modifier: null },
      utility: { item: null, modifier: null },
      artifact: { item: null, modifier: null }
    },
    selectedAbility: null,
    selectedAbilityVariantId: null,
    abilityCustomization: {},
    essenceIds: [null, null],
    charmSlots: [
      { instanceA: null, instanceB: null, isMerge: false, mergeSelectedSide: null, mergeSelectedStatId: null },
      { instanceA: null, instanceB: null, isMerge: false, mergeSelectedSide: null, mergeSelectedStatId: null },
      { instanceA: null, instanceB: null, isMerge: false, mergeSelectedSide: null, mergeSelectedStatId: null }
    ],
    shrineLevelUpCharges: 0,
    shrineRefundCharges: 0,
    shrineRefundSnapshot: null,
    selectedAscensionTierId: null,
    huecoShrineEnabled: false,
    enabledGauntletIds: [],
    selectedWeaponId: null,
    zanpakutoSlotIds: { guard: null, handle: null, hilt: null, sheathe: null }
  };
}

/**
 * Offline serialization / deserialization (Base64).
 */
function serializeOffline(build) {
  const json = JSON.stringify(build);
  return Buffer.from(json, 'utf8').toString('base64');
}

function deserializeOffline(base64Str) {
  try {
    const json = Buffer.from(base64Str, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Cloud Share API Integration with https://build-share-worker.yurkt12.workers.dev/builds
 */
function saveBuildToCloud(race, buildData) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      race: normalizeRace(race) || 'unknown',
      buildData
    });
    const req = https.request(SHARE_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed && parsed.id) {
            resolve({
              id: parsed.id,
              url: `https://vvcharmmerges.pages.dev/builder?build=${parsed.id}`
            });
          } else {
            reject(new Error(`Invalid response from build share worker: ${body}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Cloud build share request timed out'));
    });
    req.write(payload);
    req.end();
  });
}

function loadBuildFromCloud(buildId) {
  return new Promise((resolve, reject) => {
    const url = `${SHARE_WORKER_URL}/${buildId}`;
    https.get(url, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

module.exports = {
  MAX_ATTR_POINTS,
  MAX_BUILD_POINTS,
  MAX_SKILL_POINTS,
  MAX_FRAGMENTS,
  MAX_ESSENCES,
  HIGH_LEVEL_THRESHOLD,
  MAX_HIGH_LEVEL_NODES,
  normalizeRace,
  validateBuild,
  calculateBuildStats,
  createEmptyBuild,
  serializeOffline,
  deserializeOffline,
  saveBuildToCloud,
  loadBuildFromCloud
};
