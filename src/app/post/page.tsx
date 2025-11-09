'use client'

import { useRouter } from 'next/navigation'
import DeleteButton from '@/components/common/DeleteButton'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  content: string
  created_at: string
  summary?: string
}

interface PostsPageProps {
  posts: Post[]
}

export default function PostsPageClient({ posts }: PostsPageProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat text-white p-8 pt-24 md:pt-28">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12">
          포스트 목록
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="relative">
              <Link
                href={`/post/${post.id}`}
                className="block bg-white/90 text-gray-900 rounded-lg shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-2 text-blue-600">{post.title}</h2>
                <p className="text-gray-700 mb-4 line-clamp-3">{post.summary}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString('ko-KR')}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
