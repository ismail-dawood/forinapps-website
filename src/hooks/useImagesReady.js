import { useEffect, useState } from 'react'

/**
 * useImagesReady
 * ---------------------------------------------------------------------------
 * Resolves to `true` once every <img> currently mounted on the page has
 * either loaded or errored out. Re-runs whenever `deps` changes (e.g. on
 * every route change), so ONE hook drives both the first-load splash and
 * the per-page loader — no separate "wait for whole site" vs "wait for this
 * page" logic to maintain.
 *
 * - `minDuration`: floor so the loader never just flashes/flickers.
 * - `maxWait`: ceiling so one slow/broken image can never block navigation
 *   forever.
 */
export function useImagesReady(deps = [], { minDuration = 0, maxWait = 4000 } = {}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)

    let cancelled = false
    const start = performance.now()

    const finish = () => {
      if (cancelled) return
      const remaining = Math.max(0, minDuration - (performance.now() - start))
      setTimeout(() => !cancelled && setReady(true), remaining)
    }

    // rAF lets React paint the new route's <img> tags before we inspect the DOM
    const raf = requestAnimationFrame(() => {
      const pending = Array.from(document.images).filter((img) => !img.complete)

      if (pending.length === 0) {
        finish()
        return
      }

      let left = pending.length
      const onSettle = () => {
        left -= 1
        if (left <= 0) finish()
      }
      pending.forEach((img) => {
        img.addEventListener('load', onSettle, { once: true })
        img.addEventListener('error', onSettle, { once: true })
      })
    })

    const fallback = setTimeout(finish, maxWait)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ready
}
