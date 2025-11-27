
// src/lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// 싱글톤 패턴으로 클라이언트 인스턴스 관리
let supabaseInstance: SupabaseClient | null = null
let supabaseServerInstance: SupabaseClient | null = null

// 환경 변수 검증
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is missing in environment variables')
}

if (!supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in environment variables')
}

// 클라이언트 전용 (싱글톤)
export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  }
  return supabaseInstance
}

// 편의를 위한 기본 export
export const supabase = getSupabase()

// 서버 전용 (서버 컴포넌트/API 라우트에서만 사용)
export const getSupabaseServer = (): SupabaseClient => {
  if (typeof window !== 'undefined') {
    throw new Error('supabaseServer should only be used on the server side')
  }
  
  if (!supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing in environment variables')
  }
  
  if (!supabaseServerInstance) {
    supabaseServerInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  }
  return supabaseServerInstance
}