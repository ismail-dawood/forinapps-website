import { motion } from 'framer-motion'
import { fadeUp, fadeUpLg, viewportOnce } from '../lib/motion.js'

/** Scroll-reveal wrapper. `size="lg"` = bigger travel distance for hero-scale text. */
export default function FadeIn({ children, delay = 0, size = 'sm', className = '' }) {
  const base = size === 'lg' ? fadeUpLg : fadeUp
  const variants = delay ? { ...base, show: { ...base.show, transition: { ...base.show.transition, delay } } } : base

  return (
    <motion.div variants={variants} initial="hidden" whileInView="show" viewport={viewportOnce} className={className}>
      {children}
    </motion.div>
  )
}
