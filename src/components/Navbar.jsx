import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import { services } from '../data/services.js'
import Logo from './ui/Logo.jsx'
import Button from './ui/Button.jsx'

const navLinks = [
  // { label: 'Our work', to: '/our-work' },
  { label: 'About us', to: '/about-us' },
  //{ label: 'Contact us', to: '/contact-us' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  // Adds a border/shadow once the user scrolls past the hero — a cheap way
  // to give the sticky navbar depth without it looking heavy on page load.
  // The bar itself always stays pinned to the top and visible while
  // scrolling (no hide-on-scroll-down behaviour).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-[100] backdrop-blur-sm bg-bg/55 transition-shadow ${
        scrolled ? 'shadow-soft border-b border-border' : 'border-b border-transparent'
      }`}
    >
      <div className="container-app flex items-center justify-between gap-6 h-[76px]">
        <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}>
          <Logo />
        </motion.div>

        <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 px-4 py-2.5 rounded-full text-[15px] font-medium text-ink-soft hover:bg-primary-50 hover:text-primary-700 transition-colors">
              Services <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[380px] bg-white border border-border rounded-xl shadow-card p-2.5 flex flex-col gap-1"
                >
                  {services.map((s) => (
                    <NavLink key={s.slug} to={`/services/${s.slug}`} className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-primary-50 transition-colors">
                      <span className="grid place-items-center w-10 h-10 flex-shrink-0 rounded-[10px] bg-primary-100 text-primary-700">
                        <s.icon size={20} strokeWidth={2} />
                      </span>
                      <span>
                        <span className="block font-semibold text-[14.5px] text-ink">{s.title}</span>
                        <span className="block text-[13px] text-gray-warm mt-0.5 leading-snug">{s.short}</span>
                      </span>
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className="relative px-4 py-2.5 rounded-full text-[15px] font-medium transition-colors hover:text-primary-700"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-primary-50 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={isActive ? 'text-primary-700' : 'text-ink-soft'}>{l.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>


<Button to="/contact-us" size="sm" variant="outline"  className="hidden lg:inline-flex">
          Free Consultation
        </Button>
        <Button to="/contact-us" size="sm" icon={ArrowRight} className="hidden lg:inline-flex">
          Start my project
        </Button>

        <button className="lg:hidden text-ink" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-border bg-white"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              <p className="text-xs uppercase tracking-wide text-gray-light font-bold mt-2 mb-1">Services</p>
              {services.map((s) => (
                <NavLink key={s.slug} to={`/services/${s.slug}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 py-3 px-2 rounded-lg text-[15px] font-medium text-ink-soft hover:bg-primary-50">
                  <s.icon size={18} /> {s.title}
                </NavLink>
              ))}
              <div className="h-px bg-border my-2" />
              {navLinks.map((l) => (
                <NavLink key={l.label} to={l.to} onClick={() => setMobileOpen(false)} className="py-3 px-2 rounded-lg text-[15px] font-medium text-ink-soft hover:bg-primary-50">
                  {l.label}
                </NavLink>
              ))}
              <Button to="/contact-us" icon={ArrowRight} className="mt-3 w-full" onClick={() => setMobileOpen(false)}>
                Start my project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
