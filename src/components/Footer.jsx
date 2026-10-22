import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'
import { services } from '../data/services.js'
import Logo from './ui/Logo.jsx'

const sitemap = [
  { label: 'About us', to: '/about-us' },
  // { label: 'Our work', to: '/our-work' },
  { label: 'Contact us', to: '/contact-us' },
]

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'X' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-alt border-t border-border pt-16">
      <div className="container-app grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10 md:gap-12 pb-14">
        <div>
          {/* Same <Logo /> component as the navbar — defined once in ui/Logo.jsx */}
          <Logo className="mb-4" />
          <p className="text-gray-warm text-[14.5px] leading-relaxed max-w-xs">
Your trusted app development partner for mobile app, websites and web apps,
          </p>
          <div className="flex gap-2.5 mt-6">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="grid place-items-center w-9 h-9 rounded-full border border-border text-ink-soft hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-colors">
                <s.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wide text-gray-light mb-4">Sitemap</h4>
          <ul className="flex flex-col gap-3">
            {sitemap.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-[14.5px] text-ink-soft hover:text-primary-700 transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold uppercase tracking-wide text-gray-light mb-4">Services</h4>
          <ul className="flex flex-col gap-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="text-[14.5px] text-ink-soft hover:text-primary-700 transition-colors">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5">
        <p className="text-center text-[13px] text-gray-light">
          © {new Date().getFullYear()} ForinApps Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
