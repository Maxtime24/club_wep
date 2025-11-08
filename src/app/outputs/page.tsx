'use client'

import { supabase } from '@/lib/supabaseClient'
import ProjectCard from '@/components/common/ProjectCard'

type Project = {
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
  const { data: projects, error } = await supabase
    .from<'projects', Project>('projects')
    .select('*')
    .order('id', { ascending: false })
    .limit(3)

  if (error) {
    console.error(error)
    return <div>프로젝트를 불러오는 중 오류가 발생했습니다.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
      {projects?.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} delay={0} />
      ))}
    </div>
  )
}
