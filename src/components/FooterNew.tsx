'use client'

import Link from 'next/link'
import { Sparkles, Github, Linkedin, Twitter } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const footerNavigation = {
  services: [
    { name: 'AI Strategy', href: '/services#strategy' },
    { name: 'AI Implementation', href: '/services#implementation' },
    { name: 'DevOps Transformation', href: '/services#devops' },
    { name: 'Security & Compliance', href: '/services#security' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Insights', href: '/insights' },
    { name: 'Careers', href: '/careers' },
  ],
  resources: [
    { name: 'AI Readiness Assessment', href: '/assessment' },
    { name: 'ROI Calculator', href: '/calculator' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Contact', href: '/contact' },
  ],
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
]

export function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-accent-600">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-zinc-900 dark:text-white">
                Digital DevOps
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-sm">
              AI Enablement Consulting for enterprises ready to transform.
              We turn AI experiments into business value.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} Digital DevOps, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
