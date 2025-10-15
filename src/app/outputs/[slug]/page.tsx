// src/app/outputs/[slug]/page.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // 없는 페이지 처리 (404)

// allOutputsData 경로는 프로젝트 구조에 맞게 다시 확인해주세요!
import allOutputsData from '../../../../data/allOutputs.json';


// 1. generateStaticParams: 빌드 시점에 생성할 정적 페이지 목록 정의
//    Next.js가 이 함수를 실행하여 어떤 slug 값을 가진 페이지를 미리 빌드할지 결정합니다.
//    allOutputs.json에 있는 모든 프로젝트에 대해 페이지를 생성하게 됩니다.
export async function generateStaticParams() {
  return allOutputsData.map((project) => ({
    slug: project.id, // allOutputsData의 각 project 객체에 'id' 필드가 있어야 합니다.
  }));
}


// 2. ProjectDetailPage 컴포넌트: 실제 상세 페이지 렌더링
//    { params: { slug: string } } 타입은 Next.js가 동적 라우팅에서 전달하는 형식입니다.
export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params; // URL에서 동적으로 전달되는 slug 값을 가져옵니다.

  // slug 값과 일치하는 프로젝트 데이터를 찾습니다.
  const project = allOutputsData.find((item) => item.id === slug);

  // 만약 해당 slug를 가진 프로젝트를 찾을 수 없다면 404 페이지를 렌더링합니다.
  if (!project) {
    notFound(); // Next.js의 404 페이지를 띄웁니다.
  }

  return (
    <div className="min-h-screen bg-stone-900 text-white p-8 pt-24 md:pt-28">
      <div className="container mx-auto max-w-4xl">
        {/* 뒤로 가기 버튼 */}
        <Link href="/outputs" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          산출물 목록으로 돌아가기
        </Link>

        {/* 프로젝트 제목 */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-500 mb-8 mt-4">
          {project.title}
        </h1>

        {/* 프로젝트 이미지 */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority // 상세 페이지의 메인 이미지는 빠르게 로드되도록 우선순위 부여
          />
        </div>

        {/* 프로젝트 설명 */}
        <p className="text-lg text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap">
          {project.description}
        </p>

        {/* 태그 목록 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {project.tags.map((tag, tagIndex) => (
            <span key={`${tag}-${tagIndex}`} className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
              {tag}
            </span>
          ))}
        </div>

        {/* 외부 링크 (옵션) */}
        {project.link && (
          <div className="text-center mt-8">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              프로젝트 보러 가기
            </a>
          </div>
        )}
      </div>
    </div>
  );
}