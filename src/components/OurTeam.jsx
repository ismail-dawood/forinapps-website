
import { motion } from 'framer-motion'
import { team } from '../data/team.js'
import { Link } from 'react-router-dom'

export default function OurTeam() {
  const member = team[0]

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-white py-20"
    >
      {/* Orange Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-10
          top-20
          h-[300px]
          w-[300px]
          rounded-full
          bg-orange-200/30
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-md font-bold uppercase tracking-[0.35em] text-primary-500">
              Our Team
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              The people behind
              <span className="text-primary-500">
                {' '}great products
              </span>
            </h2>

            <p className="mt-5 max-w-md leading-relaxed text-gray-500">
              A passionate team of designers, developers and
              problem solvers building digital experiences
              that create real impact.
            </p>

            <button
              className="
                mt-7
                rounded-full
                bg-primary-500
                px-6
                py-3
                font-semibold
                text-white
                shadow-lg
                shadow-primary-200
                transition
                hover:scale-105
              "
            >
             <Link to="/contact-us" >
                Meet the team
             </Link>
         
            </button>
          </motion.div>

          {/* RIGHT - TEAM IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
  
            <div className="overflow-hidden rounded-[35px] shadow-[0_25px_70px_rgba(249,115,22,0.22)]">
              <img
                src="/team-pic.webp"
                alt="ForInApps Team"
                loading="lazy"
                decoding="async"
                className="
                  block
                  h-auto
                  w-full
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
