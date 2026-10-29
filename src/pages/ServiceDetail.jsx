import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Layers3,
  Sparkles,
} from 'lucide-react'

import { services } from '../data/services.js'
import PageHero from '../components/PageHero.jsx'
import FadeIn from '../components/FadeIn.jsx'
import Stagger, { staggerItem } from '../components/Stagger.jsx'
import ProcessSteps from '../components/ProcessSteps.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import Button from '../components/ui/Button.jsx'

export default function ServiceDetail() {
  const { slug } = useParams()

  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return <Navigate to="/" replace />
  }

  const others = services.filter((s) => s.slug !== slug)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0A0D14] text-white min-h-screen"
    >
      {/* =========================================================
          HERO
      ========================================================= */}

      <PageHero
        title={service.title}
        subtitle={service.hero}
        crumbs={[
          { label: 'Services', to: '/' },
          { label: service.title },
        ]}
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#0A0D14] text-white">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-[45%] h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />

        <div className="container-app relative py-16 sm:py-20 lg:py-24 mx-auto px-4 max-w-7xl">

          {/* =====================================================
              HERO IMAGE + INTRO
          ===================================================== */}

          <FadeIn>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">

              {/* Image */}
              <div className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-[#121824] shadow-2xl">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    loading="eager"
                    decoding="async"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Image overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Intro */}
              <div>
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  Built around your
                  <span className="block text-blue-500">
                    business goals.
                  </span>
                </h2>

                <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                  {service.desc}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    to="/contact-us"
                    icon={ArrowRight}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Start my project
                  </Button>

                  <a
                    href="#whats-included"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-gray-800
                      bg-[#121824]
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      duration-200
                      hover:border-blue-500/50
                      hover:bg-gray-800
                      hover:text-blue-400
                    "
                  >
                    Explore service
                    <ChevronRight size={17} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* =====================================================
              WHAT'S INCLUDED
          ===================================================== */}

          <div
            id="whats-included"
            className="mt-24 scroll-mt-24 sm:mt-28 lg:mt-32"
          >
            <FadeIn>
              <div className="mb-10 max-w-3xl">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-blue-500">
                  <Layers3 size={17} />
                  What's included
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Everything you need to
                  <span className="text-blue-500"> get it shipped.</span>
                </h2>

                <p className="mt-4 text-base leading-7 text-gray-400 sm:text-lg">
                  {service.included?.description ||
                    `Our ${service.title.toLowerCase()} process covers everything needed to launch a reliable, high-quality product.`}
                </p>
              </div>
            </FadeIn>

            <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {service.features.map((feature, index) => (
                <motion.div
                  key={
                    typeof feature === 'string'
                      ? feature
                      : feature.title
                  }
                  variants={staggerItem}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-800
                    bg-[#121824]
                    p-6
                    shadow-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-500/50
                    hover:shadow-2xl
                    sm:p-7
                  "
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        grid
                        h-11
                        w-11
                        place-items-center
                        rounded-xl
                        bg-blue-600/10
                        border
                        border-blue-500/30
                        text-blue-500
                        transition-all
                        duration-300
                        group-hover:bg-blue-600
                        group-hover:text-white
                      "
                    >
                      <CheckCircle2 size={21} />
                    </div>

                    <span className="text-xs font-bold text-gray-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {typeof feature === 'string' ? (
                    <p className="mt-5 text-[15px] font-semibold leading-6 text-white">
                      {feature}
                    </p>
                  ) : (
                    <>
                      <h3 className="mt-5 text-lg font-bold leading-6 text-white">
                        {feature.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        {feature.description}
                      </p>
                    </>
                  )}

                  {/* Bottom accent */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-0.5
                      w-0
                      bg-blue-600
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </motion.div>
              ))}
            </Stagger>
          </div>

          {/* =====================================================
              TECHNOLOGY
          ===================================================== */}

          <div className="mt-24 sm:mt-28 lg:mt-32">
            <FadeIn>
              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-gray-800
                  bg-[#121824]
                  p-6
                  sm:p-9
                  lg:p-12
                  shadow-2xl
                "
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

                  {/* Technology intro */}
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-blue-500">
                      <Layers3 size={17} />
                      {service.technology?.title || 'Technology we use'}
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      The right tools for
                      <span className="block text-blue-500">
                        the right product.
                      </span>
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                      {service.technology?.description ||
                        'We choose modern, production-proven technologies based on your product requirements.'}
                    </p>
                  </div>

                  {/* Technology categories */}
                  <div>
                    <p className="mb-5 text-sm font-semibold text-gray-300">
                      {service.technology?.subtitle ||
                        'Tools and frameworks powering this service'}
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {service.technology?.categories?.map((category) => (
                        <div
                          key={category.title}
                          className="
                            rounded-2xl
                            border
                            border-gray-800
                            bg-[#0A0D14]
                            p-5
                            transition-all
                            duration-300
                            hover:border-blue-500/50
                            hover:shadow-lg
                          "
                        >
                          <h3 className="text-sm font-bold text-white">
                            {category.title}
                          </h3>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {category.technologies.map((technology) => (
                              <span
                                key={technology}
                                className="
                                  rounded-lg
                                  bg-blue-600/10
                                  border
                                  border-blue-500/20
                                  px-2.5
                                  py-1.5
                                  text-xs
                                  font-semibold
                                  text-blue-400
                                "
                              >
                                {technology}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technology closing text */}
                {service.technology?.closingText && (
                  <div className="mt-9 border-t border-gray-800 pt-7">
                    <p className="max-w-4xl text-sm leading-7 text-gray-400 sm:text-base">
                      {service.technology.closingText}
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* =====================================================
              CTA + OTHER SERVICES
          ===================================================== */}

          <div className="mt-24 grid grid-cols-1 gap-6 lg:mt-28 lg:grid-cols-[1.25fr_0.75fr]">

            {/* CTA */}
            <FadeIn>
              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  rounded-3xl
                  bg-blue-600
                  p-7
                  sm:p-9
                  lg:p-10
                  shadow-2xl
                "
              >
                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-black/20 blur-3xl" />

                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-100">
                    Ready to get started?
                  </span>

                  <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                    Let's build something
                    <span className="block text-blue-100">
                      that moves your business forward.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-blue-50 sm:text-base">
                    Tell us about your idea, requirements, and goals.
                    We'll help you figure out the right approach.
                  </p>

                  <div className="mt-7">
                    <Link
                      to="/contact-us"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-gray-950 shadow-lg transition-all duration-300 hover:bg-gray-100"
                    >
                      Start my project
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Other services */}
            <FadeIn delay={0.1}>
              <div className="h-full rounded-3xl border border-gray-800 bg-[#121824] p-6 shadow-2xl sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
                  Explore more
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                  Other services
                </h3>

                <div className="mt-5 flex flex-col gap-2">
                  {others.map((other) => (
                    <Link
                      key={other.slug}
                      to={`/services/${other.slug}`}
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-transparent
                        p-3
                        transition-all
                        duration-200
                        hover:border-blue-500/30
                        hover:bg-gray-800/60
                      "
                    >
                      <span
                        className="
                          grid
                          h-10
                          w-10
                          flex-shrink-0
                          place-items-center
                          rounded-xl
                          bg-blue-600/10
                          border
                          border-blue-500/30
                          text-blue-500
                          transition-colors
                          group-hover:bg-blue-600
                          group-hover:text-white
                        "
                      >
                        <other.icon size={18} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-white">
                          {other.title}
                        </span>

                        <span className="mt-0.5 block truncate text-xs text-gray-400">
                          {other.short}
                        </span>
                      </span>

                      <ArrowRight
                        size={17}
                        className="
                          flex-shrink-0
                          text-gray-500
                          transition-all
                          duration-200
                          group-hover:translate-x-1
                          group-hover:text-blue-400
                        "
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROCESS
      ========================================================= */}

      <ProcessSteps />

      {/* =========================================================
          FAQ
      ========================================================= */}

      <FaqAccordion />
    </motion.div>
  )
}
