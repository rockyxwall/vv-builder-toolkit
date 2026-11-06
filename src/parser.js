const vm = require('vm');

/**
 * Robust delimiter scanner for JS arrays and objects.
 * Handles nested arrays/objects, strings ('', "", ``), backslash escapes, and single-line/multi-line comments.
 */
function extractLiteral(code, marker, expectedChar) {
  const idx = code.indexOf(marker);
  if (idx === -1) {
    throw new Error(`Marker not found: "${marker}"`);
  }

  const startIdx = code.indexOf(expectedChar, idx);
  if (startIdx === -1) {
    throw new Error(`Delimiter "${expectedChar}" not found after marker: "${marker}"`);
  }

  const openChar = expectedChar;
  const closeChar = openChar === '[' ? ']' : '}';
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escape = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = startIdx; i < code.length; i++) {
    const ch = code[i];

    if (inLineComment) {
      if (ch === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (ch === '*' && code[i + 1] === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === '\\' && inString) {
      escape = true;
      continue;
    }

    if (inString) {
      if (ch === stringChar) {
        inString = false;
      }
      continue;
    }

    // Check comment starts
    if (ch === '/' && code[i + 1] === '/') {
      inLineComment = true;
      i++;
      continue;
    }
    if (ch === '/' && code[i + 1] === '*') {
      inBlockComment = true;
      i++;
      continue;
    }

    // Check string starts
    if (ch === "'" || ch === '"' || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }

    // Check nesting
    if (ch === openChar) {
      depth++;
    } else if (ch === closeChar) {
      depth--;
      if (depth === 0) {
        const literalString = code.slice(startIdx, i + 1);
        try {
          return vm.runInNewContext(`(${literalString})`);
        } catch (err) {
          throw new Error(`Failed to evaluate JS literal for marker "${marker}": ${err.message}`);
        }
      }
    }
  }

  throw new Error(`Unterminated literal starting at index ${startIdx}`);
}

function parseAllData(bundleCode) {
  console.log('[Parser] Parsing data structures from client bundle...');

  const ultimates = extractLiteral(bundleCode, 'var e=[{id:`kuro`', '[');
  const raceSkills = extractLiteral(bundleCode, '={Shinigami:[{id:`sk_byakurai`', '{');
  const essences = extractLiteral(bundleCode, 'l=[{id:`reserves`', '[');
  const attributes = extractLiteral(bundleCode, 'u=[{id:`hakuda`', '[');

  const spokeDefinitions = [
    { spokeId: 'magic', marker: '=[{id:`mcA1`' },
    { spokeId: 'strength', marker: '=[{id:`stA1`' },
    { spokeId: 'hakuda', marker: '=[{id:`hkP1`' },
    { spokeId: 'speed', marker: '=[{id:`spK3`' },
    { spokeId: 'race_quincy', marker: '=[{id:`qrc6`' },
    { spokeId: 'race_hollow', marker: '=[{id:`hb_speed`' },
    { spokeId: 'race_shinigami', marker: '=[{id:`sk_skm1`' },
    { spokeId: 'sensory', marker: '=[{id:`snMorale`' }
  ];

  const spokeNodes = {};
  let totalSpokeNodes = 0;
  for (const def of spokeDefinitions) {
    const nodes = extractLiteral(bundleCode, def.marker, '[');
    spokeNodes[def.spokeId] = nodes;
    totalSpokeNodes += nodes.length;
  }

  const spokesMeta = extractLiteral(bundleCode, 'ie=[{id:`hakuda`', '[');
  const charms = extractLiteral(bundleCode, 'var Ti=[{id:`charm_', '[');
  const traits = extractLiteral(bundleCode, 'var Hi=[{id:`ht_', '[');
  const equipment = extractLiteral(bundleCode, 'var Qi={Body:[', '{');
  const clans = extractLiteral(bundleCode, 'var pa={Quincy:[', '{');

  console.log(`[Parser] Successfully extracted:`);
  console.log(`  - Ultimates: ${ultimates.length}`);
  console.log(`  - Race skill groups: ${Object.keys(raceSkills).length}`);
  console.log(`  - Spoke nodes: ${totalSpokeNodes} across ${Object.keys(spokeNodes).length} branches`);
  console.log(`  - Equipment slots: ${Object.keys(equipment).length} (${Object.values(equipment).flat().length} items)`);
  console.log(`  - Clans: ${Object.keys(clans).length} races (${Object.values(clans).flat().length} clans)`);
  console.log(`  - Charms: ${charms.length}`);
  console.log(`  - Traits: ${traits.length}`);
  console.log(`  - Essences: ${essences.length}`);
  console.log(`  - Attributes: ${attributes.length}`);

  return {
    meta: {
      source: 'https://www.vvbuilder.online',
      extractedAt: new Date().toISOString()
    },
    ultimates,
    raceSkills,
    spokeNodes,
    spokesMeta,
    equipment,
    clans,
    charms,
    traits,
    essences,
    attributes
  };
}

module.exports = { parseAllData, extractLiteral };
