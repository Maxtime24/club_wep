import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic' // SSR 캐시 방지

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', Number(slug)) // id가 int4이므로 Number 변환 유지
    .single()

  // PGRST116은 "no rows returned" 에러이므로 무시
  if (error && error.code !== 'PGRST116') {
    console.error('Supabase error:', error)
    notFound()
  }

  if (!project) notFound()

  return (
    <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat text-white p-8 pt-24 md:pt-28">
      <div className="container mx-auto max-w-7xl bg-gray-200/80 rounded-lg pl-20 pr-20 pb-20 md:pt-20">
        <Link href="/outputs" className="text-blue-400 hover:text-blue-300 flex items-center mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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

        <div
          className="text-lg text-black leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: project.content }}
        ></div>

        {project.tags && Array.isArray(project.tags) && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {project.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow"
              >
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
