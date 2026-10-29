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
  // Contact Form States
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  // Free Consultation Widget States
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
      {/* FREE CONSULTATION SECTION */}
      <section className="relative overflow-hidden bg-[#0A0D14] py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />

        <div className="container-app relative mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Left Column: Info */}
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

            {/* Right Column: Interactive Booking Widget */}
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
                              className={`w-full p-4
