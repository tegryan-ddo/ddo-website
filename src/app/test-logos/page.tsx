'use client'

import { useState } from 'react'
import {
  Sparkles,
  Zap,
  Brain,
  Cpu,
  CircuitBoard,
  Blocks,
  Hexagon,
  Triangle,
  Diamond,
  Layers,
  GitBranch,
  Terminal,
  Code2,
  Workflow,
  Network,
  Orbit,
  Atom,
  Rocket,
  Lightbulb,
  Bot
} from 'lucide-react'
import { cn } from '@/lib/utils'

const logos = [
  { id: 1, name: 'Sparkles', icon: Sparkles, description: 'AI magic & innovation' },
  { id: 2, name: 'Zap', icon: Zap, description: 'Speed & energy' },
  { id: 3, name: 'Brain', icon: Brain, description: 'AI intelligence' },
  { id: 4, name: 'Cpu', icon: Cpu, description: 'Computing power' },
  { id: 5, name: 'CircuitBoard', icon: CircuitBoard, description: 'Tech infrastructure' },
  { id: 6, name: 'Blocks', icon: Blocks, description: 'Building blocks' },
  { id: 7, name: 'Hexagon', icon: Hexagon, description: 'Modern tech shape' },
  { id: 8, name: 'Triangle', icon: Triangle, description: 'Stability & direction' },
  { id: 9, name: 'Diamond', icon: Diamond, description: 'Premium quality' },
  { id: 10, name: 'Layers', icon: Layers, description: 'Stack & architecture' },
  { id: 11, name: 'GitBranch', icon: GitBranch, description: 'DevOps & version control' },
  { id: 12, name: 'Terminal', icon: Terminal, description: 'Developer focus' },
  { id: 13, name: 'Code2', icon: Code2, description: 'Code & development' },
  { id: 14, name: 'Workflow', icon: Workflow, description: 'Process automation' },
  { id: 15, name: 'Network', icon: Network, description: 'Connected systems' },
  { id: 16, name: 'Orbit', icon: Orbit, description: 'Systems in motion' },
  { id: 17, name: 'Atom', icon: Atom, description: 'Core technology' },
  { id: 18, name: 'Rocket', icon: Rocket, description: 'Growth & launch' },
  { id: 19, name: 'Lightbulb', icon: Lightbulb, description: 'Ideas & solutions' },
  { id: 20, name: 'Bot', icon: Bot, description: 'AI agents' },
]

const gradients = [
  { name: 'Brand Blue to Violet', from: 'from-brand-500', to: 'to-accent-600' },
  { name: 'Blue to Cyan', from: 'from-blue-600', to: 'to-cyan-500' },
  { name: 'Violet to Pink', from: 'from-violet-600', to: 'to-pink-500' },
  { name: 'Emerald to Teal', from: 'from-emerald-500', to: 'to-teal-600' },
]

export default function TestLogosPage() {
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null)
  const [selectedGradient, setSelectedGradient] = useState(0)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12">
      <div className="container-wide">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Logo Test Page
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Select a logo icon and gradient combination for Digital DevOps
        </p>

        {/* Gradient Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Gradient Options
          </h2>
          <div className="flex flex-wrap gap-4">
            {gradients.map((gradient, index) => (
              <button
                key={index}
                onClick={() => setSelectedGradient(index)}
                className={cn(
                  'px-4 py-2 rounded-lg border-2 transition-all',
                  selectedGradient === index
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                )}
              >
                <div className={cn(
                  'w-20 h-6 rounded bg-gradient-to-r mb-1',
                  gradient.from,
                  gradient.to
                )} />
                <span className="text-xs text-zinc-600 dark:text-zinc-400">{gradient.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        {selectedLogo !== null && (
          <div className="mb-12 p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
              Preview
            </h2>
            <div className="flex flex-wrap items-center gap-8">
              {/* Light Background Preview */}
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-200">
                <div className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br',
                  gradients[selectedGradient].from,
                  gradients[selectedGradient].to
                )}>
                  {(() => {
                    const LogoIcon = logos.find(l => l.id === selectedLogo)?.icon
                    return LogoIcon ? <LogoIcon className="w-5 h-5 text-white" /> : null
                  })()}
                </div>
                <span className="text-xl font-semibold text-zinc-900">
                  Digital DevOps
                </span>
              </div>

              {/* Dark Background Preview */}
              <div className="flex items-center gap-3 p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <div className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br',
                  gradients[selectedGradient].from,
                  gradients[selectedGradient].to
                )}>
                  {(() => {
                    const LogoIcon = logos.find(l => l.id === selectedLogo)?.icon
                    return LogoIcon ? <LogoIcon className="w-5 h-5 text-white" /> : null
                  })()}
                </div>
                <span className="text-xl font-semibold text-white">
                  Digital DevOps
                </span>
              </div>

              {/* Large Icon Preview */}
              <div className={cn(
                'flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br',
                gradients[selectedGradient].from,
                gradients[selectedGradient].to
              )}>
                {(() => {
                  const LogoIcon = logos.find(l => l.id === selectedLogo)?.icon
                  return LogoIcon ? <LogoIcon className="w-10 h-10 text-white" /> : null
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Logo Grid */}
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Choose an Icon ({logos.length} options)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {logos.map((logo) => {
            const Icon = logo.icon
            return (
              <button
                key={logo.id}
                onClick={() => setSelectedLogo(logo.id)}
                className={cn(
                  'p-6 rounded-xl border-2 transition-all hover:scale-105',
                  selectedLogo === logo.id
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30 shadow-lg'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                )}
              >
                <div className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br mx-auto mb-3',
                  gradients[selectedGradient].from,
                  gradients[selectedGradient].to
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white text-center">
                  {logo.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-1">
                  {logo.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* Selected Info */}
        {selectedLogo !== null && (
          <div className="mt-8 p-4 bg-brand-50 dark:bg-brand-950/30 rounded-lg border border-brand-200 dark:border-brand-800">
            <p className="text-brand-800 dark:text-brand-200">
              <strong>Selected:</strong> {logos.find(l => l.id === selectedLogo)?.name} with {gradients[selectedGradient].name} gradient
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
