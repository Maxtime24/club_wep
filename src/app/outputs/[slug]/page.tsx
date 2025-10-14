// src/app/outputs/[slug]/page.tsx

import React from 'react';

// Next.js App Router에서 동적 라우팅 [slug] 페이지는 반드시
// 'export default'와 함께 React 컴포넌트 함수를 내보내야 합니다.
// params prop을 통해 URL의 slug 값을 접근할 수 있습니다.
export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params; // URL에서 동적으로 전달되는 slug 값을 가져옵니다.

  // TODO: 실제 프로젝트에서는 이 slug 값을 이용하여 데이터베이스나 JSON 파일 등에서
  // 해당 프로젝트의 상세 정보를 불러와서 여기에 표시해야 합니다.
  // 예시: const projectData = fetchProjectData(slug);

  return (
    <div className="min-h-screen bg-stone-900 text-white p-8 pt-24 md:pt-28">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-6 text-center">
          Project Detail: <span className="font-semibold text-white">{slug}</span>
        </h1>
        <p className="text-lg text-gray-300 text-center">
          This is the detail page for project with ID: <span className="font-semibold text-white">{slug}</span>.
        </p>
        <p className="text-center mt-4">
          {/* 실제 상세 내용이 로드되기 전의 임시 메시지 */}
          Please implement data fetching here to show full project details.
        </p>
        {/*
          예시: 실제 프로젝트 상세 정보 렌더링 (주석 해제 후 구현)
          {projectData && (
            <div className="mt-8 text-center">
              <h2 className="text-3xl text-white">{projectData.title}</h2>
              <Image
                src={projectData.image}
                alt={projectData.title}
                width={800}
                height={450}
                className="mx-auto rounded-lg shadow-lg mt-4"
              />
              <p className="mt-4 text-gray-300">{projectData.description}</p>
              // ... 더 많은 상세 정보
            </div>
          )}
        */}
      </div>
    </div>
  );
}