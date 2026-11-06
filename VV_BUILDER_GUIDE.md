# VV Builder — Comprehensive Game Reference & Catalog (Updated for v5.2 (HolloVVeen & Shunko))

> Extracted from [VV Builder](https://www.vvbuilder.online/) on 2026-11-06T16:02:46.514Z and patched with official update logs up to 2026-11-06.

## Table of Contents
- [1. Core Build System, Stat Milestones & Combat Mechanics](#1-core-build-system-stat-milestones--combat-mechanics)
- [2. Active Promo Codes & World Boss Schedule](#2-active-promo-codes--world-boss-schedule)
- [3. Ultimates & Special Modes](#3-ultimates--special-modes)
- [4. Race Skills](#4-race-skills)
- [5. Skill Tree Spokes & Nodes](#5-skill-tree-spokes--nodes)
- [6. Equipment Catalog](#6-equipment-catalog)
- [7. Clan Buffs & Rarities](#7-clan-buffs--rarities)
- [8. Spirit Charms](#8-spirit-charms)
- [9. Hollow Traits](#9-hollow-traits)
- [10. Essences & Attributes](#10-essences--attributes)

---

## 1. Core Build System, Stat Milestones & Combat Mechanics
- **Total Build Point Budget**: 400 BP Cap
- **Races**: Shinigami, Hollow / Arrancar, Quincy
- **Equipment Slots**: Body, Head, Face, Utility, Misc (Plus 2 Cosmetic Vanity Slots)

### Stat Investment Milestones & Scaling
- **Build Point Cross-Scaling**: Every 10 points invested into Build Points grants **+1 to all other stats**.
- **175 Stat Investment**: Reserve, Haste, Potency, Mettle, and Shunpo each unlock unique, powerful tier-1 passives at 175 investment.
- **400 Stat Investment**: Reserve, Haste, Potency, Mettle, and Shunpo each unlock major tier-2 ultimate passives at 400 investment.
- **Attribute 400 Passives**: Strength, Speed, Kido, and Hakuda all have game-defining 400-investment passives to reward specialized mono-attribute builds.
- **Free Build Reset**: Available once per account without any level cap.

### Core Combat Systems
- **Traversing**: Hold `Q` outside of combat to rapidly traverse the map via Flashsteps / Sonido / Hirenkyaku with reduced resource consumption.
- **Anti-Gank System**: Taking heavy damage from non-allied opponents builds Anti-Gank stacks (+scaling damage reduction, posture damage reduction, posture regen, and increased aura heal).
- **Combo Falloff**: Being locked in a true combo for an extended duration significantly reduces follow-up damage until released from stun.
- **Safe Transmutation**: Detransmutating an accessory safely refunds the original transmutated accessory instead of destroying it.

## 2. Active Promo Codes & World Boss Schedule

### Active Promo Codes
| Code | Reward / Effect | Status / Instructions |
|---|---|---|
| `HOLLOVVEEN` | **Event Candy, Tickets & Rolls** | Active (v5.2) |
| `SHUNKOVASTO` | **Rerolls & Progression Tokens** | Active |
| `205KLIKES` | **Soul Tokens & EXP Boost** | Active |
| `200KLIKES` | **Soul Tokens & Accessory Rolls** | Active |
| `CLANS` | **Clan Reroll Tickets (Redeem at Fort Adams)** | Active |
| `BUILDPOINTS` | **Build Reset & Stat Points** | Active |
| `necromancerpoints` | **Necromancer Upgrade Points** | Active |
| `BANKAIONTHEWAY` | **EXP & Soul Tokens** | Active |
| `latenight` | **Nightly Bonus Tokens** | Limited |

### World Boss Spawn Schedule
| Boss Name | Spawn Time | Key Drops | Encounter Notes |
|---|---|---|---|
| **Junichiro** | `Every hour at xx:20` | Vampire Hunter's Set, Katana skins | Notification 5m prior |
| **Nivis** | `Every hour at xx:30` | Pharaoh's Set | Notification 5m prior |
| **Parasite Boss** | `Every 2 hours at xx:40` | HolloVVeen Event Chests, Raid Chests | Infection boss |
| **Masked Warrior** | `Every hour at xx:50` | Screamer's Face Mask | Notification 5m prior |
> **Damage Credit Rule**: 5%+ damage qualifies for drops and EXP (green name); 10%+ damage guarantees credit even if you die (light blue name).

## 3. Ultimates & Special Modes

| ID | Name | SP Cost | Requirements | Race Restriction / Acquisition |
|---|---|---|---|---|
| `kuro` | **Kurohitsugi** | 9 | KIDO 360 | Shinigami Only |
| `gran_ray` | **Gran Ray Cero** | 9 | KIDO 360 | Hollow Only |
| `precision_slicer` | **Precision Slicer** | 4 | SPEED 275 | All Races |
| `radiant_edge` | **Radiant Edge** | 4 | KIDO 125 | All Races |
| `ensuing_heel` | **Enduring Heel** | 0 | HAKUDA 200 | All Races |
| `raging_grasp` | **Raging Grasp** | 0 | STRENGTH 250 | All Races |
| `slicing_dropkick` | **Slicing Dropkick** | 4 | SPEED 50, STRENGTH 50 | All Races |
| `splitting_standstill` | **Splitting Standstill** | 4 | SPEED 300 | All Races |
| `one_inch_punch` | **One Inch Punch** | 5 | HAKUDA 160, STRENGTH 55 | All Races |
| `petal_flurry` | **Petal Flurry** | 4 | SPEED 135 | All Races |
| `shunko_mode` | **Shunko Mode (Tier 1 / Tier 2)** | 5 | HAKUDA 150, SPEED 150 | All Races (Learned in Human World Factory) |

## 4. Race Skills
### Shinigami

| Skill | SP Cost | Requirements | Description | Upgrade / Level Note |
|---|---|---|---|---|
| **Byakurai** (`sk_byakurai`) | 6 | KIDO 28 | Blue kido beam. | Lvl 4: Applies an after-shock that deals a small % of the ability's damage when landed |
| **Sai** (`sk_sai`) | 7 | KIDO 56 | Lock an opponent's hands together preventing them from attacking. Ineffective against stronger opponents. | Lvl 7: Your Sai now ignores block |
| **Shunko Mode (Shinigami Variant)** (`shunko_mode_skill`) | 5 | HAKUDA 150, SPEED 150 | Unlocks first tier of shunko via Human World factory questline. Moves: Windbreaker, Sweep Combination. Race-specific damage and cooldown scalings. | Tier 2 progression adds advanced elemental manifestations. |

### Hollow

| Skill | SP Cost | Requirements | Description | Upgrade / Level Note |
|---|---|---|---|---|
| **Bala** (`rc1`) | 5 | KIDO 35 | A weaker blast-like counterpart to Cero. | Lvl 7: Bala tracks to nearest opponent |
| **Cero** (`rc2`) | 8 | KIDO 50 | Concentrate your reiatsu into a charged beam that eviscerates anyone hit. Executes low health opponents. | - |
| **Kido Node** (`rc3`) | 2 | None | Increase Kido scaling. | - |
| **Shunko Mode (Hollow Variant)** (`shunko_mode_skill`) | 5 | HAKUDA 150, SPEED 150 | Unlocks first tier of shunko via Human World factory questline. Moves: Windbreaker, Sweep Combination. Race-specific damage and cooldown scalings. | Tier 2 progression adds advanced elemental manifestations. |

### Quincy

| Skill | SP Cost | Requirements | Description | Upgrade / Level Note |
|---|---|---|---|---|
| **Conjure Weapon** (`qrc1`) | 4 | KIDO 12 | Conjure a basic spirit bow by pressing E. (Passive —) | - |
| **Heilig Pfeil** (`qrc2`) | 7 | KIDO 60 | Conjure an arrow and throw it. | - |
| **Kido Node** (`qrc3`) | 2 | None | Increase Kido scaling. | - |
| **Shunko Mode (Quincy Variant)** (`shunko_mode_skill`) | 5 | HAKUDA 150, SPEED 150 | Unlocks first tier of shunko via Human World factory questline. Moves: Windbreaker, Sweep Combination. Race-specific damage and cooldown scalings. | Tier 2 progression adds advanced elemental manifestations. |

## 5. Skill Tree Spokes & Nodes
### Spoke: MAGIC (13 Nodes)

| Node ID | Name | Parent | Cost / SP | Requirements / Effects |
|---|---|---|---|---|
| `mcA1` | **Spiritual Potential** | `mc3` | 0 SP | None |
| `mcA2` | **Spiritual Pressure** | `mcA1` | 0 SP | None |
| `mcB1` | **Manual Rushdown** | `mc3` | 0 SP | None |
| `mcB2` | **Overhead Counter** | `mcB1` | 0 SP | HAKUDA 40 |
| `mcB3` | **Slippery Fighter** | `mcB1` | 0 SP | None |
| `mcB4` | **Advanced Counter 1** | `mcB1` | 0 SP | STRENGTH 40 |
| `mcB2a` | **One Way Ticket to Hell** | `mcB2` | 4 SP | HAKUDA 125 |
| `mcB4a` | **Clash Proficiency** | `mcB4` | 4 SP | STRENGTH 80 |
| `sr_okasen` | **SR Kido: Okasen** | `kido_base` | 2 SP | KIDO 120 |
| `sr_danku` | **SR Kido: Danku** | `kido_base` | 3 SP | KIDO 200 |
| `sr_hyapporankan` | **SR Kido: Hyapporankan** | `kido_base` | 3 SP | KIDO 220 |
| `quincy_brenschwerter` | **Quincy Kido: Brenschwerter** | `kido_base` | 2 SP | KIDO 140 |
| `quincy_klingenfallen` | **Quincy Kido: Klingenfallen** | `kido_base` | 3 SP | KIDO 210 |

### Spoke: STRENGTH (35 Nodes)

| Node ID | Name | Parent | Cost / SP | Requirements / Effects |
|---|---|---|---|---|
| `stA1` | **Tenran** | `st2` | 8 SP | STRENGTH 85, KIDO 35 |
| `stA2` | **Melee-Kido Specialist** | `stA1` | 3 SP | STRENGTH 90, KIDO 40 |
| `stA3` | **Kido Node** | `stA1` | 2 SP | None |
| `stA4` | **Kinetic Force** | `stA3` | 5 SP | STRENGTH 140, KIDO 50 |
| `stA5` | **Kido Node** | `stA4` | 2 SP | None |
| `stA6` | **Blood Tax** | `stA5` | 11 SP | STRENGTH 275, KIDO 100 |
| `stB1` | **Strength Node** | `st2` | 2 SP | None |
| `stB2` | **Cyclone** | `stB1` | 7 SP | STRENGTH 88 |
| `stB3` | **Vault Slash** | `stB2` | 8 SP | STRENGTH 156 |
| `stB1a` | **Fell Crescent** | `stB3` | 8 SP | STRENGTH 160, SPEED 20 |
| `stB1b` | **Speed Node** | `stB1a` | 2 SP | None |
| `stB1c` | **Speed Node** | `stB1a` | 2 SP | None |
| `keroseneSlam` | **Kerosene Slam** | `stB1c` | 10 SP | STRENGTH 265, SPEED 100 |
| `stB1d` | **One Mind** | `stB1c` | 10 SP | STRENGTH 275, SPEED 95 |
| `stB2a` | **Strength Node** | `stB3` | 2 SP | None |
| `stB2b` | **Overwhelming Strength** | `stB2a` | 3 SP | STRENGTH 195 |
| `stC1` | **Overhead Strike** | `stB2a` | 8 SP | STRENGTH 196 |
| `stC2` | **Trained Body** | `stC1` | 4 SP | STRENGTH 230 |
| `stC3` | **Blade Catch** | `stC2` | 3 SP | STRENGTH 270 |
| `stC3b` | **Wall Specialist** | `stC3` | 6 SP | STRENGTH 315 |
| `stC4` | **Piercing Draw** | `stC3` | 9 SP | STRENGTH 310 |
| `stC5a` | **Trained Body Mastery** | `stC4` | 6 SP | STRENGTH 350 |
| `stC5b` | **Strength Node** | `stC4` | 2 SP | None |
| `stC6` | **Brute Force** | `stC5b` | 9 SP | STRENGTH 375 |
| `stD1` | **Strength Node** | `stC1` | 2 SP | None |
| `stD2` | **Heavy Hitter** | `stD1` | 3 SP | STRENGTH 235 |
| `stD3` | **Poise** | `stD2` | 3 SP | STRENGTH 268 |
| `stD4` | **Skyscraper** | `stD3` | 9 SP | STRENGTH 280 |
| `stD5a` | **Impale** | `stD4` | 11 SP | STRENGTH 324 |
| `stD5a2` | **Strength Node** | `stD5a` | 2 SP | None |
| `stD5b` | **Berserker** | `stD4` | 6 SP | STRENGTH 345 |
| `stD6a` | **Bloodlust** | `stD5b` | 2 SP | STRENGTH 360 |
| `stD6b` | **Guillotine Drop** | `stD5b` | 11 SP | STRENGTH 380 |
| `strength_rending_tide` | **Strength-Kido: Rending Tide** | `strength_base` | 3 SP | STRENGTH 160, KIDO 120 |
| `essence_flowing_gradient` | **Essence: Flowing Gradient** | `strength_base` | 2 SP | STRENGTH 180 |

### Spoke: HAKUDA (55 Nodes)

| Node ID | Name | Parent | Cost / SP | Requirements / Effects |
|---|---|---|---|---|
| `hkP1` | **Iron Guard** | `hk2` | 0 SP | HAKUDA 70 |
| `hkP2` | **Side Switcher** | `hkP1` | 3 SP | HAKUDA 90 |
| `hkK0` | **Kido Node** | `hk3` | 2 SP | None |
| `hkK1` | **Surge Fist** | `hkK0` | 7 SP | HAKUDA 50, KIDO 20 |
| `hkK2` | **Reiatsu Blasts** | `hkK1` | 8 SP | HAKUDA 90, KIDO 50 |
| `hkK3` | **Stagger Kicks** | `hkK1` | 8 SP | HAKUDA 65, KIDO 45 |
| `hkK4` | **Hakudo Kai** | `hkK3` | 4 SP | HAKUDA 73, KIDO 55 |
| `hkK5` | **Blast Punisher** | `hkK4` | 9 SP | HAKUDA 100, KIDO 70 |
| `hkK6` | **Kido Node** | `hkK3` | 2 SP | None |
| `hkK7` | **Dragon Fist** | `hkK6` | 9 SP | HAKUDA 136, KIDO 76 |
| `hkK8a` | **Kido Node** | `hkK7` | 2 SP | None |
| `hkK9a` | **God Fist** | `hkK8a` | 13 SP | HAKUDA 315, KIDO 85 |
| `hkK8b` | **Kido Node** | `hkK7` | 2 SP | None |
| `hkK9b` | **Burst Rush** | `hkK8b` | 10 SP | HAKUDA 200, KIDO 80 |
| `hkDL` | **Dragon Lash** | `hk3` | 7 SP | HAKUDA 56 |
| `hkS1` | **Executioner** | `hkDL` | 3 SP | HAKUDA 115, STRENGTH 5 |
| `hkS2` | **Strength Node** | `hkS1` | 2 SP | None |
| `hkS3` | **Suplex** | `hkS2` | 8 SP | HAKUDA 115, STRENGTH 28 |
| `hkS4` | **The Underdog** | `hkS3` | 3 SP | HAKUDA 115, STRENGTH 28 |
| `hkS5a` | **Swinging Throw** | `hkS4` | 8 SP | HAKUDA 120, STRENGTH 54 |
| `hkS6a` | **Strength Node** | `hkS5a` | 2 SP | None |
| `hkS7a` | **Death Fist** | `hkS5a` | 11 SP | HAKUDA 200, STRENGTH 100 |
| `hkS5b` | **Strength Node** | `hkS4` | 2 SP | None |
| `hkS6b` | **Muscle Up** | `hkS5b` | 7 SP | HAKUDA 160, STRENGTH 60 |
| `hkS7b` | **Grappler's Gambit** | `hkS6b` | 6 SP | HAKUDA 188, STRENGTH 60 |
| `hkS8b` | **Jaguar Rush** | `hkS6b` | 10 SP | HAKUDA 200, STRENGTH 80 |
| `hkS9a` | **Strength Node** | `hkS8b` | 2 SP | None |
| `hkS9b` | **Screwdriver** | `hkS9a` | 13 SP | HAKUDA 300, STRENGTH 100 |
| `hkV1` | **Aerial Flip** | `hkDL` | 7 SP | HAKUDA 100, SPEED 15 |
| `hkV2` | **Speed Node** | `hkV1` | 2 SP | None |
| `hkV3` | **Flash Kick** | `hkV2` | 3 SP | HAKUDA 130, SPEED 20 |
| `hkV4` | **Speed Node** | `hkV3` | 2 SP | None |
| `hkV5s` | **Punisher Drive** | `hkV4` | 8 SP | HAKUDA 185, SPEED 50 |
| `hkV5` | **Flash Strike** | `hkV3` | 9 SP | HAKUDA 155, SPEED 65 |
| `hkV6s` | **Blur** | `hkV5` | 4 SP | HAKUDA 180, SPEED 90 |
| `hkV6` | **Speed Node** | `hkV5` | 2 SP | None |
| `hkV7` | **Fight Back** | `hkV6` | 4 SP | HAKUDA 195, SPEED 65 |
| `hkV8a` | **Flash Counter** | `hkV7` | 8 SP | HAKUDA 250, SPEED 100 |
| `hkV8b` | **Speed Node** | `hkV7` | 2 SP | None |
| `hkV9` | **Incinerator** | `hkV8b` | 9 SP | HAKUDA 250, SPEED 100 |
| `hkH1` | **Hard Pressure** | `hkDL` | 3 SP | HAKUDA 76 |
| `hkH2` | **Hakuda Node** | `hkH1` | 2 SP | None |
| `hkH3s` | **Dust Kick** | `hkH2` | 8 SP | HAKUDA 112 |
| `hkH4s` | **Boxer's Footwork** | `hkH3s` | 3 SP | HAKUDA 168 |
| `hkH5` | **Drop Kick** | `hkH2` | 8 SP | HAKUDA 144 |
| `hkH6` | **Breaker Fist** | `hkH5` | 8 SP | HAKUDA 200 |
| `hkH7s` | **Shoulder Throw** | `hkH6` | 6 SP | HAKUDA 240 |
| `hkH8` | **Hakuda Node** | `hkH6` | 2 SP | None |
| `hkH9s` | **Fighter's Tempo** | `hkH8` | 7 SP | HAKUDA 240 |
| `hkH9` | **Sweep Kick** | `hkH8` | 9 SP | HAKUDA 260 |
| `hkH10` | **Tempest Combo** | `hkH9` | 10 SP | HAKUDA 300 |
| `hkH11a` | **Spirit Breaker** | `hkH10` | 6 SP | HAKUDA 340 |
| `hkH12a` | **Spirit Breaking Cannon** | `hkH11a` | 12 SP | HAKUDA 400 |
| `hkH11b` | **Hakuda Node** | `hkH10` | 2 SP | None |
| `hkH12b` | **Ground Slam** | `hkH11b` | 10 SP | HAKUDA 375 |

### Spoke: SPEED (39 Nodes)

| Node ID | Name | Parent | Cost / SP | Requirements / Effects |
|---|---|---|---|---|
| `spK3` | **Speed Node** | `sp_clone` | 2 SP | None |
| `spK4` | **Flash Surprise** | `spK3` | 8 SP | SPEED 92 |
| `spK5` | **Kumo Kiri** | `spK4` | 7 SP | SPEED 100, KIDO 32 |
| `spK6` | **Kido Node** | `spK5` | 2 SP | None |
| `spK7` | **Rapid Recovery** | `spK6` | 2 SP | SPEED 140, KIDO 40 |
| `spK8` | **Dragon Cleaver** | `spK7` | 11 SP | SPEED 210, KIDO 50 |
| `spK9` | **Fireworks** | `spK7` | 8 SP | SPEED 205, KIDO 60 |
| `spK10` | **Kido Node** | `spK9` | 2 SP | None |
| `spK11` | **Flying Cyclone** | `spK9` | 7 SP | SPEED 220, KIDO 85 |
| `spS1` | **Hyperspeed** | `spK3` | 3 SP | SPEED 108 |
| `spS2` | **Afterimage Slash** | `spS1` | 8 SP | SPEED 124, STRENGTH 10 |
| `spS3` | **Speed Node** | `spS2` | 2 SP | None |
| `spS4` | **Judgement Cut** | `spS3` | 8 SP | SPEED 165, STRENGTH 30 |
| `spS5` | **Strength Node** | `spS4` | 2 SP | None |
| `spS6` | **Swift Fakeout** | `spS5` | 3 SP | SPEED 210, STRENGTH 40 |
| `spS7` | **Strength Node** | `spS5` | 2 SP | None |
| `spS8a` | **Agile Body** | `spS7` | 4 SP | SPEED 260, STRENGTH 65 |
| `spS9a` | **Double Strike** | `spS8a` | 9 SP | SPEED 290, STRENGTH 70 |
| `spS8b` | **Whirlwind Cutter** | `spS7` | 10 SP | SPEED 220, STRENGTH 50 |
| `spS9b` | **Final Breath** | `spS8b` | 12 SP | SPEED 330, STRENGTH 70 |
| `spP1` | **Vortex Edge** | `spK4` | 7 SP | SPEED 148 |
| `spP2` | **Speed Node** | `spP1` | 2 SP | None |
| `spP3` | **False Cutter** | `spP2` | 8 SP | SPEED 208 |
| `spP4a` | **Launcher** | `spP3` | 8 SP | SPEED 250 |
| `spP5a1` | **Reiatsu Conservation** | `spP4a` | 3 SP | SPEED 290 |
| `spP5a2` | **Flash Execute** | `spP4a` | 9 SP | SPEED 310 |
| `spP6a2` | **Light Feet** | `spP5a2` | 3 SP | SPEED 360 |
| `spP4b` | **Afterimage Clones** | `spP3` | 6 SP | SPEED 255 |
| `spP5b` | **Speed Node** | `spP4b` | 2 SP | None |
| `spP6b` | **Compound Rush** | `spP5b` | 8 SP | SPEED 295 |
| `spP7c` | **Blade Flow** | `spP6b` | 11 SP | SPEED 355 |
| `spP8c` | **Feint Mastery** | `spP7c` | 9 SP | SPEED 380 |
| `spP9c1` | **Speed Node** | `spP8c` | 2 SP | None |
| `spP9c2` | **Phantom Trifecta ⚠︎ Unobtainable** | `spP8c` | 10 SP | SPEED 420 |
| `spP7d` | **Flash Skewer** | `spP6b` | 9 SP | SPEED 365 |
| `spP8d` | **Flash Trick** | `spP7d` | 3 SP | SPEED 380 |
| `spP9d` | **Speed Node** | `spP7d` | 2 SP | None |
| `spP10d` | **High-Speed Movement ⚠︎ Unobtainable** | `spP9d` | 6 SP | SPEED 420 |
| `essence_slaying_drive` | **Essence: Slaying Drive** | `speed_base` | 2 SP | SPEED 180 |

### Spoke: RACE QUINCY (33 Nodes)

| Node ID | Name | Parent | Cost / SP | Requirements / Effects |
|---|---|---|---|---|
| `qrc6` | **Blut Arterie** | `qrc3` | 5 SP | KIDO 60 |
| `qrc7` | **Kido Node** | `qrc6` | 2 SP | None |
| `qrc8` | **Mondlicht** | `qrc7` | 9 SP | KIDO 220 |
| `qrc4` | **Blut Vene** | `qrc3` | 5 SP | KIDO 90 |
| `qrc5` | **Reishi Gather** | `qrc4` | 4 SP | KIDO 100 |
| `qb1` | **Medallion Specialist** | `qrc3` | 1 SP | KIDO 60 |
| `qb2` | **Reishi Flash** | `qb1` | 7 SP | KIDO 100 |
| `qb3a` | **Heilig Pfeil - Speed Variant** | `qb2` | 2 SP | KIDO 110 |
| `qb3b` | **Heilig Pfeil - Power Variant** | `qb2` | 2 SP | KIDO 110 |
| `qb3c` | **Heilig Pfeil - Multi-shot Variant** | `qb2` | 2 SP | KIDO 110 |
| `qb6` | **Kido Node** | `qb2` | 2 SP | None |
| `qb7` | **Beurteilung** | `qb6` | 8 SP | KIDO 140 |
| `qb8` | **Reishigriff** | `qb7` | 8 SP | KIDO 195 |
| `qb9` | **Feurige Säulen** | `qb8` | 11 SP | KIDO 330 |
| `qb10` | **Kido Node** | `qb7` | 2 SP | None |
| `qb11` | **Schlagen** | `qb10` | 11 SP | KIDO 220 |
| `qb12` | **Klingensturm** | `qb11` | 13 SP | KIDO 400 |
| `qa1` | **Advanced Archery** | `qrc3` | 1 SP | KIDO 60 |
| `qa2` | **Luftpfeile** | `qa1` | 7 SP | KIDO 96 |
| `qa3` | **Kido Node** | `qa2` | 2 SP | None |
| `qa4` | **Archer's Stratagem** | `qa3` | 3 SP | KIDO 120 |
| `qa5` | **Stille Silber** | `qa3` | 8 SP | KIDO 124 |
| `qa5a_node` | **Kido Node** | `qa5` | 2 SP | None |
| `qa6` | **Bow Conjuration Upgrade** | `qa5a_node` | 4 SP | KIDO 156 |
| `qa7a` | **Impaling Arrows** | `qa6` | 4 SP | KIDO 160 |
| `qa7b` | **Holy Arrows** | `qa6` | 4 SP | KIDO 160 |
| `qa8a` | **Zangenpfeil** | `qa7a` | 8 SP | KIDO 190 |
| `qa8b` | **Blitz Feuer** | `qa7b` | 8 SP | KIDO 190 |
| `qa5b_node` | **Kido Node** | `qa5` | 2 SP | None |
| `qa9` | **Leichter Sturm** | `qa5b_node` | 9 SP | KIDO 190 |
| `qa9_node` | **Kido Node** | `qa9` | 2 SP | None |
| `qa10a` | **Fallzwang** | `qa9_node` | 9 SP | KIDO 300 |
| `qa10b` | **Heilig Verbegun** | `qa9_node` | 12 SP | KIDO 350 |

### Spoke: RACE HOLLOW (24 Nodes)

| Node ID | Name | Parent | Cost / SP | Requirements / Effects |
|---|---|---|---|---|
| `hb_speed` | **Cero: Speed Variant** | `rc2` | 4 SP | KIDO 95 |
| `hb_power` | **Cero: Power Variant** | `rc3` | 4 SP | KIDO 95 |
| `hb_ultra` | **Cero: Ultra Power Variant** | `hb_power` | 5 SP | KIDO 225 |
| `hb_rapid` | **Cero: Rapid Fire** | `hb_unpred` | 5 SP | KIDO 220 |
| `hb_hierro` | **Hierro** | `rc3` | 5 SP | KIDO 82 |
| `hb_bblastr` | **Bala Blaster** | `hb_hierro` | 8 SP | KIDO 110 |
| `hb_bripcrd` | **Bala Ripcord** | `hb_bblastr` | 7 SP | KIDO 182 |
| `hb_dsnode` | **Kido Node** | `hb_bblastr` | 2 SP | None |
| `hb_dsaucer` | **Death Saucers** | `hb_dsnode` | 10 SP | KIDO 240 |
| `hb_dsnode2` | **Kido Node** | `hb_dsaucer` | 2 SP | None |
| `hb_fngcero` | **Finger Cero** | `hb_hierro` | 7 SP | KIDO 128 |
| `hb_unpred` | **Unpredictable Cero** | `hb_fngcero` | 4 SP | KIDO 160 |
| `hb_fcnode` | **Kido Node** | `hb_fngcero` | 2 SP | None |
| `hb_hcutr` | **Hollow Cutter** | `hb_fcnode` | 9 SP | KIDO 152 |
| `hb_crmor` | **Cero Armor** | `hb_hcutr` | 3 SP | KIDO 164 |
| `hb_ca_nd1` | **Kido Node** | `hb_crmor` | 2 SP | None |
| `hb_cdestr` | **Cero Destripador** | `hb_ca_nd1` | 9 SP | KIDO 310 |
| `hb_hsregen` | **High Speed Regeneration** | `hb_cdestr` | 7 SP | KIDO 380 |
| `hb_bswarm` | **Bala Swarm** | `hb_crmor` | 8 SP | KIDO 220 |
| `hb_bsw_nd` | **Kido Node** | `hb_bswarm` | 2 SP | None |
| `hb_chbarr` | **Chaotic Barrier** | `hb_bswarm` | 5 SP | KIDO 290 |
| `hb_cabsrp` | **Cero Absorption** | `hb_crmor` | 4 SP | KIDO 172 |
| `hb_zclutch` | **Zero Clutch** | `hb_cabsrp` | 8 SP | KIDO 260 |
| `hb_pcrash` | **Psycho Crash** | `hb_cabsrp` | 8 SP | KIDO 325 |

### Spoke: RACE SHINIGAMI (32 Nodes)

| Node ID | Name | Parent | Cost / SP | Requirements / Effects |
|---|---|---|---|---|
| `sk_skm1` | **Kido Node** | `sk_sai` | 2 SP | None |
| `sk_tsuzuri` | **Tsuzuri Raiden** | `sk_skm1` | 7 SP | KIDO 76 |
| `sk_fushibi` | **Fushibi** | `sk_tsuzuri` | 8 SP | KIDO 116 |
| `sk_skm2` | **Kido Node** | `sk_fushibi` | 2 SP | None |
| `sk_sokatsui` | **Sokatsui** | `sk_fushibi` | 8 SP | KIDO 156 |
| `sk_reia_enhance` | **Reiatsu Enhancement** | `sk_sokatsui` | 3 SP | KIDO 180 |
| `sk_skm7` | **Kido Node** | `sk_reia_enhance` | 2 SP | None |
| `sk_haien` | **Haien** | `sk_skm7` | 9 SP | KIDO 225 |
| `sk_skm10` | **Kido Node** | `sk_haien` | 2 SP | None |
| `sk_gaki_rekko` | **Gaki Rekkō** | `sk_skm10` | 10 SP | KIDO 275 |
| `sk_heaven_culling` | **Heaven Culling-Sear** | `sk_gaki_rekko` | 12 SP | KIDO 360 |
| `sk_shinten` | **Shinten Raiho** | `sk_sokatsui` | 8 SP | KIDO 190 |
| `sk_skm9` | **Kido Node** | `sk_shinten` | 2 SP | None |
| `sk_raikoho` | **Raikoho** | `sk_skm9` | 8 SP | KIDO 225 |
| `sk_skm3` | **Kido Node** | `sk_raikoho` | 2 SP | None |
| `sk_elec_energy` | **Electrical Energy** | `sk_skm3` | 6 SP | KIDO 245 |
| `sk_zangerin` | **Zangerin** | `sk_raikoho` | 9 SP | KIDO 290 |
| `sk_skm4` | **Kido Node** | `sk_sai` | 2 SP | None |
| `sk_sho` | **Sho** | `sk_skm4` | 6 SP | KIDO 84 |
| `sk_bind_resist` | **Bind Resist** | `sk_sai` | 2 SP | KIDO 90 |
| `sk_skm6` | **Kido Node** | `sk_bind_resist` | 2 SP | None |
| `sk_sekienton` | **Sekienton** | `sk_bind_resist` | 7 SP | KIDO 120 |
| `sk_skm5` | **Kido Node** | `sk_sekienton` | 2 SP | None |
| `sk_horin` | **Horin** | `sk_skm5` | 9 SP | KIDO 220 |
| `sk_rikujo` | **Rikujokoro** | `sk_skm6` | 9 SP | KIDO 140 |
| `sk_geki` | **Geki** | `sk_rikujo` | 6 SP | KIDO 185 |
| `sk_skm8` | **Kido Node** | `sk_rikujo` | 2 SP | None |
| `sk_react_barrier` | **Reactive Barrier** | `sk_skm8` | 5 SP | KIDO 240 |
| `sk_hainawa` | **Hainawa** | `sk_react_barrier` | 10 SP | KIDO 280 |
| `sk_goryu` | **Goryū Tenmetsu** | `sk_hainawa` | 12 SP | KIDO 350 |
| `sk_prism_seal` | **Prism Seal (Disabled)** | `sk_hainawa` | 11 SP | KIDO 370 |
| `sk_trap_spell` | **Trap Spell** | `sk_react_barrier` | 10 SP | KIDO 350 |

### Spoke: SENSORY (2 Nodes)

| Node ID | Name | Parent | Cost / SP | Requirements / Effects |
|---|---|---|---|---|
| `snMorale` | **Morale Starter** | `sn4` | 4 SP | None |
| `snInnerFire` | **Inner Fire** | `sn4` | 2 SP | None |

## 6. Equipment Catalog
### Slot: Body (27 Items)

| Item Name | ID | Rarity | Stat Bonuses / Special Perks |
|---|---|---|---|
| **Battle-Damaged Haori** | `eq_body_battle_haori` | Legendary | +1.5% Weapon Damage; +4% Posture Regen; +13 Max Health |
| **Conqueror's Trophy** | `eq_body_conquerors_trophy` | Legendary | +3 Max Posture; +12 Max Health |
| **Savior's Cape** | `eq_body_saviors_cape` | Legendary | +2.3% Weapon Damage; +3 Max Reiatsu; +10 Max Health |
| **Arctic Explorer's Cape** | `eq_body_arctic_cape` | Rare | +2% Kido Damage; +4 Max Health |
| **Desert Wanderer's Cape** | `eq_body_desert_cape` | Rare | +8 Max Health; +2 Shunpo Speed; +3.5 Shunpo Stamina |
| **Engineer's Workwear Issue No. 7** | `eq_body_engineer_workwear` | Rare | +5 Max Reiatsu; +3.25% Kido Defense; +2 Equipment Load |
| **Flower Samurai's Cape** | `eq_body_flower_samurai_cape` | Rare | +1.75% Kido Damage; +5 Max Reiatsu; +0.25% Kido Defense; +5 Shunpo Stamina |
| **Gravewood Warset** | `eq_body_gravewood_warset` | Rare | +2.5% Hakuda Damage; +4 Max Health; +4 Max Posture; +2% Melee Defense |
| **Gunslinger's Tunic** | `eq_body_gunslinger_tunic` | Rare | +2% Kido Damage; +4 Max Reiatsu; +7 Max Health |
| **Vintage Plaid Jacket** | `eq_body_vintage_plaid_jacket` | Rare |  |
| **Vintage Leather Jacket** | `eq_body_vintage_jacket` | Rare | +3 Shunpo Speed; +8% Posture Regen |
| **Warlord's Mantle** | `eq_body_warlords_mantle` | Rare | +7 Max Health; +4 Max Posture; +1% Kido Defense |
| **Wraith Cape** | `eq_body_wraith_cape` | Rare | +4 Max Health; +1.5% Weapon Damage |
| **Heavy Duty Vest** | `eq_body_heavy_vest` | Uncommon | +3% Melee Defense; +1% Kido Defense |
| **Leather Strap** | `eq_body_leather_strap` | Uncommon | +0.5% Weapon Damage; +2.5 Max Posture |
| **Marsh Stalker Covering** | `eq_body_marsh_stalker` | Uncommon | +2% Hakuda Damage; +7.5 Shunpo Stamina |
| **Samurai's Armor** | `eq_body_samurais_armor` | Uncommon | +3 Max Posture; +2% Posture Regen; +1.5% Weapon Damage; +7 Max Health |
| **Tattered Frosted Cape** | `eq_body_tattered_frosted_cape` | Uncommon | +1.5% Weapon Damage |
| **Wide Frosted Cape** | `eq_body_wide_frosted_cape` | Uncommon | +2.25% Kido Damage |
| **Regal Frosted Cape** | `eq_body_regal_frosted_cape` | Uncommon | +6 Max Reiatsu; +8 Max Health |
| **Frosted Steel Pauldrons** | `eq_body_frosted_pauldrons` | Uncommon | +1% Kido Damage; +1% Melee Defense; +6 Max Health |
| **Doughy Scarf** | `eq_body_doughy_scarf` | Common | +0.2% Melee Defense; +0.5% Kido Damage |
| **Spiritless Robe** | `eq_body_spiritless_robe` | Legendary | +6 Max Health; +3.0% Weapon/Kido DMG; +5.0 Max Posture; Battle for the Dangai event reward |
| **Vampire Hunter's Overcoat** | `eq_body_vampire_hunter` | Mythical | +14 Max Health; +3.0% Weapon DMG; +5.0 Shunpo Stamina; Dropped by HolloVVeen World Boss Junichiro |
| **Pharaoh's Regalia** | `eq_body_pharaoh_regalia` | Mythical | +16 Max Health; +3.5% Kido DMG; +4.0 Max Reiatsu; Dropped by HolloVVeen World Boss Nivis |
| **Monstrous Cuirass** | `eq_body_monstrous_cuirass` | Legendary | +18 Max Health; +4.0% Melee Defense; +6.0 Max Posture; Purchasable from HolloVVeen Event Shop |
| **Ghoul's Overcoat** | `eq_body_ghoul_overcoat` | Mythical | +15 Max Health; +3.0% Shunpo Speed; Grants custom Bat Flashstep visual effect even if vanity is hidden; Exclusive to Dracula Pack bundle |

### Slot: Head (32 Items)

| Item Name | ID | Rarity | Stat Bonuses / Special Perks |
|---|---|---|---|
| **Chaos Halo** | `eq_head_chaos_halo` | Legendary | +3% Kido Damage; +7 Max Reiatsu; +2.5 Max Health |
| **The King's Crown** | `eq_head_kings_crown` | Legendary | +2.1% Weapon Damage; +2.1% Hakuda Damage; +2% Melee Defense; +7 Max Health |
| **War-Torn Bandana** | `eq_head_wartorn_bandana` | Legendary | +2.5% Hakuda Damage; +3.5 Max Reiatsu; +7 Max Health |
| **VV Headphones** | `eq_head_vv_headphones` | Legendary |  |
| **Arctic Explorer's Headwrap** | `eq_head_arctic_headwrap` | Rare | +5 Max Reiatsu; +0.5% Kido Defense |
| **Gravewood Helm** | `eq_head_gravewood_helm` | Rare | +2% Hakuda Damage; +8 Max Health |
| **Desert Wanderer's Turban** | `eq_head_desert_turban` | Rare | +8 Max Health; +2 Shunpo Speed; +3.5 Shunpo Stamina |
| **Flower Samurai's Straw Hat** | `eq_head_flower_straw_hat` | Rare | +1% Kido Damage; +4 Max Reiatsu; +3.5 Shunpo Stamina |
| **Gunslinger's Hat** | `eq_head_gunslinger_hat` | Rare | +3% Kido Damage; +5 Max Reiatsu |
| **Sabertooth's Headwear** | `eq_head_sabertooth_headwear` | Rare | +2.25% Weapon Damage; +3.5 Max Reiatsu |
| **Snowhide Hunter's Hat** | `eq_head_snowhide_hat` | Rare | +2% Weapon Damage; +3 Max Health |
| **Vagabond's Scarf (Variant 1)** | `eq_head_vagabond_scarf_v1` | Rare | +10% Posture Regen |
| **Vagabond's Scarf (Variant 2)** | `eq_head_vagabond_scarf_v2` | Rare | +1.5% Weapon Damage |
| **Wolfman's Helm** | `eq_head_wolfman_helm` | Rare | +0.75% Melee Defense; +3 Max Health |
| **Wrath Helm** | `eq_head_wrath_helm` | Rare | +2% Melee Defense; +5 Max Health |
| **Angled White Headband** | `eq_head_angled_headband` | Common |  |
| **Ganju Bandana** | `eq_head_ganju_bandana` | Common | +3.5 Max Reiatsu |
| **Northern Ushanka (Goggles)** | `eq_head_northern_ushanka_goggles` | Common | +6 Max Reiatsu |
| **Northern Ushanka** | `eq_head_northern_ushanka` | Common | +7 Max Health |
| **Beaded Necklace** | `eq_head_beaded_necklace` | Common | +0.75% Weapon Damage |
| **Fur Collar** | `eq_head_fur_collar` | Common | +3 Max Reiatsu |
| **Sava Hat** | `eq_head_sava_hat` | Common | +1 Max Reiatsu; +1% Kido Damage |
| **Soldat Cap** | `eq_head_soldat_cap` | Common | +1 Max Reiatsu |
| **Striped Blue Hat** | `eq_head_striped_blue_hat` | Common | +1 Max Reiatsu; +1% Kido Damage |
| **Striped Black Hat** | `eq_head_striped_black_hat` | Common | +2.5 Max Reiatsu; +1% Melee Defense |
| **Striped Green Hat** | `eq_head_striped_green_hat` | Common | +1.75% Kido Damage |
| **Striped Red Hat** | `eq_head_striped_red_hat` | Common | +1% Kido Damage; +4% Posture Regen |
| **Wide-Brimmed Hat** | `eq_head_wide_brimmed_hat` | Common | +2 Max Reiatsu |
| **Wanderer's Bandana** | `eq_head_wanderers_bandana` | Common | +2% Posture Regen |
| **Pumpkin Mask** | `eq_head_pumpkin_mask` | Legendary | +10 Max Health; +2.0 Max Reiatsu; Purchasable from HolloVVeen Event Shop |
| **Witch's Hat** | `eq_head_witchs_hat` | Legendary | +12 Max Health; +2.5% Kido DMG; +3.0 Max Reiatsu; Purchasable from HolloVVeen Event Shop |
| **Dullahan's Curse** | `eq_head_dullahans_helm` | Mythical | Hides head, hair, and clan hat models; Matches player Reiatsu color; HolloVVeen event milestone reward |

### Slot: Face (10 Items)

| Item Name | ID | Rarity | Stat Bonuses / Special Perks |
|---|---|---|---|
| **Arctic Explorer's Goggles** | `eq_face_arctic_goggles` | Rare | +2.5% Kido Damage |
| **Chaos Shades** | `eq_face_chaos_shades` | Rare | +0.5% Weapon Damage; +4% Posture Regen; +2.5% Kido Defense |
| **Marsh Stalker Headwrap** | `eq_face_marsh_stalker_headwrap` | Rare | +1% Hakuda Damage; +5 Shunpo Speed |
| **Parasite's Mask** | `eq_face_parasites_mask` | Rare | +2.5% Kido Defense; +3% Monster Damage |
| **Wraith Mask** | `eq_face_wraith_mask` | Rare | +5 Max Health; +1.25% Weapon Damage |
| **White Flight Tape** | `eq_face_white_flight_tape` | Uncommon | +2.75 Max Reiatsu |
| **Black Visor** | `eq_face_black_visor` | Common | +0.5% Weapon Damage |
| **Black Goggles** | `eq_face_black_goggles` | Common | +1 Max Posture; +0.5% Melee Defense |
| **Black Blindfold** | `eq_face_black_blindfold` | Common | +0.5% Kido Damage; +0.5% Melee Defense |
| **Screamer's Face Mask** | `eq_face_screamers_mask` | Mythical | +12 Max Health; +2.5% Melee DMG; +5.0 Posture Regen; Dropped by HolloVVeen World Boss Masked Warrior |

### Slot: Utility (7 Items)

| Item Name | ID | Rarity | Stat Bonuses / Special Perks |
|---|---|---|---|
| **Wayfarer's Satchel** | `eq_utility_wayfarers_satchel` | Legendary | +20 Equipment Load |
| **Respirator** | `eq_utility_respirator` | Uncommon | +1 Equipment Load; +3 Max Reiatsu; +100% Toxic Fumes Resistance |
| **Utility Backpack** | `eq_utility_backpack` | Common | +8 Equipment Load; +2 Max Posture |
| **Spiritless Trousers** | `eq_utility_spiritless_trousers` | Legendary | +8 Max Health; +2.5% Weapon/Kido DMG; +6.0 Shunpo Stamina; Battle for the Dangai event reward |
| **Vampire Hunter's Boots** | `eq_utility_vampire_hunter_boots` | Legendary | +8 Max Health; +5.0 Shunpo Speed; +2.0% Weapon DMG; Dropped by HolloVVeen World Boss Junichiro |
| **Pharaoh's Greaves** | `eq_utility_pharaoh_greaves` | Legendary | +10 Max Health; +3.0 Shunpo Speed; +2.5% Kido DMG; Dropped by HolloVVeen World Boss Nivis |
| **Monstrous Greaves** | `eq_utility_monstrous_greaves` | Legendary | +12 Max Health; +3.0% Melee Defense; +5.0 Max Posture; Purchasable from HolloVVeen Event Shop |

### Slot: Misc (32 Items)

| Item Name | ID | Rarity | Stat Bonuses / Special Perks |
|---|---|---|---|
| **Drinking Gourd** | `eq_misc_drinking_gourd` | Legendary | +8 Max Reiatsu; +2% Kido Defense |
| **Demon's White Gauntlets** | `eq_misc_demons_white_gauntlets` | Legendary | +3.6% Hakuda Damage; +5 Max Reiatsu |
| **Demon's Red Gauntlets** | `eq_misc_demons_red_gauntlets` | Legendary | +3.6% Hakuda Damage; +8 Max Health |
| **Devil's Royal Gauntlets** | `eq_misc_devils_royal_gauntlets` | Legendary | +3.5% Hakuda Damage |
| **Devil's Red Gauntlets** | `eq_misc_devils_red_gauntlets` | Legendary | +2.5% Hakuda Damage; +4 Max Health |
| **Devil's Blue Gauntlets** | `eq_misc_devils_blue_gauntlets` | Legendary | +2.5% Hakuda Damage; +1% Kido Defense |
| **Devil's Purple Gauntlets** | `eq_misc_devils_purple_gauntlets` | Legendary | +2.5% Hakuda Damage; +3 Max Reiatsu |
| **Monkey Head** | `eq_misc_monkey_head` | Legendary | +1.5% Weapon Damage; +4 Max Health; +2.5 Max Reiatsu; +5% Posture Regen |
| **Pendant of Youth** | `eq_misc_pendant_of_youth` | Legendary | +7.5 Max Posture; +10 Shunpo Stamina |
| **Ashen Pendant** | `eq_misc_ashen_pendant` | Rare | +5 Max Health; +4.5% Flame Damage |
| **Desert Wanderer's Sash** | `eq_misc_desert_sash` | Rare | +7.5 Max Health; +1.5 Shunpo Speed; +2.5 Shunpo Stamina |
| **Engineer's Cape Issue No. 7** | `eq_misc_engineer_cape` | Rare | +4 Max Reiatsu; +3% Kido Defense |
| **Warrior's Pauldron (Right)** | `eq_misc_warrior_pauldron_right` | Rare | +3 Max Health; +3% Melee Defense |
| **Warrior's Pauldron (Left)** | `eq_misc_warrior_pauldron_left` | Rare | +9 Max Health; +2% Melee Defense |
| **Vintage Jeans** | `eq_misc_vintage_jeans` | Rare | +6 Max Health; +4% Posture Regen; +3 Shunpo Speed |
| **Wolfman's Greaves** | `eq_misc_wolfman_greaves` | Rare | +1% Melee Defense; +2 Max Reiatsu; +0.25% Weapon Damage; +0.25% Hakuda Damage |
| **Wraith Pads** | `eq_misc_wraith_pads` | Rare | +5 Max Health; +4 Max Posture |
| **Samurai's Waist Guards** | `eq_misc_samurai_waist_guards` | Rare | +3.5 Max Health; +1.5% Melee Defense; +1.5% Kido Defense |
| **Steel Grey Pauldrons** | `eq_misc_steel_grey_pauldrons` | Uncommon | +4 Max Health; +0.5% Melee Defense; +2 Equipment Load |
| **Village Guard's Gauntlets** | `eq_misc_village_guard_gauntlets` | Uncommon | +2.5% Hakuda Damage |
| **White Flight Bottoms** | `eq_misc_white_flight_bottoms` | Uncommon | +1.5 Max Posture; +1.5 Max Health; +0.25% Kido Defense |
| **Dog Tags** | `eq_misc_dog_tags` | Common | +0.25% Weapon Damage; +1% Kido Defense |
| **Left/Right Arm Chains** | `eq_misc_arm_chains` | Common | +1.5% Posture Regen; +0.75% Kido Defense |
| **Left/Right Arm Bandages** | `eq_misc_arm_bandages` | Common | +1% Hakuda Damage; +0.5% Melee Defense |
| **Left/Right Electrified Arm Chains** | `eq_misc_electrified_arm_chains` | Common |  |
| **Northern War Skirt** | `eq_misc_northern_war_skirt` | Common | +2% Weapon Damage |
| **Waist Chains** | `eq_misc_waist_chains` | Common | +0.75% Kido Damage |
| **Spiritless Chains** | `eq_misc_spiritless_chains` | Legendary | +8 Max Health; +2.0% Weapon/Kido DMG; +3.0 Max Posture; Battle for the Dangai event reward |
| **Crest of the Ascended** | `eq_misc_crest_of_the_ascended` | Mythical | +15 Max Health; +2.5% All DMG; +4.0 Max Posture; +5.0 Shunpo Speed; Exclusive rare accessory from Gold+ Ranked Matchmaking |
| **Ghoul's Talisman** | `eq_misc_ghoul_talisman` | Mythical | +12 Max Health; +2.5% Lifesteal bonus; +3.0 Max Reiatsu; Exclusive to Dracula Pack bundle |
| **Vasto Weapon: Twin Rippers** | `eq_misc_twin_rippers` | Mythical | Exclusive dual claw weapon for Level 40 Vasto Lordes; Rapid attack rate with extended rotating crit mobility |
| **Vasto Weapon: Carving Edge** | `eq_misc_carving_edge` | Mythical | Colossal heavy blade for Level 40 Vasto Lordes; Devastating posture break damage and heavy hit stun |

## 7. Clan Buffs & Rarities
### Quincy Clans (12)

| Clan Name | ID | Rarity | Clan Perk / Passives |
|---|---|---|---|
| **Eisenhauer** | `cl_eisenhauer` | Legendary | Gain a metal arm; +3.0% Melee Defense; +5.0 Posture; +0.5% Hakuda DMG |
| **Kurosaki (Universal)** | `cl_kurosaki` | Legendary | +2.0 Reiatsu; +2.0% Weapon DMG; +5.0 Shunpo Speed; Universal Clan available to all factions; Custom orange hair cosmetic |
| **Parnkgjas** | `cl_parnkgjas` | Rare | +3.5% Kido Defense; +1.0% Melee Defense |
| **Ishida** | `cl_ishida` | Rare | +2.0% Kido Damage; +5.0 Shunpo Stamina |
| **Haschwalth** | `cl_haschwalth` | Rare | +2.5% Kido DMG |
| **Kraus** | `cl_kraus` | Uncommon | +1.5% Melee Defense; +1.0% Kido Defense |
| **Wernarr** | `cl_wernarr` | Uncommon | +5.0 Health; +2.5% Posture Regen |
| **Schulte** | `cl_schulte` | Common | +5.0 Equipment Load |
| **Richter** | `cl_richter` | Common | +1.0% Weapon DMG; +2.5 Posture |
| **Le Vaar** | `cl_le_vaar` | Legendary | Increased roaming speed and secret technique roaming animation; +5.0 Shunpo Speed; +2.0% Weapon DMG |
| **De Masculine** | `cl_de_masculine` | Rare | +3.0% Hakuda DMG; +4.0 Posture; +6.0 Max Health |
| **Frosthauch** | `cl_frosthauch` | Legendary | Halloween themed clan cosmetic; +2.5% Melee Defense; +2.0 Max Reiatsu; +4.0 Max Posture |

### Hollow Clans (13)

| Clan Name | ID | Rarity | Clan Perk / Passives |
|---|---|---|---|
| **Aaroniero** | `cl_aaroniero` | Legendary | +2.0% Kido DMG; +5.0 Reiatsu; +0.5% Kido Defense |
| **Chelute** | `cl_chelute` | Legendary | +2.5% Weapon DMG; +5.0 Health; +1.0% Melee Defense |
| **Cifer** | `cl_cifer` | Legendary | +20% Longer Ressureccion; +2.0% Kido DMG; +25.0% Melee Reiatsu Regen; +2.5 Shunpo Stamina |
| **Jaegerjaquez** | `cl_jaegerjaquez` | Rare | +3.0% Hakuda DMG; +3.0 Shunpo Stamina |
| **Antenor** | `cl_antenor` | Rare | +1.5% Lightning DMG; +7.5% Posture Regen |
| **Kufang** | `cl_kufang` | Rare | +2.5% Weapon DMG; +0.5% Kido Defense |
| **Lousienbairn** | `cl_lousienbairn` | Uncommon | +5.0 Health; +3.5 Posture |
| **Gingerbuck** | `cl_gingerbuck` | Uncommon | +2.0% Melee Defense; +5.0 Posture |
| **Murciellago** | `cl_murciellago` | Common | +5.0 Shunpo Stamina; +5.0 Shunpo Speed |
| **Calius** | `cl_calius` | Common | +5.0 Equipment Load |
| **Llargo** | `cl_llargo` | Rare | +3.0% Melee Defense; +6.0 Max Health; +4.0 Max Posture |
| **Starrk** | `cl_starrk` | Legendary | Chest-firing Cero variant; Compatible with Starrk Dual Swords; +2.5% Weapon DMG; +2.0 Max Reiatsu |
| **Kurosaki (Universal)** | `cl_kurosaki_hollow` | Legendary | Universal Clan available to all factions; Custom orange hair cosmetic; +2.0 Reiatsu; +2.0% Weapon DMG; +5.0 Shunpo Speed |

### Shinigami Clans (15)

| Clan Name | ID | Rarity | Clan Perk / Passives |
|---|---|---|---|
| **Komamura** | `cl_komamura` | Legendary | You become a wolfman; +4% Melee Defense; +1% Weapon Damage; -2% Kido Defense |
| **Kurotsuchi** | `cl_kurotsuchi` | Legendary | Spirit charm overflow takes less Health (4%); +1.5% Kido Defense; +5.0 Reiatsu |
| **Shihoin** | `cl_shihoin` | Legendary | +12.5 Shunpo Stamina; +5 Shunpo Speed; +0.5% Lightning Damage; +0.5% Hakuda Damage; Custom fast sprint animation, idle animation, cat ears and tail |
| **Kuchiki** | `cl_kuchiki` | Rare | +3% Kido Damage |
| **Yamamoto** | `cl_yamamoto` | Rare | +2% Weapon Damage; +5 Shunpo Stamina |
| **Hitsugaya** | `cl_hitsugaya` | Rare | +3 Reiatsu; +2.5% Kido Defense |
| **Abarai** | `cl_abarai` | Uncommon | +5 Health; +2.5% Posture Regen |
| **Hisagi** | `cl_hisagi` | Uncommon | +1.2% Kido Damage; +3.0% Posture Regen |
| **Madarame** | `cl_madarame` | Common | +5 Equipment Load |
| **Matsumoto** | `cl_matsumoto` | Common | +5.0 Reiatsu |
| **Tosen** | `cl_tosen` | Rare | Sensing allows viewing highlights of players and a flashstep trail; +5.0 Shunpo Speed; +2.0% Melee Defense |
| **Sakahone** | `cl_sakahone` | Rare | +2.5% Kido Defense; +5.0 Posture; +8 Max Health |
| **Urahara** | `cl_urahara` | Legendary | Larger perfect cast windows on SR Kido Skills; +2.5% Kido Damage; +2.0 Max Reiatsu |
| **Zaraki** | `cl_zaraki` | Legendary | +3.5% Weapon Damage; +5.0 Max Posture; +10.0 Max Health |
| **Kurosaki (Universal)** | `cl_kurosaki_shinigami` | Legendary | Universal Clan available to all factions; Custom orange hair cosmetic; +2.0 Reiatsu; +2.0% Weapon DMG; +5.0 Shunpo Speed |

## 8. Spirit Charms (71 Total)

| Charm Name | ID | Tier | Description / Effect |
|---|---|---|---|
| **A Song of Fire and Thunder** | `charm_a_song_of_fire_and_thunder` | Tier 4 | I AM FIRE. I AM LIGHTNING. I AM FLAME GIVEN FORM! Buffs: When above 1.25x AP, your melee attacks are imbued in flame, dealing more damage. If below 25% max hp, your high-damaging melee attacks have a chance to inflict scorch (10s CD); When above 1.2x AP, your kido attacks are inflict thunder, dealing more stun. If below 25% max hp, your high-damaging kido attacks have a chance to inflict electroshock (10s CD) |
| **Aura Of Terror** | `charm_aura_of_terror` | Tier 3 | Make them tremble in fear. Buffs: Manual spiritual pressure is replaced with an AOE attack that inflicts a terrifying status effect on enemies hit and deal 3.5% [max HP] damage (50s CD) |
| **Adrenaline Junkie** | `charm_adrenaline_junkie` | Tier 3 | Thrill-seeking taken to the extreme. Buffs: Gain 1% output on hit up to 110% (not including multi hit techniques); If you do not get hit/hit an enemy for 30 seconds, automatically return to 100% Nerfs: Lose 1% output when getting hit, down to 10% |
| **Await the Opening** | `charm_await_the_opening` | Tier 3 | Be patient, take every advantage. Buffs: Your parries now posture break Nerfs: Your parries are worth 50% as much posture damage |
| **Blazing Spirit** | `charm_blazing_spirit` | Tier 3 | An eternal unwavering flame. Buffs: Parrying a basic melee attack ignites your blade with spirit flames (5s CD, +10% damage) Nerfs: Basic melee attacks not ignited by flame deal reduced damage (-2% damage) |
| **Ruler's Gaze** | `charm_rulers_gaze` | Tier 3 | The world can not be changed with pretty words alone. Buffs: Performing a manual rushdown activates "Geass"; Whilst "Geass" is active, issue a command to the opponent to halt, allowing for a free follow-up; Enemies affected by "Geass" have their damage taken reduced by 35%, additionally, if blade caught the cooldown will continue as normal; Being in "Aura" ignores the first restriction Nerfs: "Geass" cannot be used on the same target twice, and has a cooldown |
| **Quick Grit** | `charm_quick_grit` | Tier 3 | Finish them quickly, to fell foe after foe. Buffs: Landing 3 different non-barrage attacks on the same person within 1s smites the opponent, granting a 40% damage buff on the most recent attack (40s CD) |
| **Blademaster** | `charm_blademaster` | Tier 3 | An ancient charm, belonging to a blade master. Buffs: Your bladed basic attacks inflict deep gash stacks on your opponent; Upon reaching 3 deep gash stacks, deal 110% of all of the damage you would have done normally Nerfs: Your bladed basic attacks deal 90% less damage |
| **Curtain Call** | `charm_curtain_call` | Tier 3 | The final curtain drops. Buffs: As long as your reiatsu is at 100%, your basic attacks have percent lifesteal Nerfs: You no longer passively regenerate reiatsu |
| **Flawless Swordsman** | `charm_flawless_swordsman` | Tier 3 | It's clear that this charm's original owner was a cut above. Buffs: Dealing damage without being hit will build "Perfection", whilst Perfection is building gain up to a 15% damage buff towards enemies, at half stacks or more all damage is fire damage Nerfs: Suffering a hit or leaving combat will extinguish your flame of ambition, losing all stocks. Leaving a cooldown of 10s before your next attempt |
| **Heavenly Restriction** | `charm_heavenly_restriction` | Tier 3 | It is recorded amongst seiretei notes that certain shinigami born thousands of years ago... could never utilize techniques... (Does not fully stack with Warrior's Spirit) Buffs: Your physical attacks are up to 35% more potent, scaling with level; You gain up to 15% more movement speed, and up to 25% more kido defense each scaling with level; Your critical attacks now proc kill confirmed Nerfs: You cannot use abilities to any capacity |
| **Haze of Death** | `charm_haze_of_death` | Tier 3 | You're dead after this. Buffs: Your critical attack applies Cursed status effect for 7s, increasing the damage your opponent takes by 30% (50s CD) |
| **Kill Confirmed** | `charm_kill_confirmed` | Tier 3 | How many friends did you bring? Doesn't matter. Buffs: Knocking on opponent will cause them to succumb to your spiritual pressure and cause their head to blow off Nerfs: Blowing their head off will reduce your output by 5% (Scaling with nearby enemies) temporarily |
| **Last Man Standing** | `charm_last_man_standing` | Tier 3 | JOJO! This is the last of my ham-... That's not the right shonen Buffs: If an ally is to be knocked within 90 meters of you, siphon the enemies HP pack and gain a percent of it yourself Nerfs: Your regeneration from all sources is cut in half |
| **Raid Boss** | `charm_raid_boss` | Tier 3 | You don't feel your wounds then, or the ache in your back from the weight of the armour, or the sweat running down into your eyes. You stop feeling, you stop thinking, you stop being you, there is only the fight, the foe, this man and then the next and the next and the next, and you know they are afraid and tired but you're not, you're alive, and death is all around you but their swords move so slowly, and you can dance through them laughing. [Reworked: Synchronized with Anti-Gank system; PVP-only, does not apply to NPCs]. Buffs: For every nearby enemy gain a stack of battle fever, for every nearby ally lose a stack of battle fever, up to 10 stacks; For every stack of battle fever gain a 5% incoming defense, and 3% more damage, both increasing up to 3.5 times; At 3 stacks gain weaker Curtain Call, at 4 stacks become immune to movement slow, at 5 stacks your lifesteal doubles at 30%, finally at 7 stacks your m1s periodically proc Perfect Flash Nerfs: When your battle fever is empty and allies are nearby take 10% more damage |
| **Shonen Syndrome** | `charm_shonen_syndrome` | Tier 3 | Hmph. I'm an avenger. Buffs: Yell out the move you are about to use; Upgrades the move by 2 levels (Does not work past level 6) Nerfs: 25 second cooldown between upgrades |
| **Struggler's Spirit** | `charm_strugglers_spirit` | Tier 3 | Growth is often a lonely road. Buffs: Landing three basic attacks when below 25% HP will bolster your strength (75s CD); You take 20% less damage when your health is below 25% |
| **Soul Snatcher** | `charm_soul_snatcher` | Tier 3 | I'm mister body catcher Buffs: Landing any kido ability on a opponent who is less than 11% HP will activate “Soul Snatcher”; Enemies with “Soul Snatcher” activated on them will immediately be knocked after a short delay |
| **The Incopable** | `charm_the_incopable` | Tier 3 | They think you're a monster? Prove them right. Buffs: Your innate base output is up to 105% depending on level, this goes up to 120% based on missing HP; Gain access to a reliquary attached to your waist, this is the source of your power. It glows based on missing HP Nerfs: You can no longer use transformations or racial abilities, and effects of hollow traits are disabled; You can not access your racial progression boss fights |
| **Undying Soul** | `charm_undying_soul` | Tier 3 | Why don't I bleed...? Buffs: Unleash a second wind when defeated Nerfs: Your death is certain when your health runs out |
| **Ultimate Sacrifice** | `charm_ultimate_sacrifice` | Tier 3 | I don't care... I'll use everything Buffs: Break your current limits and go beyond when popping Aura; Your rage is born from deep within your heart. Nothing can stop it (Uncancellable Aura) Nerfs: You build aura more slowly; The ultimate sacrifice... has the ultimate price |
| **Warrior's Spirit** | `charm_warriors_spirit` | Tier 3 | Who needs flash step? Buffs: 17.5% melee damage increase on basic attacks Nerfs: You can no longer flash step; You can no longer use Manual Rushdown |
| **You're in my range** | `charm_youre_in_my_range` | Tier 3 | Crazy Diamond's range is 2 meters... Buffs: 35% defense towards gap-close abilities; Your next basic attack or critical is empowered after being attacked by a gap-close ability (45s CD) Nerfs: You take 15% more damage from attacks that hit you outside of a 25 stud range |
| **Deep Hatred** | `charm_deep_hatred` | Tier 2 | BASKA! Buffs: When posture broken, or grabbed: Enter a fit of rage for 10s, boosting your output by 10% (30s CD) |
| **Marshland King** | `charm_marshland_king` | Tier 2 | "THIS MACE WILL MEND YOUR BONES TO DUST" Buffs: Build aura 35% faster, and unleash a menacing laugh when popping it Nerfs: Your aura is 25% shorter and the buffs are 10% weaker |
| **Presence of Mind** | `charm_presence_of_mind` | Tier 2 | Skill spam so soon? Buffs: You have an increased 25% ability haste when below 30% your maximum HP |
| **Poison Touch** | `charm_poison_touch` | Tier 2 | You're in it for the long run. Buffs: Your critical attack applies poison |
| **Train Conductor** | `charm_train_conductor` | Tier 2 | Tickets please! Buffs: Steal a mission ticket when killing an enemy player who has one; Mission ticket cap increased by 1 Nerfs: Dying will cause you to lose 2 mission tickets |
| **Tooth & Nail** | `charm_tooth_and_nail` | Tier 2 | Hang on! It isn't over yet... Buffs: If an attack is about to kill you, lose all of your health down to 5% instead of dying |
| **Nowhere to Hide** | `charm_nowhere_to_hide` | Tier 2 | The trail leads right up to you. Buffs: Striking an opponent below 50% HP while you are above 50% HP will cause them to be revealed for 5s; Deal 7.5% more damage to those who are revealed |
| **Frugal** | `charm_frugal` | Tier 2 | Wealth is quiet. Rich is loud. Poor is flashy. Buffs: You lose 80% less cash from dying to players Nerfs: You don't gain cash from players |
| **Golem** | `charm_golem` | Tier 2 | Become a stone fortress. Buffs: Taking 25% base damage within 2.5s will activate rock armor for 15s (45s CD); While rock-armored, gain 7.5% damage resistance |
| **Heat Burst** | `charm_heat_burst` | Tier 2 | HE POPPED HEAT?! Buffs: Replaces your Aura with Heat; When Heat activates, automatically heal 37% of your maximum health and gain max AP Nerfs: Lose access to Aura based theme buff |
| **Indomitable Spirit** | `charm_indomitable_spirit` | Tier 2 | Confidence is key. Buffs: Gain 5% of your health back from winning clashes Nerfs: Lose 5% of your health upon losing clashes |
| **Lizard's Spirit** | `charm_lizards_spirit` | Tier 2 | Shed some skin, regenerate some health. Buffs: When your health reaches below 50%, heal 7.5% (9m CD) |
| **Mysterious Stranger (Him)** | `charm_mysterious_stranger_him` | Tier 2 | When the wind whistles, you know he's there. Buffs: The mysterious stranger has a 8 percent chance to aid you when dealing physical melee damage (30s CD) |
| **Mysterious Stranger (Her)** | `charm_mysterious_stranger_her` | Tier 2 | When the wind whistles, you know she's there. Buffs: The mysterious stranger has a 8 percent chance to aid you when dealing ranged kido damage (30s CD) |
| **Perfect Flash** | `charm_perfect_flash` | Tier 2 | The unseen blade is the deadliest. Buffs: Landing a melee Basic/Critical attack out of combat deals 2.5x dmg, this also applies to full-hp opponents (60s CD) |
| **Ranged Warrior** | `charm_ranged_warrior` | Tier 2 | Seems to try to keep distance from its current bearer. Buffs: 6% kido/ranged damage Nerfs: 3% damage vulnerability |
| **Relentless Hunter [DELETED - Made Baseline]** | `charm_relentless_hunter` | Tier 2 | Deleted in game update: effect converted into baseline mission mechanic (invaders automatically prevent extraction). Buffs: [BASELINE MECHANIC] Players cannot extract from missions while an invader is alive. |
| **Side Character** | `charm_side_character` | Tier 2 | If you're already bad at PVP, you could always stick to PVE. Buffs: Deal 7.5% more damage to NPCs Nerfs: Take 4% more damage from players |
| **Silent Shadows** | `charm_silent_shadows` | Tier 2 | Like a rat, sneaking around... Buffs: Your visible aura is reduced by 60%. |
| **Superiority Complex** | `charm_superiority_complex` | Tier 2 | Adversity breeds excellence... Buffs: Blade-catching an opponent will cause you to mock them, increasing aura gain on the blade catch (30s CD); Mocked opponents instantly lose 0.2x AP and take 15% increased posture damage for a short duration |
| **Surgeon's Spirit** | `charm_surgeons_spirit` | Tier 2 | I feel rejuvenated...? Buffs: All heals towards you are increased by 30% Nerfs: You no longer receive HP packs from knocking players |
| **Swarm** | `charm_swarm` | Tier 2 | You're dead after this. Buffs: Landing your critical attack will spawn 1 friendly Dragonfly Hollow |
| **Tools of the Trade** | `charm_tools_of_the_trade` | Tier 2 | The right tool for the wrong job. Buffs: You have absolute mastery over your weaponry, your heavy attack is never red, gain riposte on the attack anyway (Does not work for heavy attacks that are never red to begin with) |
| **Wraith's Spirit** | `charm_wraiths_spirit` | Tier 2 | Though unknown, the shadows produced from this spirit surround you and protect you. Buffs: Getting hit by 3 different attacks in quick succession will cause you to turn into a invincible wraith momentarily Nerfs: You take 5% more damage from melee attacks |
| **Backline Buster** | `charm_backline_buster` | Tier 2 | You just don't fit in with this crowd. Buffs: Hitting an opponent then hitting a different opponent shortly after procs Perfect Flash (35s CD) |
| **Close & Personal** | `charm_close_and_personal` | Tier 2 | Don't run! Buffs: 5% weapon/hakudo damage Nerfs: 2% damage vulnerability |
| **Factotum's Spirit** | `charm_factotums_spirit` | Tier 2 | Determination surges through you Buffs: 5% increased EXP goin Nerfs: 30% increased EXP loss |
| **Frostwalker** | `charm_frostwalker` | Tier 2 | This once belonged to a prestigious king, which commanded two armies in his lifetime, now it’s yours. Buffs: Dealing a high-damage kido blow will embue you in frost, this effect lasts 12.5s or until consumed.; While frosted your next basic attack will freeze your opponent. (25s CD) |
| **Hard Headed** | `charm_hard_headed` | Tier 1 | Your skull is an impenetrable fortress. Buffs: Gain immunity to concussion |
| **At the Reedy** | `charm_at_the_ready` | Tier 1 | Always ready. Buffs: Gain permanent 25% ability haste when invaded |
| **Battle Hardened** | `charm_battle_hardened` | Tier 1 | A hundred scars. What is one more? Buffs: You visually bleed on hits at lower health |
| **Critical Blows** | `charm_critical_blows` | Tier 1 | Critically acclaimed. Buffs: 7.5% increased critical attack damage |
| **Defensive Regen** | `charm_defensive_regen` | Tier 1 | Wait for your chance... Buffs: You regenerate 25% more reiatsu from parries Nerfs: Your base reiatsu regeneration is reduced by 35% |
| **Domination** | `charm_domination` | Tier 1 | For fighters who rarely get hit. Buffs: Max AP is increased by 0.15x |
| **Fortified Fighter** | `charm_fortified_fighter` | Tier 1 | Secure on all fronts. Buffs: Gain 15% defense when posture broken. |
| **Flashmaster** | `charm_flashmaster` | Tier 1 | The will of Goji. Buffs: +7.5 shunpo stamina |
| **Giant Fighter** | `charm_giant_fighter` | Tier 1 | This charm belonged to a certain speedrunner... Buffs: 10% more domoge to Bosses Nerfs: 2.5% less damage to non-boss NPCs |
| **Head Hunter** | `charm_head_hunter` | Tier 1 | THE LIST KEEPS ON GETTING BIGGER. Buffs: Deal 5% more domoge towards players with active transformation/shikai if you have neither |
| **Prey Turned Predator** | `charm_prey_turned_predator` | Tier 1 | They think I'm stuck here with them? Buffs: If someone invades you while you are on a mission, they get combat tagged |
| **Resourceful Spirit** | `charm_resourceful_spirit` | Tier 1 | No need to reinvent the wheel. Buffs: Your aerial launcher is counted as a critical attack, dealing slightly more damage and applying all critical attack effects |
| **Trouble in Paradise** | `charm_trouble_in_paradise` | Tier 1 | Home court advantage! Buffs: Deal 10% more domoge when fighting in a Homeworld |
| **Bully** | `charm_bully` | Tier 3 | Dominates weaker opponents without mercy. Buffs: Findable in PVP / Hueco Mundo pool; Deals increased damage and posture damage against opponents with lower current health percentage |
| **The Boogeyman** | `charm_the_boogeyman` | Tier 3 | A lurking nightmare striking from the dark. Buffs: Findable in PVP / Hueco Mundo pool; Striking enemies from behind or from stealth applies Terror status and heightens critical damage |
| **Monster Slayer** | `charm_monster_slayer` | Tier 3 | Honed specifically to slay titanic horrors. Buffs: Drops from Lanza and Zatoichi boss encounters; Increases damage dealt and damage resistance against giant hollows, raid bosses, and world bosses |
| **Dead Man Walking** | `charm_dead_man_walking` | Tier 4 (HolloVVeen Limited) | Refuses to succumb to death without one final violent fury. Buffs: HolloVVeen Event Charm (Grave Wars / HolloVVeen Chests); Upon receiving fatal damage, enter a brief invulnerability window to retaliate before falling; Freely unequipped (Limited Charm) |
| **Witches Brew** | `charm_witches_brew` | Tier 3 (HolloVVeen Limited) | A volatile concoction bubbling with eerie unpredictability. Buffs: HolloVVeen Event Charm (Grave Wars / HolloVVeen Chests); Casting skills periodically triggers erratic potion surges, applying random status effects or temporary stat surges; Freely unequipped (Limited Charm) |
| **Jack-o-Lantern** | `charm_jack_o_lantern` | Tier 3 (HolloVVeen Limited) | Carved with a demonic grin and burning spectral fire. Buffs: HolloVVeen Event Charm (Grave Wars / HolloVVeen Chests); Attacks ignite targets in spectral hollow fire, causing damage over time and revealing cloaked targets; Freely unequipped (Limited Charm) |
| **Dracula’s Fangs** | `charm_draculas_fangs` | Tier 4 (HolloVVeen Limited) | Insatiable thirst for the life essence of your prey. Buffs: HolloVVeen Event Charm (Dracula Pack / Grave Wars); Grants significant life steal on critical and heavy attacks against bleeding or maimed targets; Freely unequipped (Limited Charm) |

## 9. Hollow Traits (13 Total)

| Trait Name | ID | Notable Feature / Details |
|---|---|---|
| **Tentacles** | `ht_tentacles` | Twin Tentacles |
| **Skinny** | `ht_skinny` | You're a skinnier hollow. |
| **Wings** | `ht_wings` | Large wings |
| **Deadly Claws** | `ht_claws` | Blunt base attacks become sharp |
| **Iron Skin** | `ht_iron_skin` | You gain thick iron like skin, similar to an arrancar's Hierro. |
| **Horns** | `ht_horns` | You get horns |
| **Exoskeleton** | `ht_exoskeleton` | A stronger skeletal structure. |
| **Innocuous Presence** | `ht_presence` | No one really notices you. |
| **Back Scales** | `ht_scales` | Insect-like vertebrae. |
| **Giant** | `ht_giant` | You get bigger |
| **Energized** | `ht_energized` | Explosive power bubbles beneath your skin. |
| **Dense Muscles** | `ht_dense_muscles` | Increased muscle density. |
| **Tailbone** | `ht_tailbone` | Long bony tail. LASER CEROS! |

## 10. Essences & Attributes

### Essences (7 Total)
| Essence Name | ID | Accent Color | Description |
|---|---|---|---|
| **Reserves** | `reserves` | `#4dd2ff` | Increases maximum reiatsu capacity. |
| **Haste** | `haste` | `#34d399` | Decreases skill cooldowns. Slightly increases passive reiatsu regen. |
| **Potency** | `potency` | `#f87171` | Increases stat scaling. Slightly increases melee posture damage. |
| **Mettle** | `mettle` | `#fbbf24` | Increases maximum posture. |
| **Shunpo** | `shunpo` | `#a78bfa` | Increases shunpo stamina and shunpo speed. |
| **Flowing Gradient** | `flowing_gradient` | `#ff3c50` | Strength skill essence unlocked via Battle for Dangai vote. Amplifies fluid momentum on heavy strikes. |
| **Slaying Drive** | `slaying_drive` | `#00d2be` | Speed skill essence introduced in v5.2. Boosts chase velocity, rapid engagement, and relentless combo tempo. |

### Core Attributes (4 Total)
| Attribute Name | ID | UI Position | Description |
|---|---|---|---|
| **Hakuda** | `hakuda` | bottom | Affects hakuda skill damage. |
| **Strength** | `strength` | left | Affects weapon skill damage. |
| **Kido** | `kido` | right | Affects reiatsu-based damage. |
| **Speed** | `speed` | top | Affects shunpo speed and weakly affects shunpo stamina. |
