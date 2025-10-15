// src/run-migrations.ts (수정된 내용)

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// '.ts' 대신 '.js' 확장자를 사용해야 Node.js ESM 런타임이 정확히 해석합니다!
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from '../db/index.js'; // <-- 여기를 수정!
import * as schema from '../db/schema.js'; // <-- 여기를 수정!

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL is not set. Please check your .env.local file.');
    process.exit(1);
  }
  try {
    console.log('Starting migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations finished successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

runMigrations();