/**
 * src/parser.js
 * Ingests, validates, indexes, and consolidates all 12 official game datasets
 * from https://vvcharmmerges.pages.dev/builder.
 */

function buildRelationalIndexes(rawDatasets) {
  const {
    charms,
    synergies,
    skillTree,
    traits,
    clans,
    items,
    modifiers,
    abilities,
    essences,
    buffs,
    weapons,
    zanpakutoParts
  } = rawDatasets;

  // 1. Charms index
  const charmsById = {};
  for (const c of charms) {
    charmsById[c.id] = c;
  }

  // 2. Synergies matrix (with upstream alias normalization e.g. indomitable -> indomitable-spirit)
  const resolveCharmId = id => (id === 'indomitable' && !charmsById['indomitable'] ? 'indomitable-spirit' : id);
  const synergyMap = {};
  for (const s of synergies) {
    const a = resolveCharmId(s.charmA);
    const b = resolveCharmId(s.charmB);
    synergyMap[`${a}|${b}`] = s.ratingAtoB || 'Not Tried';
    synergyMap[`${b}|${a}`] = s.ratingBtoA || 'Not Tried';
  }

  // 3. Skill tree graph
  const nodesById = {};
  const reverseConnections = {};
  for (const node of skillTree) {
    nodesById[node.id] = node;
    reverseConnections[node.id] = reverseConnections[node.id] || [];
  }
  for (const node of skillTree) {
    if (Array.isArray(node.connectsTo)) {
      for (const targetId of node.connectsTo) {
        if (!reverseConnections[targetId]) {
          reverseConnections[targetId] = [];
        }
        reverseConnections[targetId].push(node.id);
      }
    }
  }

  // 4. Equipment by slot
  const itemsBySlot = {
    head: [],
    body: [],
    face: [],
    misc: [],
    utility: [],
    artifact: []
  };
  const itemsById = {};
  for (const it of items) {
    itemsById[it.id] = it;
    if (itemsBySlot[it.slot]) {
      itemsBySlot[it.slot].push(it);
    }
  }

  // 5. Zanpakuto parts by type
  const zanpakutoPartsByType = {
    guard: [],
    handle: [],
    hilt: [],
    sheathe: []
  };
  const zanpakutoPartsById = {};
  for (const zp of zanpakutoParts) {
    zanpakutoPartsById[zp.id] = zp;
    if (zanpakutoPartsByType[zp.partType]) {
      zanpakutoPartsByType[zp.partType].push(zp);
    }
  }

  // 6. Clans by race
  const clansByRace = {
    quincy: [],
    'soul-reaper': [],
    hollow: []
  };
  const clansById = {};
  for (const cl of clans) {
    clansById[cl.id] = cl;
    if (clansByRace[cl.race]) {
      clansByRace[cl.race].push(cl);
    }
  }

  // 7. Modifiers, abilities, weapons, traits, essences by ID
  const modifiersById = Object.fromEntries(modifiers.map(m => [m.id, m]));
  const abilitiesById = Object.fromEntries(abilities.map(a => [a.id, a]));
  const weaponsById = Object.fromEntries(weapons.map(w => [w.id, w]));
  const traitsById = Object.fromEntries(traits.map(t => [t.id, t]));
  const essencesById = Object.fromEntries(essences.map(e => [e.id, e]));

  return {
    meta: {
      source: 'https://vvcharmmerges.pages.dev/builder',
      version: 'v5.3+',
      extractedAt: new Date().toISOString(),
      counts: {
        charms: charms.length,
        synergies: synergies.length,
        skillTreeNodes: skillTree.length,
        items: items.length,
        modifiers: modifiers.length,
        abilities: abilities.length,
        essences: essences.length,
        weapons: weapons.length,
        zanpakutoParts: zanpakutoParts.length,
        clans: clans.length,
        traits: traits.length
      }
    },
    charms,
    synergies,
    skillTree,
    items,
    modifiers,
    abilities,
    essences,
    weapons,
    zanpakutoParts,
    clans,
    traits,
    buffs,
    indexes: {
      charmsById,
      synergyMap,
      nodesById,
      reverseConnections,
      itemsById,
      itemsBySlot,
      zanpakutoPartsById,
      zanpakutoPartsByType,
      clansById,
      clansByRace,
      modifiersById,
      abilitiesById,
      weaponsById,
      traitsById,
      essencesById
    }
  };
}

module.exports = {
  buildRelationalIndexes
};
