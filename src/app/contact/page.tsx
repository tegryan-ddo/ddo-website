'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
  User,
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { trackConversion, trackFormSubmission } from '@/lib/analytics'

const services = [
  'AI Strategy & Advisory',
  'AI Implementation',
  'Modern Development (React/Next.js)',
  'DevOps & Infrastructure',
  'Security & Compliance',
  'Other',
]

const budgetRanges = [
  'Under $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $250,000',
  '$250,000+',
  'Not sure yet',
]

const timelines = [
  'Immediately',
  'Within 1 month',
  '1-3 months',
  '3-6 months',
  '6+ months',
  'Just exploring',
]

const benefits = [
  'Free 30-minute strategy consultation',
  'Custom recommendations for your use case',
  'No obligation - just helpful insights',
  'Response within 24 hours',
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      service: '',
      budget: '',
      timeline: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit form')
      }

      // Track successful form submission
      trackConversion('contact_form_submit', {
        service: data.service,
        budget: data.budget || 'not_specified',
        timeline: data.timeline || 'not_specified',
      })
      trackFormSubmission('contact', true, { service: data.service })

      setIsSubmitted(true)
    } catch (error) {
      trackFormSubmission('contact', false)
      setSubmitError(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      )
    }
  }

  if (isSubmitted) {
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
              <Button variant="outline" asChild>
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />

          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="secondary" className="mb-6 px-4 py-2">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  Get in Touch
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6"
              >
                Let&apos;s Start a{' '}
                <span className="text-gradient">Conversation</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-400"
              >
                Tell us about your AI initiatives and challenges. We&apos;ll respond
                within 24 hours with tailored insights.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-slate-900/50">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Benefits Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-32">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    What to Expect
                  </h2>
                  <ul className="space-y-4 mb-8">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-400">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
                    <h3 className="font-medium text-white mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-slate-400">
                        <Mail className="w-4 h-4" />
                        <span>hello@digitaldevops.io</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <MapPin className="w-4 h-4" />
                        <span>Remote-first, US-based</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span>Mon-Fri, 9am-6pm EST</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Error Banner */}
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-900/20 border border-red-800 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-200">
                          Submission Failed
                        </p>
                        <p className="text-sm text-red-300">
                          {submitError}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Personal Info */}
                  <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
                    <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                      <User className="w-5 h-5 text-brand-500" />
                      About You
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          {...register('name')}
                          placeholder="John Smith"
                          className={`mt-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Work Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="john@company.com"
                          className={`mt-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          type="text"
                          {...register('company')}
                          placeholder="Acme Inc."
                          className={`mt-2 ${errors.company ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                        {errors.company && (
                          <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="role">Your Role</Label>
                        <Input
                          id="role"
                          type="text"
                          {...register('role')}
                          placeholder="CTO, VP Engineering, etc."
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
                    <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-brand-500" />
                      Project Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="service">Service Interest *</Label>
                        <select
                          id="service"
                          {...register('service')}
                          className={`mt-2 w-full px-3 py-2 border rounded-lg bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                            errors.service
                              ? 'border-red-500'
                              : 'border-slate-700'
                          }`}
                        >
                          <option value="">Select a service...</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        {errors.service && (
                          <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <select
                          id="budget"
                          {...register('budget')}
                          className="mt-2 w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="">Select budget range...</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="timeline">Timeline</Label>
                        <select
                          id="timeline"
                          {...register('timeline')}
                          className="mt-2 w-full px-3 py-2 border border-slate-700 rounded-lg bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          <option value="">When do you need to start?</option>
                          {timelines.map((timeline) => (
                            <option key={timeline} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
                    <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-brand-500" />
                      Your Message
                    </h3>
                    <div>
                      <Label htmlFor="message">
                        Tell us about your project or challenge *
                      </Label>
                      <textarea
                        id="message"
                        {...register('message')}
                        rows={5}
                        placeholder="What are you trying to achieve? What challenges are you facing? Any specific technologies or requirements?"
                        className={`mt-2 w-full px-3 py-2 border rounded-lg bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none ${
                          errors.message
                            ? 'border-red-500'
                            : 'border-slate-700'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      variant="gradient"
                      size="xl"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </span>
                    </Button>
                  </div>

                  <p className="text-xs text-slate-500 text-center">
                    By submitting this form, you agree to our{' '}
                    <Link href="/privacy" className="underline hover:text-brand-500">
                      Privacy Policy
                    </Link>
                    . We&apos;ll never share your information with third parties.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
