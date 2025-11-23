// src/components/ProjectCard.jsx (또는 .tsx)

'use client'; // 클라이언트 컴포넌트임을 명시

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer'; // ProjectCard 내부에서 useInView 호출

// project 데이터는 teacherPicksData의 각 요소와 동일한 구조여야 합니다.
export default function ProjectCard({ project, index, delay = 0 }) {
  const { ref, inView } = useInView({
    triggerOnce: false, // 필요에 따라 true/false 설정 (이전과 동일하게 유지)
    threshold: 0.1,
  });

  // 애니메이션 지연 계산 (Tailwind JIT가 `delay-` 클래스 모두 생성하지 않을 때 안정적)
  const animationDelay = (index * 150) + delay;

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        bg-stone-800 rounded-lg shadow-xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105
      `}
      style={{ transitionDelay: `${animationDelay}ms` }} // 인라인 스타일로 delay 적용
    >
      <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-md"
        />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
      <Link
        href={`/post/${project.id}`} // <--- 여기를 수정!
        className="mt-auto inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
      >
        더보기
      </Link>
    </div>
  );
}