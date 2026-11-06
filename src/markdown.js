function formatReq(req) {
  if (!req || Object.keys(req).length === 0) return 'None';
  return Object.entries(req)
    .map(([stat, val]) => `${stat.toUpperCase()} ${val}`)
    .join(', ');
}

function formatStats(stats) {
  if (!stats) return '-';
  const parts = [];
  if (stats.reiCost !== null && stats.reiCost !== undefined) parts.push(`Rei: ${stats.reiCost}`);
  if (stats.cd !== null && stats.cd !== undefined) parts.push(`CD: ${stats.cd}s`);
  if (stats.dmg !== null && stats.dmg !== undefined) parts.push(`Dmg: ${stats.dmg}`);
  if (stats.posture !== null && stats.posture !== undefined) parts.push(`Posture: ${stats.posture}`);
  return parts.length ? parts.join(', ') : '-';
}

function generateMarkdown(data) {
  const lines = [];

  const patchTag = data.meta.patchVersion ? ` (Updated for ${data.meta.patchVersion})` : '';
  lines.push(`# VV Builder — Comprehensive Game Reference & Catalog${patchTag}`);
  lines.push('');
  lines.push(`> Extracted from [VV Builder](https://www.vvbuilder.online/) on ${data.meta.extractedAt || 'latest'}${data.meta.lastUpdatedWithPatch ? ` and patched with official update logs up to ${data.meta.lastUpdatedWithPatch}` : ''}.`);
  lines.push('');
  lines.push('## Table of Contents');
  lines.push('- [1. Core Build System, Stat Milestones & Combat Mechanics](#1-core-build-system-stat-milestones--combat-mechanics)');
  lines.push('- [2. Active Promo Codes & World Boss Schedule](#2-active-promo-codes--world-boss-schedule)');
  lines.push('- [3. Ultimates & Special Modes](#3-ultimates--special-modes)');
  lines.push('- [4. Race Skills](#4-race-skills)');
  lines.push('- [5. Skill Tree Spokes & Nodes](#5-skill-tree-spokes--nodes)');
  lines.push('- [6. Equipment Catalog](#6-equipment-catalog)');
  lines.push('- [7. Clan Buffs & Rarities](#7-clan-buffs--rarities)');
  lines.push('- [8. Spirit Charms](#8-spirit-charms)');
  lines.push('- [9. Hollow Traits](#9-hollow-traits)');
  lines.push('- [10. Essences & Attributes](#10-essences--attributes)');
  lines.push('');
  lines.push('---');
  lines.push('');

  // 1. Core Build System & Stat Milestones
  lines.push('## 1. Core Build System, Stat Milestones & Combat Mechanics');
  lines.push('- **Total Build Point Budget**: 400 BP Cap');
  lines.push('- **Races**: Shinigami, Hollow / Arrancar, Quincy');
  lines.push('- **Equipment Slots**: Body, Head, Face, Utility, Misc (Plus 2 Cosmetic Vanity Slots)');
  lines.push('');
  lines.push('### Stat Investment Milestones & Scaling');
  lines.push('- **Build Point Cross-Scaling**: Every 10 points invested into Build Points grants **+1 to all other stats**.');
  lines.push('- **175 Stat Investment**: Reserve, Haste, Potency, Mettle, and Shunpo each unlock unique, powerful tier-1 passives at 175 investment.');
  lines.push('- **400 Stat Investment**: Reserve, Haste, Potency, Mettle, and Shunpo each unlock major tier-2 ultimate passives at 400 investment.');
  lines.push('- **Attribute 400 Passives**: Strength, Speed, Kido, and Hakuda all have game-defining 400-investment passives to reward specialized mono-attribute builds.');
  lines.push('- **Free Build Reset**: Available once per account without any level cap.');
  lines.push('');
  lines.push('### Core Combat Systems');
  lines.push('- **Traversing**: Hold `Q` outside of combat to rapidly traverse the map via Flashsteps / Sonido / Hirenkyaku with reduced resource consumption.');
  lines.push('- **Anti-Gank System**: Taking heavy damage from non-allied opponents builds Anti-Gank stacks (+scaling damage reduction, posture damage reduction, posture regen, and increased aura heal).');
  lines.push('- **Combo Falloff**: Being locked in a true combo for an extended duration significantly reduces follow-up damage until released from stun.');
  lines.push('- **Safe Transmutation**: Detransmutating an accessory safely refunds the original transmutated accessory instead of destroying it.');
  lines.push('');

  // 2. Active Promo Codes & World Boss Schedule
  if (data.gameMeta) {
    lines.push('## 2. Active Promo Codes & World Boss Schedule');
    lines.push('');
    lines.push('### Active Promo Codes');
    lines.push('| Code | Reward / Effect | Status / Instructions |');
    lines.push('|---|---|---|');
    for (const item of (data.gameMeta.codes || [])) {
      lines.push(`| \`${item.code}\` | **${item.reward}** | ${item.status} |`);
    }
    lines.push('');
    lines.push('### World Boss Spawn Schedule');
    lines.push('| Boss Name | Spawn Time | Key Drops | Encounter Notes |');
    lines.push('|---|---|---|---|');
    for (const b of (data.gameMeta.worldBossSchedule || [])) {
      lines.push(`| **${b.name}** | \`${b.spawnTime}\` | ${b.drops} | ${b.note} |`);
    }
    lines.push('> **Damage Credit Rule**: 5%+ damage qualifies for drops and EXP (green name); 10%+ damage guarantees credit even if you die (light blue name).');
    lines.push('');
  }

  // 3. Ultimates & Special Modes
  lines.push('## 3. Ultimates & Special Modes');
  lines.push('');
  lines.push('| ID | Name | SP Cost | Requirements | Race Restriction / Acquisition |');
  lines.push('|---|---|---|---|---|');
  for (const ult of data.ultimates) {
    const race = ult.raceLabel || ult.race || 'All Races';
    lines.push(`| \`${ult.id}\` | **${ult.name}** | ${ult.sp} | ${formatReq(ult.req)} | ${race} |`);
  }
  lines.push('');

  // 4. Race Skills
  lines.push('## 4. Race Skills');
  for (const [race, skills] of Object.entries(data.raceSkills)) {
    lines.push(`### ${race}`);
    lines.push('');
    lines.push('| Skill | SP Cost | Requirements | Description | Upgrade / Level Note |');
    lines.push('|---|---|---|---|---|');
    for (const s of skills) {
      const desc = (s.desc || '').replace(/\|/g, '\\|');
      const note = (s.upgradeNote || '-').replace(/\|/g, '\\|');
      lines.push(`| **${s.name}** (\`${s.id}\`) | ${s.costSP ?? 0} | ${formatReq(s.req)} | ${desc} | ${note} |`);
    }
    lines.push('');
  }

  // 5. Skill Tree Spokes & Nodes
  lines.push('## 5. Skill Tree Spokes & Nodes');
  for (const [spokeId, nodes] of Object.entries(data.spokeNodes)) {
    const title = spokeId.replace(/_/g, ' ').toUpperCase();
    lines.push(`### Spoke: ${title} (${nodes.length} Nodes)`);
    lines.push('');
    lines.push('| Node ID | Name | Parent | Cost / SP | Requirements / Effects |');
    lines.push('|---|---|---|---|---|');
    for (const n of nodes) {
      const parent = n.parent ? `\`${n.parent}\`` : '*(Root/Base)*';
      const cost = n.costSP !== undefined ? `${n.costSP} SP` : (n.sp !== undefined ? `${n.sp} SP` : '-');
      const req = n.req ? formatReq(n.req) : (n.desc || n.effect || '-');
      lines.push(`| \`${n.id}\` | **${n.name || n.id}** | ${parent} | ${cost} | ${req.replace(/\|/g, '\\|')} |`);
    }
    lines.push('');
  }

  // 6. Equipment Catalog
  lines.push('## 6. Equipment Catalog');
  for (const [slot, items] of Object.entries(data.equipment)) {
    lines.push(`### Slot: ${slot} (${items.length} Items)`);
    lines.push('');
    lines.push('| Item Name | ID | Rarity | Stat Bonuses / Special Perks |');
    lines.push('|---|---|---|---|');
    for (const it of items) {
      const rarity = it.rarity || 'Common';
      const perks = (Array.isArray(it.passives) ? it.passives.join('; ') : (it.desc || it.effect || it.stats || '-')).toString().replace(/\|/g, '\\|');
      lines.push(`| **${it.name}** | \`${it.id}\` | ${rarity} | ${perks} |`);
    }
    lines.push('');
  }

  // 7. Clan Buffs
  lines.push('## 7. Clan Buffs & Rarities');
  for (const [race, clanList] of Object.entries(data.clans)) {
    lines.push(`### ${race} Clans (${clanList.length})`);
    lines.push('');
    lines.push('| Clan Name | ID | Rarity | Clan Perk / Passives |');
    lines.push('|---|---|---|---|');
    for (const cl of clanList) {
      const rarity = cl.rarity || 'Common';
      const perks = (Array.isArray(cl.buffs) ? cl.buffs.join('; ') : (cl.desc || cl.buff || cl.perks || '-')).toString().replace(/\|/g, '\\|');
      lines.push(`| **${cl.name}** | \`${cl.id}\` | ${rarity} | ${perks} |`);
    }
    lines.push('');
  }

  // 8. Spirit Charms
  lines.push(`## 8. Spirit Charms (${data.charms.length} Total)`);
  lines.push('');
  lines.push('| Charm Name | ID | Tier | Description / Effect |');
  lines.push('|---|---|---|---|');
  for (const ch of data.charms) {
    const title = ch.title || ch.name || ch.id;
    const tier = ch.tier || '-';
    let details = ch.desc || '';
    if (Array.isArray(ch.buffs) && ch.buffs.length > 0) {
      details += ` Buffs: ${ch.buffs.join('; ')}`;
    }
    if (Array.isArray(ch.nerfs) && ch.nerfs.length > 0) {
      details += ` Nerfs: ${ch.nerfs.join('; ')}`;
    }
    lines.push(`| **${title}** | \`${ch.id}\` | ${tier} | ${details.replace(/\|/g, '\\|')} |`);
  }
  lines.push('');

  // 9. Hollow Traits
  lines.push(`## 9. Hollow Traits (${data.traits.length} Total)`);
  lines.push('');
  lines.push('| Trait Name | ID | Notable Feature / Details |');
  lines.push('|---|---|---|');
  for (const tr of data.traits) {
    const notable = (tr.notable || tr.desc || '-').toString().replace(/\|/g, '\\|');
    lines.push(`| **${tr.name}** | \`${tr.id}\` | ${notable} |`);
  }
  lines.push('');

  // 10. Essences & Attributes
  lines.push('## 10. Essences & Attributes');
  lines.push('');
  lines.push(`### Essences (${data.essences.length} Total)`);
  lines.push('| Essence Name | ID | Accent Color | Description |');
  lines.push('|---|---|---|---|');
  for (const es of data.essences) {
    lines.push(`| **${es.name}** | \`${es.id}\` | \`${es.accent || '-'}\` | ${es.desc || '-'} |`);
  }
  lines.push('');

  lines.push(`### Core Attributes (${data.attributes.length} Total)`);
  lines.push('| Attribute Name | ID | UI Position | Description |');
  lines.push('|---|---|---|---|');
  for (const att of data.attributes) {
    lines.push(`| **${att.name || att.id}** | \`${att.id}\` | ${att.pos || '-'} | ${att.desc || '-'} |`);
  }
  lines.push('');

  return lines.join('\n');
}

module.exports = { generateMarkdown };
