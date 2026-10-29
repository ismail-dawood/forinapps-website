import { motion } from 'framer-motion'
import { Target, Heart, Handshake } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import FadeIn from '../components/FadeIn.jsx'
import Stagger, { staggerItem } from '../components/Stagger.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import ProcessSteps from '../components/ProcessSteps.jsx'
import OurTeam from '../components/OurTeam.jsx'

const stats = [
  { value: '150+', label: 'Projects delivered' },
  { value: '60+', label: 'Happy clients worldwide' },
  { value: '8+', label: 'Years of experience' },
  { value: '20+', label: 'Engineers & designers' },
]

const values = [
  { icon: Target, title: 'Outcome-driven', desc: 'We measure success by your business results, not just shipped features.' },
  { icon: Heart, title: 'Care about craft', desc: 'Clean code, thoughtful design, and attention to the small details that add up.' },
  { icon: Handshake, title: 'Real partnership', desc: 'We work as an extension of your team, not a vendor that disappears after launch.' },
]

export default function AboutUs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PageHero
        title="We build software the way we'd want it built for us"
        subtitle="ForinApps is a software development studio helping businesses launch websites, web apps, and mobile apps that actually move the needle."
        crumbs={[{ label: 'About us' }]}
      />

      <section className="section-pad pt-0">
        <div className="container-app">
          <FadeIn className="max-w-xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-[42px] font-bold text-white">The values behind every project</h2>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <motion.div 
                key={v.title} 
                variants={staggerItem} 
                className="p-8 rounded-2xl border border-border bg-bg-alt shadow-card"
              >
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary-900/50 text-primary-400 mb-5 border border-primary-700/30">
                  <v.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{v.title}</h3>
                <p className="mt-2.5 text-sm text-ink-soft leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <OurTeam />
      <WhyChooseUs />
      <ProcessSteps />
    </motion.div>
  )
}
