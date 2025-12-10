'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'About', href: '/about' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-lg border-b border-slate-800'
          : 'bg-transparent'
      )}
    >
      <nav className="container-wide flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">
            Digital DevOps
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium text-slate-400 hover:text-white transition-colors',
                pathname === item.href && 'text-white'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-700 hover:text-white"
            asChild
          >
            <Link href="/contact?package=well-architected-review">
              Free AWS Review
            </Link>
          </Button>
          <Button
            variant="gradient"
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-cyan-500"
            asChild
          >
            <Link href="/contact">
              Get Started
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-950 border-b border-slate-800"
          >
            <div className="container-wide py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block py-2 text-base font-medium text-slate-400 hover:text-white transition-colors',
                    pathname === item.href && 'text-white'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 bg-slate-800/50 text-white hover:bg-slate-700"
                  asChild
                >
                  <Link href="/contact?package=well-architected-review" onClick={() => setMobileMenuOpen(false)}>
                    Free AWS Review
                  </Link>
                </Button>
                <Button
                  variant="gradient"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  asChild
                >
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
