/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        // 버튼 흔들림
        fabShake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '30%': { transform: 'rotate(-12deg)' },
          '60%': { transform: 'rotate(12deg)' },
        },
        // 모달 등장 (Fade + Scale + Blur)
        modalFadeIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.85)',
            filter: 'blur(8px)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
            filter: 'blur(0px)',
          },
        },
        // 모달 닫힘 (Fade + Scale + Blur)
        modalFadeOut: {
          '0%': {
            opacity: 1,
            transform: 'scale(1)',
            filter: 'blur(0px)',
          },
          '100%': {
            opacity: 0,
            transform: 'scale(0.85)',
            filter: 'blur(8px)',
          },
        },
      },
      animation: {
        fabShake: 'fabShake 0.35s ease-in-out',
        modalFadeIn: 'modalFadeIn 0.3s ease-in-out forwards',
        modalFadeOut: 'modalFadeOut 0.25s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
