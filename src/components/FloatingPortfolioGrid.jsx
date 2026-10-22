import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/**
 * Per-card float timing/depth is intentionally varied (not identical) so the
 * grid never falls into a robotic, all-cards-in-sync rhythm — real "floating"
 * things (leaves, boats) drift at slightly different rates.
 */
const FLOAT_VARIANTS = [
  { anim: 'animate-float', depth: 60, span: 'sm:col-span-2 sm:row-span-2' },
  { anim: 'animate-float-delayed', depth: 30, span: '' },
  { anim: 'animate-float-slow', depth: 45, span: '' },
  { anim: 'animate-float-delayed', depth: 20, span: '' },
  { anim: 'animate-float', depth: 50, span: 'sm:col-span-2' },
  { anim: 'animate-float-slow', depth: 35, span: '' },
]

function TiltCard({ project, variant, index }) {
  const cardRef = useRef(null)
  const mvX = useMotionValue(0.5)
  const mvY = useMotionValue(0.5)
  const springX = useSpring(mvX, { stiffness: 200, damping: 20, mass: 0.3 })
  const springY = useSpring(mvY, { stiffness: 200, damping: 20, mass: 0.3 })
  const rotateX = useTransform(springY, [0, 1], [10, -10])
  const rotateY = useTransform(springX, [0, 1], [-10, 10])

  // Each card also drifts vertically at a slightly different rate as the
  // page scrolls past it — a lightweight parallax "depth" effect layered on
  // top of the continuous idle float animation.
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [variant.depth, -variant.depth])

  function handleMove(e) {
    const rect = cardRef.current.getBoundingClientRect()
    mvX.set((e.clientX - rect.left) / rect.width)
    mvY.set((e.clientY - rect.top) / rect.height)
    cardRef.current.style.setProperty('--x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    cardRef.current.style.setProperty('--y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }
  function handleLeave() {
    mvX.set(0.5)
    mvY.set(0.5)
  }

  return (
    <motion.div
      style={{ y: parallaxY }}
      className={`relative ${variant.span}`}
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 40, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.06 } } }}
        className={`h-full ${variant.anim}`}
        style={{ animationDelay: `${(index % 6) * 0.4}s` }}
      >
        <Link
          ref={cardRef}
          to={`/case-studies/${project.slug}`}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="group relative block h-full min-h-[220px] rounded-2xl overflow-hidden border border-white/10 perspective-1000"
          style={{ '--x': '50%', '--y': '50%' }}
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative h-full w-full preserve-3d"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/0" />
            {/* Cursor-follow spotlight — rendered above the image, screen-blended
                so it lights the photo up rather than sitting hidden behind it. */}
            <div className="spotlight pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen" />

            <span className="absolute top-4 left-4 bg-white/15 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/20">
              {project.tag}
            </span>

            <span className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight size={16} />
            </span>

            <p className="absolute bottom-4 left-4 right-4 font-semibold text-[15px] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              {project.title}
            </p>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

/**
 * FloatingPortfolioGrid
 * ---------------------------------------------------------------------------
 * The advanced, home-page-only portfolio visual: an asymmetric bento grid
 * where every card simultaneously (a) idles on its own continuous float
 * loop, (b) tilts toward the cursor in 3D, (c) parallax-drifts vertically as
 * you scroll past it, and (d) reveals a cursor-follow spotlight + gradient
 * wash on hover. Used on `/our-work` to browse/filter all projects; each
 * card links straight to that project's `/case-studies/:slug` write-up.
 */
export default function FloatingPortfolioGrid({ projects }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-100px', amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="grid grid-cols-1 sm:grid-cols-3 auto-rows-[220px] gap-5"
    >
      {projects.map((project, i) => (
        <TiltCard key={project.title} project={project} variant={FLOAT_VARIANTS[i % FLOAT_VARIANTS.length]} index={i} />
      ))}
    </motion.div>
  )
}
