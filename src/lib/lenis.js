/**
 * lenis.js
 * ---------------------------------------------------------------------------
 * Tiny module-level singleton so any component (ScrollToTop, a "back to top"
 * button, an in-page anchor link, the nav's mobile-menu close handler, etc.)
 * can reach the single running Lenis instance without prop-drilling or
 * pulling in a full context provider for one shared object.
 */
let instance = null

export function setLenis(lenis) {
  instance = lenis
}

export function getLenis() {
  return instance
}
