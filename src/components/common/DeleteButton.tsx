// src/components/DeleteButton.tsx
'use client'

import { useState } from 'react'

interface DeleteButtonProps {
  id: number
  table: 'posts' | 'projects'
  onDeleted?: () => void
}

export default function DeleteButton({ id, table, onDeleted }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, table }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '삭제 실패')
      } else {
        onDeleted?.()
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 text-right">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? '삭제 중...' : '삭제하기'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
