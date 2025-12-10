import Script from 'next/script'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://digitaldevops.io'

// Organization Schema
export function OrganizationJsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Digital DevOps, Inc.',
    alternateName: 'Digital DevOps',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      'AI-augmented AWS infrastructure and DevOps consulting. Senior engineers, fixed pricing, fast delivery.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ucluelet',
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@digitaldevops.io',
      contactType: 'sales',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.linkedin.com/company/digitaldevops',
      'https://github.com/digitaldevops',
    ],
    foundingDate: '2020',
    founder: {
      '@type': 'Person',
      name: 'Ryan Teg',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 49.2827,
        longitude: -123.1207,
      },
      geoRadius: '10000',
    },
  }

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}

// Website Schema
export function WebsiteJsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Digital DevOps',
    url: baseUrl,
    description:
      'AI-augmented AWS infrastructure and DevOps consulting. Fixed pricing, fast delivery, senior engineers only.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  )
}

// Professional Service Schema
export function ProfessionalServiceJsonLd() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Digital DevOps',
    image: `${baseUrl}/og-image.png`,
    '@id': baseUrl,
    url: baseUrl,
    telephone: '+1-250-726-6712',
    priceRange: '$2,999 - $50,000+',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1583 Bay St',
      addressLocality: 'Ucluelet',
      addressRegion: 'BC',
      postalCode: 'V0R 3A0',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.9419,
      longitude: -125.5461,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'DevOps & Cloud Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'AWS Infrastructure',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AWS Launchpad - Starter',
                description: 'Production-ready AWS infrastructure for startups',
              },
              price: '2999',
              priceCurrency: 'USD',
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AWS Launchpad - Professional',
                description: 'Enterprise AWS infrastructure with HA and compliance',
              },
              price: '9999',
              priceCurrency: 'USD',
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Security Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Security Audit',
                description: 'Comprehensive AWS security assessment',
              },
              price: '2999',
              priceCurrency: 'USD',
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'SOC 2 Readiness',
                description: 'Complete SOC 2 compliance preparation',
              },
              price: '14999',
              priceCurrency: 'USD',
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Managed Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'DevOps Autopilot - Starter',
                description: '24/7 infrastructure monitoring and management',
              },
              price: '2499',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '2499',
                priceCurrency: 'USD',
                billingDuration: 'P1M',
              },
            },
          ],
        },
      ],
    },
  }

  return (
    <Script
      id="service-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  )
}

// Breadcrumb Schema (for use on individual pages)
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  }

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

// FAQ Schema (for pricing/services pages)
interface FAQItem {
  question: string
  answer: string
}

export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

// Combined component for the root layout
export function RootJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <ProfessionalServiceJsonLd />
    </>
  )
}
