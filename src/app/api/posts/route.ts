// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'

// GET 요청 핸들러 예시
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Hello from API' })
}

// POST 요청 핸들러 예시
export async function POST(req: NextRequest) {
  const body = await req.json()
  return NextResponse.json({ received: body })
}
