import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // .env.local 파일을 명시적으로 로드
//console.log('DATABASE_URL from dotenv:', process.env.DATABASE_URL); // 디버깅용

import { db } from '@/db';
import { outputs } from '@/db/schema';
import allOutputsData from '../data/allOutputs.json'; // 이 경로는 현재 상대 경로가 맞습니다.

async function seedData() {
  if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL is not set. Please check your .env.local file.');
    process.exit(1);
  }
  try {
    console.log('Starting data seeding...');

    // 모든 JSON 데이터를 그대로 삽입
    const dataToInsert = allOutputsData.map(project => ({
      slug: project.id,
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags.join(','), // 배열을 쉼표로 연결된 문자열로 변환
      link: project.link,
    }));

    // 기존 데이터 삭제 (중복 삽입 방지)
    // INSERT INTO 전에 DELETE FROM을 하면, ID가 serial인 경우 1부터 다시 시작될 수 있습니다.
    // 또는, ON CONFLICT (slug) DO UPDATE SET ... 와 같은 upsert 로직을 사용합니다.
    // 여기서는 간단히 delete 후 insert합니다.
    await db.delete(outputs);
    console.log('Existing outputs data deleted.');

    if (dataToInsert.length > 0) {
      const insertedData = await db.insert(outputs).values(dataToInsert).returning();
      console.log(`Successfully seeded ${insertedData.length} outputs into the database.`);
    } else {
      console.log('No data to seed from allOutputs.json.');
    }

  } catch (error) {
    console.error('Data seeding failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedData();