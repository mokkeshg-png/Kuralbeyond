import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enPath = path.resolve(__dirname, '../src/i18n/locales/en.json');
const taPath = path.resolve(__dirname, '../src/i18n/locales/ta.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ta = JSON.parse(fs.readFileSync(taPath, 'utf8'));

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const k of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(getKeys(obj[k], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = new Set(getKeys(en));
const taKeys = new Set(getKeys(ta));

let errors = [];

// Check missing in ta
for (const k of enKeys) {
  if (!taKeys.has(k)) {
    errors.push(`Missing key in Tamil (ta.json): ${k}`);
  }
}

// Check extra in ta
for (const k of taKeys) {
  if (!enKeys.has(k)) {
    errors.push(`Extra key in Tamil (ta.json) not in en.json: ${k}`);
  }
}

// Validate Unicode NFC in Tamil strings
function checkNfc(obj, pathStr = '') {
  for (const [k, v] of Object.entries(obj)) {
    const currPath = pathStr ? `${pathStr}.${k}` : k;
    if (typeof v === 'string') {
      const normalized = v.normalize('NFC');
      if (v !== normalized) {
        errors.push(`String not NFC normalized at ${currPath}: ${v}`);
      }
    } else if (typeof v === 'object' && v !== null) {
      checkNfc(v, currPath);
    }
  }
}
checkNfc(ta, 'ta');

if (errors.length > 0) {
  console.error(`❌ Validation failed with ${errors.length} errors:`);
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log(`✅ Success! Key parity verified (${enKeys.size} keys). All Tamil strings are Unicode NFC normalized.`);
  process.exit(0);
}
