// src/app/outputs/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// allOutputsData 경로는 프로젝트 구조에 맞게 다시 확인해주세요!
import allOutputsData from '../../../data/allOutputs.json'; // ../../../data/allOutputs.json

// --- AnimatedDiv 컴포넌트 임포트 ---
// AnimatedDiv가 src/components/AnimatedDiv.jsx (또는 .tsx)에 별도로 존재해야 합니다.
// 아래는 해당 파일이 임포트되는 예시입니다.
// AnimatedDiv의 파일 경로를 프로젝트 구조에 맞게 수정하세요.
import AnimatedDiv from '../../components/common/AnimatedDiv'; // 예: '../../components/AnimatedDiv'

// 주의: 아래 'AnimatedDiv' 컴포넌트 정의 코드는
// src/components/AnimatedDiv.jsx (또는 .tsx) 파일로 이동되어야 합니다.
// 이 파일(app/outputs/page.tsx)에는 존재하면 안 됩니다.
// 만약 'src/components/AnimatedDiv.jsx' 파일이 아직 없다면,
// 먼저 그 파일을 생성하고 다음 내용을 넣어주세요.
/*
// src/components/AnimatedDiv.jsx (또는 .tsx) 파일 내용 시작
'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function AnimatedDiv({
  children,
  delay,
  index
}: {
  children: React.ReactNode;
  delay?: number;
  index?: number;
}): JSX.Element {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const baseDelay = delay !== undefined ? delay : 150;
  const finalCalculatedDelay = index !== undefined ? (index * baseDelay) : 0;

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}
      style={{ transitionDelay: `${finalCalculatedDelay}ms` }}
    >
      {children}
    </div>
  );
}
// src/components/AnimatedDiv.jsx (또는 .tsx) 파일 내용 끝
*/
// (위 주석처리된 코드는 app/outputs/page.tsx 파일에는 절대 있으면 안 됩니다!
//  AnimatedDiv 컴포넌트 파일이 따로 존재한다면, 이 코드 블록 전체는 삭제하세요.)


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