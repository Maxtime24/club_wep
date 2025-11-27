import { createClient } from '@supabase/supabase-js'

// 클라이언트 전용 (익명 키, 브라우저에서 안전하게 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 서버 전용 (RLS 무시, service_role 키 사용)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey)
