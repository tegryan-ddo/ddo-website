import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-accent-600/10" />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <FileText className="w-3 h-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto prose prose-zinc dark:prose-invert">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the Digital DevOps website and services, you agree to be
              bound by these Terms of Service. If you do not agree to these terms, please
              do not use our services.
            </p>

            <h2>Services Description</h2>
            <p>
              Digital DevOps, Inc. provides AI enablement consulting, DevOps transformation,
              and related technology services. Our website offers information about our
              services, resources, and tools including the AI Readiness Assessment and
              ROI Calculator.
            </p>

            <h2>Use of Services</h2>
            <p>You agree to use our services only for lawful purposes and in accordance with these terms. You agree not to:</p>
            <ul>
              <li>Use our services in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt the integrity or performance of our services</li>
              <li>Transmit any malicious code or harmful content</li>
              <li>Impersonate any person or entity</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, images, and software,
              is the property of Digital DevOps, Inc. or its licensors and is protected by
              intellectual property laws. You may not reproduce, distribute, or create derivative
              works without our express written permission.
            </p>

            <h2>User Content</h2>
            <p>
              By submitting content through our forms or assessments, you grant us a non-exclusive,
              worldwide, royalty-free license to use, store, and process that content for the
              purpose of providing our services and improving our offerings.
            </p>

            <h2>Disclaimers</h2>
            <p>
              Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
              either express or implied. We do not guarantee that our services will be
              uninterrupted, secure, or error-free.
            </p>
            <p>
              The AI Readiness Assessment and ROI Calculator are provided for informational
              purposes only and should not be considered professional advice. Actual results
              may vary based on your specific circumstances.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Digital DevOps, Inc. shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages arising
              from your use of our services, even if we have been advised of the possibility
              of such damages.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Digital DevOps, Inc. and its officers,
              directors, employees, and agents from any claims, damages, losses, or expenses
              arising from your use of our services or violation of these terms.
            </p>

            <h2>Consulting Services</h2>
            <p>
              Consulting engagements are governed by separate agreements. These Terms of Service
              apply to the use of our website and online resources. Specific project terms,
              deliverables, and fees will be detailed in individual service agreements.
            </p>

            <h2>Confidentiality</h2>
            <p>
              We treat all client information as confidential. Information shared through our
              website forms and assessments is subject to our Privacy Policy. Consulting
              engagements may include additional confidentiality provisions.
            </p>

            <h2>Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our services at any
              time, without notice, for conduct that we believe violates these terms or is
              harmful to other users, us, or third parties.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may modify these terms at any time. We will notify you of material changes
              by posting the updated terms on our website. Your continued use of our services
              after changes are posted constitutes acceptance of the modified terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms are governed by the laws of British Columbia, Canada, without regard
              to conflict of law principles. Any disputes shall be resolved in the courts of
              British Columbia.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <p>
              <strong>Digital DevOps, Inc.</strong><br />
              Email: legal@digitaldevops.io<br />
              Ucluelet, BC, Canada
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
