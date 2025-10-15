// src/seed.ts (수정된 내용)

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// '@db' 대신 상대 경로 사용!
import { db } from '../db'; // <-- './db' -> '../db'로 수정
import { outputs } from '../db/schema'; // <-- './db/schema' -> '../db/schema'로 수정
import allOutputsData from '../data/allOutputs.json';

async function seedData() {
  if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL is not set. Please check your .env.local file.');
    process.exit(1);
  }
  try {
    console.log('Starting data seeding...');

    const dataToInsert = allOutputsData.map(project => ({
      slug: project.id,
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags.join(','),
      link: project.link,
    }));

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