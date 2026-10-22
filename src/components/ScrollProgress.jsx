import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ScrollProgress
 * ---------------------------------------------------------------------------
 * Thin gradient bar fixed to the very top of the viewport that fills left to
 * right as the page is scrolled. `useScroll` gives the raw 0-1 progress,
 * `useSpring` smooths it so it glides instead of jumping in lockstep with
 * every scroll-event tick.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 32, mass: 0.3 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-primary-400 via-primary-500 to-primary-700"
      aria-hidden="true"
    />
  )
}
