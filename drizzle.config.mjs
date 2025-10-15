// drizzle.config.mjs (수정된 내용)

/** @type { import("drizzle-kit").Config } */
export default {
  schema: './db/schema.ts', // Drizzle 스키마 파일 경로
  out: './drizzle',         // 마이그레이션 파일이 생성될 디렉토리
  // driver: 'pg',           // <-- 이 'driver' 속성을 제거합니다!
  dialect: 'postgresql',  // <-- 이 'dialect' 속성을 추가합니다!
  dbCredentials: {
    url: process.env.DATABASE_URL, // .env.local 파일의 DATABASE_URL 사용
  },
  verbose: true,   // Drizzle Kit 실행 시 상세 로그 출력 여부
  strict: true,    // 엄격 모드 사용 (잠재적 문제 방지)
};