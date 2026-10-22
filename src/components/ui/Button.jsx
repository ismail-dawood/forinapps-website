import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Button
 * ---------------------------------------------------------------------------
 * CodeBudee's buttons all share one hover behaviour: background deepens,
 * the button lifts 2px, and the trailing icon nudges right — a tiny bit of
 * "polish" motion that's easy to get inconsistent when it's re-written by
 * hand in every component (Hero, CTA, Navbar, ServiceDetail all had their
 * own slightly-different version of this before).
 *
 * Centralising it here means:
 *   - one hover animation, guaranteed identical everywhere it's used
 *   - `<Button to="/contact-us">Start my project</Button>` instead of a
 *     10-line <Link>/<a> block repeated per call site
 *
 * Renders a react-router <Link> when `to` is given, a plain <a> when `href`
 * is given, otherwise a <button> (e.g. for form submits).
 */
export default function Button({
  as,
  to,
  href,
  variant = 'primary', // 'primary' | 'outline'
  size = 'md', // 'md' | 'sm'
  icon: Icon,
  iconPosition = 'right', // 'right' | 'left' — e.g. a "back" button wants the arrow leading
  children,
  className = '',
  ...rest
}) {
  const Tag = as || (to ? Link : href ? 'a' : 'button')
  const linkProp = to ? { to } : href ? { href } : {}

  const base = 'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 whitespace-nowrap'
  const sizing = size === 'sm' ? 'px-5 py-2.5 text-sm' : 'px-6 py-3.5 text-[15px]'
  const variants = {
    primary: 'bg-primary-500 text-white shadow-glow hover:bg-primary-600',
    outline: 'bg-transparent text-ink border border-border hover:border-primary-500 hover:text-primary-700',
  }

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="inline-block">
      <Tag {...linkProp} className={`${base} ${sizing} ${variants[variant]} ${className}`} {...rest}>
        {Icon && iconPosition === 'left' && (
          <Icon size={size === 'sm' ? 15 : 17} className="transition-transform duration-200 group-hover:-translate-x-1" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon size={size === 'sm' ? 15 : 17} className="transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </Tag>
    </motion.div>
  )
}
