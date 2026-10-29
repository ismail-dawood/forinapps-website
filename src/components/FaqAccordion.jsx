import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessagesSquare, ArrowUpRight } from 'lucide-react'
import { faqs } from '../data/faqs.js'
import FadeIn from './FadeIn.jsx'
import Button from './ui/Button.jsx'

/**
 * FaqAccordion
 * ---------------------------------------------------------------------------
 * FAQ section (Dark Theme Fixed)
 */
export default function FaqAccordion() {
  const [open, setOpen] = useState(0)

  return (
    <section
      className="section-pad relative overflow-hidden bg-[#0A0D14] text-white"
      id="faq"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-40 h-[380px] w-[380px] rounded-full bg-blue-600/10 blur-[110px]"
      />

      <div className="container-app relative grid grid-cols-1 items-start gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-16 mx-auto px-4 max-w-7xl">

        {/* ============================================================= */}
        {/* LEFT — INTRO + CONTACT                                        */}
        {/* ============================================================= */}

        <FadeIn>
          <span className="flex items-center gap-2 text-md font-bold uppercase tracking-[0.35em] text-blue-500">
            <MessagesSquare size={15} />
            FAQ&apos;s
          </span>

          <h2 className="text-3xl font-bold leading-tight md:text-[42px] text-white">
            Got questions?
            <br className="hidden md:block" />
            We got answers
          </h2>

          <p className="mt-4 max-w-sm text-[15.5px] leading-relaxed text-gray-400">
            Can&apos;t find what you&apos;re looking for? Reach out and our
            team will get back to you within a day.
          </p>

          {/* Contact card */}
          <div className="relative mt-8 overflow-hidden rounded-2xl bg-blue-600 p-6 text-white shadow-xl">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-32 w-32 animate-pulse-glow rounded-full bg-blue-400/20 blur-2xl"
            />

            <p className="relative font-display text-[15px] font-semibold text-white">
              Still have questions?
            </p>

            <p className="relative mt-1.5 text-[13.5px] text-blue-100">
              Talk to our team directly, no bots involved.
            </p>

            <Button
              to="/contact-us"
              size="sm"
              icon={ArrowUpRight}
              className="relative mt-5 !bg-white !text-gray-900 hover:!bg-gray-100"
            >
              Contact us
            </Button>
          </div>
        </FadeIn>

        {/* ============================================================= */}
        {/* RIGHT — FAQ ACCORDION                                         */}
        {/* ============================================================= */}

        <div className="flex flex-col gap-3">

          {faqs.map((f, i) => {
            const isOpen = open === i

            return (
              <motion.div
                key={f.q}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? 'border-blue-600 bg-[#121824] shadow-2xl'
                    : 'border-gray-800 bg-[#121824] hover:border-gray-700'
                }`}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  {/* Number */}
                  <span
                    className={`flex-shrink-0 font-display text-xs font-bold transition-colors duration-300 ${
                      isOpen
                        ? 'text-blue-500'
                        : 'text-gray-500'
                    }`}
                  >
                    0{i + 1}
                  </span>

                  {/* Question Text */}
                  <span className="flex-1 font-display text-[16px] font-semibold text-white">
                    {f.q}
                  </span>

                  {/* Plus / Close */}
                  <motion.span
                    animate={{
                      rotate: isOpen ? 135 : 0,
                      backgroundColor: isOpen
                        ? '#2563EB'
                        : '#1E293B',
                      color: isOpen
                        ? '#FFFFFF'
                        : '#60A5FA',
                    }}
                    transition={{
                      duration: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 0.2,
                          ease: 'easeOut',
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pl-[3.25rem] text-[14.5px] leading-relaxed text-gray-300">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

        </div>
      </div>
    </section>
  )
}
