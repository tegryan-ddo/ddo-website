import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex items-center justify-center bg-slate-950">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto px-4">
            {/* 404 Number */}
            <div className="mb-8">
              <span className="text-[150px] sm:text-[200px] font-bold leading-none bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                404
              </span>
            </div>

            {/* Message */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                asChild
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                asChild
              >
                <Link href="/services">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Services
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-sm text-slate-500 mb-4">Popular pages:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/pricing"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/docs"
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
