import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/** Shared hero banner used at the top of inner pages (services, about, case studies, etc). */
export default function PageHero({ eyebrow, title, subtitle, crumbs = [] }) {
  return (
    <section className="relative overflow-hidden pt-10 pb-10 md:pt-10 md:pb-10 text-center">
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full bg-primary-500/15 blur-3xl pointer-events-none"
      />
      <div className="container-app relative z-10 flex flex-col items-center">
        {crumbs.length > 0 && (
          <div className="flex items-center gap-1.5 text-[13px] text-gray-warm mb-6">
            <Link to="/" className="hover:text-primary-700">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={13} />
                {c.to ? (
                  <Link to={c.to} className="hover:text-primary-700">{c.label}</Link>
                ) : (
                  <span className="text-ink font-medium">{c.label}</span>
                )}
              </span>
            ))}
          </div>
        )}

        {eyebrow && <div className="eyebrow">{eyebrow}</div>}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-bold max-w-3xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-gray-warm text-[17px] leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
