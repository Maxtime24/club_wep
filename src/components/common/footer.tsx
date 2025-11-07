// src/components/common/Footer.tsx
// (이 컴포넌트는 Server Component이므로 'use client' 지시어가 필요 없습니다.)

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white p-4 text-center mt-15 font-[Pretendard] font-bold">
      <p>&copy; 2025 계산고 AI 디지털 연구소. All rights reserved.</p>
      <p>2025 ver. Created by 김형섭</p>
    </footer>
  );
}
