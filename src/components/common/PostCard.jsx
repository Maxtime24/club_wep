v// src/components/ProjectCard.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function ProjectCard({ project, index, delay = 0 }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const animationDelay = index * 150 + delay;

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        bg-stone-800 rounded-lg shadow-xl p-6 flex flex-col justify-between
        transition-transform transform hover:scale-105
      `}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      {/* 상단 이미지 + 제목 + 내용 */}
      <div>
        <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-md"
          />
        </div>
        {/* 제목: 최대 20글자 */}
        <h3 className="text-xl font-bold text-white mb-2">
          {project.title.length > 20
            ? project.title.slice(0, 20) + '...'
            : project.title}
        </h3>
        {/* 내용: 최대 2줄 line-clamp */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* 하단 날짜 */}
      <div className="flex justify-start text-gray-400 text-xs mt-2">
        {new Date(project.created_at).toLocaleDateString()}
      </div>

      {/* 하단 더보기 버튼 */}
      <Link
        href={`/post/${project.id}`}
        className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
      >
        더보기
      </Link>
    </div>
  );
}
