'use client'

import { useState } from 'react'
import { addPost } from '@/app/actions/addPost'

export default function FeedbackFloat() {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: any) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData()
    formData.append('content', content)

    const res = await addPost(formData)

    if (res.success) {
      setContent('')
      setStatus('success')
      setTimeout(() => setStatus('idle'), 1500)
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="fixed bottom-5 right-5">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-3 rounded-full shadow bg-blue-600 text-white"
        >
          Feedback
        </button>
      )}
      {open && (
        <div className="w-72 p-4 rounded-lg shadow-lg bg-white border">
          <form onSubmit={handleSubmit}>
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="의견을 입력하세요"
              className="w-full h-24 border rounded p-2 text-sm"
            />
            <div className="flex justify-between mt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-500 text-sm"
              >
                닫기
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
              >
                {status === 'loading' ? '저장 중...' : '보내기'}
              </button>
            </div>
          </form>

          {status === 'success' && <p className="text-green-500 text-xs mt-2">저장 완료</p>}
          {status === 'error' && <p className="text-red-500 text-xs mt-2">오류 발생</p>}
        </div>
      )}
    </div>
  )
}
