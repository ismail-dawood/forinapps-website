import { useEffect } from 'react'
import Lenis from 'lenis'
import { frame, cancelFrame } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis } from '../lib/lenis.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * SmoothScroll
 * ---------------------------------------------------------------------------
 * Mounts once (in MainLayout, above <Outlet />) and drives buttery, inertia-based
 * smooth scrolling for the entire site via Lenis — the same library used on
 * most modern award-winning sites (Studio Freight's lenis, actively
 * maintained, ~9kb). It replaces the plain CSS `scroll-behavior: smooth`,
 * which only smooths *anchor-link jumps* and does nothing for normal wheel/
 * touch scrolling.
 *
 * The raf loop is registered on framer-motion's own `frame` scheduler instead
 * of a bare `requestAnimationFrame` loop — that's the officially recommended
 * way to pair Lenis with Framer Motion so that every `useScroll`/`whileInView`
 * animation in the app reads updated scroll values on the *same* tick Lenis
 * moves the page, instead of racing a tick behind (which is what causes
 * scroll-linked animations to feel laggy/jittery).
 *
 * `prefers-reduced-motion` is respected: users who've asked their OS for
 * less motion get normal native scrolling instead.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    })

    setLenis(lenis)

    // Keep every GSAP ScrollTrigger-driven animation (pinning, scrub, the
    // Our Services scrollytelling, etc.) reading the *same* scroll position
    // Lenis is rendering, on every scroll event — not just on native scroll.
    // Without this, ScrollTrigger listens for the native `scroll` event,
    // which Lenis's transform-based smoothing never fires, so pinned/scrubbed
    // sections silently stop updating.
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)

    function update(data) {
      lenis.raf(data.timestamp)
    }

    frame.update(update, true)

    return () => {
      cancelFrame(update)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
