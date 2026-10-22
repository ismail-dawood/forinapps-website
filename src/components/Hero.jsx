import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from './ui/Button.jsx'
import HeroVisual from './HeroVisual.jsx'

const HEADLINE =
  'We build AI-powered mobile apps & custom software solutions that turn ideas into scalable digital products.'

const BLUE_TEXT = 'scalable digital products.'

const wordContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.028,
      delayChildren: 0.15,
    },
  },
}

const wordItem = {
  hidden: {
    opacity: 0,
    y: '0.6em',
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Hero() {
  const beforeText = HEADLINE.replace(BLUE_TEXT, '')

  const words = beforeText.split(' ')

  return (
    <section className="relative overflow-hidden pt-14 text-center sm:pt-16 lg:pt-20">

      {/* Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -top-56 left-1/2
          h-[420px] w-[620px]
          -translate-x-1/2
          rounded-full
          bg-primary-500/[0.22]
          blur-3xl
          animate-pulse-glow
          sm:h-[550px] sm:w-[800px]
          lg:h-[620px] lg:w-[900px]
        "
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-10
          h-[320px] w-full
          max-w-5xl
          -translate-x-1/2
          bg-grid-pattern
          opacity-40
          [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_40%,transparent_100%)]
          sm:h-[400px]
          lg:h-[430px]
        "
      />

      {/* Hero Content */}
      <div
        className="
          container-app relative z-10 mx-auto 
          flex max-w-5xl flex-col
          items-center px-4
        "
      >

        {/* Heading */}
        <motion.h1
          variants={wordContainer}
          initial="hidden"
          animate="show"
          aria-label={HEADLINE}
          className="
            max-w-6xl
            text-3xl font-extrabold
            leading-[1.15]
            tracking-[-0.025em]
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
          "
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden pb-1 align-top"
            >
              <motion.span
                variants={wordItem}
                className="inline-block "
              >
                {word}
                {'\u00A0'}
              </motion.span>
            </span>
          ))}

          <span className="inline-block overflow-hidden pb-1 align-top">
            <motion.span
              variants={wordItem}
              className="inline-block text-primary-500 mb-1"
            >
              {BLUE_TEXT}
            </motion.span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-2 max-w-xl
            text-sm leading-relaxed
            text-gray-warm
            sm:mt-5 sm:text-base
            md:text-lg
          "
        >
        Custom mobile app & software development that's secure, scalable, and built around your business from day one.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.62,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-7 flex flex-wrap
            justify-center gap-3
            sm:mt-8
          "
        >
          <Button to="/contact-us" icon={ArrowRight}>
            Start my project
          </Button>
        </motion.div>

      </div>

      {/* Hero Visual */}
      <div
        className="
          mt-7 w-full
          sm:mt-9
          lg:mt-10
        "
      >
        <HeroVisual />
      </div>

    </section>
  )
}
