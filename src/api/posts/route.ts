// src/app/api/posts/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: '빈 API Route입니다.' })
}
