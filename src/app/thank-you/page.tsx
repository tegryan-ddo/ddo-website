'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center px-4"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Thank You!
          </h1>
          <p className="text-slate-400 mb-8">
            We&apos;ve received your message and will get back to you within 24 hours.
            In the meantime, feel free to explore our resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" asChild>
              <Link href="/assessment">
                <span className="relative z-10">Take AI Assessment</span>
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white"
              asChild
            >
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
