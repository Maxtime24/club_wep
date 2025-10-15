import 'dotenv/config';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from '@/db'; // <-- 임포트 경로 수정!
import * as schema from '@/db/schema'; // 마이그레이터가 스키마를 사용하기 위함.

async function runMigrations() {
  try {
    console.log('Starting migrations...');
    await migrate(db, { migrationsFolder: './drizzle', schemas: schema }); // <-- schemas 속성 추가
    console.log('Migrations finished successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

runMigrations();