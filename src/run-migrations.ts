// src/run-migrations.ts (수정된 내용)

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// 'db' 폴더 대신 'db/index.ts' 파일을 명시적으로 임포트!
// 'db/schema' 폴더 대신 'db/schema.ts' 파일을 명시적으로 임포트!
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from '../db/index'; // <-- 여기를 수정!
import * as schema from '../db/schema'; // <-- 여기를 수정!

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