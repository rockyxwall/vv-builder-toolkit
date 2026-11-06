const fs = require('fs');
const {
  validateBuild,
  generateShareCode,
  parseShareCode
} = require('../src/build_engine');

// 1. Hollow Cero Siege Cannon Build (Zero Parry, Full AoE Beams, Boss Shredder)
const hollowBuild = {
  v: 3,
  r: 'Hollow',
  b: { reserves: 150, haste: 200, potency: 0, mettle: 50, shunpo: 0 },
  a: { hakuda: 0, strength: 0, kido: 400, speed: 0 },
  s: [
    { i: 'rc1', l: 1, sp: 5, st: 0, af: 0, f: 0, ul: '' },
    { i: 'rc2', l: 7, sp: 20, st: 0, af: 0, f: 0, ul: 'ssssss' },
    { i: 'hb_bblastr', l: 7, sp: 18, st: 0, af: 0, f: 0, ul: 'ssssss' },
    { i: 'hb_dsaucer', l: 1, sp: 7, st: 0, af: 0, f: 0, ul: '' },
    { i: 'hb_hierro', l: 1, sp: 3, st: 0, af: 0, f: 0, ul: '' },
    { i: 'hb_hsregen', l: 1, sp: 4, st: 0, af: 0, f: 0, ul: '' },
    { i: 'hb_ultra', l: 1, sp: 4, st: 0, af: 0, f: 0, ul: '' }
  ],
  sr: [],
  es: ['gran_ray'],
  el: { gran_ray: 1 },
  fr: 1,
  fu: 1,
  sp: 30, // 100 - (5+20+18+7+3+4+4+9) = 30 SP remaining
  fg: 6,  // 0 Ascension Frags used
  st: 50000,
  ch: ['charm_giant_fighter', 'charm_monster_slayer', 'charm_hard_headed'],
  s12: 0,
  vc: 0,
  ht: ['tr_garganta', 'tr_menis', 'tr_chitin', 'tr_gluttony'],
  cl: 'cl_starrk',
  eq: {
    Body: 'eq_body_pharaoh_regalia',
    Head: 'eq_head_witchs_hat',
    Utility: 'eq_utility_pharaoh_greaves',
    Misc: 'eq_misc_crest_of_the_ascended'
  }
};

const vHollow = validateBuild(hollowBuild);
const codeHollow = generateShareCode(hollowBuild);

// 2. Shinigami Hadō Bombardment Build (Zero Parry Ranged Turret)
const shinigamiBuild = {
  v: 3,
  r: 'Shinigami',
  b: { reserves: 175, haste: 175, potency: 0, mettle: 50, shunpo: 0 },
  a: { hakuda: 0, strength: 0, kido: 400, speed: 0 },
  s: [
    { i: 'sk_byakurai', l: 7, sp: 18, st: 0, af: 0, f: 0, ul: 'ssssss' },
    { i: 'sk_sokatsui', l: 7, sp: 20, st: 0, af: 0, f: 0, ul: 'ssssss' },
    { i: 'sk_haien', l: 1, sp: 8, st: 0, af: 0, f: 0, ul: '' },
    { i: 'sk_raikoho', l: 1, sp: 10, st: 0, af: 0, f: 0, ul: '' },
    { i: 'sk_shinten', l: 1, sp: 12, st: 0, af: 0, f: 0, ul: '' },
    { i: 'sk_react_barrier', l: 1, sp: 4, st: 0, af: 0, f: 0, ul: '' }
  ],
  sr: [],
  es: ['kuro'],
  el: { kuro: 1 },
  fr: 1,
  fu: 1,
  sp: 19,
  fg: 6,
  st: 50000,
  ch: ['charm_giant_fighter', 'charm_monster_slayer', 'charm_hard_headed'],
  s12: 1, // Squad 12 clean slot
  vc: 0,
  ht: [null, null, null, null],
  cl: 'cl_urahara',
  eq: {
    Body: 'eq_body_pharaoh_regalia',
    Head: 'eq_head_witchs_hat',
    Utility: 'eq_utility_pharaoh_greaves',
    Misc: 'eq_misc_crest_of_the_ascended'
  }
};

const vShinigami = validateBuild(shinigamiBuild);
const codeShinigami = generateShareCode(shinigamiBuild);

// 3. Quincy Holy Rain Kiter Build (Zero Contact Infinite Range AoE)
const quincyBuild = {
  v: 3,
  r: 'Quincy',
  b: { reserves: 50, haste: 175, potency: 0, mettle: 0, shunpo: 175 },
  a: { hakuda: 0, strength: 0, kido: 400, speed: 0 },
  s: [
    { i: 'qrc2', l: 7, sp: 19, st: 0, af: 0, f: 0, ul: 'ssssss' },
    { i: 'qb3c', l: 7, sp: 18, st: 0, af: 0, f: 0, ul: 'ssssss' },
    { i: 'qrc4', l: 1, sp: 4, st: 0, af: 0, f: 0, ul: '' },
    { i: 'qb9', l: 1, sp: 8, st: 0, af: 0, f: 0, ul: '' },
    { i: 'qb12', l: 1, sp: 10, st: 0, af: 0, f: 0, ul: '' }
  ],
  sr: [],
  es: ['radiant_edge'],
  el: { radiant_edge: 1 },
  fr: 1,
  fu: 1,
  sp: 37,
  fg: 6,
  st: 50000,
  ch: ['charm_giant_fighter', 'charm_monster_slayer', 'charm_flashmaster'],
  s12: 0,
  vc: 0,
  ht: [null, null, null, null],
  cl: 'cl_le_vaar',
  eq: {
    Body: 'eq_body_pharaoh_regalia',
    Head: 'eq_head_witchs_hat',
    Utility: 'eq_utility_pharaoh_greaves',
    Misc: 'eq_misc_crest_of_the_ascended'
  }
};

const vQuincy = validateBuild(quincyBuild);
const codeQuincy = generateShareCode(quincyBuild);

console.log('=== BUILD 1: HOLLOW CERO SIEGE CANNON ===');
console.log('Valid:', vHollow.valid, vHollow.summary);
console.log('Share Code:', codeHollow);

console.log('\n=== BUILD 2: SHINIGAMI HADO BOMBARDMENT ===');
console.log('Valid:', vShinigami.valid, vShinigami.summary);
console.log('Share Code:', codeShinigami);

console.log('\n=== BUILD 3: QUINCY HOLY RAIN KITER ===');
console.log('Valid:', vQuincy.valid, vQuincy.summary);
console.log('Share Code:', codeQuincy);
