// src/components/common/Header.tsx
'use client'; // next/link와 같은 클라이언트 기능을 사용하기 위해 필요합니다.

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-[linear-gradient(110.8246056093817deg,rgba(243,72,104,1)_15.152343635757763%,rgba(242,71,104,1)_15.152343635757763%,rgba(158,0,236,1)_86.8710970133543%)] bg-opacity-70 shadow p-4 z-20">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white font-[foot-bal]">
          AI DIGITAL LABORATORY
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/outputs" className="text-gray-300 hover:text-white font-[Pretendard] font-bold">산출물</Link></li>
          <li><Link href="/write" clssName="text-gray-300 hover-white font-[Pretendard] font-bold pl-10">글 쓰기</Link></li>
        </ul>
      </nav>
    </header>
  );
}
