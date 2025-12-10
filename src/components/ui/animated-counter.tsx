'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import CountUp from 'react-countup'

interface AnimatedCounterProps {
  end: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2.5,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true)
    }
  }, [isInView, hasStarted])

  return (
    <span ref={ref} className={className}>
      {hasStarted ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          useEasing={true}
          separator=","
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  )
}

// Helper function to parse stat values like "$49B", "78%", "3.7x"
export function parseStatValue(value: string): {
  end: number
  prefix: string
  suffix: string
  decimals: number
} {
  // Handle currency like "$49B" or "$8.8B"
  if (value.startsWith('$')) {
    const numPart = value.slice(1)
    if (numPart.endsWith('B')) {
      const num = parseFloat(numPart.slice(0, -1))
      return {
        end: num,
        prefix: '$',
        suffix: 'B',
        decimals: num % 1 === 0 ? 0 : 1,
      }
    }
    if (numPart.endsWith('M')) {
      const num = parseFloat(numPart.slice(0, -1))
      return {
        end: num,
        prefix: '$',
        suffix: 'M',
        decimals: num % 1 === 0 ? 0 : 1,
      }
    }
    
    // Handle standard currency like "$299"
    const num = parseFloat(numPart)
    if (!isNaN(num)) {
      return {
        end: num,
        prefix: '$',
        suffix: '',
        decimals: num % 1 === 0 ? 0 : 2,
      }
    }
  }

  // Handle percentage like "78%"
  if (value.endsWith('%')) {
    const num = parseFloat(value.slice(0, -1))
    return {
      end: num,
      prefix: '',
      suffix: '%',
      decimals: num % 1 === 0 ? 0 : 1,
    }
  }

  // Handle multiplier like "3.7x"
  if (value.endsWith('x')) {
    const num = parseFloat(value.slice(0, -1))
    return {
      end: num,
      prefix: '',
      suffix: 'x',
      decimals: num % 1 === 0 ? 0 : 1,
    }
  }

  // Handle years like "10+"
  if (value.endsWith('+')) {
    const num = parseFloat(value.slice(0, -1))
    return {
      end: num,
      prefix: '',
      suffix: '+',
      decimals: 0,
    }
  }

  // Default: try to parse as number
  const num = parseFloat(value)
  return {
    end: isNaN(num) ? 0 : num,
    prefix: '',
    suffix: '',
    decimals: num % 1 === 0 ? 0 : 1,
  }
}
