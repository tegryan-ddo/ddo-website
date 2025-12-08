'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Database,
  Mail,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/FooterNew'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { assessmentFormSchema, type AssessmentFormData } from '@/lib/validations/contact'
import { trackConversion, trackEvent, trackFormSubmission } from '@/lib/analytics'

const questions = [
  {
    id: 'ai-experience',
    category: 'AI Maturity',
    icon: Brain,
    question: 'How would you describe your organization\'s current AI experience?',
    options: [
      { value: 'exploring', label: 'Just starting to explore AI possibilities', score: 1 },
      { value: 'experimenting', label: 'Running some AI experiments/POCs', score: 2 },
      { value: 'piloting', label: 'Piloting AI in specific use cases', score: 3 },
      { value: 'scaling', label: 'Scaling AI across multiple use cases', score: 4 },
      { value: 'mature', label: 'AI is core to our business operations', score: 5 },
    ],
  },
  {
    id: 'data-readiness',
    category: 'Data Readiness',
    icon: Database,
    question: 'How would you rate your organization\'s data infrastructure?',
    options: [
      { value: 'siloed', label: 'Data is siloed across many systems', score: 1 },
      { value: 'scattered', label: 'Some centralization but lots of gaps', score: 2 },
      { value: 'organized', label: 'Good data organization, some quality issues', score: 3 },
      { value: 'mature', label: 'Well-organized, quality data pipelines', score: 4 },
      { value: 'advanced', label: 'Advanced data platform with governance', score: 5 },
    ],
  },
  {
    id: 'team-capability',
    category: 'Team Capability',
    icon: Users,
    question: 'What AI/ML expertise exists within your team?',
    options: [
      { value: 'none', label: 'No dedicated AI/ML expertise', score: 1 },
      { value: 'basic', label: 'Some team members have basic AI knowledge', score: 2 },
      { value: 'growing', label: 'Small team with AI experience', score: 3 },
      { value: 'strong', label: 'Dedicated AI/ML team in place', score: 4 },
      { value: 'advanced', label: 'Large, experienced AI organization', score: 5 },
    ],
  },
  {
    id: 'infrastructure',
    category: 'Infrastructure',
    icon: Zap,
    question: 'How mature is your cloud/DevOps infrastructure?',
    options: [
      { value: 'traditional', label: 'Primarily on-premise, manual processes', score: 1 },
      { value: 'hybrid', label: 'Some cloud, limited automation', score: 2 },
      { value: 'cloud', label: 'Cloud-first with some CI/CD', score: 3 },
      { value: 'modern', label: 'Modern cloud-native with good DevOps', score: 4 },
      { value: 'advanced', label: 'Advanced platform engineering & MLOps', score: 5 },
    ],
  },
  {
    id: 'governance',
    category: 'Governance',
    icon: Shield,
    question: 'How prepared is your organization for AI governance and compliance?',
    options: [
      { value: 'none', label: 'No AI governance framework in place', score: 1 },
      { value: 'awareness', label: 'Awareness of needs but no formal approach', score: 2 },
      { value: 'developing', label: 'Developing policies and guidelines', score: 3 },
      { value: 'established', label: 'Established governance framework', score: 4 },
      { value: 'mature', label: 'Mature AI ethics and compliance program', score: 5 },
    ],
  },
  {
    id: 'business-alignment',
    category: 'Business Alignment',
    icon: Target,
    question: 'How well-defined are your AI use cases and business objectives?',
    options: [
      { value: 'unclear', label: 'Exploring potential use cases', score: 1 },
      { value: 'identified', label: 'Some use cases identified, unclear ROI', score: 2 },
      { value: 'prioritized', label: 'Prioritized use cases with business cases', score: 3 },
      { value: 'measured', label: 'Clear KPIs and measurement frameworks', score: 4 },
      { value: 'optimized', label: 'Continuous optimization based on results', score: 5 },
    ],
  },
]

