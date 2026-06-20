import type { Variants } from 'motion/react'

/** Shared easing curve used across all site animations */
export const easeExpo = [0.16, 1, 0.3, 1] as const

/** Fade up from 40px below — use as parent variants for stagger children */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeExpo as [number, number, number, number] },
  },
}

/** Stagger wrapper — children reveal in sequence */
export const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
}
