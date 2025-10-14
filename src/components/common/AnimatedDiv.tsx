// src/components/AnimatedDiv.jsx (또는 .tsx)

'use client'; // 클라이언트 컴포넌트임을 명시

import React, { JSX } from 'react'; // React 임포트
import { useInView } from 'react-intersection-observer'; // useInView 임포트

// AnimatedDiv 컴포넌트 정의
export default function AnimatedDiv({
  children,
  delay, // AnimatedDiv 자체의 기본 지연 시간
  index // 배열의 인덱스, 지연 시간 계산에 사용
}: {
  children: React.ReactNode;
  delay?: number;
  index?: number;
}): JSX.Element {
  const { ref, inView } = useInView({
    triggerOnce: true, // 한 번만 애니메이션 재생
    threshold: 0.1,    // 요소의 10%가 보일 때 트리거
  });

  const baseDelay = delay !== undefined ? delay : 150; // delay prop이 없으면 기본 150ms
  const finalCalculatedDelay = index !== undefined ? (index * baseDelay) : 0; // index와 baseDelay를 곱해 최종 지연 시간 계산

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        ${finalCalculatedDelay > 0 ? `delay-${finalCalculatedDelay}` : ''}
      `}
      // Tailwind CSS의 `delay-` 클래스가 모든 경우에 생성되지 않을 수 있으므로,
      // `style` 속성을 이용해 명시적으로 `transitionDelay`를 주는 것이 더 안정적입니다.
      style={{ transitionDelay: `${finalCalculatedDelay}ms` }}
    >
      {children}
    </div>
  );
}