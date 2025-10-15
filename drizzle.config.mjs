/** @type { import("drizzle-kit").Config } */ // JSDoc을 사용하여 타입 힌트를 제공 (TS 컴파일러 간섭 X)
export default { // export default는 여전히 가능합니다.
  schema: './db/schema.ts', // 스키마 파일은 .ts로 유지합니다.
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    url: process.env.DATABASE_URL, // .env.local의 DATABASE_URL (이제 '!'는 필요 없음, JS 파일이므로)
  },
  verbose: true,
  strict: true,
};