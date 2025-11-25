'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const openModal = () => {
    setOpen(true);
    setClosing(false);
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setMessage('');
      setContent('');
    }, 250); // modalFadeOut duration과 동일
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setLoading(true);
    const { error } = await supabase.from('posts').insert({
      title: content.slice(0, 10),
      content,
      type: 'post',
      author: '익명',
    });

    setLoading(false);

    if (error) {
      setMessage('등록 실패');
      setError(true);
    } else {
      setMessage('등록 성공!');
      setTimeout(() => closeModal(), 800);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => {
          openModal();
          // 흔들림 애니메이션 트리거
          setTimeout(() => {
            const btn = document.getElementById('feedbackBtn');
            btn?.classList.remove('animate-fabShake');
            void btn?.offsetWidth;
            btn?.classList.add('animate-fabShake');
          }, 50);
        }}
        id="feedbackBtn"
        className="fixed bottom-6 right-6 px-5 py-3 rounded-full shadow-xl text-white font-bold z-50
        bg-[linear-gradient(110.8246056093817deg,rgba(243,72,104,1)_15.15%,rgba(242,71,104,1)_15.15%,rgba(158,0,236,1)_86.87%)]
        hover:scale-110 active:scale-95 transition-all duration-200 origin-center animate-fabPop"
      >
        피드백
      </button>

      {/* Overlay */}
      {open && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40
          ${closing ? 'animate-fadeInSlow reverse' : 'animate-fadeInSlow'}`}
          onClick={closeModal}
        />
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div
            className={`bg-white rounded-2xl w-96 p-6 shadow-2xl transition-all
            ${closing ? 'animate-modalFadeOut' : 'animate-modalPopBlur'}`}
          >
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              피드백 남기기
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <textarea
                className="border rounded-lg p-3 h-32 focus:ring-2 focus:ring-purple-400"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요..."
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50"
              >
                {loading ? '전송 중…' : '전송'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                닫기
              </button>
              {message && (
                <p className={`text-center text-sm ${error ? 'text-red-500' : 'text-green-600'}`}>
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
