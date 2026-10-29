import { projects } from '../data/portfolio.js'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------
// PRELOAD PORTFOLIO IMAGES
// ---------------------------------------------------------

const preloadImages = (items) => {
  return Promise.all(
    items.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image()

          img.onload = resolve
          img.onerror = resolve
          img.src = src
        })
    )
  )
}

export default function HomePortfolio() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const headingRef = useRef(null)

  // Keep this available for both JSX and useLayoutEffect
  const selectedProjects = projects.slice(0, 12)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current

    if (!section || !grid) return

    let ctx
    let cancelled = false

    // ---------------------------------------------------------
    // PRELOAD ALL IMAGES
    // ---------------------------------------------------------

    const imageSources = selectedProjects
      .map((project) => project.image)
      .filter(Boolean)

    preloadImages(imageSources).then(() => {
      if (cancelled) return

      const items = Array.from(grid.children)

      if (!items.length) return

      ctx = gsap.context(() => {
        // -----------------------------------------------------
        // CALCULATE CARD OFFSETS
        // -----------------------------------------------------

        const gridRect = grid.getBoundingClientRect()

        const centerX = gridRect.width / 2
        const centerY = gridRect.height / 2

        const offsets = items.map((item) => {
          const rect = item.getBoundingClientRect()

          const itemCenterX =
            rect.left - gridRect.left + rect.width / 2

          const itemCenterY =
            rect.top - gridRect.top + rect.height / 2

          return {
            x: centerX - itemCenterX,
            y: centerY - itemCenterY,
          }
        })

        // -----------------------------------------------------
        // HEADING + CARD ENTRY ANIMATION
        // -----------------------------------------------------

        const entry = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 20%',
            toggleActions: 'restart none none reverse',
          },
        })

        // -----------------------------------------------------
        // HEADING
        // -----------------------------------------------------

        entry.fromTo(
          headingRef.current,
          {
            opacity: 0,
            scale: 0.7,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          }
        )

        // -----------------------------------------------------
        // INITIAL CARD POSITION
        // -----------------------------------------------------

        items.forEach((item, i) => {
          entry.set(
            item,
            {
              x: offsets[i].x,
              y: offsets[i].y,
              scale: 0.25,
              opacity: 0,
            },
            0
          )
        })

        // -----------------------------------------------------
        // BURST INTO POSITION
        // -----------------------------------------------------

        entry.to(
          items,
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: {
              each: 0.08,
              from: 'center',
            },
          },
          '-=0.3'
        )

        ScrollTrigger.refresh()
      }, section)
    })

    // ---------------------------------------------------------
    // RESIZE
    // ---------------------------------------------------------

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelled = true

      window.removeEventListener('resize', handleResize)

      if (ctx) {
        ctx.revert()
      }
    }
  }, [selectedProjects])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="
        relative
        min-h-[150vh]
        pb-32
        bg-[#0A0D14]
        text-white
      "
    >
      {/* =====================================================
          STICKY HEADING
      ========================================================= */}

      <div
        className="
          sticky
          top-0
          z-30
          flex
          h-screen
          items-center
          justify-center
          pointer-events-none
          px-4
        "
      >
        <div
          ref={headingRef}
          className="
            rounded-2xl
            border
            border-blue-500/30
            bg-[#121824]/80
            px-5
            py-3
            shadow-[0_0_50px_rgba(37,99,235,0.35)]
            backdrop-blur-md

            sm:rounded-3xl
            sm:px-8
            sm:py-4

            md:px-10
            md:py-5
          "
        >
          <h2
            className="
              text-3xl
              font-bold
              leading-tight
              text-white

              sm:text-5xl

              md:text-7xl
            "
          >
            Our Portfolios
          </h2>
        </div>
      </div>

      {/* =====================================================
          PROJECTS
      ========================================================= */}

      <div
        className="
          container-app
          relative
          z-20
          -mt-[70vh]
          px-3
          mx-auto
          max-w-7xl

          sm:px-4
        "
      >
        <div
          ref={gridRef}
          className="
            grid
            grid-cols-2
            items-start
            gap-3

            sm:gap-5

            md:gap-7
          "
        >
          {selectedProjects.map((project, index) => (
            <div
              key={project.slug}
              className="
                relative
                aspect-[3/4]
                overflow-hidden
                rounded-xl
                border
                border-gray-800
                bg-[#121824]
                shadow-xl
                will-change-transform

                sm:rounded-2xl

                md:rounded-3xl
                md:h-[380px]
                md:aspect-auto
              "
            >
              <img
                src={project.image}
                alt={project.title || ''}
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="
                  block
                  h-full
                  w-full
                  object-cover
                  object-[left_top]
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
