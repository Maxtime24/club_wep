'use client';

import React, { JSX } from 'react';
import Link from 'next/link'; // Link 컴포넌트 임포트 확인
import Image from 'next/image'; // Image 컴포넌트 임포트 확인
import { useInView } from 'react-intersection-observer'; // useInView 임포트 확인

// allOutputsData는 OutputsPage 외부에서 정의되어 있어야 합니다.
// 예시: const allOutputsData = [...]
// 이 부분은 기존 코드에 있다고 가정합니다.
import allOutputsData from '../../../data/allOutputs.json';

function AnimatedDiv({
  children,
  delay,
  index
}: {
  children: React.ReactNode; // 여기에 React.ReactNode가 사용됩니다.
  delay?: number;
  index?: number;
}): JSX.Element {
  'use client';
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const baseDelay = delay !== undefined ? delay : 150; // 기본 딜레이 (delay가 없으면 150)
  const finalDelay = index !== undefined ? (index * baseDelay) : 0; // index가 없으면 0

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        ${finalDelay > 0 ? `delay-${finalDelay}` : ''}
      `}
    >
      {children}
    </div>
  );
}


export default function OutputsPage() {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-stone-900 text-white">
      {/* 고정된 헤더로 인한 콘텐츠 상단 여백 */}
      <div className="pt-24 md:pt-28">
        <section className="container mx-auto p-8">
          <AnimatedDiv>
            <h1
              ref={titleRef}
              className={`text-4xl md:text-5xl font-extrabold text-center text-blue-500 mb-10`}
            >
              Students's Projects
            </h1>
          </AnimatedDiv>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allOutputsData.map((project, index) => (
              <AnimatedDiv key={project.id} index={index} delay={100}>
                <div className="bg-stone-800 rounded-lg shadow-xl p-6 flex flex-col items-center text-center h-full">
                  <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => ( // <-- 여기를 수정했습니다!
                      <span key={`${tag}-${tagIndex}`} className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={project.link} className="mt-auto inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                    자세히 보기
                  </Link>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
