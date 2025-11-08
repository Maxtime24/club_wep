'use client'

import { supabase } from '@/lib/supabaseClient'
import ProjectCard from '@/components/common/ProjectCard'

type Post = {
  id: number
  title: string
  description?: string
  image?: string
  content?: string
  tags?: string[]
  link?: string
}

export default async function OutputsPage() {
  // 최근 3개 프로젝트 가져오기
  const { data: posts, error } = await supabase
    .from<'posts', Post>('posts')
    .select('*')
    .order('id', { ascending: false })
    .limit(3)

  if (error) {
    console.error(error)
    return <div>포스트를 불러오는 중 오류가 발생했습니다.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
      {posts?.map((post, index) => (
        <ProjectCard key={post.id} project={post} index={index} delay={0} />
      ))}
    </div>
  )
}
