const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://vvcharmmerges.pages.dev';
const CACHE_DIR = path.join(__dirname, '..', '.cache');

const ENDPOINTS = [
  'charms.json',
  'synergies.json',
  'skill-tree.json',
  'traits.json',
  'clans.json',
  'items.json',
  'modifiers.json',
  'abilities.json',
  'essences.json',
  'buffs.json',
  'weapons.json',
  'zanpakuto-parts.json'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

async function fetchDataset(filename, forceRefresh = false) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const cacheFile = path.join(CACHE_DIR, filename);

  if (!forceRefresh && fs.existsSync(cacheFile)) {
    try {
      const cached = fs.readFileSync(cacheFile, 'utf8');
      const parsed = JSON.parse(cached);
      return parsed;
    } catch {
      // invalid cache, refetch
    }
  }

  const url = `${BASE_URL}/${filename}`;
  console.log(`[Fetcher] Downloading fresh ${filename} from ${url}...`);
  const raw = await fetchUrl(url);
  const parsed = JSON.parse(raw);
  fs.writeFileSync(cacheFile, JSON.stringify(parsed, null, 2), 'utf8');
  return parsed;
}

async function fetchAllDatasets(forceRefresh = false) {
  console.log(`[Fetcher] Fetching all 12 official datasets from ${BASE_URL}...`);
  const results = {};
  for (const file of ENDPOINTS) {
    const key = file.replace('.json', '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    results[key] = await fetchDataset(file, forceRefresh);
  }
  console.log(`[Fetcher] All 12 datasets downloaded successfully.`);
  return results;
}

module.exports = {
  BASE_URL,
  ENDPOINTS,
  fetchDataset,
  fetchAllDatasets
};
