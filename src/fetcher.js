const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.vvbuilder.online';
const CACHE_DIR = path.join(__dirname, '..', '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'bundle.js');
const HASH_FILE = path.join(CACHE_DIR, 'bundle_hash.txt');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
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

async function getClientBundle(forceRefresh = false) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  try {
    console.log(`[Fetcher] Checking ${BASE_URL} for active asset bundle...`);
    const html = await fetchUrl(BASE_URL + '/');
    const match = html.match(/src=["'](\/assets\/index-[a-zA-Z0-9_-]+\.js)["']/);
    if (!match) {
      throw new Error('Unable to find bundle script src in HTML');
    }

    const bundlePath = match[1];
    const fullBundleUrl = BASE_URL + bundlePath;
    console.log(`[Fetcher] Found bundle URL: ${fullBundleUrl}`);

    let cachedHash = null;
    if (fs.existsSync(HASH_FILE) && fs.existsSync(CACHE_FILE)) {
      cachedHash = fs.readFileSync(HASH_FILE, 'utf8').trim();
    }

    if (!forceRefresh && cachedHash === bundlePath && fs.existsSync(CACHE_FILE)) {
      console.log(`[Fetcher] Bundle hash unchanged (${bundlePath}), using cached bundle.`);
      return fs.readFileSync(CACHE_FILE, 'utf8');
    }

    console.log(`[Fetcher] Downloading fresh bundle...`);
    const bundleCode = await fetchUrl(fullBundleUrl);
    fs.writeFileSync(CACHE_FILE, bundleCode, 'utf8');
    fs.writeFileSync(HASH_FILE, bundlePath, 'utf8');
    console.log(`[Fetcher] Saved bundle (${bundleCode.length} bytes) to cache.`);
    return bundleCode;
  } catch (err) {
    if (fs.existsSync(CACHE_FILE)) {
      console.warn(`[Fetcher] Network fetch failed (${err.message}). Falling back to cached bundle.`);
      return fs.readFileSync(CACHE_FILE, 'utf8');
    }
    throw err;
  }
}

module.exports = { getClientBundle };
