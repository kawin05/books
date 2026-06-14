'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

/**
 * Custom cursor that follows the mouse and grows over interactive elements.
 * Inspired by the smooth cursor on sitios como septiembrearquitectura.com.
 * Hidden on touch devices.
 */
export function Cursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth follow with spring
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [data-cursor="hover"]')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', checkHover)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', checkHover)
    }
  }, [mouseX, mouseY, isVisible])

  if (isTouchDevice || shouldReduceMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.3 } }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.6 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="h-3 w-3 rounded-full bg-accent-cream"
      />
    </motion.div>
  )
}
