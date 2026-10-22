import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import SmoothScroll from '../components/SmoothScroll.jsx'

export default function MainLayout() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
