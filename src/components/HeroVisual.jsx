import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Maximize, Play, X } from 'lucide-react'

const youtubeNotmutedVideo =
  'https://www.youtube.com/embed/ZLw4gzIcECI?autoplay=1&mute=0&loop=1&playlist=ZLw4gzIcECI&controls=1&rel=0'

const youtubeVideo =
  'https://www.youtube.com/embed/ZLw4gzIcECI?autoplay=1&mute=1&loop=1&playlist=ZLw4gzIcECI&controls=1&rel=0'

const HeroVisual = () => {
  const [large, setLarge] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = large ? 'hidden' : ''
    document.body.style.overflow = large ? 'hidden' : ''

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [large])

  const player = (
    <motion.div
      initial={
        !large && window.innerWidth > 640
          ? { rotateX: 15, y: 5, scale: 0.8 }
          : false
      }
      whileInView={
        !large && window.innerWidth > 640
          ? { rotateX: 0, y: 0, scale: 1 }
          : undefined
      }
      animate={
        large
          ? { rotateX: 0, y: 0, scale: 1 }
          : undefined
      }
      viewport={{
        once: false,
        amount: 0.5,
      }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        ${
          large
            ? 'fixed inset-0 z-[9999] h-screen w-screen bg-black'
            : 'relative z-0 h-[70vh] w-[92%] rounded-tl-[35px] rounded-tr-[35px] shadow-[0_0_80px_rgba(37,99,235,0.7)] sm:h-[90vh] sm:w-[90%] sm:rounded-tl-[50px] sm:rounded-tr-[50px]'
        }
        overflow-hidden
      `}
    >

      {/* YouTube Video */}
      <iframe
        key={large ? 'unmuted' : 'muted'}
        src={large ? youtubeNotmutedVideo : youtubeVideo}
        title="Hero Video"
        className="h-full w-full border-none"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />

      {/* Blur overlay */}
      {!large && (
        <div
          className="
            pointer-events-none absolute inset-0
            bg-black/20 backdrop-blur-[10px]
          "
        />
      )}

      {/* Play Button */}
      {!large && (
        <button
          onClick={() => setLarge(true)}
          aria-label="Play video"
          className="
            absolute left-1/2 top-1/2
            flex h-20 w-20
            -translate-x-1/2 -translate-y-1/2
            items-center justify-center
            rounded-full
            bg-white/20
            text-white
            backdrop-blur-md
            transition-transform
            active:scale-90
          "
        >
          <Play size={35} fill="white" />
        </button>
      )}

      {/* Fullscreen Controls */}
      {large ? (
        // Close / Back button - top left
        <button
          onClick={() => setLarge(false)}
          aria-label="Close video"
          className="
            absolute left-7 top-16
            z-[10000]
            flex h-10 w-10
            items-center justify-center
            rounded-full
            bg-black/50
            text-white
            backdrop-blur-md
            ring-1 ring-white/20
            transition-all
            hover:bg-black/70
            active:scale-90
          "
        >
          <X size={26} strokeWidth={2.5} />
        </button>
      ) : (
        // Maximize button - bottom right
        <button
          onClick={() => setLarge(true)}
          aria-label="Maximize video"
          className="
            absolute bottom-5 right-5
            flex h-14 w-14
            items-center justify-center
            bg-primary-500
            text-white
            backdrop-blur-md
            ring-2 ring-primary-400
            transition-transform
            active:scale-90
            sm:bg-white/20
            sm:ring-0
          "
        >
          <Maximize size={25} />
        </button>
      )}

    </motion.div>
  )

  return (
    <div
      className="mt-5 flex w-full items-center justify-center"
      style={{
        perspective: large ? 'none' : 1000,
      }}
    >
      {large
        ? createPortal(player, document.body)
        : player}
    </div>
  )
}

export default HeroVisual
