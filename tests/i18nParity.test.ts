import { describe, it, expect } from 'vitest';
import en from '../src/i18n/locales/en.json';
import ta from '../src/i18n/locales/ta.json';

function getKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
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

describe('i18n Key Parity & Tamil Unicode NFC Normalization', () => {
  const enKeys = getKeys(en);
  const taKeys = getKeys(ta);

  it('guarantees 100% key parity between English and Tamil translations', () => {
    const enKeySet = new Set(enKeys);
    const taKeySet = new Set(taKeys);

    const missingInTa = enKeys.filter(k => !taKeySet.has(k));
    const extraInTa = taKeys.filter(k => !enKeySet.has(k));

    expect(missingInTa).toEqual([]);
    expect(extraInTa).toEqual([]);
    expect(enKeys.length).toBe(taKeys.length);
  });

  it('ensures all Tamil strings are normalized to Unicode NFC', () => {
    function verifyNfc(obj: any, path = '') {
      for (const [k, v] of Object.entries(obj)) {
        const cur = path ? `${path}.${k}` : k;
        if (typeof v === 'string') {
          expect(v, `String at ${cur} must be Unicode NFC normalized`).toBe(v.normalize('NFC'));
        } else if (typeof v === 'object' && v !== null) {
          verifyNfc(v, cur);
        }
      }
    }

    verifyNfc(ta, 'ta');
  });

  it('verifies essential Tamil navigation and pedagogical keys are populated', () => {
    expect(ta.common.appName).toBe('தமிழ் பாலம்');
    expect(ta.common.home).toBe('முகப்பு');
    expect(ta.common.learn).toBe('கற்போம்');
    expect(ta.common.needHelp).toBe('உதவி தேவையா?');
    expect(ta.dashboard.scriptPowerTitle).toBe('எழுத்து ஆற்றல்');
  });
});
