'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Clock, DollarSign, Users, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface CalculatorInputs {
  employees: number
  avgSalary: number
  manualHoursPerWeek: number
  errorRatePercent: number
  deploymentFrequency: number
  incidentResponseHours: number
}

const defaultInputs: CalculatorInputs = {
  employees: 50,
  avgSalary: 100000,
  manualHoursPerWeek: 20,
  errorRatePercent: 5,
  deploymentFrequency: 4,
  incidentResponseHours: 10,
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs)

  const results = useMemo(() => {
    const hourlyRate = inputs.avgSalary / 2080 // 52 weeks * 40 hours

    // Time savings from automation (reduce manual hours by 70%)
    const automationSavingsHours = inputs.manualHoursPerWeek * 0.7 * 52 * inputs.employees
    const automationSavingsDollars = automationSavingsHours * hourlyRate

    // Error reduction savings (reduce errors by 80%)
    const currentErrorCost = (inputs.errorRatePercent / 100) * inputs.avgSalary * inputs.employees * 0.1 // 10% of salary lost to errors
    const errorReductionSavings = currentErrorCost * 0.8

    // Faster deployments (reduce deployment time by 60%)
    const deploymentTimeSavings = inputs.deploymentFrequency * 52 * 4 * 0.6 * hourlyRate * 3 // 3 people per deployment

    // Incident response improvement (reduce by 50%)
    const incidentSavings = inputs.incidentResponseHours * 52 * 0.5 * hourlyRate * 2 // 2 people per incident

    const totalAnnualSavings = automationSavingsDollars + errorReductionSavings + deploymentTimeSavings + incidentSavings

    // Typical AI/DevOps investment
    const estimatedInvestment = inputs.employees * 5000 // $5K per employee for transformation

    const roi = ((totalAnnualSavings - estimatedInvestment) / estimatedInvestment) * 100
    const paybackMonths = (estimatedInvestment / totalAnnualSavings) * 12

    return {
      automationSavingsHours: Math.round(automationSavingsHours),
      automationSavingsDollars: Math.round(automationSavingsDollars),
      errorReductionSavings: Math.round(errorReductionSavings),
      deploymentTimeSavings: Math.round(deploymentTimeSavings),
      incidentSavings: Math.round(incidentSavings),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      estimatedInvestment: Math.round(estimatedInvestment),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      threeYearValue: Math.round(totalAnnualSavings * 3 - estimatedInvestment),
    }
  }, [inputs])

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0
    setInputs(prev => ({ ...prev, [field]: numValue }))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-accent-600/10" />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Calculator className="w-3 h-3 mr-1" />
              ROI Calculator
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Calculate Your AI & DevOps ROI
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              See the potential return on investment from implementing AI-powered
              automation and modern DevOps practices in your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800"
            >
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                Your Organization
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Employees in Tech/Ops
                  </label>
                  <Input
                    type="number"
                    value={inputs.employees}
                    onChange={(e) => handleInputChange('employees', e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Average Annual Salary (USD)
                  </label>
                  <Input
                    type="number"
                    value={inputs.avgSalary}
                    onChange={(e) => handleInputChange('avgSalary', e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Hours Spent on Manual Tasks (per person/week)
                  </label>
                  <Input
                    type="number"
                    value={inputs.manualHoursPerWeek}
                    onChange={(e) => handleInputChange('manualHoursPerWeek', e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Current Error/Rework Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={inputs.errorRatePercent}
                    onChange={(e) => handleInputChange('errorRatePercent', e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    <Zap className="w-4 h-4 inline mr-2" />
                    Deployments per Month
                  </label>
                  <Input
                    type="number"
                    value={inputs.deploymentFrequency}
                    onChange={(e) => handleInputChange('deploymentFrequency', e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Hours Spent on Incidents (per week)
                  </label>
                  <Input
                    type="number"
                    value={inputs.incidentResponseHours}
                    onChange={(e) => handleInputChange('incidentResponseHours', e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Main ROI Card */}
              <div className="bg-gradient-to-br from-brand-600 to-accent-600 rounded-2xl p-8 text-white">
                <h2 className="text-xl font-semibold mb-6">Projected Annual Savings</h2>
                <div className="text-5xl font-bold mb-2">
                  {formatCurrency(results.totalAnnualSavings)}
                </div>
                <p className="text-white/80 mb-6">per year</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold">{results.roi}%</div>
                    <div className="text-sm text-white/80">First Year ROI</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold">{results.paybackMonths} mo</div>
                    <div className="text-sm text-white/80">Payback Period</div>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                  Savings Breakdown
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-white">Automation Savings</div>
                      <div className="text-sm text-zinc-500">{formatNumber(results.automationSavingsHours)} hours saved</div>
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      {formatCurrency(results.automationSavingsDollars)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-white">Error Reduction</div>
                      <div className="text-sm text-zinc-500">80% fewer errors</div>
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      {formatCurrency(results.errorReductionSavings)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-white">Faster Deployments</div>
                      <div className="text-sm text-zinc-500">60% faster releases</div>
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      {formatCurrency(results.deploymentTimeSavings)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-white">Incident Response</div>
                      <div className="text-sm text-zinc-500">50% faster resolution</div>
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      {formatCurrency(results.incidentSavings)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3-Year Value */}
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">3-Year Net Value</div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {formatCurrency(results.threeYearValue)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Est. Investment</div>
                    <div className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                      {formatCurrency(results.estimatedInvestment)}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                  Ready to realize these savings?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Let&apos;s discuss how we can help you achieve these results with a customized AI & DevOps strategy.
                </p>
                <div className="flex gap-3">
                  <Link href="/contact">
                    <Button className="bg-brand-600 hover:bg-brand-700 text-white">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/assessment">
                    <Button variant="outline">
                      Take AI Assessment
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology Note */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              How We Calculate ROI
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              Our calculations are based on industry benchmarks and real-world results from
              AI and DevOps transformations. Actual results may vary based on your specific
              situation, technology stack, and implementation approach.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                <div className="text-2xl font-bold text-brand-600 mb-2">70%</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Average reduction in manual tasks through AI-powered automation
                </div>
              </div>
              <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                <div className="text-2xl font-bold text-brand-600 mb-2">80%</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Typical reduction in errors with proper DevOps practices
                </div>
              </div>
              <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                <div className="text-2xl font-bold text-brand-600 mb-2">60%</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Average improvement in deployment speed with CI/CD
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
