import { pgTable, text, varchar, timestamp, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Outputs 테이블 정의 (산출물 정보)
export const outputs = pgTable('outputs', {
  // id: 산출물의 고유 ID (자동 증가하는 일련번호)
  id: serial('id').primaryKey(), // serial은 PostgreSQL에서 자동 증가하는 숫자 타입

  // slug: URL에 사용될 고유 식별자 (예: 'club-website-project')
  // not null은 필수 값임을 의미하며, unique는 중복을 허용하지 않습니다.
  slug: varchar('slug', { length: 256 }).notNull().unique(),

  // title: 산출물 제목 (예: '클럽 웹사이트 제작')
  title: varchar('title', { length: 256 }).notNull(),

  // description: 산출물 상세 설명
  // text 타입은 더 긴 문자열을 저장할 수 있습니다.
  description: text('description').notNull(),

  // image: 산출물 대표 이미지 경로 (예: '/images/proj1.jpg')
  image: varchar('image', { length: 256 }).notNull(),

  // tags: 산출물 태그 (쉼표로 구분된 문자열로 저장, 예: 'Web,Next.js,TailwindCSS')
  // 데이터베이스에서 배열 타입으로 직접 저장할 수도 있지만,
  // 간단하게 문자열로 저장하고, 애플리케이션 레벨에서 파싱하는 방식도 많이 사용됩니다.
  tags: text('tags').notNull(),

  // link: 외부 프로젝트 링크 (예: GitHub URL)
  link: varchar('link', { length: 256 }), // null을 허용할 수 있습니다.

  // createdAt: 생성 시간 (자동으로 현재 시간 기록)
  createdAt: timestamp('created_at').defaultNow().notNull(),

  // updatedAt: 최종 업데이트 시간 (자동으로 현재 시간 기록)
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});