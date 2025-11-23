'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function FeedbackForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setLoading(true);
    setMessage('');
    setError(false);

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: content.slice(0, 10), // title 제한
        content: content,
        type: 'post',
        author: '익명'
      });

    setLoading(false);

    if (error) {
      console.error('Insert Error:', error);
      setMessage('피드백 등록 실패 😢');
      setError(true);
    } else {
      setMessage('피드백 등록 성공! 🎉');
      setContent('');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-2xl rounded-xl p-4 z-50 ring-1 ring-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
        피드백 남기기
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          className="border border-gray-300 rounded-lg p-3 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700 placeholder-gray-400"
          placeholder="여기에 피드백을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white font-semibold rounded-lg py-2 transition-all hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={loading}
        >
          {loading ? '전송 중...' : '전송'}
        </button>
        {message && (
          <p
            className={`text-sm text-center ${
              error ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
