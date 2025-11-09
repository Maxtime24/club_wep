// src/app/posts/page.tsx

import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import DeleteButton from '@/components/common/DeleteButton'

export const revalidate = 5 // 30초마다 데이터 캐싱 갱신

export default async function PostsPage() {
  // Supabase에서 posts 데이터 가져오기
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, content, created_at')
    .order('id', { ascending: false })

  if (error) {
    console.error('Supabase fetch error:', error)
    return <div className="text-red-500 text-center mt-10">데이터를 불러오는 중 오류가 발생했습니다.</div>
  }

  if (!posts || posts.length === 0) {
    return <div className="text-gray-400 text-center mt-10">등록된 포스트가 없습니다.</div>
  }

  // 내용 요약 (HTML 태그 제거 후 앞부분만 표시)
  const summarizedPosts = posts.map((post) => {
    const textOnly = post.content?.replace(/<[^>]*>?/gm, '') || ''
    const summary = textOnly.length > 100 ? textOnly.slice(0, 100) + '...' : textOnly
    return { ...post, summary }
  })

  return (
    <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat text-white p-8 pt-24 md:pt-28">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12">
          포스트 목록
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {summarizedPosts.map((post) => (
            <Link
              href={`/post/${post.id}`}
              key={post.id}
              className="block bg-white/90 text-gray-900 rounded-lg shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-2 text-blue-600">{post.title}</h2>
              <p className="text-gray-700 mb-4 line-clamp-3">{post.summary}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString('ko-KR')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
