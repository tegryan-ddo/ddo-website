/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digitaldevops.io',
      },
    ],
  },
  outputFileTracingRoot: process.cwd(),
}

export default nextConfig