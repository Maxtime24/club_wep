'use server'

import { supabase } from '@/lib/supabaseClient'

export async function addPost(formData: FormData) {
  const content = (formData.get('content') as string || '').trim()

  if (content.length < 2) {
    return { success: false, error: '2자 이상 입력해주세요.' }
  }

  const title = content.slice(0, 20) // 자동 생성

  const { error } = await supabase
    .from('posts')
    .insert([{ title, content }])

  if (error) {
    console.error('Supabase Insert Error:', error)
    return { success: false, error: 'DB 저장 중 오류가 발생했습니다.' }
  }

  return { success: true }
}
