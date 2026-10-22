
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessagesSquare, ArrowUpRight } from 'lucide-react'
import { faqs } from '../data/faqs.js'
import FadeIn from './FadeIn.jsx'
import Button from './ui/Button.jsx'

/**
 * FaqAccordion
 * ---------------------------------------------------------------------------
 * FAQ section
 *
 * - Left content stays in normal document flow
 * - No sticky positioning, preventing layout jerks near the footer
 * - FAQ entrance animation runs only once
 * - Accordion opens/closes smoothly
 * - Opening an FAQ does not retrigger the entrance animation
 */
export default function FaqAccordion() {
  const [open, setOpen] = useState(0)

  return (
    <section
      className="section-pad relative overflow-hidden"
      id="faq"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-40 h-[380px] w-[380px] rounded-full bg-primary-200/25 blur-[110px]"
      />

      <div className="container-app relative grid grid-cols-1 items-start gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">

        {/* ============================================================= */}
        {/* LEFT — INTRO + CONTACT                                        */}
        {/* ============================================================= */}

        <FadeIn>
          <span className="flex items-center gap-2 text-md font-bold uppercase tracking-[0.35em] text-primary-500">
            <MessagesSquare size={15} />
            FAQ&apos;s
          </span>

          <h2 className="text-3xl font-bold leading-tight md:text-[42px]">
            Got questions?
            <br className="hidden md:block" />
            We got answers
          </h2>

          <p className="mt-4 max-w-sm text-[15.5px] leading-relaxed text-gray-warm">
            Can&apos;t find what you&apos;re looking for? Reach out and our
            team will get back to you within a day.
          </p>

          {/* Contact card */}
          <div className="relative mt-8 overflow-hidden rounded-2xl bg-primary-500 p-6 text-white">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-32 w-32 animate-pulse-glow rounded-full bg-primary-500/30 blur-2xl"
            />

            <p className="relative font-display text-[15px] font-semibold">
              Still have questions?
            </p>

            <p className="relative mt-1.5 text-[13.5px] text-white/60">
              Talk to our team directly, no bots involved.
            </p>

            <Button
              to="/contact-us"
              size="sm"
              icon={ArrowUpRight}
              className="relative mt-5 !bg-white !text-ink hover:!bg-primary-50"
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
                    ? 'border-primary-500 bg-primary-50/40 shadow-card'
                    : 'border-border bg-white hover:border-primary-200'
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
                        ? 'text-primary-500'
                        : 'text-gray-light'
                    }`}
                  >
                    0{i + 1}
                  </span>

                  {/* Question */}
                  <span className="flex-1 font-display text-[16px] font-semibold">
                    {f.q}
                  </span>

                  {/* Plus / Close */}
                  <motion.span
                    animate={{
                      rotate: isOpen ? 135 : 0,
                      backgroundColor: isOpen
                        ? '#2563EB'
                        : '#EFF6FF',
                      color: isOpen
                        ? '#FFFFFF'
                        : '#2563EB',
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
                      <p className="px-6 pb-6 pl-[3.25rem] text-[14.5px] leading-relaxed text-gray-warm">
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

