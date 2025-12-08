'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Insights', href: '/insights' },
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
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800'
          : 'bg-transparent'
      )}
    >
      <nav className="container-wide flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-accent-600">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-zinc-900 dark:text-white">
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
                'nav-link',
                pathname === item.href && 'text-zinc-900 dark:text-white'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button variant="gradient" asChild>
            <Link href="/contact">
              <span>Get Started</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
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
            className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
          >
            <div className="container-wide py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block py-2 text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors',
                    pathname === item.href && 'text-zinc-900 dark:text-white'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="gradient" className="w-full" asChild>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <span>Get Started</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
