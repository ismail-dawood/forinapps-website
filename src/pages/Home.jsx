import { motion } from 'framer-motion'
import Hero from '../components/Hero.jsx'

import ServicesScrollytelling from '../components/ServicesScrollytelling.jsx'
import HomePortfolio from '../components/HomePortfolio.jsx'
import OurTeam from '../components/OurTeam.jsx'

import ProcessSteps from '../components/ProcessSteps.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'


export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Hero />

      <ServicesScrollytelling />
      <HomePortfolio />
      <OurTeam />
  
      <ProcessSteps />
      <WhyChooseUs />
      <FaqAccordion />

    </motion.div>
  )
}
