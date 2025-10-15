import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // .env.local 파일을 명시적으로 로드
//console.log('DATABASE_URL from dotenv:', process.env.DATABASE_URL); // 디버깅용

import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from '@/db';
import * as schema from '@/db/schema';

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL is not set. Please check your .env.local file.');
    process.exit(1);
  }
  try {
    console.log('Starting migrations...');
    // migrate 함수는 migrationsFolder와 db 인스턴스를 받습니다. schemas는 이제 필요하지 않을 수 있습니다.
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