# VV Builder Toolkit

A zero-dependency Node.js toolkit for extracting game data, generating comprehensive catalogs, validating character builds, and producing official share codes for [VV Builder](https://www.vvbuilder.online/) (*VV: Ultimatum*).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)

---

## ⚡ Highlights

- **Direct Bundle Extraction**: Bypasses the WebGL canvas / empty DOM entirely by extracting the structured game dataset directly from client-side JavaScript bundles.
- **Official Update Sync (v5.0 – v5.2)**: Includes latest clans, equipment (Spiritless Set, Halloween Drops), skills (Shunko, Danku, Okasen, Brenschwerter), and spirit charms.
- **Reverse-Engineered Build Engine**: Exact implementation of the builder's constraints (400 BP, 400 AP, 100 SP, 2-skill mastery cap, 9-tier charm cap, and corrupt node HP penalties).
- **Official Share Code Generation**: Encodes and decodes valid `VV...` build strings that import directly into [vvbuilder.online](https://www.vvbuilder.online/).
- **Zero External Dependencies**: Powered entirely by native Node.js standard library (`fs`, `path`, `https`, `vm`).

---

## 📁 Repository Structure

```text
├── data/                       # Extracted & patched JSON datasets
│   ├── charms.json             # 71 Spirit charms with tier ratings & perks
│   ├── clans.json              # 40 Clans across Quincy, Hollow, Shinigami
│   ├── equipment.json          # 108 Items across Body, Head, Face, Utility, Misc
│   ├── essences.json           # 7 Essences & 4 core attributes
│   ├── game_meta.json          # Promo codes, World Boss spawn timers, mechanics
│   ├── skills.json             # Ultimates & race base skills
│   ├── traits.json             # 13 Hollow traits
│   ├── tree_nodes.json         # 233 Spoke tree nodes across 8 spokes
│   └── vv_builder_all.json     # Consolidated master dataset
├── src/
│   ├── build_engine.js         # Build validator, calculator & share code encoder/decoder
│   ├── fetcher.js              # Scrapes Vite asset bundle from site
│   ├── markdown.js             # Generates markdown documentation guide
│   ├── parser.js               # AST / delimiter scanner using Node vm
│   └── patch_updates.js        # Official patch notes merger (v5.0 - v5.2)
├── scripts/
│   └── generate_builds.js      # CLI to create optimal builds & share codes
├── extract.js                  # Main extraction pipeline
├── test_verify.js              # Verification test suite for data integrity
├── test_build_engine.js        # Verification test suite for build rules
├── VV_BUILDER_GUIDE.md         # Full human-readable game reference & catalog
├── package.json
└── LICENSE
```

---

## 🚀 Quick Start

### 1. Run Data Extraction
Scrapes the latest client bundle, parses the game structures, applies official patch logs, and writes structured JSON datasets:
```bash
npm run extract
# or: node extract.js
```

### 2. Run Verification Tests
Runs automated test suites verifying all schemas, unique IDs, point budgets, and build rules:
```bash
npm test
```

### 3. Generate Preset Builds & Share Codes
Generates optimized, zero-parry, AoE boss-killing builds with official `VV...` share codes:
```bash
npm run generate-builds
```

---

## 🛠️ Build Engine & Rules

The build engine (`src/build_engine.js`) enforces the exact mechanics of *VV: Ultimatum*:

| System | Budget / Constraint | Description |
|---|---|---|
| **Build Points (BP)** | `400 BP Cap` | Distributed across Reserves, Haste, Potency, Mettle, Shunpo. (10 BP = +1 all stats). |
| **Attribute Points (AP)** | `400 AP Cap` | Distributed across Hakuda, Strength, Kido, Speed. Gates skill tree requirements. |
| **Skill Points (SP)** | `100 SP Starting` | Spent unlocking tree nodes and leveling skills up to Level 8. |
| **Mastery Limit** | `Max 2 Skills at Lvl 7+` | The engine strictly forbids leveling a 3rd skill to Level 7 or 8. |
| **Essences / Ultimates** | `Max 2 Equipped` | Must satisfy attribute requirements and race restrictions. |
| **Charm Tier Cap** | `9 Tiers Maximum` | Sum of equipped charm tiers must not exceed 9. 3 slots max (4 for Squad 12). |
| **Charm HP Penalty** | `-6% Max HP / Extra Tier` | First 3 tiers are Clean (4 for Squad 12). Each tier above inflicts -6% Max HP. |

---

## 💻 Programmatic Usage

```javascript
const { validateBuild, generateShareCode, parseShareCode } = require('./src/build_engine');

const myBuild = {
  v: 3,
  r: 'Hollow',
  b: { reserves: 150, haste: 200, potency: 0, mettle: 50, shunpo: 0 },
  a: { hakuda: 0, strength: 0, kido: 400, speed: 0 },
  s: [
    { i: 'rc1', l: 1, sp: 5, st: 0, af: 0, f: 0, ul: '' },
    { i: 'rc2', l: 7, sp: 20, st: 0, af: 0, f: 0, ul: 'ssssss' }
  ],
  sr: [],
  es: ['gran_ray'],
  el: { gran_ray: 1 },
  fr: 1, fu: 1, sp: 30, fg: 6, st: 50000,
  ch: ['charm_giant_fighter', 'charm_monster_slayer', 'charm_hard_headed'],
  s12: 0, vc: 0,
  ht: ['tr_garganta', 'tr_menis', 'tr_chitin', 'tr_gluttony'],
  cl: 'cl_starrk',
  eq: {
    Body: 'eq_body_pharaoh_regalia',
    Head: 'eq_head_witchs_hat',
    Utility: 'eq_utility_pharaoh_greaves',
    Misc: 'eq_misc_crest_of_the_ascended'
  }
};

// Validate build against all game rules
const validation = validateBuild(myBuild);
console.log('Is Valid:', validation.valid);

// Generate official share code
const code = generateShareCode(myBuild);
console.log('Share Code:', code);
// => VVZYb5u5L4eyJ2IjozLCJyIjoi... (paste into vvbuilder.online to load)
```

---

## 📜 License

[MIT](LICENSE) © 2026 [rockyxwall](https://github.com/rockyxwall)
