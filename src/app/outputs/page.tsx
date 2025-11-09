// src/app/outputs/page.tsx
import { supabaseServer } from '@/lib/supabaseServer'
import ProjectCard from '@/components/common/ProjectCard'

export const revalidate = 5 // ISR (5초마다 재검증)

export default async function OutputsPage() {
  // 서버용 Supabase 클라이언트 생성
  const supabase = supabaseServer()

  // 데이터 가져오기
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    console.error('Supabase fetch error:', error)
    return (
      <div className="text-red-500 text-center mt-10">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-gray-400 text-center mt-10">
        등록된 프로젝트가 없습니다.
      </div>
    )
  }

  // 이미지 보정 로직
  const processedProjects = projects.map((project) => {
    const match = project.content?.match(/<img\s+[^>]*src=["']([^"']+)["']/i)
    const firstImage = project.image || (match ? match[1] : '/images/default.png')
    return { ...project, image: firstImage }
  })

  return (
    <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat text-white p-8 pt-24 md:pt-28">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12">
          프로젝트 결과물
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              delay={0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
