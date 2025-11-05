/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // App Router 사용 시 필수
  },
  // base path 설정 (필요하면)
  // basePath: '',
}

module.exports = nextConfig
