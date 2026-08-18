// One-off helper to apply client/db/schema.sql to a Postgres database (Neon).
// Usage: DATABASE_URL=postgres://... node scripts/apply-schema.mjs ../db/schema.sql
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const sql = neon(process.env.DATABASE_URL);
const target = process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), '../db/schema.sql');
const schema = readFileSync(target, 'utf8')
  .split('\n')
  .filter(line => !line.trim().startsWith('--'))
  .join('\n');

const statements = schema
  .split(/;\s*(?:\r?\n|$)/)
  .map(s => s.trim())
  .filter(s => s.length);

for (const stmt of statements) {
  console.log('Running:', stmt.split('\n')[0].slice(0, 60) + '...');
  await sql(stmt);
}

console.log(`Done. Ran ${statements.length} statements.`);
