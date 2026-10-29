import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Send,
  MessageCircle,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import emailjs from '@emailjs/browser'

import PageHero from '../components/PageHero.jsx'
import FadeIn from '../components/FadeIn.jsx'
import Button from '../components/ui/Button.jsx'

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

  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [consultationData, setConsultationData] = useState({
    name: '',
    email: '',
    notes: '',
  })

  const daysInMonth = 31
  const startingDayOffset = 3
  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '04:00 PM - 05:00 PM',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    setError('')

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
      setError(
        err?.text ||
          err?.message ||
          'Unable to send your message right now. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  const handleSendAnother = () => {
    setSubmitted(false)
    setForm({ name: '', email: '', message: '' })
    setError('')
  }

  const handleConsultationChange = (e) => {
    setConsultationData({ ...consultationData, [e.target.name]: e.target.value })
  }

  const handleConsultationSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0A0D14] text-white min-h-screen"
    >
      <section className="relative overflow-hidden bg-[#0A0D14] py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />

        <div className="container-app relative mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            
            <FadeIn>
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-500">
                  Free Consultation
                </span>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Let&apos;s discuss your <span className="text-blue-500">project</span>
                </h2>
                <p className="mt-4 text-base leading-7 text-gray-400 sm:text-lg">
                  Book a free consultation and let&apos;s talk about your project, requirements, goals, and the best way to move forward.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-500">
                      <CalendarIcon size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Choose a convenient date</h3>
                      <p className="mt-1 text-sm text-gray-400">Pick any available date from the calendar.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-500">
                      <Clock size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Select your time</h3>
                      <p className="mt-1 text-sm text-gray-400">Choose the time that works best for you.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-500">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Completely free</h3>
                      <p className="mt-1 text-sm text-gray-400">No payment is required to book your consultation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-[#121824] p-6 shadow-2xl sm:p-8">
                <div className="absolute left-0 right-0 top-0 h-1 bg-blue-600" />

                {isSubmitted ? (
                  <div className="flex min-h-[400px] flex-col items-center justify-center text-center py-10">
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-500 mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Consultation Booked!</h3>
                    <p className="mt-2 text-gray-400 max-w-sm text-sm">
                      We have received your request. We will send a calendar invite to <span className="text-white font-medium">{consultationData.email}</span> shortly.
                    </p>
                    <Button
                      as="button"
                      onClick={() => {
                        setIsSubmitted(false)
                        setStep(1)
                        setSelectedDate(null)
                        setSelectedTime(null)
                      }}
                      className="mt-8 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Book another session
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                          Step {step} of 3
                        </span>
                        <h3 className="text-xl font-bold text-white mt-0.5">
                          {step === 1 && 'Choose a date'}
                          {step === 2 && 'Select time slot'}
                          {step === 3 && 'Your details'}
                        </h3>
                      </div>
                      {step > 1 && (
                        <button
                          onClick={() => setStep(step - 1)}
                          className="text-xs font-medium text-gray-400 hover:text-white transition"
                        >
                          Back
                        </button>
                      )}
                    </div>

                    {step === 1 && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-semibold text-white">October 2026</span>
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900"><ChevronLeft size={16} /></button>
                            <button className="p-1.5 rounded-lg border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900"><ChevronRight size={16} /></button>
                          </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
                          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-sm">
                          {Array.from({ length: startingDayOffset }).map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1
                            const isSelected = selectedDate === day
                            return (
                              <button
                                key={day}
                                onClick={() => setSelectedDate(day)}
                                className={`h-10 rounded-xl font-medium transition flex items-center justify-center ${
                                  isSelected
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-gray-300 hover:bg-gray-900 border border-transparent hover:border-gray-800'
                                }`}
                              >
                                {day}
                              </button>
                            )
                          })}
                        </div>

                        <div className="mt-8 flex justify-end">
                          <Button
                            as="button"
                            disabled={!selectedDate}
                            onClick={() => setStep(2)}
                            className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            Next Step <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-400 mb-4">Available slots for October {selectedDate}, 2026:</p>
                        {timeSlots.map((slot) => {
                          const isSelected = selectedTime === slot
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`w-full p-4 rounded-xl border text-left font-medium transition flex items-center justify-between ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-600/10 text-white'
                                  : 'border-gray-800 bg-[#0A0D14] text-gray-300 hover:border-gray-700 hover:text-white'
                              }`}
                            >
                              <span>{slot}</span>
                              <Clock size={16} className={isSelected ? 'text-blue-500' : 'text-gray-500'} />
                            </button>
                          )
                        })}

                        <div className="mt-8 flex justify-end">
                          <Button
                            as="button"
                            disabled={!selectedTime}
                            onClick={() => setStep(3)}
                            className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            Continue <ArrowRight size={16} className="ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <form onSubmit={handleConsultationSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            name="name"
                            value={consultationData.name}
                            onChange={handleConsultationChange}
                            placeholder="John Doe"
                            className="w-full rounded-xl border border-gray-800 bg-[#0A0D14] px-4 py-3 text-sm text-white outline-none focus:border-blue-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={consultationData.email}
                            onChange={handleConsultationChange}
                            placeholder="john@company.com"
                            className="w-full rounded-xl border border-gray-800 bg-[#0A0D14] px-4 py-3 text-sm text-white outline-none focus:border-blue-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Project Notes (Optional)</label>
                          <textarea
                            rows={3}
                            name="notes"
                            value={consultationData.notes}
                            onChange={handleConsultationChange}
                            placeholder="Briefly describe what you need..."
                            className="w-full resize-none rounded-xl border border-gray-800 bg-[#0A0D14] px-4 py-3 text-sm text-white outline-none focus:border-blue-600"
                          />
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button
                            as="button"
                            type="submit"
                            className="bg-blue-600 text-white hover:bg-blue-700 w-full justify-center"
                          >
                            Confirm & Book Consultation
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0A0D14] pb-20 sm:pb-24 lg:pb-28">
        <div className="container-app relative mx-auto px-4 max-w-7xl">
          <FadeIn>
            <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Have a project in mind?
                <span className="block text-blue-500">
                  Let&apos;s talk.
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                Whether you have a question, an idea, or a project ready
                to get started, we&apos;d love to hear from you. Send us a
                message and our team will get back to you shortly.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
            <FadeIn className="h-full">
              <div className="relative h-full overflow-hidden rounded-3xl bg-blue-600 p-7 shadow-xl sm:p-9 lg:p-10 text-white">
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

                <div className="relative z-10 flex h-full flex-col">
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-100">
                    Get in touch
                  </span>
                  <h3 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl text-white">
                    We&apos;re here to
                    <span className="block text-blue-100">
                      help you.
                    </span>
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-7 text-blue-50 sm:text-base">
                    Have questions about our services or want to discuss
                    your next project? Reach out to us directly or use the
                    form and we&apos;ll get back to you.
                  </p>

                  <div className="mt-9 space-y-4">
                    {contactInfo.map((contact) => {
                      const Icon = contact.icon
                      return (
                        <a
                          key={contact.label}
                          href={contact.href}
                          target={contact.label === 'Chat with us' ? '_blank' : undefined}
                          rel={contact.label === 'Chat with us' ? 'noopener noreferrer' : undefined}
                          className="group flex items-center gap-4 rounded-2xl bg-black/20 p-4 transition-all duration-300 hover:bg-black/40 border border-white/10"
                        >
                          <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-white/15 text-white transition-transform duration-300 group-hover:scale-105">
                            <Icon size={20} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-bold uppercase tracking-wider text-blue-200">
                              {contact.label}
                            </span>
                            <span className="mt-1 block break-words text-sm font-semibold text-white sm:text-[15px]">
                              {contact.value}
                            </span>
                          </span>
                          <ArrowUpRight
                            size={18}
                            className="ml-auto flex-shrink-0 text-blue-200 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                          />
                        </a>
                      )
                    })}
                  </div>

                  <div className="mt-auto pt-10">
                    <div className="h-px w-full bg-white/20" />
                    <p className="mt-5 text-sm leading-6 text-blue-100">
                      We normally respond within one business day.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-[#121824] p-6 shadow-xl sm:p-8 lg:p-10">
                <div className="absolute left-0 right-0 top-0 h-1 bg-blue-600" />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex min-h-[430px] flex-col items-center justify-center py-10 text-center"
                    >
                      <div className="grid h-20 w-20 place-items-center rounded-full bg-blue-600/20 border border-blue-500/30">
                        <CheckCircle2 size={48} strokeWidth={1.8} className="text-blue-500" />
                      </div>
                      <h3 className="mt-7 text-2xl font-bold text-white sm:text-3xl">
                        Thanks — your message is on its way!
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
                        We&apos;ll get back to you at{' '}
                        <span className="font-semibold text-white">{form.email}</span> within one business day.
                      </p>
                      <Button
                        as="button"
                        type="button"
                        onClick={handleSendAnother}
                        variant="outline"
                        size="sm"
                        className="mt-8 border-gray-800 text-white hover:bg-gray-900"
                      >
                        Send another message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      <div className="mb-1">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-500">
                          Send a message
                        </p>
                        <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                          Tell us what you&apos;re working on
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-400">
                          Fill out the form below and we&apos;ll get back to you as soon as possible.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2.5 block text-sm font-semibold text-white" htmlFor="name">
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
                            className="w-full rounded-xl border border-gray-800 bg-[#0A0D14] px-4 py-3.5 text-[15px] text-white outline-none transition-all duration-200 placeholder:text-gray-500 hover:border-gray-700 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>

                        <div>
                          <label className="mb-2.5 block text-sm font-semibold text-white" htmlFor="email">
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
                            className="w-full rounded-xl border border-gray-800 bg-[#0A0D14] px-4 py-3.5 text-[15px] text-white outline-none transition-all duration-200 placeholder:text-gray-500 hover:border-gray-700 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2.5 block text-sm font-semibold text-white" htmlFor="message">
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
                          className="w-full resize-none rounded-xl border border-gray-800 bg-[#0A0D14] px-4 py-3.5 text-[15px] leading-6 text-white outline-none transition-all duration-200 placeholder:text-gray-500 hover:border-gray-700 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm leading-5 text-red-400"
                        >
                          {error}
                        </motion.div>
                      )}

                      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-5 text-gray-400">
                          We&apos;ll only use your information to respond to your enquiry.
                        </p>
                        <Button
                          as="button"
                          type="submit"
                          icon={sending ? Loader2 : Send}
                          disabled={sending}
                          className="w-full justify-center sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
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
