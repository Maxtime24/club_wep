'use client'

import { useRouter } from 'next/navigation'
import DeleteButton from '@/components/common/DeleteButton'
import ProjectCard from '@/components/common/ProjectCard'

interface Project {
  id: number
  title: string
  content?: string
  image?: string
  tags?: string[]
  link?: string
}

interface OutputsPageProps {
  projects: Project[]
}

export default function OutputsPageClient({ projects }: OutputsPageProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat text-white p-8 pt-24 md:pt-28">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12">
          프로젝트 결과물
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const match = project.content?.match(/<img\s+[^>]*src=["']([^"']+)["']/i)
            const firstImage = project.image || (match ? match[1] : '/images/default.png')

          })}
        </div>
      </div>
    </div>
  )
}
