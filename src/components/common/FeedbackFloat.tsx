'use client';

import { useState } from 'react';
import Image from 'next/image';
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
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setMessage('');
    
    try {
      const { error } = await supabase.from('posts').insert({
        title: content.slice(0, 10),
        content,
        type: 'post',
        author: '익명',
      });

      if (error) throw error;

      setMessage('등록 성공!');
      setError(false);
      setTimeout(() => closeModal(), 800);
    } catch (err) {
      console.error('Feedback submission error:', err);
      setMessage('등록 실패');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => {
          openModal();
          setTimeout(() => {
            const btn = document.getElementById('feedbackBtn');
            if (btn) {
              btn.classList.remove('animate-fabShake');
              void btn.offsetWidth;
              btn.classList.add('animate-fabShake');
            }
          }, 50);
        }}
        id="feedbackBtn"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl bg-gradient-to-br from-pink-500 to-purple-600 z-50
        hover:scale-110 active:scale-95 transition-all duration-200 origin-center animate-fabPop flex items-center justify-center"
        aria-label="피드백 작성"
      >
        <Image
          src="/images/feedback.png"
          alt="feedback"
          width={32}
          height={32}
          className="pointer-events-none"
        />
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
        <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
          <div
            className={`bg-white rounded-2xl w-96 p-6 shadow-2xl transition-all pointer-events-auto
            ${closing ? 'animate-modalFadeOut' : 'animate-modalPopBlur'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
              피드백 남기기
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <textarea
                className="border rounded-lg p-3 h-32 focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-800"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="피드백 작품명 + 구체적인 피드백 내용을 써주세요"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '전송 중…' : '전송'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                disabled={loading}
              >
                닫기
              </button>
              {message && (
                <p className={`text-center text-sm font-medium ${error ? 'text-red-500' : 'text-green-600'}`}>
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