import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '../lib/motion.js'

// Re-exported so existing imports of `{ staggerItem }` from this file keep working.
export { staggerItem }

/** Wraps a list of `motion` children (using `staggerItem`) so they cascade in on scroll. */
export default function Stagger({ children, className = '' }) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} className={className}>
      {children}
    </motion.div>
  )
}
