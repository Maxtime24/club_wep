'use server'

import { supabase } from '@/lib/supabaseClient'

export async function addPost(formData: FormData) {
  const content = formData.get('content') as string

  if (!content || content.trim().length < 2) {
    return { success: false, error: '내용이 너무 짧습니다.' }
  }

  const { error } = await supabase
    .from('posts')
    .insert([{ content }])

  if (error) {
    console.error(error)
    return { success: false, error: 'DB 저장 중 오류' }
  }

  return { success: true }
}
