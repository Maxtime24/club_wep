// src/app/layout.tsx

// import { Inter } from 'next/font/google' // 폰트 관련 주석은 그대로 둡니다.
// const inter = Inter({ subsets: ['latin'] })

import './globals.css'
import Header from '@/components/common/header'; // Header 컴포넌트 임포트
import Footer from '@/components/common/footer'; // Footer 컴포넌트 임포트
import React from 'react'; // React.ReactNode 사용을 위해 필요 (TS 오류 방지)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Header /> {/* Header 컴포넌트 배치 */}
        {/* main 태그에 fixed 헤더 높이만큼 paddingTop을 줍니다 (예: p-4 = 16px padding이라 가정하고 대략 64px(pt-16) 적용). */}
        {/* 실제 Header 컴포넌트의 높이에 따라 pt-값은 조절할 수 있습니다. */}
        <main className="min-h-screen pt-16"> {/* 여기에서 헤더 높이만큼 콘텐츠를 아래로 밀어냅니다 */}
          {children}
        </main>
        <Footer /> {/* Footer 컴포넌트 배치 */}
      </body>
    </html>
  );
}