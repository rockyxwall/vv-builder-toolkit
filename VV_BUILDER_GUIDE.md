# VV: Ultimatum Builder & Catalog Reference

> Official companion guide and data reference for [vvcharmmerges.pages.dev/builder](https://vvcharmmerges.pages.dev/builder).
> Last updated: 2026-11-22 | Source: Official Live Endpoints

---

## 📑 Table of Contents

1. [System Mechanics & Mathematical Formulas](#1-system-mechanics--mathematical-formulas)
2. [Spirit Charms Catalog (73 Charms)](#2-spirit-charms-catalog-73-charms)
3. [Charm Merge Synergies Matrix](#3-charm-merge-synergies-matrix)
4. [Skill Tree & Node Branches (260 Nodes)](#4-skill-tree--node-branches-260-nodes)
5. [Equipment Catalog & Modifiers (146 Items)](#5-equipment-catalog--modifiers-146-items)
6. [Weapons & Zanpakuto Modular Parts](#6-weapons--zanpakuto-modular-parts)
7. [Abilities & Essences](#7-abilities--essences)
8. [Clans & Hollow Traits](#8-clans--hollow-traits)
9. [Buffs, Ascension Tiers & Shrines](#9-buffs-ascension-tiers--shrines)

---

## 1. System Mechanics & Mathematical Formulas

The builder enforces exact client-side game formulas:

### Point Budgets
- **Attribute Points (AP)**: `400 AP` max across `Speed`, `Strength`, `Kido`, `Hakuda`.
- **Build Points (BP / Semi-Stats)**: `400 BP` max across `Reserves`, `Haste`, `Potency`, `Mettle`, `Shunpo`.
- **Skill Points (SP)**: `100 SP` starting budget (Upgrades cost `2 SP` each).
- **Ascension Fragments**: `6 Fragments` (Upgrades cost `1 Fragment` each).
- **Mastery Cap**: At most **2 skills** can reach Level 7 or 8.

### Semi-Stat Cross-Bonus Formula
Allocating points to any semi-stat grants free bonus points to the other 4 semi-stats:
$$\text{Bonus}(stat) = \left\lfloor \frac{\sum_{other} BP_{other}}{10} \right\rfloor$$
$$\text{EffectiveSemiStat}(stat) = BP_{stat} + \text{Bonus}(stat)$$

### Core Derived Stats (Level 100)
- **Health**: Base 220 (Vasto Lorde) / 200 (Others) + `Level * 2.275` + Flat Gear Buffs + Faction Rank (+2.1%).
  - *Charm Notch Penalty*: `3` Clean Free Notches. Excess notches inflict `-6% Max HP` per notch (`-4%` for Kurotsuchi clan).
- **Reiatsu**: `55 + (Level * 0.15) + (EffectiveReserves / 100 * 4.5) + Flat Reiatsu`.
- **Posture**: `92 + (EffectiveMettle / 100 * 5.0) + Flat Posture`.
- **Shunpo Stamina**: `30 + (Level * 0.55) + (SpeedAP * 0.06) + (EffectiveShunpo * 0.07) + Flat Stamina`.
- **Shunpo Speed**: `50 + (EffectiveShunpo * 0.03) + (SpeedAP * 0.015) + ((Level - 1) * 0.1) + Flat Speed`.
- **Cooldown Reduction**: `(EffectiveHaste * 0.042) + Buffs`, capped at `30%`.

### Damage Scaling & 20% Soft-Cap
Kido, Weapon, and Hakuda damages feature a **20% soft-cap** (above 20%, additional damage is scaled by 50%):
- **Kido**: `AP_Kido * Coeff + (EffectivePotency * AP_Kido * 0.000025) / 100 + Buffs`. (Coeff is `0.00008`, or `0.00011` with Energized trait).
- **Weapon**: `AP_Strength * 0.01 + EffectivePotency * AP_Strength * 0.00002 + Buffs`.
- **Hakuda**: `AP_Hakuda * 0.01 + EffectivePotency * AP_Hakuda * 0.00002 + Buffs`.

---

## 2. Spirit Charms Catalog (73 Charms)

| ID | Name | Tier | Primary Stats | Perks / Description |
|---|---|---|---|---|
| `song-of-fire-and-thunder` | **Song of Fire and Thunder** | Tier 4 | kido_ap: 1.20x, kido_cd: 10, melee_ap: 1.25x | When above {{melee_ap}} AP, your melee attacks are imbued in flame, dealing more damage. If below 25% max hp, your high-damaging melee attacks have a ... |
| `aura-of-terror` | **Aura Of Terror** | Tier 3 | hp_dmg: 3.5%, cd: 50 | Manual spiritual pressure is replaced with an AOE attack that inflicts a terrifying status effect on enemies hit and deal {{hp_dmg}} max HP damage ({{... |
| `adrenaline-junkie` | **Adrenaline Junkie** | Tier 3 | - | Gain 1% output on hit up to 107% (not including multi hit techniques). If you do not get hit/hit an enemy for 30 seconds, automatically return to 100%... |
| `await-the-opening` | **Await The Opening** | Tier 3 | parry_dmg: 50% | Your parries now posture break.  Your parries are worth {{parry_dmg}} as much posture damage... |
| `blazing-spirit` | **Blazing Spirit** | Tier 3 | dmg_buff: 10%, dmg_debuff: 2%, cd: 5 | Parrying a basic melee attack ignites your blade with spirit flames ({{cd}}s CD, +{{dmg_buff}} damage)  Basic Melee attacks not ignited by flame deal ... |
| `blademaster` | **Blademaster** | Tier 3 | deep_gash_dmg: 110, deep_gash_amount: 3, dmg_reduction: 90% | Your bladed basic attacks inflict deep gash stacks on your opponent. Your bladed basic attacks deal {{dmg_reduction}} less damage. Upon reaching {{dee... |
| `curtain-call` | **Curtain Call** | Tier 3 | rei_amount: 99% | As long as your reiatsu is at {{rei_amount}}, your basic attacks have percent lifesteal   You no longer passively regenerate reiatsu... |
| `flawless-swordsman` | **Flawless Swordsman** | Tier 3 | dmg_buff: 15% | Dealing damage without being hit will build 'Perfection', whilst Perfection is building gain up to a {{dmg_buff}} damage buff towards enemies, at half... |
| `haze-of-death` | **Haze of Death** | Tier 3 | cd: 50 | Your critical attack applies Cursed ({{cd}}s CD)... |
| `heavenly-restriction` | **Heavenly Restriction** | Tier 3 | dmg_buff: 35%, aura_gain: 15%, max_ap: 10%, shunpo_buff: 20%, move_speed: 15% | Your physical attacks are up to {{dmg_buff}} more potent, scaling with level  You have {{aura_gain}} more aura gain, scaling with level  You gain {{ma... |
| `kill-confirmed` | **Kill Confirmed** | Tier 3 | debuff: 5% | Knocking an opponent will cause them to succumb to your spiritual pressure and cause their head to blow off  Blowing their head off will reduce your o... |
| `last-man-standing` | **Last Man Standing** | Tier 3 | - | If an ally is to be knocked within 90 meters of you, siphon the enemies HP pack and gain a percent of it yourself  Your regeneration from all sources ... |
| `monster-slayer` | **Monster Slayer** | Tier 3 | monster_dmg: 3 | For every nearby NPC enemy gain a stack of 'Slayer', up to 10 stacks   For every stack of 'Slayer' gain {{monster_dmg}}% more Monster Damage, increasi... |
| `quick-grit` | **Quick Grit** | Tier 3 | dmg_buff: 25%, cooldown: 40, window: 5 | Landing 3 different non-barrage attacks on the same person within {{window}}s smites the opponent, granting a {{dmg_buff}} damage buff on the most rec... |
| `raid-boss` | **Raid Boss** | Tier 3 | aura_buildup: 3% | Your aura cooldown is shortened  For every nearby PLAYER enemy gain a stack of battle fever, for every nearby PLAYER ally lose a stack of battle fever... |
| `rulers-gaze` | **Ruler's Gaze** | Tier 3 | - | Performing a guard break activates "Geass". Whilst "Geass" is active, issue a command to the opponent to halt, allowing for a longer follow up. "Geass... |
| `shonen-syndrome` | **Shonen Syndrome** | Tier 3 | cd: 20, levels: 2 | Yell out the move you are about to use   Upgrades the move by {{levels}} levels (Does not work past level 6)  {{cd}} second cooldown between upgrades... |
| `strugglers-spirit` | **Struggler's Spirit** | Tier 3 | dmg_reduction: 25%, hp_percent: 25%, cd: 75 | Landing three basic attacks when below {{hp_percent}} HP will balster your strength ({{cd}}s CD)  You take {{dmg_reduction}} less damage when your hea... |
| `soul-snatcher` | **Soul Snatcher** | Tier 3 | hp_percent: 11% | Landing any kido ability on a opponent who is less than {{hp_percent}} HP will activate Soul Snatcher  Enemies with Soul Snatcher activated on them wi... |
| `the-incapable` | **The Incapable** | Tier 3 | base: 105%, max_base: 120% | Your innate base output is up to {{base}} depending on level, this goes up to {{max_base}} based on missing HP  Gain access to a reliquary attached to... |
| `undying-soul` | **Undying Soul** | Tier 3 | - | Unleash a second wind when defeated, become ungrabbable in this state  Your death is certain when your health runs out... |
| `ultimate-sacrifice` | **Ultimate Sacrifice** | Tier 3 | - | Break your current limits and go beyond when popping Aura   Your rage is born from deep within your heart. Nothing can stop it (Uncancellable Aura)  Y... |
| `warriors-spirit` | **Warrior's Spirit** | Tier 3 | dmg_buff: 17.5% | {{dmg_buff}} melee damage increase on basic attacks  You can no longer Flash Step nor Manual Rushdown... |
| `youre-in-my-range` | **You're In My Range** | Tier 3 | gap_defense: 35% | {{gap_defense}} defense towards gap-close abilities  Your next basic attack or critical is empowered after being attacked by a gap-close ability (45s ... |
| `jack-o-lantern` | **Jack-o-Lantern** | Tier 3 | - | Maiming a player forces them to wear a pumpkin head. The pumpkin head remains for 1 minute until it explode. For each kill, you gain a jack-o'-lantern... |
| `backline-buster` | **Backline Buster** | Tier 2 | cd: 35 | Hitting an opponent then hitting a different opponent shortly after procs Perfect Flash ({{cd}}s CD)... |
| `no-time-to-spare` | **No Time To Spare** | Tier 2 | - | Once put into combat, gain the effecs of light feet until you are hit.... |
| `close-and-personal` | **Close and Personal** | Tier 2 | dmg_buff: 5%, dmg_debuff: 2% | {{dmg_buff}} weapon/hakuda damage  {{dmg_debuff}} damage vulnerability... |
| `deep-hatred` | **Deep Hatred** | Tier 2 | duration: 10 | When posture broken or grabbed, enter a fit of rage for {{duration}}s, boosting your output by 10% (30s CD)... |
| `factotums-spirit` | **Factotum's Spirit** | Tier 2 | xp_loss: 30%, xp_gain: 5% | {{xp_gain}} increased EXP gain  {{xp_loss}} increased EXP loss... |
| `frostwalker` | **Frostwalker** | Tier 2 | frost_duration: 9, speed_debuff: 5% | Dealing a high-damage kido blow will embue you in frost, this effect lasts {{frost_duration}}s or until consumed  While frosted your next basic attack... |
| `frugal` | **Frugal** | Tier 2 | - | You lose 80% less cash from dying to players  You don't gain cash from players... |
| `golem` | **Golem** | Tier 2 | dmg_amount: 25, duration: 15, dmg_resist: 7.5% | Taking {{dmg_amount}}+ base damage withing 2.5s will activate rock armor for {{duration}}s (45s CD)  While rock-armored, gain {{dmg_resist}} damage re... |
| `heat-burst` | **Heat Burst** | Tier 2 | heal: 37% | Replaces your Aura with Heat  When Heat activates, automatically heal {{heal}} of your maximum health and gain max AP  Lose access to Aura-based theme... |
| `indomitable-spirit` | **Indomitable Spirit** | Tier 2 | hp: 5%, hp_loss: 5% | Gain {{hp}} of your health back from winning clashes  Lose {{hp_loss}} of your health upon losing clashes... |
| `lizards-spirit` | **Lizard's Spirit** | Tier 2 | hp_amount: 50%, heal: 7.5% | When your health reaches below {{hp_amount}}, heal {{heal}} (9m CD)... |
| `marshland-king` | **Marshland King** | Tier 2 | duration: 25%, aura_nerf: 10%, buildup: 35% | Build aura {{buildup}} faster, and unleash a menacing laugh when popping it  Your aura is {{duration}} shorter and the buffs are {{aura_nerf}} weaker... |
| `merchants-blessing` | **Merchant's Blessing** | Tier 2 | token_gain: 7% | Gain {{token_gain}} more soul tokens from all gameplay sources... |
| `mysterious-stranger-her` | **Mysterious Stranger (Her)** | Tier 2 | chance: 15% | The mysterious stranger has a {{chance}} chance to aid you when dealing ranged kido damage (30s CD)... |
| `mysterious-stranger-him` | **Mysterious Stranger (Him)** | Tier 2 | chance: 8% | The mysterious stranger has a {{chance}} chance to aid you when dealing physical damage (30s CD)... |
| `nowhere-to-hide` | **Nowhere to Hide** | Tier 2 | player_hp: 50%, dmg_buff: 7.5% | Striking an opponent below {{player_hp}} HP while you are above 50% HP will cause them to be revealed for 5s   Deal {{dmg_buff}} more damage to those ... |
| `overtime-hours` | **Overtime Hours** | Tier 2 | - | During a mission, if the clock runs down below 75% of the starting time you start running off overtime   During overtime, gain 6.5% output and continu... |
| `perfect-flash` | **Perfect Flash** | Tier 2 | dmg_buff: 2.5x | Landing a melee Basic/Critical attack out of combat deals {{dmg_buff}} dmg, this also applies to full-hp opponents (60s CD)... |
| `presence-of-mind` | **Presence of Mind** | Tier 2 | hp_amount: 30, haste: 25% | You have an increased {{haste}} ability haste when below {{hp_amount}}% of your maximum HP... |
| `poison-touch` | **Poison Touch** | Tier 2 | - | Your critical attack applies poison... |
| `ranged-warrior` | **Ranged Warrior** | Tier 2 | dmg_buff: 6%, dmg_debuff: 3% | {{dmg_buff}} kido/ranged damage   {{dmg_debuff}} damage vulnerability... |
| `reality-warper` | **Reality Warper** | Tier 2 | - | 5% chance to spawn a purple portal on player kill... |
| `side-character` | **Side Character** | Tier 2 | dmg_buff: 7.5%, dmg_taken: 4% | Deal {{dmg_buff}}% more damage to NPCs   Take {{dmg_taken}} more damage from players... |
| `silent-shadows` | **Silent Shadows** | Tier 2 | - | Your visible aura is reduced by 60%... |
| `superiority-complex` | **Superiority Complex** | Tier 2 | cd: 30 | Blade-catching an opponent will cause you to mock them, increasing aura gain on the blade catch ({{cd}}s CD)  Mocked opponents instantly lose 0.2x AP ... |
| `surgeons-spirit` | **Surgeon's Spirit** | Tier 2 | heal_buff: 30% | All heals towards you are increased by {{heal_buff}}   You no longer receive HP packs from knocking players... |
| `swarm` | **Swarm** | Tier 2 | spawn_amount: 1 | Landing your critical attack will spawn {{spawn_amount}} friendly Dragonfly Hollow... |
| `train-conductor` | **Train Conductor** | Tier 2 | - | Steal a mission ticket when killing an enemy player who has one  Mission ticket cap increased by one  Dying will cause you to lose 2 mission tickets... |
| `tools-of-the-trade` | **Tools of the Trade** | Tier 2 | - | You have absolute mastery over your weaponry, your heavy attack is never red, gain riposte on the attack anyway (Does not work for heavy attacks that ... |
| `tooth-and-nail` | **Tooth & Nail** | Tier 2 | health_back: 5% | If an attack is about to kill you, lose all of your health down to {{health_back}} instead of dying... |
| `vice-it` | **Vice It** | Tier 2 | - | Blade-catching the opponent won't restore posture, however you kick the enemy away (75s CD)... |
| `wraiths-spirit` | **Wraith's Spirit** | Tier 2 | hit_amount: 3, melee_damage: 5% | Getting hit by {{hit_amount}} different attacks in quick succession will cause you to turn into a invincible wraith momentarily  You take {{melee_dama... |
| `draculas-fangs` | **Dracula's Fangs** | Tier 2 | grip_heal: 8% | Grips now give you {{grip_heal}} more hp back  When dealing heavy damage or using your crit you have a 50% chance to proc bleed damage  This will turn... |
| `dead-man-walking` | **Dead Man Walking** | Tier 2 | dmg_debuff: 3%, move_speed: 2.5%, cd: 5 | Taking heavy amounts of damage within a short timeframe will now cause you to lose skin.. slowly turning you into a skeleton.  For each limb lost, tak... |
| `witches-brew` | **Witches Brew** | Tier 2 | aura_gain: 5% | Popping aura now makes you consume a potion of poison allowing you to proc poison on all attacks when in aura.  Aura gain is increased by {{aura_gain}... |
| `at-the-ready` | **At the Ready** | Tier 1 | haste_buff: 25% | Gain permanent {{haste_buff}} ability haste when invaded... |
| `battle-hardened` | **Battle Hardened** | Tier 1 | - | You visually bleed on hits at lower health... |
| `critical-blows` | **Critical Blows** | Tier 1 | dmg_buff: 7.5% | {{dmg_buff}} increased critical attack damage... |
| `defensive-regen` | **Defensive Regen** | Tier 1 | rei_regen: 25%, base_regen: 35% | You regenerate {{rei_regen}} more reiatsu from parries  Your base reiatsu regeneration is reduced by {{base_regen}}... |
| `domination` | **Domination** | Tier 1 | ap_buff: 0.15x | Max AP is increased by {{ap_buff}}... |
| `fortified-fighter` | **Fortified Fighter** | Tier 1 | defense_buff: 15% | Gain {{defense_buff}} defense when posture broken... |
| `flashmaster` | **Flashmaster** | Tier 1 | shunpo_stam: 7.5 | {{shunpo_stam}} shunpo stamina... |
| `giant-fighter` | **Giant Fighter** | Tier 1 | dmg_buff: 10% | {{dmg_buff}} more damage against Bosses  2.5% less damage against non-boss NPCs... |
| `hard-headed` | **Hard Headed** | Tier 1 | - | Gain immunity to concussion... |
| `head-hunter` | **Head Hunter** | Tier 1 | dmg_buff: 5% | Deal {{dmg_buff}} more damage towards players with active transformation/shikai if you have neither... |
| `prey-turned-predator` | **Prey Turned Predator** | Tier 1 | - | If someone invades you while you are on a mission, they get combat logged... |
| `resourceful-spirit` | **Resourceful Spirit** | Tier 1 | - | Your aerial launcher is counted as a critical attack, dealing slightly more damage and applying all critical attack effects... |
| `trouble-in-paradise` | **Trouble in Paradise** | Tier 1 | dmg_buff: 10% | Deal 10% more damage when fighting in a Homeworld... |

---

## 3. Charm Merge Synergies Matrix (453 Pairs)

When merging two charms into a single slot, the designated stat scales according to their synergy rating:

### Top Outstanding & Good Combinations

| Charm A | Charm B | Synergy Rating A → B | Synergy Rating B → A |
|---|---|---|---|
| `heavenly-restriction` | `blademaster` | **Average** | **Outstanding** |
| `perfect-flash` | `critical-blows` | **Outstanding** | **Outstanding** |
| `resourceful-spirit` | `swarm` | **Good** | **** |
| `side-character` | `giant-fighter` | **Good** | **Good** |
| `critical-blows` | `poison-touch` | **Good** | **Above Average** |
| `wraiths-spirit` | `fortified-fighter` | **Good** | **Good** |
| `critical-blows` | `tools-of-the-trade` | **Good** | **** |
| `critical-blows` | `swarm` | **Good** | **Good** |
| `at-the-ready` | `presence-of-mind` | **Good** | **Good** |
| `critical-blows` | `resourceful-spirit` | **Good** | **** |
| `battle-hardened` | `fortified-fighter` | **Good** | **Good** |
| `at-the-ready` | `flashmaster` | **Good** | **Good** |
| `mysterious-stranger-him` | `mysterious-stranger-her` | **Outstanding** | **Outstanding** |
| `blademaster` | `critical-blows` | **Outstanding** | **Outstanding** |
| `perfect-flash` | `poison-touch` | **Outstanding** | **** |
| `wraiths-spirit` | `close-and-personal` | **Outstanding** | **Outstanding** |
| `ranged-warrior` | `wraiths-spirit` | **Outstanding** | **Outstanding** |
| `perfect-flash` | `backline-buster` | **Outstanding** | **** |
| `the-incapable` | `head-hunter` | **Good** | **Good** |
| `critical-blows` | `heavenly-restriction` | **Good** | **Average** |
| `wraiths-spirit` | `tools-of-the-trade` | **Good** | **Good** |
| `resourceful-spirit` | `haze-of-death` | **Good** | **** |
| `close-and-personal` | `perfect-flash` | **Good** | **Good** |
| `strugglers-spirit` | `fortified-fighter` | **Good** | **** |
| `raid-boss` | `wraiths-spirit` | **Good** | **Good** |
| `adrenaline-junkie` | `domination` | **Good** | **Good** |
| `backline-buster` | `raid-boss` | **Outstanding** | **Outstanding** |
| `tools-of-the-trade` | `blademaster` | **Outstanding** | **Outstanding** |
| `tools-of-the-trade` | `quick-grit` | **Outstanding** | **** |
| `tooth-and-nail` | `raid-boss` | **Good** | **** |
| `haze-of-death` | `tools-of-the-trade` | **Good** | **** |
| `close-and-personal` | `blademaster` | **Good** | **Good** |
| `soul-snatcher` | `presence-of-mind` | **Good** | **Good** |
| `close-and-personal` | `quick-grit` | **Good** | **Good** |
| `the-incapable` | `side-character` | **Good** | **** |
| `shonen-syndrome` | `wraiths-spirit` | **Good** | **** |
| `strugglers-spirit` | `golem` | **Good** | **Very Poor** |
| `undying-soul` | `wraiths-spirit` | **Good** | **Good** |
| `youre-in-my-range` | `wraiths-spirit` | **Good** | **** |
| `wraiths-spirit` | `rulers-gaze` | **Good** | **** |
| `blademaster` | `mysterious-stranger-him` | **Good** | **** |
| `mysterious-stranger-him` | `quick-grit` | **Good** | **Good** |
| `wraiths-spirit` | `await-the-opening` | **Good** | **** |
| `strugglers-spirit` | `indomitable` | **Good** | **** |
| `close-and-personal` | `the-incapable` | **Good** | **** |
| `presence-of-mind` | `curtain-call` | **Good** | **Average** |
| `raid-boss` | `the-incapable` | **Outstanding** | **Outstanding** |
| `quick-grit` | `heavenly-restriction` | **Outstanding** | **** |
| `blademaster` | `haze-of-death` | **Outstanding** | **Above Average** |
| `kill-confirmed` | `soul-snatcher` | **Good** | **Good** |

*(Showing top 50 of 92 top synergies)*

---

## 4. Skill Tree & Node Branches (260 Nodes)

| Node ID | Name | Branch / Spoke | Type | Max Level | Unlock Cost | Requirements |
|---|---|---|---|---|---|---|
| `hub` | **Hub** | Hub | Passive | Lv 1 | Free | None |
| `hakudaBasics` | **Hakuda Basics** | Hakuda | Passive | Lv 1 | 2 SP | HAKUDA 12 |
| `roundKick` | **Round Kick** | Hakuda | Skill | Lv 8 | 5 SP | HAKUDA 32 |
| `ironGuard` | **Iron Guard** | Hakuda | Passive | Lv 1 | Free | HAKUDA 70 |
| `sideSwitcher` | **Side Switcher** | Hakuda | Passive | Lv 8 | 3 SP | HAKUDA 90 |
| `hakudaNode1` | **Hakuda Node** | Hakuda | Node | Lv 1 | 2 SP | None |
| `hakuKidoNode1` | **Kido Node** | Kido | Node | Lv 1 | 2 SP | None |
| `surgeFist` | **Surge Fist** | Kido | Skill | Lv 8 | 7 SP | HAKUDA 50, KIDO 20 |
| `reiatsuBlasts` | **Reiatsu Blasts** | Kido | Skill | Lv 8 | 8 SP | HAKUDA 90, KIDO 50 |
| `staggerKicks` | **Stagger Kicks** | Kido | Skill | Lv 8 | 8 SP | HAKUDA 65, KIDO 45 |
| `hakudaKai` | **Hakuda Kai** | Kido | Passive | Lv 1 | 4 SP | HAKUDA 73, KIDO 55 |
| `blastPunisher` | **Blast Punisher** | Kido | Skill | Lv 8 | 9 SP | HAKUDA 100, KIDO 70 |
| `hakuKidoNode2` | **Kido Node** | Kido | Node | Lv 1 | 2 SP | None |
| `dragonFist` | **Dragon Fist** | Kido | Skill | Lv 8 | 9 SP | HAKUDA 136, KIDO 76 |
| `hakuKidoNode3` | **Kido Node** | Kido | Node | Lv 1 | 2 SP | None |
| `burstRush` | **Burst Rush** | Kido | Skill | Lv 8 | 10 SP | HAKUDA 200, KIDO 80 |
| `hakuKidoNode4` | **Kido Node** | Kido | Node | Lv 1 | 2 SP | None |
| `godFist` | **God Fist** | Kido | Ultimate | Lv 8 | 13 SP | HAKUDA 315, KIDO 85 |
| `dragonLash` | **Dragonlash** | Hakuda | Skill | Lv 8 | 7 SP | HAKUDA 56 |
| `hardPressure` | **Hard Pressure** | Hakuda | Passive | Lv 1 | 3 SP | HAKUDA 76 |
| `hakudaNode2` | **Hakuda Node** | Hakuda | Node | Lv 1 | 2 SP | None |
| `dustKick` | **Dust Kick** | Hakuda | Skill | Lv 8 | 8 SP | HAKUDA 112 |
| `boxerFootwork` | **Boxer's Footwork** | Hakuda | Passive | Lv 1 | 3 SP | HAKUDA 168 |
| `dropKick` | **Drop Kick** | Hakuda | Skill | Lv 8 | 8 SP | HAKUDA 144 |
| `breakerFist` | **Breaker Fist** | Hakuda | Skill | Lv 8 | 8 SP | HAKUDA 200 |
| `shoulderThrow` | **Shoulder Throw** | Hakuda | Passive | Lv 1 | 6 SP | HAKUDA 240 |
| `hakudaNode3` | **Hakuda Node** | Hakuda | Node | Lv 1 | 2 SP | None |
| `fighterTempo` | **Fighter's Tempo** | Hakuda | Skill | Lv 8 | 7 SP | HAKUDA 240 |
| `sweepKick` | **Sweep Kick** | Hakuda | Skill | Lv 8 | 9 SP | HAKUDA 260 |
| `tempestCombo` | **Tempest Combo** | Hakuda | Skill | Lv 8 | 10 SP | HAKUDA 300 |
| `hakudaNode4` | **Hakuda Node** | Hakuda | Node | Lv 1 | 2 SP | None |
| `groundSlam` | **Ground Slam** | Hakuda | Skill | Lv 8 | 10 SP | HAKUDA 375 |
| `spiritBreaker` | **Spirit Breaker** | Hakuda | Passive | Lv 8 | 6 SP | HAKUDA 340 |
| `spiritBreakerCannon` | **Spirit Breaking Cannon** | Hakuda | Ultimate | Lv 8 | 12 SP | HAKUDA 400 |
| `aerialFlip` | **Aerial Flip** | Speed | Skill | Lv 8 | 7 SP | HAKUDA 100, SPEED 15 |
| `hakuSpeedNode1` | **Speed Node** | Speed | Node | Lv 1 | 2 SP | None |
| `flashKick` | **Flash Kick** | Speed | Skill | Lv 8 | 3 SP | HAKUDA 130, SPEED 20 |
| `hakuSpeedNode2` | **Speed Node** | Speed | Node | Lv 1 | 2 SP | None |
| `punisherDrive` | **Punisher Drive** | Speed | Skill | Lv 8 | 8 SP | HAKUDA 185, SPEED 50 |
| `flashStrike` | **Flash Strike** | Speed | Skill | Lv 8 | 9 SP | HAKUDA 155, SPEED 65 |
| `blur` | **Blur** | Speed | Passive | Lv 1 | 4 SP | HAKUDA 180, SPEED 90 |
| `hakuSpeedNode3` | **Speed Node** | Speed | Node | Lv 1 | 2 SP | None |
| `fightBack` | **Fight Back** | Speed | Passive | Lv 1 | 4 SP | HAKUDA 195, SPEED 65 |
| `flashCounter` | **Flash Counter** | Speed | Skill | Lv 8 | 8 SP | HAKUDA 250, SPEED 100 |
| `hakuSpeedNode4` | **Speed Node** | Speed | Node | Lv 1 | 2 SP | None |
| `incinerator` | **Incinerator** | Speed | Skill | Lv 8 | 9 SP | HAKUDA 250, SPEED 100 |
| `executioner` | **Executioner** | Strength | Passive | Lv 1 | 3 SP | HAKUDA 115, STRENGTH 5 |
| `hakuStrengthNode1` | **Strength Node** | Strength | Node | Lv 1 | 2 SP | None |
| `suplex` | **Bone Breaker** | Strength | Skill | Lv 8 | 8 SP | HAKUDA 115, STRENGTH 28 |
| `theUnderdog` | **The Underdog** | Strength | Passive | Lv 1 | 3 SP | HAKUDA 115, STRENGTH 28 |
| `swingingThrow` | **Swinging Throw** | Strength | Skill | Lv 8 | 8 SP | HAKUDA 120, STRENGTH 54 |
| `hakuStrengthNode2` | **Strength Node** | Strength | Node | Lv 1 | 2 SP | None |
| `deathFist` | **Death Fist** | Strength | Skill | Lv 8 | 11 SP | HAKUDA 200, STRENGTH 100 |
| `hakuStrengthNode3` | **Strength Node** | Strength | Node | Lv 1 | 2 SP | None |
| `muscleUp` | **Muscle Up** | Strength | Skill | Lv 8 | 7 SP | HAKUDA 160, STRENGTH 60 |
| `grapplerGambit` | **Elbow Drop** | Strength | Skill | Lv 8 | 6 SP | HAKUDA 188, STRENGTH 60 |
| `jaguarRush` | **Jaguar Rush** | Strength | Skill | Lv 8 | 10 SP | HAKUDA 200, STRENGTH 80 |
| `hakuStrengthNode4` | **Strength Node** | Strength | Node | Lv 1 | 2 SP | None |
| `screwdriver` | **Screwdriver** | Strength | Ultimate | Lv 8 | 13 SP | HAKUDA 300, STRENGTH 100 |
| `heavyKick` | **Heavy Kick** | Strength | Skill | Lv 8 | 6 SP | STRENGTH 24 |

*(Showing 60 of 260 total skill tree nodes. Full graph available in data/skill-tree.json)*

---

## 5. Equipment Catalog & Modifiers (146 Items)

| Item ID | Name | Slot | Rarity | Level Req | Key Buffs |
|---|---|---|---|---|---|
| `chaos-halo` | **Chaos Halo** | head | Legendary | Lv 60 | +3% Kido Damage; +7 Max Reiatsu; +2.5 Max Health |
| `kings-crown` | **The King's Crown** | head | Legendary | Lv 35 | +2.1% Weapon Damage; +2.1% Hakuda Dmg; +2% Melee Def; +7 Max Health |
| `war-torn-bandana` | **War-Torn Bandana** | head | Legendary | Lv 70 | +2.5% Hakuda Damage; +3.5 Max Reiatsu; +7 Max Health |
| `arctic-explorers-headwrap` | **Arctic Explorer's Headwrap** | head | Rare | Lv 55 | +5 Max Reiatsu; +0.5% Kido Defense |
| `gravewood-helm` | **Gravewood Helm** | head | Rare | Lv 80 | +2% Hakuda damage; +8 Max health |
| `monster-hunters-helmet` | **Monster Hunter's Helmet** | head | Rare | Lv 40 | +3.5% Monster Damage; +2% Kido Defense; +5 Max Posture; +3 Max Health |
| `desert-wanderers-turban` | **Desert Wanderer's Turban** | head | Rare | Lv 88 | +8 Max Health; +2 Shunpo Speed; +3.5 Shunpo Stamina |
| `flower-samurais-straw-hat` | **Flower Samurai's Straw Hat** | head | Rare | Lv 21 | +1% Kido Dmg; +4 Max Rei; +3.5 Shunpo Stam |
| `gunslingers-hat` | **Gunslinger's Hat** | head | Rare | Lv 80 | +3% Kido Damage; +5 Max Reiatsu |
| `sabertooths-headwear` | **Sabertooth's Headwear** | head | Rare | Lv 40 | +2.25% Weapon Damage; +3.5 Max Rei |
| `snowhide-hunters-hat` | **Snowhide Hunter's Hat** | head | Rare | Lv 50 | +2% Weapon Damage; +3 Max Health |
| `umbral-cowl` | **Umbral Cowl** | head | Rare | Lv 70 | +2.75% Kido Dmg; +3% Monster Dmg |
| `vagabonds-scarf-regen` | **Vagabond's Scarf (Regen)** | head | Rare | Lv 15 | +10% Posture Regen |
| `vagabonds-scarf-weapon` | **Vagabond's Scarf (Weapon)** | head | Rare | Lv 15 | +1.5% Weapon Damage |
| `wolfmans-helm` | **Wolfman's Helm** | head | Rare | Lv 14 | +0.75% Melee Defense; +3 Max Health |
| `wraith-helm` | **Wraith Helm** | head | Rare | Lv 1 | +2% Melee Defense; +5 Max Health |
| `researcher-hood` | **Researcher's Hood** | head | Rare | Lv 40 | +6 Max Health; +3% Melee Reiatsu Regen; +4% Posture Regen |
| `exo-trooper-mask` | **Exo-Trooper Mask** | head | Rare | Lv 40 | +3% Kido Defense; +3 Max Posture; +7.5 Max Reiatsu; +0.5% Melee Defense; +5% Sensing Range |
| `tattered-scarf` | **Tattered Scarf** | head | Rare | Lv 55 | +0.5% Movement Speed; +5% Posture Regen; +2% Hakuda Damage |
| `faded-beanie` | **Faded Beanie** | head | Uncommon | Lv 65 | +4% Melee Defense; +2 Max Posture; +3% Kido Defense |
| `ganju-bandana` | **Ganju Bandana** | head | Uncommon | Lv 18 | +3.5 Max Reiatsu |
| `northern-ushanka-goggles` | **Northern Ushanka (Goggles)** | head | Uncommon | Lv 40 | +6 Max Reiatsu |
| `northern-ushanka` | **Northern Ushanka** | head | Uncommon | Lv 40 | +7 Max Health |
| `vintage-leather-hood` | **Vintage Leather Hood** | head | Uncommon | Lv 1 | +3 Shunpo Speed; +8% Posture Regen |
| `angled-white-headband` | **Angled White Headband** | head | Common | Lv 1 | - |
| `beaded-necklace` | **Beaded Necklace** | head | Common | Lv 1 | +0.75% Weapon Damage |
| `fur-collar` | **Fur Collar** | head | Common | Lv 9 | +3 Max Reiatsu |
| `sava-hat` | **Sava Hat** | head | Common | Lv 10 | +1 Max Reiatsu; +1% Kido Damage |
| `soldat-cap` | **Soldat Cap** | head | Common | Lv 1 | +1 Max Reiatsu |
| `striped-blue-hat` | **Striped Blue Hat** | head | Common | Lv 12 | +1 Max Reiatsu; +1% Kido Damage |
| `striped-black-hat` | **Striped Black Hat** | head | Common | Lv 1 | +2.5 Max Reiatsu; +1% Melee Defense |
| `striped-green-hat` | **Striped Green Hat** | head | Common | Lv 1 | +1.75% Kido Damage |
| `striped-red-hat` | **Striped Red Hat** | head | Common | Lv 1 | +1% Kido Damage; +4% Posture Regen |
| `wide-brimmed-hat` | **Wide-Brimmed Hat** | head | Common | Lv 1 | +2 Max Reiatsu |
| `wanderers-bandana` | **Wanderer's Bandana** | head | Common | Lv 1 | +2% Posture Regen |
| `pumpkin-mask` | **Pumpkin Mask** | head | Limited | Lv 40 | +9% Flame Damage; +8 Max Health; +4 Max Reiatsu; +1% Melee Defense; -5% Sensing Range; +6% Monster Damage; +3% Ultimate Gain |
| `witchs-hat` | **Witch's Hat** | head | Limited | Lv 40 | +5.5 Max Reiatsu; +10% Melee Reiatsu Regen; +2.6% Aura Gain; +6.5% Posture Regen |
| `spooky-drapes` | **Spooky Drapes** | head | Limited | Lv 30 | +4% Movement Speed; +6% Kido Defense; +5% Cooldown Reduction; -5% Sensing Range |
| `dullahans-curse` | **Dullahan's Curse** | head | Limited | Lv 1 | +10% Luck; +10% Flame Damage; +7.5% Monster Damage; +5% Movement Speed |
| `pharaohs-headdress` | **Pharaoh's HeadDress** | head | Limited | Lv 40 | +6.6 Max Health; -1.2% Movement Speed; +7 Max Reiatsu |
| `vampire-hunters-sunhat` | **Vampire Hunter's Sunhat** | head | Limited | Lv 40 | +6 Max Health; +2.3% Weapon Damage; +6% Monster Damage; +2 Max Reiatsu |
| `dead-eye-mk-0` | **Dead-Eye Mk. 0** | face | Mythical | Lv 50 | +15% Cooldown reduction; +25% Sensing Range; +8 Max Reiatsu; +20% Melee Reiatsu Regen; +15% Posture Regen |
| `arctic-explorers-goggles` | **Arctic Explorer's Goggles** | face | Rare | Lv 1 | +2.5% Kido Damage |
| `chaos-shades` | **Chaos Shades** | face | Rare | Lv 17 | +0.5% Weapon Damage; +4% Posture Regen; +2.5% Kido Defense |
| `marsh-stalker-headwrap` | **Marsh Stalker Headwrap** | face | Rare | Lv 33 | +1% Hakuda Damage; +5 Shunpo Speed |
| `parasites-mask` | **Parasite's Mask** | face | Rare | Lv 60 | +2.5% Kido Defense; +3.0% Monster Damage |
| `wraith-mask` | **Wraith Mask** | face | Rare | Lv 32 | +5 Max Health; +1.25% Weapon Damage |
| `model-ocu-7-eyepiece` | **Model OCU-7. Eyepiece** | face | Legendary | Lv 55 | +5% Ultimate Gain; +10% Sensing Range; +5 Shunpo Speed; +2% Kido Damage |
| `shai-huluds-scarf` | **Shai Hulud's Scarf** | face | Legendary | Lv 70 | +3% Hakuda Damage; +2% Movement Speed; +2 Max Reiatsu; +4% Monster Damage |
| `white-flight-tape` | **White Flight Tape** | face | Uncommon | Lv 25 | +2.75 Max Reiatsu |
| `black-visor` | **Black Visor** | face | Common | Lv 1 | +0.5% Weapon Damage |
| `black-goggles` | **Black Goggles** | face | Common | Lv 1 | +1 Max Posture; +0.5% Melee Defense |
| `black-blindfold` | **Black Blindfold** | face | Common | Lv 1 | +0.5% Kido Damage; +0.5% Melee Defense |
| `spiritless-robe` | **Spiritless Robe** | body | Limited | Lv 40 | +3% Weapon Damage; +3% Kido Damage; +7 Max Reiatsu; +6 Max Health; +20 Shunpo Speed; +10 Shunpo Stamina |
| `monstrous-trousers` | **Monstrous Trousers** | body | Limited | Lv 40 | +4% Lightning Damage; +3.8% Melee Defense; +4% Posture Regen |
| `battle-damaged-haori` | **Battle-Damaged Haori** | body | Legendary | Lv 85 | +1.5% Weapon Damage; +4% Posture Regen; +13 Max Health |
| `conquerors-trophy` | **Conqueror's Trophy** | body | Legendary | Lv 50 | +3 Max Posture; +12 Max Health |
| `saviors-cape` | **Savior's Cape** | body | Legendary | Lv 90 | +2.3% Weapon Damage; +3 Max Reiatsu; +10 Max Health |
| `zippermaw-puffer` | **Zippermaw Puffer** | body | Legendary | Lv 70 | +20 Max Posture; +10% Posture Regen; +2% Movement Speed; +6 Max Health |
| `arctic-explorers-cape` | **Arctic Explorer's Cape** | body | Rare | Lv 55 | +2% Kido Damage; +4 Max Health |
| `desert-wanderers-cape` | **Desert Wanderer's Cape** | body | Rare | Lv 88 | +8 Max Health; +2 Shunpo Speed; +3.5 Shunpo Stamina |
| `engineers-workwear-no7` | **Engineer's Workwear Issue No. 7** | body | Rare | Lv 85 | +5 Max Reiatsu; +3.25% Kido Defense; +2 Equipment Load |
| `flower-samurais-cape` | **Flower Samurai's Cape** | body | Rare | Lv 21 | +1.75% Kido Damage; +5 Max Reiatsu; +0.25% Kido Defense; +5 Shunpo Stamina |
| `gravewood-warset` | **Gravewood Warset** | body | Rare | Lv 80 | +2.5% Hakuda Damage; +4 Max Health; +4 Max Reiatsu; +2% Melee Defense |
| `gunslingers-tunic` | **Gunslinger's Tunic** | body | Rare | Lv 80 | +2% Kido Damage; +4 Max Reiatsu; +7 Max Health |
| `monster-hunters-armor` | **Monster Hunter's Armor** | body | Rare | Lv 40 | +4.5% Monster Damage; +3% Kido Defense; +10 Max Posture; +5 Max Health |
| `snowhide-hunters-tunic` | **Snowhide Hunter's Tunic** | body | Rare | Lv 50 | +2% Weapon Damage; +2% Hakuda Damage; +1% Melee Defense; +2 Equipment Load |
| `tattered-robe` | **Tattered Robe** | body | Rare | Lv 33 | +0.75% Movement Speed; +8 Shunpo Stamina; +5% Flame Damage; +3 Shunpo Speed |
| `vintage-plaid-jacket` | **Vintage Plaid Jacket** | body | Rare | Lv 1 | +3 Shunpo Speed; +6% Posture Regen |
| `vintage-leather-jacket` | **Vintage Leather Jacket** | body | Rare | Lv 1 | +3 Shunpo Speed; +8% Posture Regen |
| `warlords-mantle` | **Warlord's Mantle** | body | Rare | Lv 27 | +7 Max Health; +4 Max Posture; +1% Kido Defense |
| `wraith-cape` | **Wraith Cape** | body | Rare | Lv 32 | +4 Max Health; +1.5% Weapon Damage |
| `umbral-drapes` | **Umbral Drapes** | body | Rare | Lv 70 | +8 Reiatsu; +2.5% Monster dmg |
| `researcher-jacket` | **Researcher's Jacket** | body | Rare | Lv 40 | +10 Max Health; +8% Melee Reiatsu Regen; +4% Aura Gain; +6% Posture Regen |
| `exo-trooper-combat-armor` | **Exo-Trooper Combat Armor** | body | Rare | Lv 40 | +9% Kido Defense; +1.5% Melee Defense; +8 Max Reiatsu; +3 Equipment Load; +5 Max Posture |
| `frosted-steel-pauldrons` | **Frosted Steel Pauldrons** | body | Uncommon | Lv 50 | +1% Kido Damage; +1% Melee Defense; +6 Max Health |
| `heavy-duty-vest` | **Heavy Duty Vest** | body | Uncommon | Lv 1 | +3% Melee Defense; +1% Kido Defense |
| `leather-strap` | **Leather Strap** | body | Uncommon | Lv 1 | +0.5% Weapon Damage; +2.5 Max Posture |
| `marsh-stalker-covering` | **Marsh Stalker Covering** | body | Uncommon | Lv 33 | +2% Hakuda Damage; +7.5 Shunpo Stamina |
| `regal-frosted-cape` | **Regal Frosted Cape** | body | Uncommon | Lv 50 | +6 Max Reiatsu; +8 Max Health |
| `samurais-armor` | **Samurai's Armor** | body | Uncommon | Lv 30 | +3 Max Posture; +2% Posture Regen; +1.5% Weapon Damage; +7 Max Health |
| `tattered-frosted-cape` | **Tattered Frosted Cape** | body | Uncommon | Lv 50 | +1.5% Weapon Damage |
| `wide-frosted-cape` | **Wide Frosted Cape** | body | Uncommon | Lv 50 | +2.25% Kido Damage |
| `white-flight-jacket` | **White Flight Jacket** | body | Uncommon | Lv 1 | +2.5 Max Health; +1% Kido Damage |
| `doughy-scarf` | **Doughy Scarf** | body | Common | Lv 1 | +0.5% Kido Defense |
| `spiritless-trousers` | **Spiritless Trousers** | misc | Limited | Lv 40 | +2.5% Weapon Damage; +2.5% Kido Damage; +5 Max Reiatsu; +5 Shunpo Stamina |
| `monstrous-stitches` | **Monstrous Stitches** | misc | Limited | Lv 40 | +5.8% Melee Defense; +3.5% Lightning Damage; +3.5% Posture Regen |
| `tattered-poncho` | **Tattered Poncho** | misc | Legendary | Lv 45 | +2% Kido Damage; +4 Max Reiatsu; +20% Posture Regen; +3.5% Movement Speed |
| `drinking-gourd` | **Drinking Gourd** | misc | Legendary | Lv 70 | +8 Max Reiatsu; +2% Kido Defense |
| `demons-white-gauntlets` | **Demon's White Gauntlets** | misc | Legendary | Lv 90 | +3.6% Hakuda Damage; +5 Max Reiatsu |
| `demons-red-gauntlets` | **Demon's Red Gauntlets** | misc | Legendary | Lv 90 | +3.6% Hakuda Damage; +8 Max Health |
| `devils-royal-gauntlets` | **Devil's Royal Gauntlets** | misc | Legendary | Lv 50 | +3.5% Hakuda Damage |
| `devils-red-gauntlets` | **Devil's Red Gauntlets** | misc | Legendary | Lv 50 | +2.5% Hakuda Damage; +4 Max Health |
| `devils-blue-gauntlets` | **Devil's Blue Gauntlets** | misc | Legendary | Lv 50 | +2.5% Hakuda Damage; +1% Kido Defense |
| `devils-purple-gauntlets` | **Devil's Purple Gauntlets** | misc | Legendary | Lv 50 | +2.5% Hakuda Damage; +3 Max Reiatsu |
| `monkey-head` | **Monkey Head** | misc | Legendary | Lv 60 | +1.5% Weapon Damage; +4 Max Health; +2.5 Max Reiatsu; +5% Posture Regen |
| `desert-wanderers-sash` | **Desert Wanderer's Sash** | misc | Rare | Lv 88 | +7.5 Max Health; +1.5 Shunpo Speed; +2.5 Shunpo Stamina |
| `engineers-cape-no7` | **Engineer's Cape Issue No. 7** | misc | Rare | Lv 85 | +4 Max Reiatsu; +3% Kido Defense |
| `gunslingers-scarf` | **Gunslinger's Scarf** | misc | Rare | Lv 80 | +1% Kido Damage; +3 Max Reiatsu; +3 Max Health |
| `vintage-jeans` | **Vintage Jeans** | misc | Rare | Lv 80 | - |
| `warriors-pauldron-right` | **Warrior's Pauldron (Right)** | misc | Rare | Lv 70 | +3 Max Health; +3% Melee Defense |
| `warriors-pauldron-left` | **Warrior's Pauldron (Left)** | misc | Rare | Lv 70 | +9 Max Health; +2% Melee Defense |
| `wolfmans-greaves` | **Wolfman's Greaves** | misc | Rare | Lv 14 | +1% Melee Def; +2 Max Rei; +0.25% Weapon Damage; +0.25 Hakuda Dmg |
| `wraith-pads` | **Wraith Pads** | misc | Rare | Lv 32 | +5 Max Health; +4 Max Posture |
| `researcher-boots` | **Researcher's Boots** | misc | Rare | Lv 40 | +5% Posture Regen; +5 Max Health; +5% Melee Reiatsu Regen; +1.5% Movement Speed |
| `atlas-gauntlets` | **Atlas Gauntlets** | misc | Rare | Lv 40 | +3% Hakuda Damage; +3.5% Kido Damage; +5 Max Reiatsu |
| `exo-trooper-shoulder-pads` | **Exo-Trooper Shoulder Pads** | misc | Rare | Lv 40 | +1% Melee Defense; +4.5% Kido Defense; +5 Max Reiatsu |
| `electrified-arm-chains` | **Left/Right Electrified Arm Chains** | misc | Uncommon | Lv 1 | +1.5% Posture Regen; +1.5% Kido Defense; +4% Lightning Damage |
| `samurais-waist-guards` | **Samurai's Waist Guards** | misc | Uncommon | Lv 30 | +3.5 Max Health; +1.5% Melee Defense; +1.5% Kido Defense |
| `steel-grey-pauldrons` | **Steel Grey Pauldrons** | misc | Uncommon | Lv 25 | +4 Max Health; +0.5% Melee Defense; +2 Equipment Load |
| `village-guards-gauntlets` | **Village Guard's Gauntlets** | misc | Uncommon | Lv 1 | +2.5% Hakuda Damage |
| `white-flight-bottoms` | **White Flight Bottoms** | misc | Uncommon | Lv 25 | +1.5 Max Posture; +1.5 Max Health; +0.25% Kido Defense |
| `snowhide-hunters-mantle` | **Snowhide Hunter's Mantle** | misc | Uncommon | Lv 1 | - |
| `dog-tags` | **Dog Tags** | misc | Common | Lv 1 | +0.25% Weapon Damage; +1% Kido Defense |
| `arm-chains` | **Left/Right Arm Chains** | misc | Common | Lv 1 | +1.5% Posture Regen; +0.75% Kido Defense |
| `arm-bandages` | **Left/Right Arm Bandages** | misc | Common | Lv 20 | +1% Hakuda Damage; +0.5% Melee Defense |
| `northern-war-skirt` | **Northern War Skirt** | misc | Common | Lv 50 | +2% Weapon Damage |
| `waist-chains` | **Waist Chains** | misc | Common | Lv 1 | +0.75% Kido Damage |
| `wayfarers-satchel` | **Wayfarer's Satchel** | utility | Legendary | Lv 1 | +20 Equipment Load |
| `model-cr-9-gaspack` | **Model CR-9. Gaspack** | utility | Legendary | Lv 50 | +12 Equipment Load; +100% Toxic Fumes Resistance; +5 Max Reiatsu; +2 Max Posture |
| `researcher-utility-belt` | **Researcher's Utility Belt** | utility | Rare | Lv 40 | +4 Equipment Load; +6% Melee Reiatsu Regen; +10% Posture Regen |
| `respirator` | **Respirator** | utility | Common | Lv 25 | +1 Equipment Load; +3 Max Reiatsu; +100% Toxic Fumes Resistance |
| `utility-backpack` | **Utility Backpack** | utility | Common | Lv 1 | +8 Equipment Load; +2 Max Posture |
| `spiritless-chains` | **Spiritless Chains** | artifact | Limited | Lv 40 | +2% Weapon Damage; +2% Kido Damage; +5 Max Reiatsu; +5 Shunpo Stamina; +10% Movement Speed |
| `the-monsters-screws` | **The Monster's Screws** | artifact | Limited | Lv 40 | +2.5% Lightning Damage; +4.3% Melee Defense; +2.5% Posture Regen |
| `crest-of-the-ascended` | **Crest of the Ascended** | artifact | Mythical | Lv 40 | +3.75% Weapon Damage; +3.75% Kido Damage; +3.75% Hakuda Damage; +5 Shunpo Stamina; +15 Max Health; +8 Max Reiatsu |
| `lucky-ring` | **Lucky Ring** | artifact | Mythical | Lv 20 | +20% luck |
| `supercharged-ring` | **Supercharged Ring** | artifact | Legendary | Lv 50 | +20% Aura Gain; +20% Ultimate Gain |
| `pendant-of-youth` | **Pendant of Youth** | artifact | Legendary | Lv 90 | +10 Max Posture; +12.5 Shunpo Stamina |
| `ashen-pendant` | **Ashen Pendant** | artifact | Rare | Lv 90 | +5 Max Health; +4.5% Flame Damage |
| `fancy-tie` | **Fancy Tie** | artifact | Uncommon | Lv 45 | +0.25% Monster Damage; +2 Max Posture |
| `flower-embraided-tie` | **Flower Embraided Tie** | artifact | Uncommon | Lv 45 | +2 Max Reiatsu; +0.25% Kido Damage |
| `hawaiian-tie` | **Hawaiian Tie** | artifact | Uncommon | Lv 45 | +0.25% Hakuda Damage; +2 Shunpo Stamina |
| `squared-tiled-tie` | **Squared Tiled Tie** | artifact | Uncommon | Lv 45 | +0.25% Weapon Damage; +2 Max Health |
| `ronin-attire` | **Ronin Attire** | body | Rare | Lv 70 | 2.5% Weapon Damage; +7.5 Shunpo Speed; +6 Max Posutre; +4% Movement Speed; +2.5% Melee Defense |
| `ancient-kings-armor` | **Ancient King's Armor** | body | Rare | Lv 50 | +5% Melee Defense; +2.5% Monster Damage |
| `pharaohs-royal-robes` | **Pharaoh's Royal Robes** | body | Limited | Lv 40 | +15 Max Health; -3.5% Movement Speed; +3.35 Max Reiatsu |
| `vampire-hunters-gear` | **Vampire Hunter's Gear** | body | Limited | Lv 40 | +13.4 Max Health; +1.9% Weapon Damage; +6.2% Monster Damage |
| `hide-of-the-hundredth` | **Hide of the Hundredth** | body | Mythical | Lv 100 | +15 Max Health; +3% Melee Defense; +10 Max Posture; +10 Equipment Load; +2% Hakuda Damage; -5% Movement Speed |
| `ronin-mask` | **Ronin Mask** | face | Rare | Lv 70 | +1.5% Weapon Damage; +2.5 Shunpo Speed; +4 Max Posture; +1.5% Movement Speed; +1.5% Melee Defense |
| `pharaohs-wrappings` | **Pharaoh's Wrappings** | face | Limited | Lv 40 | +5.5 Max Health; -2% Movement Speed; +6 Max Reiatsu |
| `vampire-hunters-shades` | **Vampire Hunter's Shades** | face | Limited | Lv 40 | +5.2 Max Health; +1.3% Weapon Damage; +4.3% Monster Damage |
| `screamers-face-mask` | **Screamer's Face Mask** | face | Limited | Lv 40 | +5 Max Health; +1% Weapon Damage |
| `ronin-leggings` | **Ronin Leggings** | misc | Rare | Lv 70 | +2% Weapon Damage; +5 Shunpo Speed; +4 Max Posture; +3% Movement Speed; +1.5% Melee Defense |
| `ancient-kings-greaves` | **Ancient King's Greaves** | misc | Rare | Lv 50 | +3.5% Melee Defense; +2% Monster Damage |
| `vampire-hunters-trench-coat` | **Vampire Hunter's Trench Coat** | misc | Limited | Lv 40 | +4.3 Max Health; +1.6% Weapon Damage; +5.3% Posture Regen; +4% Monster Damage; +2.6 Max Reiatsu |

### Equipment Modifiers
| Modifier ID | Name | Stat Scaled | Available Slots |
|---|---|---|---|
| `ghostly` | **Ghostly** | Kido Defense | head, body, misc, utility |
| `steadfast` | **Steadfast** | Max Posture | head, face, body, misc |
| `sturdy` | **Sturdy** | Melee Defense | head, body, misc, artifact |
| `spacious` | **Spacious** | Equipment Load | body, misc, utility, artifact |
| `quick` | **Quick** | Posture Regen | head, body, misc |
| `swift` | **Swift** | Shunpo Speed | head, body, misc, artifact |
| `tireless` | **Tireless** | Shunpo Stamina | head, body, misc |
| `voluminous` | **Voluminous** | Max Reiatsu | head, body, misc |
| `deadly` | **Deadly** | Weapon Dmg | head, face, body, misc, utility, artifact |
| `precise` | **Precise** | Kido Dmg | head, face, body, utility, artifact |
| `vibrant` | **Vibrant** | Max Health | head, face, body, misc, artifact, utility |
| `menacing` | **Menacing** | Hakuda Dmg | head, face, body, misc, utility, artifact |
| `beast-slayer` | **Beast Slayer** | Monster Dmg | head, face, body, misc, utility, artifact |
| `celestial` | **Celestial** | Max Rei, Health | Kido, Melee Def | Posture regen | head, face, body, misc, utility, artifact |

---

## 6. Weapons & Zanpakuto Modular Parts (20 Weapons, 31 Parts)

### Weapons
| ID | Name | Damage | Type | Attack Speed | Posture Damage | Crit CD |
|---|---|---|---|---|---|---|
| `katana-sword` | **Katana / Sword** | 13 | weapon | Fast | 13 | 7s |
| `greataxe` | **Greataxe** | 17.3 | weapon | Slow | 16.2 | 8.5s |
| `scythe` | **Scythe** | 15 | weapon | Slow | 14 | 6s |
| `hammer` | **Hammer** | 16 | weapon | Very Slow | 17 | 8s |
| `odachi-longsword` | **Odachi / Longsword** | 12.6 | weapon | Fast | 12.6 | 8.25s |
| `greatsword` | **Greatsword** | 18 | weapon | Very Slow | 17 | 7.5s |
| `spear` | **Spear** | 12.25 | weapon | Average | 15 | 6.5s |
| `club` | **Club** | 17 | weapon | Very Slow | 18 | 7.5s |
| `tanto` | **Tanto** | 12.6 | weapon | Fast | 12.6 | 9s |
| `dual-blades` | **Dual Blades** | 16 | weapon | Average | 15 | 5s |
| `lance` | **Lance** | 17 | weapon | Extremely Slow | 18 | 10s |
| `minigun` | **Minigun** | 15 | weapon | Very Slow | 15 | 7s |
| `rapier` | **Rapier** | 13.5 | weapon | Average | 13.5 | 7.2s |
| `rifle` | **Rifle** | 12.8 | weapon | Average | 12.8 | 10s |
| `greatsword-sweep` | **Greatsword (Sweep)** | 15.5 | weapon | Slow | 15.5 | 7.5s |
| `boxing` | **Boxing** | 12.75 | hakuda | Average | 12.5 | 12s |
| `fists` | **Fists** | 12.25 | hakuda | Average | 12.25 | 7.75s |
| `karate` | **Karate** | 13 | hakuda | Slow | 12.25 | 10s |
| `muay-thai` | **Muay Thai** | 12.75 | hakuda | Average | 13 | 8s |
| `wrestling` | **Wrestling** | 15.5 | hakuda | Slow | 15.5 | 7.5s |

### Zanpakuto Parts
| ID | Name | Part Type | Rarity | Buffs |
|---|---|---|---|---|
| `star-guard` | **Star Guard** | guard | Rare | +2.5% Weapon Damage; -20.0% Melee Reiatsu Regen |
| `curved-guard` | **Curved Guard** | guard | Rare | +2.0% Weapon Damage; -2.0% Posture Damage (Wep.) |
| `pincer-guard` | **Pincer Guard** | guard | Rare | +2.0% Kido Damage; -2.0% Posture Damage (Wep.) |
| `saber-guard-alt` | **Saber Guard Alt.** | guard | Rare | +2.0 Shunpo Stamina; +5.0 Shunpo Speed |
| `switch-guard` | **Switch Guard** | guard | Uncommon | +4.0 Posture; -2.0% Posture Damage (Wep.) |
| `wide-guard` | **Wide Guard** | guard | Uncommon | +3.0% Posture Damage (Wep.); -2.0% Weapon Damage |
| `saber-guard` | **Saber Guard** | guard | Uncommon | +2.5 Shunpo Stamina |
| `sun-guard` | **Sun Guard** | guard | Uncommon | +0.5% Flame Damage |
| `fur-guard` | **Fur Guard** | guard | Uncommon | +1.5% Posture Damage (Wep.) |
| `fur-guard-alt` | **Fur Guard Alt.** | guard | Uncommon | -2.0% Weapon Damage; +6.0% Posture Damage (Wep.) |
| `claw-guard` | **Claw Guard** | guard | Uncommon | +2.0 Posture |
| `extrusion-guard` | **Extrusion Guard** | guard | Common | +4.0% Melee Reiatsu Regen; -1.0% Posture Damage (Wep.) |
| `twister-model` | **Twister Model** | handle | Common | +3.0% Posture Regen |
| `centipede-model` | **Centipede Model** | handle | Common | +2.0 Posture; -0.5% Weapon Damage |
| `diamond-model-alt` | **Diamond Model Alt.** | handle | Common | +2.0 Reiatsu |
| `wave-model` | **Wave Model** | handle | Common | +3.5% Posture Regen; +1.0 Posture |
| `sphere-hilt` | **Sphere Hilt** | hilt | Rare | +2% Posture Damage (Hakuda); -2% Weapon Damage |
| `extruded-hilt` | **Extruded Hilt** | hilt | Rare | +3% Posture Damage; -2% Weapon Damage |
| `flat-hilt` | **Flat Hilt** | hilt | Rare | +7.5 Reiatsu; -2.0% Weapon Damage |
| `wyvern-hilt` | **Wyvern Hilt** | hilt | Rare | +0.5% Weapon Damage; +1.2% Flame Damage; -0.2% Kido Defense |
| `feathered-hilt` | **Feathered Hilt** | hilt | Uncommon | +2.0% Posture Damage (Wep.); -5.0 Reiatsu |
| `standard-hilt-alt` | **Standard Hilt Alt.** | hilt | Common | +2.0% Melee Reiatsu Regen |
| `segmented-bonds` | **Segmented Bonds** | sheathe | Rare | +2.0% Posture Regen; +2.0% Melee Reiatsu Regen |
| `heavy-bindings` | **Heavy Bindings** | sheathe | Rare | +2.0 Posture; +0.2% Melee Defense |
| `iron-studs` | **Iron Studs** | sheathe | Rare | +1.0% Posture Damage (Wep.); +0.5% Weapon Damage |
| `serpent-coil` | **Serpent Coil** | sheathe | Uncommon | +1.5 Shunpo Speed |
| `iron-cap` | **Iron Cap** | sheathe | Uncommon | +0.5% Melee Defense |
| `lucky-charm` | **Lucky Charm** | sheathe | Common | +3.0% Melee Reiatsu Regen |
| `upper-bond` | **Upper Bond** | sheathe | Common | +1.0 Posture |
| `single-ring` | **Single Ring** | sheathe | Common | +1.5 Reiatsu |
| `warriors-knot` | **Warrior's Knot** | sheathe | Common | +0.8% Posture Damage (Wep.) |

---

## 7. Abilities & Essences (25 Abilities, 14 Essences)

### Race Abilities
| ID | Name | Race | Rarity | Variants |
|---|---|---|---|---|
| `the-visionary` | **The Visionary** | quincy | Legendary | Standard |
| `the-superstar` | **The Superstar** | quincy | Legendary | Standard |
| `the-heat` | **The Heat** | quincy | Rare | Darkheart |
| `the-necromancer` | **The Necromancer** | quincy | Rare | Frost Lord |
| `the-dimensional` | **The Dimensional** | quincy | Uncommon | 2099 |
| `the-thunderbolt` | **The Thunderbolt** | quincy | Uncommon | Dragon Thunder, Blue Jets |
| `the-blademaster` | **The Blademaster** | quincy | Common | Heavenly |
| `the-iron` | **The Iron** | quincy | Common | Ruby, Opal, Amethyst, Emerald, Diamond, Sapphire |
| `blooming-madness` | **Blooming Madness** | soul-reaper | Legendary | Standard |
| `senbonzakura` | **Senbonzakura** | soul-reaper | Legendary | Normal, Katana |
| `demon-light` | **Demon Light** | soul-reaper | Rare | Standard |
| `ink` | **Ink** | soul-reaper | Rare | Standard |
| `waypoint` | **Waypoint** | soul-reaper | Rare | Gateway, Cosmic |
| `flame` | **Flame** | soul-reaper | Uncommon | Bluebell |
| `ice` | **Ice** | soul-reaper | Uncommon | Red Ice |
| `wood` | **Wood** | soul-reaper | Common | Black Wood, Birch, Pink Ivory, Mahogony |
| `reversal` | **Reversal** | soul-reaper | Common | Standard |
| `praying-mantis` | **Praying Mantis** | hollow | Legendary | Standard |
| `los-lobos` | **Los Lobos** | hollow | Legendary | Standard |
| `anger` | **Anger** | hollow | Rare | Gamma, Shifter |
| `shark` | **Shark** | hollow | Rare | Blood In The Water |
| `ritualist-fury` | **Ritualist / Fury** | hollow | Rare | Elastic |
| `electro` | **Electro** | hollow | Uncommon | Lightning, Electruple |
| `luminosity` | **Luminosity** | hollow | Uncommon | Energy, Ultraviolet |
| `frozen-haze` | **Frozen Haze** | hollow | Common | Cursed, Rewritten |

### Essences
| ID | Name | Race Req | Cost | Stat Prerequisites |
|---|---|---|---|---|
| `qual-kreis` | **Qual Kreis** | quincy | 9 | KIDO 360 |
| `kurohitsugi` | **Kurohitsugi** | soul-reaper | 9 | KIDO 360 |
| `gran-ray-cero` | **Gran Rey Cero** | hollow | 9 | KIDO 360 |
| `flowing-gradient` | **Flowing Gradient** | Any | 4 | STRENGTH 300 |
| `precision-slicer` | **Precision Slicer** | Any | 4 | SPEED 275 |
| `radiant-edge` | **Radiant Edge** | Any | 4 | KIDO 125 |
| `enduring-heel` | **Enduring Heel** | Any | - | HAKUDA 200 |
| `gravity-thrust` | **Gravity Thrust** | Any | 4 | KIDO 160 |
| `raging-grasp` | **Raging Grasp** | Any | - | STRENGTH 250 |
| `petal-flurry` | **Petal Flurry** | Any | 4 | SPEED 135 |
| `splitting-standstill` | **Splitting Standstill** | Any | 4 | SPEED 300 |
| `one-inch-punch` | **One Inch Punch** | Any | 5 | HAKUDA 160, STRENGTH 55 |
| `slicing-dropkick` | **Slicing Dropkick** | Any | 4 | SPEED 50, STRENGTH 50 |
| `slaying-drive` | **Slaying Drive** | Any | 4 | SPEED 90, STRENGTH 90 |

---

## 8. Clans & Hollow Traits (40 Clans, 13 Traits)

### Clans
| ID | Name | Race | Rarity | Drop % | Buffs |
|---|---|---|---|---|---|
| `eisenhauer` | **Eisenhauer** | quincy | Legendary | 1% | Gain a metal arm; +3.0% Melee Defense; +5.0 Posture; +0.5% Hakuda DMG |
| `kurosaki` | **Kurosaki** | quincy | Legendary | 1% | +2.0 Reiatsu; +2.0% Weapon DMG; +5.0 Shunpo Speed |
| `le-vaar` | **Le Vaar** | quincy | Legendary | 1% | Be able to proc poison damage upon dealing heavy amounts of damage, flourishing and guardbreaking enemies; Your traversal sprint is now 15% faster and has a new animation; Gain 5% extra poison damage; +5.0% Movement Speed; +15.0% Toxic Fumes Res. |
| `frosthauch` | **Frosthauch** | quincy | Legendary | 1% | +3.0% Kido Defense; +2.8% Kido Damage |
| `de-masculine` | **De Masculine** | quincy | Legendary | 1% | You gain extra size; +5.0% Aura Gain; +5.0% Ultimate Gain |
| `lloyd` | **Lloyd** | quincy | Rare | 9% | Gives you a third eye (cosmetic); Gain access to all Sensory passives free of cost; +5.0 Posture; +0.1 Max AP; +1.5% Cooldown Reduction |
| `parnkgjas` | **Parnkgjas** | quincy | Rare | 9% | +3.5% Kido Defense; +1.0% Melee Defense |
| `ishida` | **Ishida** | quincy | Rare | 9% | +2.0% Kido Damage; +5.0 Shunpo Stamina |
| `haschwalth` | **Haschwalth** | quincy | Rare | 9% | +2.5% Kido DMG |
| `kraus` | **Kraus** | quincy | Uncommon | 30% | +1.5% Melee Defense; +1.0% Kido Defense |
| `wernarr` | **Wernarr** | quincy | Uncommon | 30% | +5.0 Health; +2.5% Posture Regen |
| `schulte` | **Schulte** | quincy | Common | 60% | +5.0 Equipment Load |
| `richter` | **Richter** | quincy | Common | 60% | +1.0% Weapon DMG; +2.5 Posture |
| `komamura` | **Komamura** | soul-reaper | Legendary | 1% | You become a wolfman; +4% Melee Defense; +1% Weapon Damage; -2% Kido Defense |
| `shihoin` | **Shihoin** | soul-reaper | Legendary | 1% | +12.5 Shunpo Stamina; +5 Shunpo Speed; +0.5% Lightning Damage; +0.5% Hakuda Damage |
| `kurotsuchi` | **Kurotsuchi** | soul-reaper | Legendary | 1% | Spirit charm overflow takes less health (4%); +1.5% Kido Defense; +5 Reiatsu |
| `kurosaki-soul-reaper` | **Kurosaki** | soul-reaper | Legendary | 1% | Gain access to all Sensory passives free of cost; +2.0 Reiatsu; +2.0% Weapon Damage; +2.5% Movement Speed; +5.0 Shunpo Speed |
| `zaraki` | **Zaraki** | soul-reaper | Legendary | 1% | You gain extra size; +3.5% Aura Gain; +2.5% Weapon Damage; +3.0% Posture Damage (Wep.) |
| `urahara` | **Urahara** | soul-reaper | Legendary | 1% | You now get a 20% bigger window for perfect casting SR kido abilities; +3.0% Melee Reiatsu Regen; +2.5% Kido Damage; +3.5 Reiatsu |
| `kuchiki` | **Kuchiki** | soul-reaper | Rare | 9% | +3% Kido Damage |
| `yamamoto` | **Yamamoto** | soul-reaper | Rare | 9% | +2% Weapon Damage; +5 Shunpo Stamina |
| `hitsugaya` | **Hitsugaya** | soul-reaper | Rare | 9% | +3 Reiatsu; +2.5% Kido Defense |
| `sakahone` | **Sakahone** | soul-reaper | Rare | 9% | You execute enemies 25% faster; +2.1% Weapon Damage |
| `tosen` | **Tosen** | soul-reaper | Rare | 9% | Be able to see enemies during their Shunpo using sense; +15.0% Sensing Range; +4.5% Melee Reiatsu Regen |
| `abarai` | **Abarai** | soul-reaper | Uncommon | 30% | Gain bushier eyebrows (akin to Renji); +5.0 Health; +2.5% Posture Regen |
| `madarame` | **Madarame** | soul-reaper | Common | 60% | +5 Equipment Load |
| `matsumoto` | **Matsumoto** | soul-reaper | Common | 60% | +5 Reiatsu |
| `aaroniero` | **Aaroniero** | hollow | Legendary | 1% | Changes your head into a jar; +2% Kido DMG; +5.0 Reiatsu; +0.5% Kido Defense |
| `cifer` | **Cifer** | hollow | Legendary | 1% | Turns your skin completely white; +20% Longer Ressureccion; +2.0% Kido DMG; +25% Melee Reiatsu Regen; +2.5 Shunpo Stamina |
| `chelute` | **Chelute** | hollow | Legendary | 1% | Changes your head into a skull; +2.5% Weapon Damage; +5.0 Health; +1.0% Melee Defense |
| `kurosaki-hollow` | **Kurosaki** | hollow | Legendary | 1% | Gain access to all Sensory passives free of cost; +2.0 Reiatsu; +2.0% Weapon Damage; +2.5% Movement Speed; +5.0 Shunpo Speed |
| `starrk` | **Starrk** | hollow | Legendary | 1% | Your cero now fires from chest instead of your head; +5.0% Cooldown Reduction; +2.1 Shunpo Stamina; +2.1 Shunpo Speed; +2.1 Reiatsu |
| `jaegerjaquez` | **Jaegerjaquez** | hollow | Rare | 9% | +3.0% Hakuda DMG; +3.0 Shunpo Stamina |
| `antenor` | **Antenor** | hollow | Rare | 9% | +1.5% Lightning DMG; +7.5% Posture Regen |
| `kufang` | **Kufang** | hollow | Rare | 9% | +2.5% Weapon DMG; +0.5% Kido Defense |
| `llargo` | **Llargo** | hollow | Rare | 9% | You gain extra size; -4.0% Movement Speed; +0.1 Max AP; +2.0 Health; +2.5% Hakuda Damage |
| `lousienbairn` | **Lousienbairn** | hollow | Uncommon | 30% | +5.0 Health; +3.5 Posture |
| `gingerbuck` | **Gingerbuck** | hollow | Uncommon | 30% | +2.0% Melee Defense; +2.5 Posture |
| `murciellago` | **Murciellago** | hollow | Common | 60% | +5.0 Shunpo Stamina; +5.0 Shunpo Speed |
| `calius` | **Calius** | hollow | Common | 60% | +5.0 Equipment Load |

### Hollow Traits
| ID | Name | Active Buffs & Effects |
|---|---|---|
| `tentacles` | **Tentacles** | 16% chance to inflict poison damage on melee attacks; -1% Weapon damage |
| `skinny` | **Skinny** | +7.5% Movement Speed; -1.2% Melee Defense |
| `wings` | **Wings** | +3% Movement Speed; +5% Shunpo Stamina; +3% Shunpo Speed |
| `deadly-claws` | **Deadly Claws** | +3% Hakuda Damage; +0.1 Max AP |
| `iron-skin` | **Iron Skin** | +4% Melee Defense; +35% Posture Regen |
| `horns` | **Horns** | Increased cero width of 35%; Increased cero length of 10% |
| `exoskeleton` | **Exoskeleton** | +2% Melee Defense; +5 Posture; 15% Bigger healthpack from Resurrection; -2% Movement Speed |
| `innocuous-presence` | **Innocuous Presence** | Your name is hidden; Your reiatsu signature is hidden; Resurrection duration increased by 20s; +5% Movement Speed |
| `back-scales` | **Back Scales** | Cero Charges 12% Faster; Resurrection duration increased by 45s; Cero damage reduced by 5% |
| `giant` | **Giant** | +5% Melee Defense; +2% Kido defense; -5% Movement Speed |
| `energized` | **Energized** | +2% Kido Damage; Weapon (not fist) damage slightly scales off your kido stat |
| `dense-muscles` | **Dense Muscles** | +1% Weapon Damage; +1% Hakuda Damage; Resurrection duration increased by 45s |
| `tailbone` | **Tailbone** | Increased cero damage by 20%; Cero is 25% thinner |

---

## 9. Buffs, Ascension Tiers & Shrines

### Ascension Tiers
| ID | Name | Modifiers |
|---|---|---|
| `ascension-1` | **Ascension 1** | monster-damage: +1.5%, equipment-load: +12, exp-gain: +15% |
| `ascension-2` | **Ascension 2** | monster-damage: +2.5%, equipment-load: +16, exp-gain: +21.5% |
| `ascension-3` | **Ascension 3** | monster-damage: +3.8%, equipment-load: +20, exp-gain: +28% |

### Gauntlets
| ID | Name | Modifiers |
|---|---|---|
| `bad-dream` | **Bad Dream** | equipment-load: +3 |
| `war-master` | **War Master** | weapon-damage: +1%, hakuda-damage: +1% |
| `beastslayer` | **Beastslayer** | monster-damage: +2.5% |
| `the-unparalleled` | **The Unparalleled** | cooldown-reduction: +1.8%, shunpo-stamina: +5 |
| `the-other-side` | **The Other Side** | reiatsu: +5, health: +2.5 |

---

## 🔗 Online Share Links
Builds created by this toolkit generate official Cloudflare Worker share URLs compatible with the live web app:
`https://vvcharmmerges.pages.dev/builder?build=<id>`
