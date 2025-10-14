// src/components/common/Header.tsx
'use client'; // next/link와 같은 클라이언트 기능을 사용하기 위해 필요합니다.

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-500 bg-opacity-70 shadow p-4 z-20">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          AI DIGITAL LABORATORY
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/outputs" className="text-gray-300 hover:text-white">산출물</Link></li>
        </ul>
      </nav>
    </header>
  );
}