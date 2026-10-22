/**
 * motion.js
 * ---------------------------------------------------------------------------
 * Centralised Framer Motion variants.
 *
 * Why this file exists:
 * Every section in the old version redefined the same `initial / whileInView /
 * transition` object inline (Hero, Services, Portfolio, Process, etc.).
 * That's ~6 lines of duplicated config per component for zero extra value.
 * Pulling the variants out here means:
 *   1) one place to tune easing/duration for the whole site
 *   2) components stay declarative: `variants={fadeUp}` instead of a literal
 *   3) far fewer lines of code per component (DRY)
 *
 * Easing curve [0.22, 1, 0.36, 1] ~= "easeOutExpo" — fast start, soft landing.
 * It's used everywhere so motion feels consistent instead of ad-hoc.
 */

const EASE = [0.22, 1, 0.36, 1]

/** Fade + slide up — the default "section entering viewport" animation. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/** Same as fadeUp but larger travel distance, used for hero-sized headings. */
export const fadeUpLg = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/** Parent wrapper: staggers any direct children that use `staggerItem`. */
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

/** Child variant paired with `staggerContainer` (cards, list rows, grid items). */
export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

/** Subtle lift-on-hover used on every clickable card (portfolio/case-study/service). */
export const cardHover = { y: -6, transition: { duration: 0.25, ease: EASE } }

/**
 * Standard viewport config for `whileInView` triggers.
 * `once: false` so every reveal (fade-ups, staggered cards, etc.) replays
 * each time its section re-enters the viewport — scrolling back up and
 * down the page keeps re-triggering the motion instead of only playing it
 * the first time. Kept the export name `viewportOnce` so every existing
 * `import { viewportOnce }` call site keeps working unchanged.
 */
export const viewportOnce = { once: false, margin: '-80px', amount: 0.2 }
