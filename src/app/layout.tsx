import './globals.css'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import React from 'react'
import type { Metadata } from 'next'

export const metadata = {
  title: {
    default: 'AI DIGITAL LAB',
    template: '%s | AI DIGITAL LAB',
  },
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
