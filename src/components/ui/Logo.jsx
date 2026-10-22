import { Link } from 'react-router-dom'

/**
 * Logo
 * ---------------------------------------------------------------------------
 * Single source of truth for the brand mark. Previously the "CB" square was
 * hand-coded inline in Navbar, Footer, AND the CTA watermark — three copies
 * of the same markup that all had to be edited together if the brand ever
 * changed. Now it's one component, imported wherever a logo is needed.
 *
 * `src` is a placeholder (swap for your real exported logo file, e.g.
 * `/logo.svg` dropped into the `public/` folder, or import it directly:
 *   import logo from '../../assets/logo.png'
 * and pass it as the `src` prop, or just change the default below once).
 *
 * @param {boolean} [withText=true] - show the "ForinApps" wordmark next to the mark
 * @param {string}  [size='md']     - 'md' (navbar) | 'sm' (footer, compact contexts)
 */
export default function Logo({ withText = true, size = 'md', className = '' }) {
  const dims = size === 'sm' ? 'w-16 h-13' : 'w-17 h-14'

  return (
    <Link to="/" className={`flex items-center gap-2.5 font-display font-extrabold text-lg flex-shrink-0 ${className}`}>
      <img
        src="/forinlogo.png"
        alt="ForinApps logo"
        className={`${dims}`}
      />
     
    </Link>
  )
}
