import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://digitaldevops.io'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/planning/',
          '/api/',
          '/auth/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
