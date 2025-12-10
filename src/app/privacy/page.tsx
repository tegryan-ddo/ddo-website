import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Digital DevOps privacy policy. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-accent-600/10" />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Shield className="w-3 h-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-slate-400">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto prose prose-lg prose-slate prose-invert prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white">
            <h2>1. Introduction</h2>
            <p>
              Digital DevOps, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed
              to protecting your personal data. This privacy policy explains how we collect,
              use, and safeguard your information when you visit our website or use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Information You Provide</h3>
            <ul>
              <li>Contact information (name, email, phone number)</li>
              <li>Company information (company name, job title)</li>
              <li>Assessment responses and preferences</li>
              <li>Messages and communications you send us</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website or source</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send relevant communications about our services</li>
              <li>Analyze website usage and improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share your data with:
            </p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Professional advisors (lawyers, accountants)</li>
              <li>Law enforcement when required by law</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience on our website.
              You can control cookie preferences through your browser settings.
            </p>

            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible
              for the privacy practices of these external sites.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly
              collect personal information from children.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of
              any material changes by posting the new policy on this page.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this privacy policy or our data practices,
              please contact us at:
            </p>
            <p>
              <strong>Digital DevOps, Inc.</strong><br />
              Email: privacy@digitaldevops.io<br />
              Ucluelet, BC, Canada
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
