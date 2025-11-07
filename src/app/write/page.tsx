'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabaseClient'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [postType, setPostType] = useState('post')  // 'post' 또는 'project' 선택 상태

  const handleSubmit = async () => {
    if (!title || !content || !author) {
      setMessage('제목, 내용, 작성자를 모두 입력해주세요.')
      return
    }
    setLoading(true)

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content,
        author,
        type: postType  // 추가된 타입 컬럼에 postType 값 저장
      }
    ])

    if (error) {
      setMessage('업로드 실패: ' + error.message)
    } else {
      setMessage('업로드 완료!')
      setTitle('')
      setAuthor('')
      setContent('')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-8 mt-12">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">글 작성</h1>

      {/* 포스트 타입 선택 */}
      <div className="mb-4">
        <label className="mr-2">글 타입을 선택하세요:</label>
        <select
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="post">게시물</option>
          <option value="project">프로젝트</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="작성자 이름을 입력하세요"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        className="w-full p-3 mb-4 rounded border border-gray-300"
      />

      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-3 mb-4 rounded border border-gray-300"
      />

      <ReactQuill
        value={content}
        onChange={setContent}
        className="mb-4"
        theme="snow"
        style={{
          backgroundColor: '#ffffffff', // 어두운 배경
          color: '#000000ff',           // 글자 밝게
          minHeight: '200px'
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
      >
        {loading ? '업로드 중...' : '게시하기'}
      </button>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  )
}

