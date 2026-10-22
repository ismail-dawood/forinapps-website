
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { services } from '../data/services.js'

gsap.registerPlugin(ScrollTrigger)

const TOTAL = 3

export default function ServicesScrollytelling() {
  const sectionRef = useRef(null)

  const [active, setActive] = useState(0)

  // Image currently being displayed
  const [displayedImage, setDisplayedImage] = useState(
    services[0]?.heroImage
  )

  // Used to prevent switching before image is ready
  const [imageReady, setImageReady] = useState(false)

  const current = services[active]

  /*
   * =========================================================
   * PRELOAD ALL SERVICE IMAGES
   * =========================================================
   *
   * Browser will download these images once.
   * After that browser cache can serve them much faster.
   */
  useEffect(() => {
    const images = services
      .slice(0, TOTAL)
      .map((service) => service.heroImage)
      .filter(Boolean)

    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  /*
   * =========================================================
   * INITIAL IMAGE
   * =========================================================
   *
   * Wait for the first image before considering it ready.
   */
  useEffect(() => {
    if (!current?.heroImage) return

    const img = new Image()

    img.src = current.heroImage

    if (img.complete) {
      setDisplayedImage(current.heroImage)
      setImageReady(true)
      return
    }

    img.onload = () => {
      setDisplayedImage(current.heroImage)
      setImageReady(true)
    }

    img.onerror = () => {
      // Still show the image even if browser reports an error
      setDisplayedImage(current.heroImage)
      setImageReady(true)
    }
  }, [])

  /*
   * =========================================================
   * CHANGE IMAGE
   * =========================================================
   *
   * Important:
   * We DON'T immediately replace displayedImage.
   *
   * First load the new image.
   * Once loaded, then switch.
   *
   * This prevents:
   *
   * OLD IMAGE
   *     ↓
   * BLACK
   *     ↓
   * NEW IMAGE
   *
   * Instead:
   *
   * OLD IMAGE
   *     ↓
   * SMOOTH
   *     ↓
   * NEW IMAGE
   */
  useEffect(() => {
    if (!current?.heroImage) return

    const src = current.heroImage

    // Already showing this image
    if (src === displayedImage) {
      setImageReady(true)
      return
    }

    setImageReady(false)

    const img = new Image()

    img.src = src

    // Image already exists in browser cache
    if (img.complete) {
      setDisplayedImage(src)
      setImageReady(true)
      return
    }

    img.onload = () => {
      setDisplayedImage(src)
      setImageReady(true)
    }

    img.onerror = () => {
      setDisplayedImage(src)
      setImageReady(true)
    }
  }, [current?.heroImage, displayedImage])

  /*
   * =========================================================
   * GSAP SCROLL TRIGGER
   * =========================================================
   */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,

        start: 'top top',

        end: () =>
          `+=${window.innerHeight * (
            window.innerWidth < 768 ? 3.2 : TOTAL
          )}`,

        pin: true,

        anticipatePin: 1,

        scrub: 0.8,

        onUpdate: ({ progress }) => {
          const index = Math.min(
            TOTAL - 1,
            Math.floor(progress * TOTAL)
          )

          setActive((prev) =>
            prev === index ? prev : index
          )
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="
        relative
        overflow-hidden
        bg-bg
        py-10
        sm:py-14
        lg:h-screen
        lg:min-h-0
        lg:py-0
      "
    >

      {/* =================================================
          CONTENT CONTAINER
      ================================================= */}

      <div
        className="
          container-app
          flex
          items-center
          lg:h-full
          lg:min-h-0
        "
      >

        <div
          className="
            grid
            w-full
            grid-cols-1
            items-center
            lg:grid-cols-2
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div
            className="
              order-2
              pr-0
              lg:order-1
              lg:pr-16
            "
          >

            {/* Small Heading */}
            <p
              className="
                mb-3
                text-md
                font-bold
                uppercase
                tracking-[0.35em]
                text-primary-500
                sm:mb-4
              "
            >
              Our Services
            </p>

            {/* Main Heading */}
            <h2
              className="
                max-w-xl
                text-3xl
                font-bold
                leading-[1.12]
                tracking-tight
                text-foreground
                sm:text-4xl
                md:text-5xl
              "
            >
              Everything you need,
              <br className="hidden sm:block" />

              <span className="text-primary-600">
                under one roof
              </span>
            </h2>

            {/* =================================================
                SERVICES AREA
            ================================================= */}

            <div
              className="
                relative
                mt-5
                sm:mt-7
                lg:mt-10
              "
            >

              {/* Permanent Scroll Track */}
              <div
                className="
                  absolute
                  left-[-14px]
                  top-2
                  bottom-2
                  w-[3px]
                  rounded-full
                  bg-foreground/10
                  sm:left-[-20px]
                "
              />

              {/* Active Progress */}
              <motion.div
                className="
                  absolute
                  left-[-14px]
                  top-2
                  w-[3px]
                  rounded-full
                  bg-primary-500
                  sm:left-[-20px]
                "
                animate={{
                  height: `${((active + 1) / TOTAL) * 100}%`,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  maxHeight: 'calc(100% - 8px)',
                }}
              />

              {/* Services */}
              {services.slice(0, TOTAL).map((service, i) => {
                const isActive = i === active

                return (
                  <motion.div
                    key={service.slug}
                    onClick={() => setActive(i)}
                    animate={{
                      opacity: isActive ? 1 : 0.38,
                      x: isActive ? 5 : 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      group
                      relative
                      cursor-pointer
                      py-3
                      sm:py-4
                    "
                  >

                    {/* TITLE */}
                    <div
                      className="
                        flex
                        items-center
                        gap-1
                        sm:gap-1.5
                      "
                    >

                      {/* Icon */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1 : 0.9,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                          flex
                          flex-shrink-0
                          items-center
                          justify-center
                        "
                      >

                        {/* Mobile */}
                        <service.icon
                          size={isActive ? 13 : 12}
                          strokeWidth={1.8}
                          className={`
                            transition-colors
                            duration-300
                            sm:hidden
                            ${
                              isActive
                                ? 'text-primary-600'
                                : 'text-foreground/40'
                            }
                          `}
                        />

                        {/* Desktop */}
                        <service.icon
                          size={isActive ? 15 : 14}
                          strokeWidth={1.8}
                          className={`
                            hidden
                            transition-colors
                            duration-300
                            sm:block
                            ${
                              isActive
                                ? 'text-primary-600'
                                : 'text-foreground/40'
                            }
                          `}
                        />

                      </motion.div>

                      {/* Title */}
                      <h3
                        className={`
                          text-base
                          font-bold
                          leading-tight
                          transition-colors
                          duration-300
                          sm:text-lg
                          md:text-xl
                          ${
                            isActive
                              ? 'text-primary-600'
                              : 'text-foreground'
                          }
                        `}
                      >
                        {service.title}
                      </h3>

                    </div>

                    {/* DESCRIPTION */}
                    <motion.p
                      initial={false}
                      animate={{
                        height: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 5 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        max-w-md
                        overflow-hidden
                        text-sm
                        leading-relaxed
                        text-gray-warm
                      "
                    >
                      {service.desc}
                    </motion.p>

                  </motion.div>
                )
              })}

            </div>

          </div>

        </div>

      </div>

      {/* =========================================================
          RIGHT IMAGE
      ========================================================= */}

      <div
        className="
          relative
          mt-6
          h-[38vh]
          min-h-[240px]
          max-h-[360px]
          w-full
          overflow-hidden
          sm:mt-8
          sm:h-[45vh]
          lg:absolute
          lg:right-0
          lg:top-0
          lg:mt-0
          lg:h-full
          lg:min-h-0
          lg:max-h-none
          lg:w-1/2
        "
      >

        {/* =================================================
            IMAGE BACKGROUND
            Keeps the area stable while images load
        ================================================= */}

        <div className="absolute inset-0 bg-black" />

        {/* =================================================
            CURRENT IMAGE
        ================================================= */}

        <motion.img
          src={displayedImage}
          alt={current.title}
          initial={false}
          animate={{
            opacity: imageReady ? 1 : 0.96,
            scale: imageReady ? 1 : 1.02,
          }}
          transition={{
            opacity: {
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            },
            scale: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="
            absolute
            inset-0
            z-10
            block
            h-full
            w-full
            object-cover
          "
        />

        {/* =================================================
            NEW IMAGE FADE LAYER

            This layer is only mounted after image is loaded.
            It gives us a clean crossfade instead of a flash.
        ================================================= */}

        {imageReady && displayedImage === current.heroImage && (
          <motion.div
            key={displayedImage}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              bg-transparent
            "
          />
        )}

      </div>

    </section>
  )
}

