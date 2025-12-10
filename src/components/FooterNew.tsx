'use client'

import Link from 'next/link'
import { Terminal } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const footerNavigation = {
  services: [
    { name: 'AWS Infrastructure', href: '/services#aws-infrastructure' },
    { name: 'Security & Compliance', href: '/services#security' },
    { name: 'DevOps Support', href: '/services#support' },
    { name: 'Managed Infrastructure', href: '/services#managed' },
    { name: 'Next.js Development', href: '/services#development' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/insights' },
    { name: 'Careers', href: '/careers' },
  ],
  resources: [
    { name: 'Pricing', href: '/pricing' },
    { name: 'Free AWS Review', href: '/contact?package=well-architected-review' },
    { name: 'Cost Calculator', href: '/calculator' },
    { name: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">
                Digital DevOps
              </span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              AI-augmented DevOps consulting. Senior engineers + AI tooling = 10x velocity.
              AWS infrastructure, security, and development.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Digital DevOps, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
