'use client'

import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'span' | 'h1' | 'h2' | 'p'
}

/**
 * Fades + slides in content as it enters the viewport.
 * Like Septiembre's scroll-driven reveals — but lighter weight.
 */
export function ScrollReveal({
  children,
  delay = 0,
  y = 32,
  className,
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

  const Component = motion[as] as typeof motion.div

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  )
}
