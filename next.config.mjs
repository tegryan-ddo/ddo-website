/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['digitaldevops.io'],
  },
  outputFileTracingRoot: process.cwd(),
}

export default nextConfig