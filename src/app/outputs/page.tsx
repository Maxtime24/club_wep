// src/app/outputs/[slug]/page.tsx
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Project {
  id: number
  title: string
  description?: string
  image?: string
  content?: string
  tags?: string[]
  link?: string
}

interface Props {
  params: { slug: string }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = params

  // Supabase에서 단일 프로젝트 가져오기
  const { data: project, error } = await supabase
    .from<Project>('projects')
    .select('*')
    .eq('id', Number(slug)) // id가 integer라면 Number 변환
    .single()

  if (error || !project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat text-white p-8 pt-24 md:pt-28">
      <div className="container mx-auto max-w-7xl bg-gray-200/80 rounded-lg p-8 md:pt-20">
        <Link href="/outputs" className="text-blue-400 hover:text-blue-300 flex items-center mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          프로젝트 목록으로 돌아가기
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-500 mb-8 mt-4">
          {project.title}
        </h1>

        {project.image && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
              priority
            />
          </div>
        )}

        {project.content && (
          <div
            className="text-lg text-black leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {project.tags.map((tag, i) => (
              <span key={i} className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.link && (
          <div className="text-center mt-8">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              프로젝트 보러 가기
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
