'use client'

import React from 'react'
import { motion, type MotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

const animationProps: MotionProps = {
  initial: { '--x': '100%', scale: 0.8 },
  animate: { '--x': '-100%', scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 0.2,
    type: 'spring',
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: 'spring',
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
}

interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode
  className?: string
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative cursor-pointer rounded-lg border border-border-subtle/10 px-6 py-2 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out hover:border-border-subtle/60 hover:shadow dark:hover:shadow-[0_0_12px_var(--primary)/4%]',
          className,
        )}
        {...animationProps}
        {...props}
      >
        <span
          className="relative inline-flex items-center gap-2 size-full text-sm tracking-wide uppercase"
          style={{
            maskImage:
              'linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))',
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
            WebkitMask:
              'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
            backgroundImage:
              'linear-gradient(-75deg,var(--primary)/4% calc(var(--x)+20%),var(--primary)/20% calc(var(--x)+25%),var(--primary)/4% calc(var(--x)+100%))',
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] p-px"
        />
      </motion.button>
    )
  },
)

ShinyButton.displayName = 'ShinyButton'
