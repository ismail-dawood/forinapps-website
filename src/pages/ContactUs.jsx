import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react'
import FadeIn from './FadeIn.jsx'
import Button from './ui/Button.jsx'

export default function FreeConsultation() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    notes: '',
  })

  // Dummy dates for the calendar demo
  const daysInMonth = 31
  const startingDayOffset = 3 // e.g., starting on Thursday

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '04:00 PM - 05:00 PM',
  ]

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section className="relative overflow-hidden bg-bg py-20 sm:py-24 lg:py-28">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-primary-900/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Info */}
          <FadeIn>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-400">
                Free Consultation
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Let&apos;s discuss your <span className="text-primary-400">project</span>
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                Book a free consultation and let&apos;s talk about your project, requirements, goals, and the best way to move forward.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-primary-900/50 border border-primary-500/30 text-primary-400">
                    <CalendarIcon size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Choose a convenient date</h3>
                    <p className="mt-1 text-sm text-ink-soft">Pick any available date from the calendar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-primary-900/50 border border-primary-500/30 text-primary-400">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Select your time</h3>
                    <p className="mt-1 text-sm text-ink-soft">Choose the time that works best for you.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-primary-900/50 border border-primary-500/30 text-primary-400">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Completely free</h3>
                    <p className="mt-1 text-sm text-ink-soft">No payment is required to book your consultation.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Interactive Booking Widget */}
          <FadeIn delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-alt p-6 shadow-2xl sm:p-8">
              <div className="absolute left-0 right-0 top-0 h-1 bg-brand-blue" />

              {isSubmitted ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center py-10">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-primary-900/40 border border-primary-500/30 text-primary-400 mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Consultation Booked!</h3>
                  <p className="mt-2 text-ink-soft max-w-sm text-sm">
                    We have received your request. We will send a calendar invite to <span className="text-white font-medium">{formData.email}</span> shortly.
                  </p>
                  <Button
                    as="button"
                    onClick={() => {
                      setIsSubmitted(false)
                      setStep(1)
                      setSelectedDate(null)
                      setSelectedTime(null)
                    }}
                    className="mt-8 bg-brand-blue text-white hover:bg-blue-700"
                  >
                    Book another session
                  </Button>
                </div>
              ) : (
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">
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
                        className="text-xs font-medium text-ink-soft hover:text-white transition"
                      >
                        Back
                      </button>
                    )}
                  </div>

                  {/* Step 1: Calendar Picker */}
                  {step === 1 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-white">October 2026</span>
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-lg border border-border text-ink-soft hover:text-white hover:bg-bg"><ChevronLeft size={16} /></button>
                          <button className="p-1.5 rounded-lg border border-border text-ink-soft hover:text-white hover:bg-bg"><ChevronRight size={16} /></button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-ink-soft mb-2">
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
                                  ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/30'
                                  : 'text-white hover:bg-bg border border-transparent hover:border-border'
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
                          className="bg-brand-blue text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          Next Step <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Time Slots */}
                  {step === 2 && (
                    <div className="space-y-3">
                      <p className="text-sm text-ink-soft mb-4">Available slots for October {selectedDate}, 2026:</p>
                      {timeSlots.map((slot) => {
                        const isSelected = selectedTime === slot
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`w-full p-4 rounded-xl border text-left font-medium transition flex items-center justify-between ${
                              isSelected
                                ? 'border-brand-blue bg-brand-blue/10 text-white'
                                : 'border-border bg-bg text-ink-soft hover:border-gray-600 hover:text-white'
                            }`}
                          >
                            <span>{slot}</span>
                            <Clock size={16} className={isSelected ? 'text-brand-blue' : 'text-gray-500'} />
                          </button>
                        )
                      })}

                      <div className="mt-8 flex justify-end">
                        <Button
                          as="button"
                          disabled={!selectedTime}
                          onClick={() => setStep(3)}
                          className="bg-brand-blue text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          Continue <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Form Details */}
                  {step === 3 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-white outline-none focus:border-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-white outline-none focus:border-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1">Project Notes (Optional)</label>
                        <textarea
                          rows={3}
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Briefly describe what you need..."
                          className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm text-white outline-none focus:border-brand-blue"
                        />
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button
                          as="button"
                          type="submit"
                          className="bg-brand-blue text-white hover:bg-blue-700 w-full justify-center"
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
  )
}
