# VV Builder Toolkit

A zero-dependency Node.js toolkit for extracting official game data, generating comprehensive catalogs, performing exact mathematical calculations, validating character builds, and producing share codes for [VV Builder](https://vvcharmmerges.pages.dev/builder) (*VV: Ultimatum*).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)

---

## ⚡ Highlights

- **Direct Official Dataset Ingestion**: Downloads 12 clean official JSON endpoints directly from `https://vvcharmmerges.pages.dev` (charms, synergies, skill tree, items, modifiers, abilities, essences, weapons, zanpakuto parts, clans, traits, buffs).
- **Zero-Hallucination Mathematical Engine**: Exact formulas reverse-engineered directly from the live Angular application bundle (`main-RG72K2CU.js`):
  - Semi-stat cross bonuses: $\lfloor\sum \text{other BP}/10\rfloor$
  - Full character stats: Base Health (220 Vasto / 200 Standard), Reiatsu, Posture, Shunpo Stamina & Speed
  - Damage scaling: Kido (with Energized trait scaling), Weapon, Hakuda with exact **20% soft-cap** (50% decay above cap)
  - M1 Attack damage formulas across player, NPC, and boss targets
- **Charm Merge Synergies**: Complete evaluation of all 453 synergy pairings from `synergies.json` with dynamic stat scaling and notch HP penalty calculation (`-6% HP/excess notch`, `-4%` for Kurotsuchi clan).
- **Skill Tree Graph & Mastery Limit**: 260 nodes with bidirectional graph edges, attribute prerequisite verification, and strict enforcement of the **max 2 skills at Level 7+** mastery limit.
- **Cloud Build Share Integration**: Supports offline Base64 build serialization and direct API integration with the cloud share worker (`https://build-share-worker.yurkt12.workers.dev/builds`).
- **Zero External Dependencies**: Powered entirely by native Node.js standard library (`fs`, `path`, `https`).

---

## 📁 Repository Structure

```text
├── data/                       # 12 Extracted official JSON datasets + Master index
│   ├── charms.json             # 73 Spirit charms with stats & dynamic variable templates
│   ├── synergies.json          # 453 Charm merge synergy pairs with ratings
│   ├── skill-tree.json         # 260 Skill tree nodes with coordinates & prerequisites
│   ├── items.json              # 146 Equipment items across 6 slots
│   ├── modifiers.json          # 14 Equipment modifiers with level-tiered buff tables
│   ├── abilities.json          # 25 Race abilities with customization trees
│   ├── essences.json           # 14 Essences with attribute & race requirements
│   ├── weapons.json            # 20 Weapons with attack speeds, damage & crit CD
│   ├── zanpakuto-parts.json    # 31 Modular parts (guard, handle, hilt, sheathe)
│   ├── clans.json              # 40 Clans across races with drop rates & passives
│   ├── traits.json             # 13 Hollow traits
│   ├── buffs.json              # Ascension tiers, Hueco Shrine & Gauntlets
│   └── vv_builder_all.json     # Consolidated master indexed dataset (~1.2 MB)
├── src/
│   ├── calc_engine.js          # Pure mathematical calculation engine
│   ├── build_engine.js         # Build validator, charm merges, stat sheet & share codes
│   ├── fetcher.js              # Downloads all 12 datasets from vvcharmmerges.pages.dev
│   ├── parser.js               # Relational indexing, schema validation & master consolidator
│   └── markdown.js             # Generates VV_BUILDER_GUIDE.md reference
├── scripts/
│   └── generate_builds.js      # CLI generating verified builds with full stat sheets
├── extract.js                  # Main extraction pipeline
├── test_verify.js              # Verification test suite for data integrity & referential keys
├── test_build_engine.js        # Verification test suite for mathematical formulas & rules
├── VV_BUILDER_GUIDE.md         # Full human-readable game reference & catalog (640+ lines)
├── package.json
└── LICENSE
```

---

## 🚀 Quick Start

### 1. Run Data Extraction
Downloads all 12 live datasets, builds relational indexes, and writes structured JSON files and the markdown catalog:
```bash
npm run extract
# or: node extract.js
```

### 2. Run Verification Tests
Runs automated test suites verifying all schemas, relational integrity, formulas, and build rules:
```bash
npm test
```

### 3. Generate Preset Builds
Generates verified archetype builds (Quincy, Hollow Vasto Lorde, Soul Reaper) with full stat sheets and share codes:
```bash
npm run generate-builds
```

---

## 🛠️ Build Engine Constraints & Formulas

The build engine (`src/build_engine.js` & `src/calc_engine.js`) enforces the exact client mechanics:

| System | Budget / Constraint | Description |
|---|---|---|
| **Attribute Points (AP)** | `400 AP Cap` | Distributed across Speed, Strength, Kido, Hakuda. |
| **Build Points (BP / Semi-Stats)** | `400 BP Cap` | Distributed across Reserves, Haste, Potency, Mettle, Shunpo. |
| **Semi-Stat Cross Bonus** | `10 BP = +1 others` | Every 10 points allocated across other semi-stats gives +1 free to the remaining semi-stats. |
| **Skill Points (SP)** | `100 SP Starting` | Spent unlocking tree nodes and leveling skills up (2 SP per upgrade). |
| **Ascension Fragments** | `6 Fragments` | 1 Fragment per skill upgrade. |
| **Mastery Limit** | `Max 2 Skills at Lv 7+` | The engine strictly forbids leveling a 3rd skill to Level 7 or 8. |
| **Charm Notch Penalty** | `-6% Max HP / Excess Notch` | 3 clean notches (4 for Shinigami Squad 12). Kurotsuchi clan reduces penalty to `-4%`. |
| **Damage Soft-Cap** | `20% Soft-Cap` | Kido, Weapon, and Hakuda damages above 20% suffer 50% diminishing returns. |

---

## 💻 Programmatic Usage

```javascript
const { createEmptyBuild, validateBuild, calculateBuildStats, serializeOffline } = require('./src/build_engine');

// Create build adhering to the official schema
const build = createEmptyBuild('quincy');
build.attributes = { speed: 40, strength: 0, kido: 360, hakuda: 0 };
build.semiStats = { reserves: 100, haste: 150, potency: 50, mettle: 0, shunpo: 100 };
build.nodeLevels = { brenschwerter: 7, klingenfallen: 7 };

// Validate
const validation = validateBuild(build);
console.log('Valid:', validation.valid); // true

// Calculate exact character stats
const stats = calculateBuildStats(build);
console.log(`Total Health: ${stats.health.totalHealth} HP`);
console.log(`Kido Damage Bonus: +${stats.kidoDamage.effectivePercent}%`);
console.log(`Cooldown Reduction: ${stats.cooldownReduction.capped}%`);

// Export local offline code
const code = serializeOffline(build);
console.log('Share Code:', code);
```

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
