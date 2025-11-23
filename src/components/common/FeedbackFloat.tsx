'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function FeedbackForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setLoading(true);
    setMessage('');

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: content.slice(0, 50), // title이 NOT NULL이므로 content 일부 사용
        content: content,
        type: 'post',
        author: '익명' // author NOT NULL 컬럼 필수
      });

    setLoading(false);

    if (error) {
      console.error('Insert Error:', error);
      setMessage('피드백 등록 실패');
    } else {
      setMessage('피드백 등록 성공!');
      setContent('');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-xl p-4 z-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          className="border rounded p-2 resize-none h-24"
          placeholder="피드백을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? '전송 중...' : '전송'}
        </button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
