
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',      // Pages Router 사용 시 (필요 없으면 제거)
  './components/**/*.{js,ts,jsx,tsx,mdx}', // 컴포넌트 폴더가 루트에 있다면
  './app/**/*.{js,ts,jsx,tsx,mdx}',        // app 폴더가 루트에 있다면
  './src/**/*.{js,ts,jsx,tsx,mdx}',        // src 폴더가 있다면 (app, components 포함)
],

  theme: {
    extend: {
      backgroundImage: { /* 기존 배경 이미지 설정 */ },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'translateY(100%) scale(0.5)', opacity: '0' },
          '60%': { transform: 'translateY(-10%) scale(1.1)', opacity: '1' },
          '80%': { transform: 'translateY(5%) scale(0.95)' },
          '100%': { transform: 'translateY(0%) scale(1)', opacity: '1' },
        },
      },
      animation: {
        bounceIn: 'bounceIn 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;