import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/portfolio.js'
import PageHero from '../components/PageHero.jsx'
import FloatingPortfolioGrid from '../components/FloatingPortfolioGrid.jsx'
import FadeIn from '../components/FadeIn.jsx'

const filters = ['All', 'Website', 'Web app', 'Mobile app']

export default function OurWork() {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tag === filter)),
    [filter]
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        eyebrow="Our work"
        title="Projects our clients are proud to show off"
        subtitle="A look at the websites, web apps, and mobile apps we've designed and built for businesses across industries."
        crumbs={[{ label: 'Our work' }]}
      />

      <section className="section-pad pt-0">
        <div className="container-app">
          <FadeIn className="flex flex-wrap gap-2.5 justify-center mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
                  filter === f
                    ? 'bg-ink border-ink text-white'
                    : 'bg-white border-border text-gray-warm hover:border-primary-500 hover:text-primary-700'
                }`}
              >
                {f}
              </button>
            ))}
          </FadeIn>

          {filtered.length > 0 ? (
            <FloatingPortfolioGrid projects={filtered} />
          ) : (
            <p className="text-center text-gray-warm py-16">No projects in this category yet.</p>
          )}
        </div>
      </section>
    </motion.div>
  )
}
