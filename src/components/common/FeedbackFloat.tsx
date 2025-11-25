'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
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

    const { error } = await supabase.from('posts').insert({
      title: content.slice(0, 10),
      content,
      type: 'post',
      author: '익명'
    });

    setLoading(false);

    if (error) {
      setMessage('피드백 등록 실패');
      setError(true);
    } else {
      setMessage('피드백 등록 성공!');
      setContent('');
      setTimeout(() => setOpen(false), 1000);
    }
  };

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 px-5 py-3 rounded-full shadow-lg text-white font-bold z-50
        bg-[linear-gradient(110.8246056093817deg,rgba(243,72,104,1)_15.15%,rgba(242,71,104,1)_15.15%,rgba(158,0,236,1)_86.87%)]
        hover:opacity-90 transition-all"
      >
        피드백
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeInSlow"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className="bg-white rounded-2xl w-96 p-6 shadow-2xl
            animate-modalPop"
          >
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              피드백 남기기
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <textarea
                className="border rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="내용을 입력하세요…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button
                type="submit"
                className="bg-purple-500 text-white font-semibold py-2 rounded-lg
                hover:bg-purple-600 transition-all disabled:opacity-50"
                disabled={loading}
              >
                {loading ? '전송 중…' : '전송'}
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg
                hover:bg-gray-400 transition-all"
              >
                닫기
              </button>

              {message && (
                <p
                  className={`text-sm text-center ${
                    error ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
