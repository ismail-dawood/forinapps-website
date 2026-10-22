import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainLayout from './layouts/MainLayout.jsx'
import Loader from './components/Loader.jsx'
import { useImagesReady } from './hooks/useImagesReady.js'

// Route-level code splitting: only the page the person is actually on
// (plus MainLayout/Home for the first paint) ships on initial load. Every
// other page becomes its own small chunk fetched on navigation, so the
// original single 530KB bundle no longer has to load in full up front.
const Home = lazy(() => import('./pages/Home.jsx'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'))
const OurWork = lazy(() => import('./pages/OurWork.jsx'))
const AboutUs = lazy(() => import('./pages/AboutUs.jsx'))
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail.jsx'))
const ContactUs = lazy(() => import('./pages/ContactUs.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  const location = useLocation()
  const [firstVisit, setFirstVisit] = useState(true)

  // Same hook drives the first-load splash AND every subsequent route
  // change — it re-checks image loading whenever the path changes, so the
  // loader stays up until the *current* page's images are actually in.
  const imagesReady = useImagesReady([location.pathname], {
    minDuration: firstVisit ? 1200 : 350,
    maxWait: firstVisit ? 6000 : 2500,
  })

  const loading = !imagesReady

  useEffect(() => {
    if (!loading && firstVisit) setFirstVisit(false)
  }, [loading, firstVisit])

  // Lock scroll while the loader is up so the page can't be scrolled
  // underneath it before it's fully revealed.
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader duration={firstVisit ? 1200 : 350} />}
      </AnimatePresence>

      {/* fallback=null is intentional: the full-screen Loader above already
          covers the viewport while a route's chunk + images are pending,
          so Suspense doesn't need a second spinner underneath it. */}
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