function getReadinessLevel(score: number) {
  if (score <= 10) return { level: 'Foundation', color: 'text-orange-500', description: 'Focus on building foundational capabilities before scaling AI' }
  if (score <= 18) return { level: 'Emerging', color: 'text-yellow-500', description: 'Good foundation in place, ready to accelerate AI initiatives' }
  if (score <= 24) return { level: 'Developing', color: 'text-blue-500', description: 'Strong capabilities, focus on scaling and governance' }
  return { level: 'Advanced', color: 'text-green-500', description: 'Mature AI organization, focus on optimization and innovation' }
}

function getRecommendations(answers: Record<string, number>) {
  const recommendations = []

  if ((answers['data-readiness'] || 0) <= 2) {
    recommendations.push({
      title: 'Data Strategy',
      description: 'Prioritize data consolidation and quality before scaling AI',
      priority: 'High',
    })
  }

  if ((answers['team-capability'] || 0) <= 2) {
    recommendations.push({
      title: 'Team Development',
      description: 'Consider training programs or partnering with AI consultants',
      priority: 'High',
    })
  }

  if ((answers['governance'] || 0) <= 2) {
    recommendations.push({
      title: 'AI Governance',
      description: 'Establish AI policies and compliance framework early',
      priority: 'Medium',
    })
  }

  if ((answers['infrastructure'] || 0) <= 2) {
    recommendations.push({
      title: 'Infrastructure Modernization',
      description: 'Invest in cloud and DevOps capabilities to support AI workloads',
      priority: 'Medium',
    })
  }

  if ((answers['business-alignment'] || 0) <= 2) {
    recommendations.push({
      title: 'Use Case Prioritization',
      description: 'Define clear use cases with measurable business outcomes',
      priority: 'High',
    })
  }

  return recommendations.slice(0, 3)
}

