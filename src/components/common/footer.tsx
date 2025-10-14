// src/components/common/Footer.tsx
// (이 컴포넌트는 Server Component이므로 'use client' 지시어가 필요 없습니다.)

export default function Footer() {
  return (
    <footer className="bg-gray-800 bg-opacity-70 text-white p-4 text-center mt-12">
      <p>&copy; 2025 계산고 AI 디지털 연구소. All rights reserved.</p>
    </footer>
  );
}