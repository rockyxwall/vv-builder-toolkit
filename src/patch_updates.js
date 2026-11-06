/**
 * src/patch_updates.js
 * Merges official game updates from developer announcements (v5.0 - v5.2)
 * into VV Builder core datasets.
 */

function applyUpdates(data) {
  const meta = data.meta || {};
  meta.lastUpdatedWithPatch = '2026-11-06';
  meta.patchVersion = 'v5.2 (HolloVVeen & Shunko)';

  // ---------------------------------------------------------
  // 1. CLANS
  // ---------------------------------------------------------
  const newClans = {
    Shinigami: [
      {
        id: 'cl_tosen',
        name: 'Tosen',
        rarity: 'Rare',
        buffs: [
          'Sensing allows viewing highlights of players and a flashstep trail',
          '+5.0 Shunpo Speed',
          '+2.0% Melee Defense'
        ]
      },
      {
        id: 'cl_sakahone',
        name: 'Sakahone',
        rarity: 'Rare',
        buffs: [
          '+2.5% Kido Defense',
          '+5.0 Posture',
          '+8 Max Health'
        ]
      },
      {
        id: 'cl_urahara',
        name: 'Urahara',
        rarity: 'Legendary',
        buffs: [
          'Larger perfect cast windows on SR Kido Skills',
          '+2.5% Kido Damage',
          '+2.0 Max Reiatsu'
        ]
      },
      {
        id: 'cl_zaraki',
        name: 'Zaraki',
        rarity: 'Legendary',
        buffs: [
          '+3.5% Weapon Damage',
          '+5.0 Max Posture',
          '+10.0 Max Health'
        ]
      },
      {
        id: 'cl_kurosaki_shinigami',
        name: 'Kurosaki (Universal)',
        rarity: 'Legendary',
        buffs: [
          'Universal Clan available to all factions',
          'Custom orange hair cosmetic',
          '+2.0 Reiatsu',
          '+2.0% Weapon DMG',
          '+5.0 Shunpo Speed'
        ]
      }
    ],
    Quincy: [
      {
        id: 'cl_le_vaar',
        name: 'Le Vaar',
        rarity: 'Legendary',
        buffs: [
          'Increased roaming speed and secret technique roaming animation',
          '+5.0 Shunpo Speed',
          '+2.0% Weapon DMG'
        ]
      },
      {
        id: 'cl_de_masculine',
        name: 'De Masculine',
        rarity: 'Rare',
        buffs: [
          '+3.0% Hakuda DMG',
          '+4.0 Posture',
          '+6.0 Max Health'
        ]
      },
      {
        id: 'cl_frosthauch',
        name: 'Frosthauch',
        rarity: 'Legendary',
        buffs: [
          'Halloween themed clan cosmetic',
          '+2.5% Melee Defense',
          '+2.0 Max Reiatsu',
          '+4.0 Max Posture'
        ]
      }
    ],
    Hollow: [
      {
        id: 'cl_llargo',
        name: 'Llargo',
        rarity: 'Rare',
        buffs: [
          '+3.0% Melee Defense',
          '+6.0 Max Health',
          '+4.0 Max Posture'
        ]
      },
      {
        id: 'cl_starrk',
        name: 'Starrk',
        rarity: 'Legendary',
        buffs: [
          'Chest-firing Cero variant',
          'Compatible with Starrk Dual Swords',
          '+2.5% Weapon DMG',
          '+2.0 Max Reiatsu'
        ]
      },
      {
        id: 'cl_kurosaki_hollow',
        name: 'Kurosaki (Universal)',
        rarity: 'Legendary',
        buffs: [
          'Universal Clan available to all factions',
          'Custom orange hair cosmetic',
          '+2.0 Reiatsu',
          '+2.0% Weapon DMG',
          '+5.0 Shunpo Speed'
        ]
      }
    ]
  };

  // Update existing Quincy Kurosaki description
  const quincyKurosaki = (data.clans.Quincy || []).find(c => c.id === 'cl_kurosaki');
  if (quincyKurosaki) {
    quincyKurosaki.name = 'Kurosaki (Universal)';
    if (!quincyKurosaki.buffs.includes('Custom orange hair cosmetic')) {
      quincyKurosaki.buffs.push('Universal Clan available to all factions', 'Custom orange hair cosmetic');
    }
  }

  // Update Shihoin description
  const shinigamiShihoin = (data.clans.Shinigami || []).find(c => c.id === 'cl_shihoin');
  if (shinigamiShihoin) {
    if (!shinigamiShihoin.buffs.some(b => b.includes('cat ears'))) {
      shinigamiShihoin.buffs.push('Custom fast sprint animation, idle animation, cat ears and tail');
    }
  }

  for (const [race, clansToAdd] of Object.entries(newClans)) {
    data.clans[race] = data.clans[race] || [];
    for (const clan of clansToAdd) {
      if (!data.clans[race].some(c => c.id === clan.id)) {
        data.clans[race].push(clan);
      }
    }
  }

  // ---------------------------------------------------------
  // 2. SPIRIT CHARMS
  // ---------------------------------------------------------
  const newCharms = [
    {
      id: 'charm_bully',
      title: 'Bully',
      tier: 'Tier 3',
      desc: 'Dominates weaker opponents without mercy.',
      buffs: [
        'Findable in PVP / Hueco Mundo pool',
        'Deals increased damage and posture damage against opponents with lower current health percentage'
      ],
      nerfs: []
    },
    {
      id: 'charm_the_boogeyman',
      title: 'The Boogeyman',
      tier: 'Tier 3',
      desc: 'A lurking nightmare striking from the dark.',
      buffs: [
        'Findable in PVP / Hueco Mundo pool',
        'Striking enemies from behind or from stealth applies Terror status and heightens critical damage'
      ],
      nerfs: []
    },
    {
      id: 'charm_monster_slayer',
      title: 'Monster Slayer',
      tier: 'Tier 3',
      desc: 'Honed specifically to slay titanic horrors.',
      buffs: [
        'Drops from Lanza and Zatoichi boss encounters',
        'Increases damage dealt and damage resistance against giant hollows, raid bosses, and world bosses'
      ],
      nerfs: []
    },
    {
      id: 'charm_dead_man_walking',
      title: 'Dead Man Walking',
      tier: 'Tier 4 (HolloVVeen Limited)',
      desc: 'Refuses to succumb to death without one final violent fury.',
      buffs: [
        'HolloVVeen Event Charm (Grave Wars / HolloVVeen Chests)',
        'Upon receiving fatal damage, enter a brief invulnerability window to retaliate before falling',
        'Freely unequipped (Limited Charm)'
      ],
      nerfs: []
    },
    {
      id: 'charm_witches_brew',
      title: 'Witches Brew',
      tier: 'Tier 3 (HolloVVeen Limited)',
      desc: 'A volatile concoction bubbling with eerie unpredictability.',
      buffs: [
        'HolloVVeen Event Charm (Grave Wars / HolloVVeen Chests)',
        'Casting skills periodically triggers erratic potion surges, applying random status effects or temporary stat surges',
        'Freely unequipped (Limited Charm)'
      ],
      nerfs: []
    },
    {
      id: 'charm_jack_o_lantern',
      title: 'Jack-o-Lantern',
      tier: 'Tier 3 (HolloVVeen Limited)',
      desc: 'Carved with a demonic grin and burning spectral fire.',
      buffs: [
        'HolloVVeen Event Charm (Grave Wars / HolloVVeen Chests)',
        'Attacks ignite targets in spectral hollow fire, causing damage over time and revealing cloaked targets',
        'Freely unequipped (Limited Charm)'
      ],
      nerfs: []
    },
    {
      id: 'charm_draculas_fangs',
      title: 'Dracula’s Fangs',
      tier: 'Tier 4 (HolloVVeen Limited)',
      desc: 'Insatiable thirst for the life essence of your prey.',
      buffs: [
        'HolloVVeen Event Charm (Dracula Pack / Grave Wars)',
        'Grants significant life steal on critical and heavy attacks against bleeding or maimed targets',
        'Freely unequipped (Limited Charm)'
      ],
      nerfs: []
    }
  ];

  // Update Relentless Hunter note
  const relentless = data.charms.find(c => c.id === 'charm_relentless_hunter');
  if (relentless) {
    relentless.title = 'Relentless Hunter [DELETED - Made Baseline]';
    relentless.desc = 'Deleted in game update: effect converted into baseline mission mechanic (invaders automatically prevent extraction).';
    relentless.buffs = [
      '[BASELINE MECHANIC] Players cannot extract from missions while an invader is alive.'
    ];
  }

  // Update Raid Boss charm note
  const raidBoss = data.charms.find(c => c.id === 'charm_raid_boss');
  if (raidBoss) {
    raidBoss.desc += ' [Reworked: Synchronized with Anti-Gank system; PVP-only, does not apply to NPCs].';
  }

  for (const ch of newCharms) {
    if (!data.charms.some(c => c.id === ch.id)) {
      data.charms.push(ch);
    }
  }

  // ---------------------------------------------------------
  // 3. EQUIPMENT
  // ---------------------------------------------------------
  const newEquipment = {
    Body: [
      {
        id: 'eq_body_spiritless_robe',
        name: 'Spiritless Robe',
        rarity: 'Legendary',
        passives: [
          '+6 Max Health',
          '+3.0% Weapon/Kido DMG',
          '+5.0 Max Posture',
          'Battle for the Dangai event reward'
        ]
      },
      {
        id: 'eq_body_vampire_hunter',
        name: "Vampire Hunter's Overcoat",
        rarity: 'Mythical',
        passives: [
          '+14 Max Health',
          '+3.0% Weapon DMG',
          '+5.0 Shunpo Stamina',
          'Dropped by HolloVVeen World Boss Junichiro'
        ]
      },
      {
        id: 'eq_body_pharaoh_regalia',
        name: "Pharaoh's Regalia",
        rarity: 'Mythical',
        passives: [
          '+16 Max Health',
          '+3.5% Kido DMG',
          '+4.0 Max Reiatsu',
          'Dropped by HolloVVeen World Boss Nivis'
        ]
      },
      {
        id: 'eq_body_monstrous_cuirass',
        name: 'Monstrous Cuirass',
        rarity: 'Legendary',
        passives: [
          '+18 Max Health',
          '+4.0% Melee Defense',
          '+6.0 Max Posture',
          'Purchasable from HolloVVeen Event Shop'
        ]
      },
      {
        id: 'eq_body_ghoul_overcoat',
        name: "Ghoul's Overcoat",
        rarity: 'Mythical',
        passives: [
          '+15 Max Health',
          '+3.0% Shunpo Speed',
          'Grants custom Bat Flashstep visual effect even if vanity is hidden',
          'Exclusive to Dracula Pack bundle'
        ]
      }
    ],
    Head: [
      {
        id: 'eq_head_pumpkin_mask',
        name: 'Pumpkin Mask',
        rarity: 'Legendary',
        passives: [
          '+10 Max Health',
          '+2.0 Max Reiatsu',
          'Purchasable from HolloVVeen Event Shop'
        ]
      },
      {
        id: 'eq_head_witchs_hat',
        name: "Witch's Hat",
        rarity: 'Legendary',
        passives: [
          '+12 Max Health',
          '+2.5% Kido DMG',
          '+3.0 Max Reiatsu',
          'Purchasable from HolloVVeen Event Shop'
        ]
      },
      {
        id: 'eq_head_dullahans_helm',
        name: "Dullahan's Curse",
        rarity: 'Mythical',
        passives: [
          'Hides head, hair, and clan hat models',
          'Matches player Reiatsu color',
          'HolloVVeen event milestone reward'
        ]
      }
    ],
    Face: [
      {
        id: 'eq_face_screamers_mask',
        name: "Screamer's Face Mask",
        rarity: 'Mythical',
        passives: [
          '+12 Max Health',
          '+2.5% Melee DMG',
          '+5.0 Posture Regen',
          'Dropped by HolloVVeen World Boss Masked Warrior'
        ]
      }
    ],
    Utility: [
      {
        id: 'eq_utility_spiritless_trousers',
        name: 'Spiritless Trousers',
        rarity: 'Legendary',
        passives: [
          '+8 Max Health',
          '+2.5% Weapon/Kido DMG',
          '+6.0 Shunpo Stamina',
          'Battle for the Dangai event reward'
        ]
      },
      {
        id: 'eq_utility_vampire_hunter_boots',
        name: "Vampire Hunter's Boots",
        rarity: 'Legendary',
        passives: [
          '+8 Max Health',
          '+5.0 Shunpo Speed',
          '+2.0% Weapon DMG',
          'Dropped by HolloVVeen World Boss Junichiro'
        ]
      },
      {
        id: 'eq_utility_pharaoh_greaves',
        name: "Pharaoh's Greaves",
        rarity: 'Legendary',
        passives: [
          '+10 Max Health',
          '+3.0 Shunpo Speed',
          '+2.5% Kido DMG',
          'Dropped by HolloVVeen World Boss Nivis'
        ]
      },
      {
        id: 'eq_utility_monstrous_greaves',
        name: 'Monstrous Greaves',
        rarity: 'Legendary',
        passives: [
          '+12 Max Health',
          '+3.0% Melee Defense',
          '+5.0 Max Posture',
          'Purchasable from HolloVVeen Event Shop'
        ]
      }
    ],
    Misc: [
      {
        id: 'eq_misc_spiritless_chains',
        name: 'Spiritless Chains',
        rarity: 'Legendary',
        passives: [
          '+8 Max Health',
          '+2.0% Weapon/Kido DMG',
          '+3.0 Max Posture',
          'Battle for the Dangai event reward'
        ]
      },
      {
        id: 'eq_misc_crest_of_the_ascended',
        name: 'Crest of the Ascended',
        rarity: 'Mythical',
        passives: [
          '+15 Max Health',
          '+2.5% All DMG',
          '+4.0 Max Posture',
          '+5.0 Shunpo Speed',
          'Exclusive rare accessory from Gold+ Ranked Matchmaking'
        ]
      },
      {
        id: 'eq_misc_ghoul_talisman',
        name: "Ghoul's Talisman",
        rarity: 'Mythical',
        passives: [
          '+12 Max Health',
          '+2.5% Lifesteal bonus',
          '+3.0 Max Reiatsu',
          'Exclusive to Dracula Pack bundle'
        ]
      },
      {
        id: 'eq_misc_twin_rippers',
        name: 'Vasto Weapon: Twin Rippers',
        rarity: 'Mythical',
        passives: [
          'Exclusive dual claw weapon for Level 40 Vasto Lordes',
          'Rapid attack rate with extended rotating crit mobility'
        ]
      },
      {
        id: 'eq_misc_carving_edge',
        name: 'Vasto Weapon: Carving Edge',
        rarity: 'Mythical',
        passives: [
          'Colossal heavy blade for Level 40 Vasto Lordes',
          'Devastating posture break damage and heavy hit stun'
        ]
      }
    ]
  };

  for (const [slot, items] of Object.entries(newEquipment)) {
    data.equipment[slot] = data.equipment[slot] || [];
    for (const it of items) {
      if (!data.equipment[slot].some(x => x.id === it.id)) {
        data.equipment[slot].push(it);
      }
    }
  }

  // ---------------------------------------------------------
  // 4. SKILLS & SPOKE TREE NODES
  // ---------------------------------------------------------
  // Add Shunko Mode to ultimates / special modes
  const shunkoUltimate = {
    id: 'shunko_mode',
    name: 'Shunko Mode (Tier 1 / Tier 2)',
    sp: 5,
    req: { hakuda: 150, speed: 150 },
    race: null,
    raceLabel: 'All Races (Learned in Human World Factory)',
    desc: 'Learned from the Human World factory trainer. Selected via Ability Tab -> Modes. Grants unique moveset: Windbreaker, Sweep Combination, and lingering invulnerability frames.'
  };
  if (!data.ultimates.some(u => u.id === shunkoUltimate.id)) {
    data.ultimates.push(shunkoUltimate);
  }

  // Add Shunko to raceSkills
  for (const race of ['Shinigami', 'Hollow', 'Quincy']) {
    data.raceSkills[race] = data.raceSkills[race] || [];
    if (!data.raceSkills[race].some(s => s.id === 'shunko_mode_skill')) {
      data.raceSkills[race].push({
        id: 'shunko_mode_skill',
        name: `Shunko Mode (${race} Variant)`,
        costSP: 5,
        req: { hakuda: 150, speed: 150 },
        desc: 'Unlocks first tier of shunko via Human World factory questline. Moves: Windbreaker, Sweep Combination. Race-specific damage and cooldown scalings.',
        upgradeNote: 'Tier 2 progression adds advanced elemental manifestations.'
      });
    }
  }

  // Add new nodes into spokeNodes
  const newSpokeNodes = {
    magic: [
      {
        id: 'sr_okasen',
        name: 'SR Kido: Okasen',
        parent: 'kido_base',
        costSP: 2,
        req: { kido: 120 },
        desc: 'Fires a concentrated high-velocity crimson reishi laser beam.'
      },
      {
        id: 'sr_danku',
        name: 'SR Kido: Danku',
        parent: 'kido_base',
        costSP: 3,
        req: { kido: 200 },
        desc: 'Advanced barrier kido completely blocking incoming projectiles. Cannot strike players in safe zones.'
      },
      {
        id: 'sr_hyapporankan',
        name: 'SR Kido: Hyapporankan',
        parent: 'kido_base',
        costSP: 3,
        req: { kido: 220 },
        desc: 'Hundred Stepped Rails: hurls a barrage of glowing reishi rods, pinning and shredding target.'
      },
      {
        id: 'quincy_brenschwerter',
        name: 'Quincy Kido: Brenschwerter',
        parent: 'kido_base',
        costSP: 2,
        req: { kido: 140 },
        desc: 'Conjures orbiting burning spirit swords that seek and pierce enemies.'
      },
      {
        id: 'quincy_klingenfallen',
        name: 'Quincy Kido: Klingenfallen',
        parent: 'kido_base',
        costSP: 3,
        req: { kido: 210 },
        desc: 'Lays interconnected tripwire spirit blades across the battle zone inflicting severe posture crush.'
      }
    ],
    strength: [
      {
        id: 'strength_rending_tide',
        name: 'Strength-Kido: Rending Tide',
        parent: 'strength_base',
        costSP: 3,
        req: { strength: 160, kido: 120 },
        desc: 'Hybrid cleave combining physical blade force with spiritual current (+ Level 4 upgrade).'
      },
      {
        id: 'essence_flowing_gradient',
        name: 'Essence: Flowing Gradient',
        parent: 'strength_base',
        costSP: 2,
        req: { strength: 180 },
        desc: 'Strength skill essence from Battle for Dangai vote. Empowers attacks with fluid, crushing momentum.'
      }
    ],
    speed: [
      {
        id: 'essence_slaying_drive',
        name: 'Essence: Slaying Drive',
        parent: 'speed_base',
        costSP: 2,
        req: { speed: 180 },
        desc: 'Speed skill essence introduced in v5.2. Drastically accelerates pursuit velocity and attack tempo.'
      }
    ]
  };

  for (const [spoke, nodes] of Object.entries(newSpokeNodes)) {
    data.spokeNodes[spoke] = data.spokeNodes[spoke] || [];
    for (const node of nodes) {
      if (!data.spokeNodes[spoke].some(n => n.id === node.id)) {
        data.spokeNodes[spoke].push(node);
      }
    }
  }

  // ---------------------------------------------------------
  // 5. ESSENCES
  // ---------------------------------------------------------
  const additionalEssences = [
    {
      id: 'flowing_gradient',
      name: 'Flowing Gradient',
      accent: '#ff3c50',
      desc: 'Strength skill essence unlocked via Battle for Dangai vote. Amplifies fluid momentum on heavy strikes.'
    },
    {
      id: 'slaying_drive',
      name: 'Slaying Drive',
      accent: '#00d2be',
      desc: 'Speed skill essence introduced in v5.2. Boosts chase velocity, rapid engagement, and relentless combo tempo.'
    }
  ];

  for (const es of additionalEssences) {
    if (!data.essences.some(e => e.id === es.id)) {
      data.essences.push(es);
    }
  }

  // ---------------------------------------------------------
  // 6. GAME META & SYSTEMS (New master section)
  // ---------------------------------------------------------
  data.gameMeta = {
    codes: [
      { code: 'HOLLOVVEEN', reward: 'Event Candy, Tickets & Rolls', status: 'Active (v5.2)' },
      { code: 'SHUNKOVASTO', reward: 'Rerolls & Progression Tokens', status: 'Active' },
      { code: '205KLIKES', reward: 'Soul Tokens & EXP Boost', status: 'Active' },
      { code: '200KLIKES', reward: 'Soul Tokens & Accessory Rolls', status: 'Active' },
      { code: 'CLANS', reward: 'Clan Reroll Tickets (Redeem at Fort Adams)', status: 'Active' },
      { code: 'BUILDPOINTS', reward: 'Build Reset & Stat Points', status: 'Active' },
      { code: 'necromancerpoints', reward: 'Necromancer Upgrade Points', status: 'Active' },
      { code: 'BANKAIONTHEWAY', reward: 'EXP & Soul Tokens', status: 'Active' },
      { code: 'latenight', reward: 'Nightly Bonus Tokens', status: 'Limited' }
    ],
    worldBossSchedule: [
      { name: 'Junichiro', spawnTime: 'Every hour at xx:20', drops: "Vampire Hunter's Set, Katana skins", note: 'Notification 5m prior' },
      { name: 'Nivis', spawnTime: 'Every hour at xx:30', drops: "Pharaoh's Set", note: 'Notification 5m prior' },
      { name: 'Parasite Boss', spawnTime: 'Every 2 hours at xx:40', drops: 'HolloVVeen Event Chests, Raid Chests', note: 'Infection boss' },
      { name: 'Masked Warrior', spawnTime: 'Every hour at xx:50', drops: "Screamer's Face Mask", note: 'Notification 5m prior' }
    ],
    statInvestmentMilestones: {
      budget: '400 BP Total Cap',
      scaling: 'Every 10 Build Points invested increases all other build points and stats by +1 (tested up to 50 BP).',
      passives: [
        { stat: 'Reserve, Haste, Potency, Mettle, Shunpo', threshold: '175 Points', effect: 'Unlocks first tier unique passive.' },
        { stat: 'Reserve, Haste, Potency, Mettle, Shunpo', threshold: '400 Points', effect: 'Unlocks second tier ultimate essence passive.' },
        { stat: 'Strength, Speed, Kido, Hakuda', threshold: '400 Points', effect: 'Unlocks major specialization passive shifting away from hybrid meta.' }
      ],
      resetPolicy: 'Free Build Reset available once per account (level ceiling removed).'
    },
    combatSystems: [
      { name: 'Traversing', desc: 'Hold Q out of combat to rapidly traverse via flashstep / sonido / hirenkyaku at reduced resource cost.' },
      { name: 'Anti-Gank', desc: 'Taking damage from non-allied enemies builds Anti-Gank stacks granting damage reduction, posture regen, and boosted aura heal.' },
      { name: 'Combo Falloff', desc: 'Sustained true combos trigger severe damage falloff until the victim is released from stun.' },
      { name: 'Transmutation', desc: 'Detransmutating accessories now safely refunds the transmutated accessory.' }
    ]
  };

  return data;
}

module.exports = { applyUpdates };
