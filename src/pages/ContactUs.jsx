
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  Send,
  MessageCircle,

  CheckCircle2,
  Loader2,
  ArrowUpRight,
} from 'lucide-react'
import emailjs from '@emailjs/browser'

import PageHero from '../components/PageHero.jsx'
import FadeIn from '../components/FadeIn.jsx'
import Button from '../components/ui/Button.jsx'
import FreeConsultation from '../components/FreeConsultation.jsx'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'info@forinapps.com',
    href: 'mailto:info@forinapps.com',
  },
  {
     icon: MessageCircle,
    label: 'Chat with us',
    value: '+60 14 6113485',
     href: 'https://wa.me/60146113485',
  },
]

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  // --------------------------------------------------
  // Handle input changes
  // --------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
  }

  // --------------------------------------------------
  // Send email using EmailJS
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (sending) return

    setError('')

    // Basic validation
    if (!form.name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!form.email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (!form.message.trim()) {
      setError('Please enter your message.')
      return
    }

    try {
      setSending(true)

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )

      setSubmitted(true)
    } catch (err) {
      console.error('EmailJS Error:', err)
      console.error('Status:', err?.status)
      console.error('Text:', err?.text)

      setError(
        err?.text ||
          err?.message ||
          'Unable to send your message right now. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  // --------------------------------------------------
  // Send another message
  // --------------------------------------------------

  const handleSendAnother = () => {
    setSubmitted(false)

    setForm({
      name: '',
      email: '',
      message: '',
    })

    setError('')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* =================================================
          PAGE HERO
      ================================================= */}

    

      {/* =================================================
          FREE CONSULTATION
          UNCHANGED
      ================================================= */}

      <FreeConsultation />

      {/* =================================================
          CONTACT US SECTION
      ================================================= */}

      <section className="relative overflow-hidden bg-gray-50/70">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl" />

        <div className="container-app relative py-20 sm:py-24 lg:py-28">

          {/* =================================================
              SECTION HEADING
          ================================================= */}

          <FadeIn>
            <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
             

              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                Have a project in mind?
                <span className="block text-primary-500">
                  Let&apos;s talk.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
                Whether you have a question, an idea, or a project ready
                to get started, we&apos;d love to hear from you. Send us a
                message and our team will get back to you shortly.
              </p>
            </div>
          </FadeIn>

          {/* =================================================
              CONTACT CONTENT
          ================================================= */}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">

            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <FadeIn className="h-full">
              <div className="relative h-full overflow-hidden rounded-3xl bg-orange-500 p-7  shadow-xl sm:p-9 lg:p-10">

                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary-500/20 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />

                <div className="relative z-10 flex h-full flex-col">

                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                    Get in touch
                  </span>

                  <h3 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                    We&apos;re here to
                    <span className="block text-white">
                      help you.
                    </span>
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-7 text-white sm:text-base">
                    Have questions about our services or want to discuss
                    your next project? Reach out to us directly or use the
                    form and we&apos;ll get back to you.
                  </p>

                  {/* Contact cards */}

                  <div className="mt-9 space-y-4">
                    {contactInfo.map((contact) => {
                      const Icon = contact.icon

                      return (
                        <a
                       key={contact.label}
  href={contact.href}
  target={contact.label === 'Chat with us' ? '_blank' : undefined}
  rel={contact.label === 'Chat with us' ? 'noopener noreferrer' : undefined}
                          className="
                            group
                            flex
                            items-center
                            gap-4
                            rounded-2xl
                       
                           
                            bg-black/[0.04]
                            p-4
                            transition-all
                            duration-300
                            hover:border-primary-400/0
                            hover:bg-orange-900
                          "
                        >
                          <span
                            className="
                              grid
                              h-12
                              w-12
                              flex-shrink-0
                              place-items-center
                              rounded-xl
                              bg-primary-500/15
                              text-white
                              transition-transform
                              duration-300
                              group-hover:scale-105
                            "
                          >
                            <Icon size={20} />
                          </span>

                          <span className="min-w-0">
                            <span className="block text-xs font-bold uppercase tracking-wider text-black">
                              {contact.label}
                            </span>

                            <span className="mt-1 block break-words text-sm font-semibold text-gray-100 sm:text-[15px]">
                              {contact.value}
                            </span>
                          </span>

                          <ArrowUpRight
                            size={18}
                            className="
                              ml-auto
                              flex-shrink-0
                              
                              transition-all
                              duration-300
                              group-hover:-translate-y-0.5
                              group-hover:translate-x-0.5
                              group-hover:text-primary-400
                            "
                          />
                        </a>
                      )
                    })}
                  </div>

                  {/* Bottom text */}

                  <div className="mt-auto pt-10">
                    <div className="h-px w-full bg-white/10" />

                    <p className="mt-5 text-sm leading-6 text-gray-500">
                      We normally respond within one business day.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <FadeIn delay={0.1}>
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  p-6
                  shadow-xl
                  shadow-gray-200/40
                  sm:p-8
                  lg:p-10
                "
              >
                {/* Top accent */}
                <div className="absolute left-0 right-0 top-0 h-1 bg-primary-500" />

                <AnimatePresence mode="wait">
                  {/* =================================================
                      SUCCESS MESSAGE
                  ================================================= */}

                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{
                        opacity: 0,
                        scale: 0.96,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="
                        flex
                        min-h-[430px]
                        flex-col
                        items-center
                        justify-center
                        py-10
                        text-center
                      "
                    >
                      <div className="grid h-20 w-20 place-items-center rounded-full bg-primary-50">
                        <CheckCircle2
                          size={48}
                          strokeWidth={1.8}
                          className="text-primary-500"
                        />
                      </div>

                      <h3 className="mt-7 text-2xl font-bold text-gray-950 sm:text-3xl">
                        Thanks — your message is on its way!
                      </h3>

                      <p className="mt-3 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
                        We&apos;ll get back to you at{' '}
                        <span className="font-semibold text-gray-700">
                          {form.email}
                        </span>{' '}
                        within one business day.
                      </p>

                      <Button
                        as="button"
                        type="button"
                        onClick={handleSendAnother}
                        variant="outline"
                        size="sm"
                        className="mt-8"
                      >
                        Send another message
                      </Button>
                    </motion.div>
                  ) : (
                    /* =================================================
                        FORM
                    ================================================= */

                    <motion.form
                      key="form"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      {/* Form heading */}

                      <div className="mb-1">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-500">
                          Send a message
                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-gray-950 sm:text-3xl">
                          Tell us what you&apos;re working on
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          Fill out the form below and we&apos;ll get back
                          to you as soon as possible.
                        </p>
                      </div>

                      {/* =================================================
                          NAME + EMAIL
                      ================================================= */}

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        {/* Name */}

                        <div>
                          <label
                            className="mb-2.5 block text-sm font-semibold text-gray-900"
                            htmlFor="name"
                          >
                            Full name
                          </label>

                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Jane Doe"
                            disabled={sending}
                            className="
                              w-full
                              rounded-xl
                              border
                              border-gray-200
                              bg-gray-50/50
                              px-4
                              py-3.5
                              text-[15px]
                              text-gray-900
                              outline-none
                              transition-all
                              duration-200
                              placeholder:text-gray-400
                              hover:border-gray-300
                              focus:border-primary-400
                              focus:bg-white
                              focus:ring-4
                              focus:ring-primary-100
                              disabled:cursor-not-allowed
                              disabled:bg-gray-50
                            "
                          />
                        </div>

                        {/* Email */}

                        <div>
                          <label
                            className="mb-2.5 block text-sm font-semibold text-gray-900"
                            htmlFor="email"
                          >
                            Email address
                          </label>

                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="jane@company.com"
                            disabled={sending}
                            className="
                              w-full
                              rounded-xl
                              border
                              border-gray-200
                              bg-gray-50/50
                              px-4
                              py-3.5
                              text-[15px]
                              text-gray-900
                              outline-none
                              transition-all
                              duration-200
                              placeholder:text-gray-400
                              hover:border-gray-300
                              focus:border-primary-400
                              focus:bg-white
                              focus:ring-4
                              focus:ring-primary-100
                              disabled:cursor-not-allowed
                              disabled:bg-gray-50
                            "
                          />
                        </div>
                      </div>

                      {/* =================================================
                          MESSAGE
                      ================================================= */}

                      <div>
                        <label
                          className="mb-2.5 block text-sm font-semibold text-gray-900"
                          htmlFor="message"
                        >
                          Tell us about your project
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="What are you building, and what problem does it solve?"
                          disabled={sending}
                          className="
                            w-full
                            resize-none
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50/50
                            px-4
                            py-3.5
                            text-[15px]
                            leading-6
                            text-gray-900
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-gray-400
                            hover:border-gray-300
                            focus:border-primary-400
                            focus:bg-white
                            focus:ring-4
                            focus:ring-primary-100
                            disabled:cursor-not-allowed
                            disabled:bg-gray-50
                          "
                        />
                      </div>

                      {/* =================================================
                          ERROR
                      ================================================= */}

                      {error && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: -5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="
                            rounded-xl
                            border
                            border-red-100
                            bg-red-50
                            px-4
                            py-3
                            text-sm
                            leading-5
                            text-red-600
                          "
                        >
                          {error}
                        </motion.div>
                      )}

                      {/* =================================================
                          SUBMIT
                      ================================================= */}

                      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-5 text-gray-400">
                          We&apos;ll only use your information to respond
                          to your enquiry.
                        </p>

                        <Button
                          as="button"
                          type="submit"
                          icon={sending ? Loader2 : Send}
                          disabled={sending}
                          className="
                            w-full
                            justify-center
                            sm:w-auto
                          "
                        >
                          {sending ? 'Sending...' : 'Send message'}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

