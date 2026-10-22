import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Construction } from 'lucide-react'
import { projects } from '../data/portfolio.js'
import FadeIn from '../components/FadeIn.jsx'


/**
 * CaseStudyDetail — one page per project, at /case-studies/:slug.
 * Opened directly from a project card on /our-work (there's no standalone
 * case-studies listing page — each case study lives under its project).
 *
 * The actual write-ups (challenge/solution/results, real numbers, client
 * quotes) don't exist yet — this renders clearly-labelled placeholder
 * content in the meantime so the page structure, routing, and design are
 * all ready to go. Swap the placeholder strings below for the real copy
 * per project once it's written; nothing else needs to change.
 */
const placeholderSections = [
  { title: 'Overview' },
  { title: 'The challenge' },
  { title: 'The solution' },
  { title: 'The result' },
]

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/our-work" replace />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <article className="section-pad">
        <div className="container-app max-w-3xl mx-auto">
          <FadeIn>
            <Link to="/our-work" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-warm hover:text-primary-700 mb-8">
              <ArrowLeft size={16} /> Back to our work
            </Link>

            <span className="eyebrow">{project.tag}</span>
            <h1 className="text-3xl md:text-[44px] font-bold leading-tight">{project.title}</h1>

            <div className="mt-10 aspect-[16/8] rounded-2xl overflow-hidden bg-bg-alt">
              <img src={project.image} alt={project.title} loading="eager" decoding="async" className="w-full h-full object-cover" />
            </div>

            {/* Placeholder notice — remove once real case-study copy is added below. */}
            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-primary-200 bg-primary-50 px-6 py-5">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-primary-500 text-white flex-shrink-0">
                <Construction size={18} />
              </span>
              <div>
                <p className="font-bold text-ink text-[15px]">Working on this case study</p>
                <p className="mt-1 text-sm text-gray-warm leading-relaxed">
                  The full write-up for this project — the brief, our approach, and the results —
                  is being put together. Check back soon for the complete story.
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-8">
              {placeholderSections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-bold text-ink">{section.title}</h2>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-soft italic">
                    Working on this case study — this section will cover the {section.title.toLowerCase()} once the full write-up is ready.
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </article>

    </motion.div>
  )
}
