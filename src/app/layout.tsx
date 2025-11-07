import './globals.css'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import React from 'react'
import type { Metadata } from 'next'

// 모든 페이지의 기본 title, 템플릿 지정
export const metadata: Metadata = {
  title: {
    default: 'AI DIGITAL LAB', // 기본 제목
  },
  description: 'AI DIGITAL LAB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