export default function AssessmentPage() {
  const [step, setStep] = React.useState<'intro' | 'questions' | 'contact' | 'results'>('intro')
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, number>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
  const readiness = getReadinessLevel(totalScore)
  const recommendations = getRecommendations(answers)

  // Form validation with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<AssessmentFormData, 'name' | 'email' | 'company'>>({
    resolver: zodResolver(
      assessmentFormSchema.pick({ name: true, email: true, company: true })
    ),
  })

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }))

    // Track question progress
    trackEvent({
      name: 'assessment_question_answered',
      properties: {
        question_id: questionId,
        question_number: currentQuestion + 1,
        total_questions: questions.length,
      },
    })

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setStep('contact')
    }
  }

  const onSubmit = async (data: Pick<AssessmentFormData, 'name' | 'email' | 'company'>) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          answers,
          score: totalScore,
          readinessLevel: readiness.level,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit assessment')
      }

      // Track assessment completion
      trackConversion('assessment_complete', {
        score: totalScore,
        readiness_level: readiness.level,
      })
      trackFormSubmission('assessment', true, {
        score: totalScore,
        readiness_level: readiness.level,
      })

      setStep('results')
    } catch (error) {
      console.error('Assessment submission error:', error)
      trackFormSubmission('assessment', false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <AnimatePresence mode="wait">
          {/* Intro Screen */}
          {step === 'intro' && (
            <motion.section
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative pt-32 pb-20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid opacity-50 dark:opacity-30" />
              <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />

              <div className="container-wide relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Badge variant="secondary" className="mb-6 px-4 py-2">
                      <Sparkles className="w-3.5 h-3.5 mr-2" />
                      Free Assessment
                    </Badge>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6"
                  >
                    AI Readiness{' '}
                    <span className="text-gradient">Assessment</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8"
                  >
                    Discover where your organization stands on its AI journey. Get
                    personalized recommendations in just 2 minutes.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <Button
                      variant="gradient"
                      size="xl"
                      onClick={() => {
                        trackConversion('assessment_start')
                        setStep('questions')
                      }}
                      className="flex items-center"
                    >
                      Start Assessment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      6 questions | Takes about 2 minutes | Free personalized report
                    </p>
                  </motion.div>

                  {/* What you'll learn */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
                  >
                    {[
                      { icon: Brain, label: 'AI Maturity Score' },
                      { icon: Target, label: 'Gap Analysis' },
                      { icon: ChevronRight, label: 'Next Steps' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900"
                      >
                        <item.icon className="w-6 h-6 text-brand-500" />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Questions */}
          {step === 'questions' && (
            <motion.section
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-32 pb-20"
            >
              <div className="container-wide max-w-2xl mx-auto">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-500 to-accent-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Category badge */}
                    <Badge variant="secondary" className="mb-4">
                      {React.createElement(questions[currentQuestion].icon, {
                        className: 'w-3.5 h-3.5 mr-2',
                      })}
                      {questions[currentQuestion].category}
                    </Badge>

                    {/* Question */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-8">
                      {questions[currentQuestion].question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(questions[currentQuestion].id, option.score)}
                          className="w-full p-4 text-left rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/20 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-700 dark:text-zinc-300">
                              {option.label}
                            </span>
                            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-brand-500 transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Back button */}
                {currentQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuestion((prev) => prev - 1)}
                    className="mt-8 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous question
                  </button>
                )}
              </div>
            </motion.section>
          )}

          {/* Contact Form */}
          {step === 'contact' && (
            <motion.section
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-32 pb-20"
            >
              <div className="container-wide max-w-lg mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-brand-500" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                    Almost There!
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Enter your details to receive your personalized AI readiness report.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      {...register('name')}
                      placeholder="John Smith"
                      className={`mt-2 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Work Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="john@company.com"
                      className={`mt-2 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      type="text"
                      {...register('company')}
                      placeholder="Acme Inc."
                      className={`mt-2 ${errors.company ? 'border-red-500' : ''}`}
                    />
                    {errors.company && (
                      <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="xl"
                    className="w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Generating Report...
                      </>
                    ) : (
                      <>
                        Get My Results
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                    We&apos;ll also send a PDF copy to your email. No spam, ever.
                  </p>
                </form>
              </div>
            </motion.section>
          )}

          {/* Results */}
          {step === 'results' && (
            <motion.section
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-32 pb-20"
            >
              <div className="container-wide max-w-3xl mx-auto">
                {/* Score */}
                <div className="text-center mb-12">
                  <Badge variant="secondary" className="mb-4">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
                    Assessment Complete
                  </Badge>
                  <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                    Your AI Readiness Score
                  </h1>
                  <div className="flex justify-center items-end gap-2 mb-4">
                    <span className="text-6xl sm:text-7xl font-bold text-gradient">
                      {totalScore}
                    </span>
                    <span className="text-2xl text-zinc-400 mb-2">/30</span>
                  </div>
                  <div className={`text-xl font-semibold ${readiness.color} mb-2`}>
                    {readiness.level}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {readiness.description}
                  </p>
                </div>

                {/* Breakdown */}
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 mb-8">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
                    Score Breakdown
                  </h2>
                  <div className="space-y-4">
                    {questions.map((q) => (
                      <div key={q.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-zinc-600 dark:text-zinc-400">{q.category}</span>
                          <span className="font-medium text-zinc-900 dark:text-white">
                            {answers[q.id] || 0}/5
                          </span>
                        </div>
                        <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-brand-500 to-accent-500"
                            style={{ width: `${((answers[q.id] || 0) / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {recommendations.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
                      Key Recommendations
                    </h2>
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <div
                          key={rec.title}
                          className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-brand-500">{index + 1}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-zinc-900 dark:text-white">
                                {rec.title}
                              </h3>
                              <Badge variant={rec.priority === 'High' ? 'destructive' : 'secondary'}>
                                {rec.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                              {rec.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent-500/10 border border-brand-500/20">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                    Ready to Accelerate Your AI Journey?
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    Let&apos;s discuss your results and create a roadmap to improve your AI readiness.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="gradient" size="lg" asChild>
                      <Link href="/contact" className="flex items-center">
                        Schedule Strategy Session
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/services">View Services</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
