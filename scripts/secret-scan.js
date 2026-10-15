#!/usr/bin/env node
/**
 * Secret Scan Script
 * Scans the repository and any built frontend bundles for leaked secrets.
 * Checks for: Supabase service_role keys, Sarvam API keys, anon keys in unexpected places.
 * 
 * Usage: node scripts/secret-scan.js
 * Exit code 0 = clean, 1 = secrets found
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Patterns that should NEVER appear in client code, bundles, or committed files
const SECRET_PATTERNS = [
  { name: 'Supabase service_role key', regex: /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9_-]{50,}\.service_role/gi },
  { name: 'Sarvam API Key (raw)', regex: /SARVAM_API_KEY\s*[:=]\s*["']?[a-zA-Z0-9_-]{20,}/gi },
  { name: 'Hardcoded API key pattern', regex: /api[-_]?(?:key|subscription[-_]?key)\s*[:=]\s*["'][a-zA-Z0-9_-]{20,}["']/gi },
  { name: 'service_role in env assignment', regex: /SUPABASE_SERVICE_ROLE_KEY\s*[:=]\s*["']?eyJ[A-Za-z0-9_-]+/gi },
  { name: 'Bearer token hardcoded', regex: /Bearer\s+eyJ[A-Za-z0-9_-]{30,}/gi },
];

// Directories/files to scan
const SCAN_DIRS = ['src', 'public', 'scripts', 'supabase/functions'];
const BUNDLE_DIR = 'dist';

// Files/directories to skip
const SKIP_PATTERNS = [
  'node_modules', '.git', '.env', '.env.local', '.env.production',
  'secret-scan.js', // don't flag ourselves
];

function shouldSkip(filePath) {
  return SKIP_PATTERNS.some(p => filePath.includes(p));
}

function scanFile(filePath) {
  const findings = [];
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    for (const pattern of SECRET_PATTERNS) {
      const matches = content.match(pattern.regex);
      if (matches) {
        findings.push({
          file: path.relative(ROOT, filePath),
          pattern: pattern.name,
          matchCount: matches.length,
          preview: matches[0].substring(0, 40) + '...',
        });
      }
    }
  } catch {
    // Binary or unreadable file, skip
  }
  return findings;
}

function walkDir(dir) {
  const allFindings = [];
  if (!fs.existsSync(dir)) return allFindings;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (shouldSkip(full)) continue;

    if (entry.isDirectory()) {
      allFindings.push(...walkDir(full));
    } else if (entry.isFile()) {
      allFindings.push(...scanFile(full));
    }
  }
  return allFindings;
}

// Also check that .env files are gitignored
function checkGitignore() {
  const warnings = [];
  const gitignorePath = path.join(ROOT, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf8');
    const required = ['.env', '.env.local', '.env.production', '.env.*.local'];
    for (const pattern of required) {
      if (!content.includes(pattern)) {
        warnings.push(`WARNING: .gitignore missing pattern: ${pattern}`);
      }
    }
  } else {
    warnings.push('WARNING: No .gitignore file found!');
  }
  return warnings;
}

// Check supabaseClient.ts does not import or reference service_role
function checkClientCode() {
  const warnings = [];
  const clientPath = path.join(ROOT, 'src', 'services', 'supabaseClient.ts');
  if (fs.existsSync(clientPath)) {
    const content = fs.readFileSync(clientPath, 'utf8');
    if (content.includes('service_role') || content.includes('SERVICE_ROLE')) {
      warnings.push('CRITICAL: supabaseClient.ts references service_role key!');
    }
  }
  return warnings;
}

console.log('🔍 Kuralbeyond Secret Scan');
console.log('='.repeat(50));
console.log();

let allFindings = [];
let allWarnings = [];

// Scan source directories
for (const dir of SCAN_DIRS) {
  const fullDir = path.join(ROOT, dir);
  console.log(`Scanning: ${dir}/`);
  allFindings.push(...walkDir(fullDir));
}

// Scan bundle directory if it exists
const bundlePath = path.join(ROOT, BUNDLE_DIR);
if (fs.existsSync(bundlePath)) {
  console.log(`Scanning: ${BUNDLE_DIR}/ (production bundle)`);
  allFindings.push(...walkDir(bundlePath));
} else {
  console.log(`Skipping: ${BUNDLE_DIR}/ (not built yet)`);
}

// Additional checks
allWarnings.push(...checkGitignore());
allWarnings.push(...checkClientCode());

console.log();

if (allWarnings.length > 0) {
  console.log('⚠️  Warnings:');
  for (const w of allWarnings) {
    console.log(`  ${w}`);
  }
  console.log();
}

if (allFindings.length > 0) {
  console.log('🚨 SECRETS FOUND:');
  for (const f of allFindings) {
    console.log(`  ❌ ${f.file}`);
    console.log(`     Pattern: ${f.pattern}`);
    console.log(`     Matches: ${f.matchCount}`);
    console.log(`     Preview: ${f.preview}`);
    console.log();
  }
  console.log(`RESULT: FAIL — ${allFindings.length} secret(s) detected.`);
  process.exit(1);
} else {
  console.log('✅ RESULT: PASS — No secrets found in source or bundle.');
  process.exit(0);
}
