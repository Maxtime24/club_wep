import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'; // 같은 폴더 내의 schema를 상대 경로로 임포트

if (!process.env.DATABASE_URL) { // 환경 변수 확인 로직 추가
  throw new Error('DATABASE_URL is not set');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });