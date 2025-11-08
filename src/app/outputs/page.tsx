'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { supabase } from '@/lib/supabaseClient'
import AnimatedDiv from '@/components/common/AnimatedDiv'

// content에서 첫 번째 이미지 src 추출
function extractFirstImage(content: string) {
  const match = content.match(/<img[^>]+src="([^">]+)"/i)
  return match ? match[1] : null
}

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([])
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Supabase에서 posts 데이터 불러오기
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: true })

    if (error) console.error('Error loading posts:', error)
    else setPosts(data || [])
  }

  useEffect(() => {
    fetchPosts()

    // 실시간 구독
    const channel = supabase
      .channel('realtime:posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        () => {
          fetchPosts()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat text-white">
      <div className="pt-24 md:pt-28">
        <section className="container mx-auto p-8">
          <h1
            ref={titleRef}
            className={`text-4xl md:text-5xl font-extrabold text-center text-white mb-10 transition-all duration-1000 ease-out ${
              titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            Posts
          </h1>

          {posts.length === 0 && (
            <p className="text-center text-gray-700">아직 등록된 포스트가 없습니다.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => {
              const firstImage = post.image || extractFirstImage(post.content)
              const description = post.content
                ? post.content.replace(/<[^>]+>/g, '').slice(0, 100) + '...'
                : '내용 없음'

              const tags = Array.isArray(post.tags) ? post.tags : []

              return (
                <AnimatedDiv key={post.id} index={index} delay={100}>
                  <div className="bg-gray-300 rounded-lg shadow-xl p-6 flex flex-col items-center text-center h-full">
                    <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                      {firstImage ? (
                        <Image
                          src={firstImage}
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="rounded-md"
                        />
                      ) : (
                        <div className="bg-gray-500 w-full h-full flex items-center justify-center text-white">
                          이미지 없음
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-black mb-2">{post.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">{description}</p>

                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={`${tag}-${tagIndex}`}
                          className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/feedback/${post.id}`}
                      className="mt-auto inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                      자세히 보기
                    </Link>
                  </div>
                </AnimatedDiv>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
