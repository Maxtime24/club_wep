// drizzle.config.mjs (정확한 내용)

/** @type { import("drizzle-kit").Config } */
export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
};