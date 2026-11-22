/**
 * src/markdown.js
 * Generates comprehensive, human-readable VV_BUILDER_GUIDE.md documentation
 * from the 12 official datasets extracted from https://vvcharmmerges.pages.dev/builder.
 */

function generateMarkdown(masterData) {
  const {
    charms = [],
    synergies = [],
    skillTree = [],
    items = [],
    modifiers = [],
    abilities = [],
    essences = [],
    weapons = [],
    zanpakutoParts = [],
    clans = [],
    traits = [],
    buffs = {}
  } = masterData;

  const lines = [];

  lines.push('# VV: Ultimatum Builder & Catalog Reference');
  lines.push('');
  lines.push('> Official companion guide and data reference for [vvcharmmerges.pages.dev/builder](https://vvcharmmerges.pages.dev/builder).');
  lines.push(`> Last updated: ${new Date().toISOString().split('T')[0]} | Source: Official Live Endpoints`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 📑 Table of Contents');
  lines.push('');
  lines.push('1. [System Mechanics & Mathematical Formulas](#1-system-mechanics--mathematical-formulas)');
  lines.push('2. [Spirit Charms Catalog (73 Charms)](#2-spirit-charms-catalog-73-charms)');
  lines.push('3. [Charm Merge Synergies Matrix](#3-charm-merge-synergies-matrix)');
  lines.push('4. [Skill Tree & Node Branches (260 Nodes)](#4-skill-tree--node-branches-260-nodes)');
  lines.push('5. [Equipment Catalog & Modifiers (146 Items)](#5-equipment-catalog--modifiers-146-items)');
  lines.push('6. [Weapons & Zanpakuto Modular Parts](#6-weapons--zanpakuto-modular-parts)');
  lines.push('7. [Abilities & Essences](#7-abilities--essences)');
  lines.push('8. [Clans & Hollow Traits](#8-clans--hollow-traits)');
  lines.push('9. [Buffs, Ascension Tiers & Shrines](#9-buffs-ascension-tiers--shrines)');
  lines.push('');
  lines.push('---');
  lines.push('');

  // 1. System Mechanics
  lines.push('## 1. System Mechanics & Mathematical Formulas');
  lines.push('');
  lines.push('The builder enforces exact client-side game formulas:');
  lines.push('');
  lines.push('### Point Budgets');
  lines.push('- **Attribute Points (AP)**: `400 AP` max across `Speed`, `Strength`, `Kido`, `Hakuda`.');
  lines.push('- **Build Points (BP / Semi-Stats)**: `400 BP` max across `Reserves`, `Haste`, `Potency`, `Mettle`, `Shunpo`.');
  lines.push('- **Skill Points (SP)**: `100 SP` starting budget (Upgrades cost `2 SP` each).');
  lines.push('- **Ascension Fragments**: `6 Fragments` (Upgrades cost `1 Fragment` each).');
  lines.push('- **Mastery Cap**: At most **2 skills** can reach Level 7 or 8.');
  lines.push('');
  lines.push('### Semi-Stat Cross-Bonus Formula');
  lines.push('Allocating points to any semi-stat grants free bonus points to the other 4 semi-stats:');
  lines.push('$$\\text{Bonus}(stat) = \\left\\lfloor \\frac{\\sum_{other} BP_{other}}{10} \\right\\rfloor$$');
  lines.push('$$\\text{EffectiveSemiStat}(stat) = BP_{stat} + \\text{Bonus}(stat)$$');
  lines.push('');
  lines.push('### Core Derived Stats (Level 100)');
  lines.push('- **Health**: Base 220 (Vasto Lorde) / 200 (Others) + `Level * 2.275` + Flat Gear Buffs + Faction Rank (+2.1%).');
  lines.push('  - *Charm Notch Penalty*: `3` Clean Free Notches. Excess notches inflict `-6% Max HP` per notch (`-4%` for Kurotsuchi clan).');
  lines.push('- **Reiatsu**: `55 + (Level * 0.15) + (EffectiveReserves / 100 * 4.5) + Flat Reiatsu`.');
  lines.push('- **Posture**: `92 + (EffectiveMettle / 100 * 5.0) + Flat Posture`.');
  lines.push('- **Shunpo Stamina**: `30 + (Level * 0.55) + (SpeedAP * 0.06) + (EffectiveShunpo * 0.07) + Flat Stamina`.');
  lines.push('- **Shunpo Speed**: `50 + (EffectiveShunpo * 0.03) + (SpeedAP * 0.015) + ((Level - 1) * 0.1) + Flat Speed`.');
  lines.push('- **Cooldown Reduction**: `(EffectiveHaste * 0.042) + Buffs`, capped at `30%`.');
  lines.push('');
  lines.push('### Damage Scaling & 20% Soft-Cap');
  lines.push('Kido, Weapon, and Hakuda damages feature a **20% soft-cap** (above 20%, additional damage is scaled by 50%):');
  lines.push('- **Kido**: `AP_Kido * Coeff + (EffectivePotency * AP_Kido * 0.000025) / 100 + Buffs`. (Coeff is `0.00008`, or `0.00011` with Energized trait).');
  lines.push('- **Weapon**: `AP_Strength * 0.01 + EffectivePotency * AP_Strength * 0.00002 + Buffs`.');
  lines.push('- **Hakuda**: `AP_Hakuda * 0.01 + EffectivePotency * AP_Hakuda * 0.00002 + Buffs`.');
  lines.push('');
  lines.push('---');
  lines.push('');

  // 2. Charms Catalog
  lines.push(`## 2. Spirit Charms Catalog (${charms.length} Charms)`);
  lines.push('');
  lines.push('| ID | Name | Tier | Primary Stats | Perks / Description |');
  lines.push('|---|---|---|---|---|');
  for (const c of charms) {
    const statsStr = (c.stats || []).map(s => `${s.id}: ${s.baseValue}`).join(', ') || '-';
    const descClean = (c.description || '').replace(/\r?\n|\r/g, ' ').slice(0, 150);
    lines.push(`| \`${c.id}\` | **${c.name}** | Tier ${c.tier} | ${statsStr} | ${descClean}... |`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // 3. Charm Synergies
  lines.push(`## 3. Charm Merge Synergies Matrix (${synergies.length} Pairs)`);
  lines.push('');
  lines.push('When merging two charms into a single slot, the designated stat scales according to their synergy rating:');
  lines.push('');
  lines.push('### Top Outstanding & Good Combinations');
  lines.push('');
  lines.push('| Charm A | Charm B | Synergy Rating A → B | Synergy Rating B → A |');
  lines.push('|---|---|---|---|');
  const topSynergies = synergies.filter(s => s.ratingAtoB === 'Outstanding' || s.ratingBtoA === 'Outstanding' || s.ratingAtoB === 'Good');
  for (const s of topSynergies.slice(0, 50)) {
    lines.push(`| \`${s.charmA}\` | \`${s.charmB}\` | **${s.ratingAtoB}** | **${s.ratingBtoA}** |`);
  }
  lines.push('');
  lines.push(`*(Showing top 50 of ${topSynergies.length} top synergies)*`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // 4. Skill Tree
  lines.push(`## 4. Skill Tree & Node Branches (${skillTree.length} Nodes)`);
  lines.push('');
  lines.push('| Node ID | Name | Branch / Spoke | Type | Max Level | Unlock Cost | Requirements |');
  lines.push('|---|---|---|---|---|---|---|');
  for (const n of skillTree.slice(0, 60)) {
    const reqStr = n.requires && n.requires.stats ? Object.entries(n.requires.stats).map(([k, v]) => `${k.toUpperCase()} ${v}`).join(', ') : 'None';
    const costStr = n.unlockCost && n.unlockCost.skillPoints ? `${n.unlockCost.skillPoints} SP` : 'Free';
    lines.push(`| \`${n.id}\` | **${n.name}** | ${n.spoke || n.type || '-'} | ${n.nodeType || '-'} | Lv ${n.maxLevel || 1} | ${costStr} | ${reqStr} |`);
  }
  lines.push('');
  lines.push(`*(Showing 60 of ${skillTree.length} total skill tree nodes. Full graph available in data/skill-tree.json)*`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // 5. Equipment Catalog
  lines.push(`## 5. Equipment Catalog & Modifiers (${items.length} Items)`);
  lines.push('');
  lines.push('| Item ID | Name | Slot | Rarity | Level Req | Key Buffs |');
  lines.push('|---|---|---|---|---|---|');
  for (const it of items) {
    const buffsStr = (it.buffs || []).join('; ') || '-';
    lines.push(`| \`${it.id}\` | **${it.name}** | ${it.slot} | ${it.rarity || 'Common'} | Lv ${it.requiredLevel || 1} | ${buffsStr} |`);
  }
  lines.push('');
  lines.push('### Equipment Modifiers');
  lines.push('| Modifier ID | Name | Stat Scaled | Available Slots |');
  lines.push('|---|---|---|---|');
  for (const m of modifiers) {
    const slots = Object.keys(m.buffs || {}).join(', ');
    lines.push(`| \`${m.id}\` | **${m.name}** | ${m.stat || '-'} | ${slots} |`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // 6. Weapons & Zanpakuto
  lines.push(`## 6. Weapons & Zanpakuto Modular Parts (${weapons.length} Weapons, ${zanpakutoParts.length} Parts)`);
  lines.push('');
  lines.push('### Weapons');
  lines.push('| ID | Name | Damage | Type | Attack Speed | Posture Damage | Crit CD |');
  lines.push('|---|---|---|---|---|---|---|');
  for (const w of weapons) {
    lines.push(`| \`${w.id}\` | **${w.name}** | ${w.damage} | ${w.damageType || 'weapon'} | ${w.attackSpeed} | ${w.postureDamage} | ${w.criticalCooldown}s |`);
  }
  lines.push('');
  lines.push('### Zanpakuto Parts');
  lines.push('| ID | Name | Part Type | Rarity | Buffs |');
  lines.push('|---|---|---|---|---|');
  for (const zp of zanpakutoParts) {
    lines.push(`| \`${zp.id}\` | **${zp.name}** | ${zp.partType} | ${zp.rarity || 'Common'} | ${(zp.buffs || []).join('; ')} |`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // 7. Abilities & Essences
  lines.push(`## 7. Abilities & Essences (${abilities.length} Abilities, ${essences.length} Essences)`);
  lines.push('');
  lines.push('### Race Abilities');
  lines.push('| ID | Name | Race | Rarity | Variants |');
  lines.push('|---|---|---|---|---|');
  for (const a of abilities) {
    const vars = (a.variants || []).map(v => v.name || v.id).join(', ') || 'Standard';
    lines.push(`| \`${a.id}\` | **${a.name}** | ${a.race} | ${a.rarity || 'Common'} | ${vars} |`);
  }
  lines.push('');
  lines.push('### Essences');
  lines.push('| ID | Name | Race Req | Cost | Stat Prerequisites |');
  lines.push('|---|---|---|---|---|');
  for (const e of essences) {
    const reqStr = (e.requiredStats || []).map(r => `${r.stat.toUpperCase()} ${r.value}`).join(', ') || 'None';
    lines.push(`| \`${e.id}\` | **${e.name || e.id}** | ${e.requiredRace || 'Any'} | ${e.cost || '-'} | ${reqStr} |`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // 8. Clans & Hollow Traits
  lines.push(`## 8. Clans & Hollow Traits (${clans.length} Clans, ${traits.length} Traits)`);
  lines.push('');
  lines.push('### Clans');
  lines.push('| ID | Name | Race | Rarity | Drop % | Buffs |');
  lines.push('|---|---|---|---|---|---|');
  for (const cl of clans) {
    lines.push(`| \`${cl.id}\` | **${cl.name}** | ${cl.race} | ${cl.rarity} | ${cl.chance}% | ${(cl.buffs || []).join('; ')} |`);
  }
  lines.push('');
  lines.push('### Hollow Traits');
  lines.push('| ID | Name | Active Buffs & Effects |');
  lines.push('|---|---|---|');
  for (const tr of traits) {
    lines.push(`| \`${tr.id}\` | **${tr.name}** | ${(tr.buffs || []).join('; ')} |`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // 9. Buffs, Ascension Tiers & Shrines
  lines.push('## 9. Buffs, Ascension Tiers & Shrines');
  lines.push('');
  if (buffs.ascensionTiers) {
    lines.push('### Ascension Tiers');
    lines.push('| ID | Name | Modifiers |');
    lines.push('|---|---|---|');
    for (const asc of buffs.ascensionTiers) {
      const mods = (asc.modifiers || []).map(m => `${m.stat}: +${m.amount}${m.isPercent ? '%' : ''}`).join(', ');
      lines.push(`| \`${asc.id}\` | **${asc.name}** | ${mods} |`);
    }
    lines.push('');
  }

  if (buffs.gauntlets) {
    lines.push('### Gauntlets');
    lines.push('| ID | Name | Modifiers |');
    lines.push('|---|---|---|');
    for (const g of buffs.gauntlets) {
      const mods = (g.modifiers || []).map(m => `${m.stat}: +${m.amount}${m.isPercent ? '%' : ''}`).join(', ');
      lines.push(`| \`${g.id}\` | **${g.name}** | ${mods} |`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('## 🔗 Online Share Links');
  lines.push('Builds created by this toolkit generate official Cloudflare Worker share URLs compatible with the live web app:');
  lines.push('`https://vvcharmmerges.pages.dev/builder?build=<id>`');
  lines.push('');

  return lines.join('\n');
}

module.exports = {
  generateMarkdown
};
