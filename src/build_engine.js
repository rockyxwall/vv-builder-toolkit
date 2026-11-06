/**
 * src/build_engine.js
 * Core build calculation, validation, and share-code generation
 * reverse-engineered from VV Builder (https://www.vvbuilder.online/).
 */

const fs = require('fs');
const path = require('path');

// Load master data
const dataDir = path.join(__dirname, '..', 'data');
const masterData = JSON.parse(fs.readFileSync(path.join(dataDir, 'vv_builder_all.json'), 'utf8'));

const MAX_BUILD_POINTS = 400;     // reserves + haste + potency + mettle + shunpo
const MAX_ATTR_POINTS = 400;      // hakuda + strength + kido + speed
const MAX_SKILL_POINTS = 100;     // SP budget
const MAX_SOUL_TOKENS = 50000;    // Soul Tokens budget
const MAX_FRAGMENTS = 6;          // Ascension Fragments
const MAX_ESSENCES = 2;           // Max ultimates / essences equipped
const MAX_CHARM_TIER_CAP = 9;     // Max sum of charm tiers
const MAX_MASTERED_SKILLS = 2;    // At most 2 skills at level 7+

/**
 * Extracts integer tier from charm tier string (e.g. "Tier 3" -> 3)
 */
function getCharmTier(tierStr) {
  if (!tierStr) return 0;
  const m = String(tierStr).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

/**
 * Calculates Charm HP penalty
 * 3 tiers clean (4 for Shinigami Squad 12), -6% max HP per excess tier point.
 */
function calculateCharmHpPenalty(charms, isShinigami, isSquad12) {
  const cleanTiers = (isShinigami && isSquad12) ? 4 : 3;
  const totalTiers = charms.reduce((acc, c) => acc + getCharmTier(c.tier), 0);
  const excess = Math.max(0, totalTiers - cleanTiers);
  return excess * -6; // e.g. -36%
}

/**
 * Encodes build object into official VV Builder share code ('VV' + 8-char salt + Base64)
 */
function generateShareCode(build) {
  const saltChars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let salt = '';
  for (let i = 0; i < 8; i++) {
    salt += saltChars[Math.floor(Math.random() * saltChars.length)];
  }

  const jsonStr = JSON.stringify(build);
  const b64 = Buffer.from(jsonStr, 'utf8').toString('base64');
  return `VV${salt}${b64}`;
}

/**
 * Decodes official VV Builder share code into build JSON
 */
function parseShareCode(code) {
  if (!code || typeof code !== 'string') return null;
  const cleaned = code.trim().replace(/\s/g, '');
  if (!cleaned.startsWith('VV') || cleaned.length < 12) return null;

  const b64 = cleaned.slice(10);
  try {
    const jsonStr = Buffer.from(b64, 'base64').toString('utf8');
    return JSON.parse(jsonStr);
  } catch (err) {
    return null;
  }
}

/**
 * Validates a build against all VV Builder constraints
 */
function validateBuild(build) {
  const errors = [];
  const warnings = [];

  // 1. Race validation
  const validRaces = ['Shinigami', 'Hollow', 'Quincy'];
  if (!validRaces.includes(build.r)) {
    errors.push(`Invalid race: "${build.r}". Must be one of ${validRaces.join(', ')}.`);
  }

  // 2. Build Points (BP)
  const bp = build.b || {};
  const totalBP = (bp.reserves || 0) + (bp.haste || 0) + (bp.potency || 0) + (bp.mettle || 0) + (bp.shunpo || 0);
  if (totalBP > MAX_BUILD_POINTS) {
    errors.push(`Build Points budget exceeded: ${totalBP} / ${MAX_BUILD_POINTS} BP.`);
  }

  // 3. Attribute Points (AP)
  const ap = build.a || {};
  const totalAP = (ap.hakuda || 0) + (ap.strength || 0) + (ap.kido || 0) + (ap.speed || 0);
  if (totalAP > MAX_ATTR_POINTS) {
    errors.push(`Attribute Points budget exceeded: ${totalAP} / ${MAX_ATTR_POINTS} AP.`);
  }

  // 4. Essences / Ultimates
  const essences = Array.isArray(build.es) ? build.es : [];
  if (essences.length > MAX_ESSENCES) {
    errors.push(`Too many essences/ultimates equipped: ${essences.length} / ${MAX_ESSENCES} maximum.`);
  }

  // Check essence prerequisites & race
  for (const esId of essences) {
    const ult = masterData.ultimates.find(u => u.id === esId) || (masterData.essences || []).find(e => e.id === esId);
    if (!ult) {
      warnings.push(`Unknown essence/ultimate ID: "${esId}".`);
      continue;
    }
    if (ult.race && ult.race !== build.r) {
      errors.push(`Essence "${ult.name}" is restricted to ${ult.race}, cannot be used by ${build.r}.`);
    }
    if (ult.req) {
      for (const [attr, need] of Object.entries(ult.req)) {
        if ((ap[attr] || 0) < need) {
          errors.push(`Essence "${ult.name}" requires ${attr.toUpperCase()} ${need}, but build only has ${ap[attr] || 0}.`);
        }
      }
    }
  }

  // 5. Charms
  const charms = Array.isArray(build.ch) ? build.ch : [];
  const maxCharmSlots = (build.r === 'Shinigami' && build.s12) ? 4 : 3;
  if (charms.length > maxCharmSlots) {
    errors.push(`Too many charms equipped: ${charms.length} / ${maxCharmSlots} allowed.`);
  }

  let totalCharmTiers = 0;
  const charmObjs = [];
  for (const chId of charms) {
    const ch = masterData.charms.find(c => c.id === chId);
    if (!ch) {
      warnings.push(`Unknown charm ID: "${chId}".`);
      continue;
    }
    charmObjs.push(ch);
    totalCharmTiers += getCharmTier(ch.tier);
  }

  if (totalCharmTiers > MAX_CHARM_TIER_CAP) {
    errors.push(`Charm Tier Cap exceeded: ${totalCharmTiers} / ${MAX_CHARM_TIER_CAP} max tier budget.`);
  }

  const hpPenalty = calculateCharmHpPenalty(charmObjs, build.r === 'Shinigami', !!build.s12);
  const effectiveHpPercent = 100 + hpPenalty;

  // 6. Clan
  if (build.cl) {
    const raceClans = (masterData.clans && masterData.clans[build.r]) ? masterData.clans[build.r] : [];
    const clanMatch = raceClans.find(c => c.id === build.cl) || build.cl.includes('kurosaki');
    if (!clanMatch) {
      warnings.push(`Clan "${build.cl}" does not belong to ${build.r} clan pool.`);
    }
  }

  // 7. Equipment
  const eq = build.eq || {};
  const validSlots = ['Body', 'Head', 'Face', 'Utility', 'Misc'];
  for (const [slot, itemId] of Object.entries(eq)) {
    if (!validSlots.includes(slot)) {
      warnings.push(`Unknown equipment slot: "${slot}".`);
      continue;
    }
    if (itemId) {
      const item = (masterData.equipment[slot] || []).find(i => i.id === itemId);
      if (!item) {
        warnings.push(`Item "${itemId}" not recognized in slot "${slot}".`);
      }
    }
  }

  // 8. Hollow Traits
  if (build.ht && build.r !== 'Hollow') {
    const nonNullTraits = build.ht.filter(t => t !== null);
    if (nonNullTraits.length > 0) {
      errors.push(`Non-Hollow build cannot equip Hollow traits.`);
    }
  }

  // 9. Mastery cap (at most 2 skills level >= 7)
  const skills = Array.isArray(build.s) ? build.s : [];
  const masteredSkills = skills.filter(s => (s.l || 1) >= 7);
  if (masteredSkills.length > MAX_MASTERED_SKILLS) {
    errors.push(`Mastery cap exceeded: ${masteredSkills.length} skills at Level 7+ (max allowed is ${MAX_MASTERED_SKILLS}).`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    summary: {
      race: build.r,
      totalBP: `${totalBP} / ${MAX_BUILD_POINTS}`,
      totalAP: `${totalAP} / ${MAX_ATTR_POINTS}`,
      charmCount: `${charms.length} / ${maxCharmSlots}`,
      charmTiers: `${totalCharmTiers} / ${MAX_CHARM_TIER_CAP}`,
      hpPenalty: `${hpPenalty}% (Effective Max HP: ${effectiveHpPercent}%)`,
      essences: essences.length,
      masteredSkills: masteredSkills.length
    }
  };
}

module.exports = {
  validateBuild,
  generateShareCode,
  parseShareCode,
  calculateCharmHpPenalty,
  getCharmTier,
  MAX_BUILD_POINTS,
  MAX_ATTR_POINTS,
  MAX_SKILL_POINTS,
  MAX_CHARM_TIER_CAP
};
