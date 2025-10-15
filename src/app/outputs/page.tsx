// src/app/outputs/page.tsx

'use client'; // 이 파일이 클라이언트 컴포넌트임을 명시

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// allOutputsData 경로는 프로젝트 구조에 맞게 다시 확인해주세요!
import allOutputsData from '../../../data/allOutputs.json';

// --- AnimatedDiv 컴포넌트 임포트 ---
// 경로는 src/components/common/AnimatedDiv.jsx (또는 .tsx) 파일 위치에 따라 수정해주세요.
import AnimatedDiv from '../../components/common/AnimatedDiv'; // <-- 이 줄은 반드시 있어야 합니다!


// 이곳(app/outputs/page.tsx)에는 AnimatedDiv의 정의 코드가 절대 있으면 안 됩니다!


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
          {/* h1 태그의 제목에 스크롤 애니메이션 적용 */}
          <h1
            ref={titleRef}
            className={`
              text-4xl md:text-5xl font-extrabold text-center text-blue-500 mb-10
              transition-all duration-1000 ease-out
              ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
            `}
          >
            Students&apos;s Projects {/* <-- ' (작은따옴표) 이스케이프 수정 완료 */}
          </h1>

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
                    {project.tags.map((tag, tagIndex) => (
                      <span key={`${tag}-${tagIndex}`} className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                   <Link
                    href={`/outputs/${project.id}`} // <--- 여기를 수정!
                    className="mt-auto inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  >
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