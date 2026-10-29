import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ duration = 900 }) {
  const [progress, setProgress] = useState(6)

  useEffect(() => {
    const id = requestAnimationFrame(() => setProgress(96))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0A0D14]"
    >
      <motion.div
        exit={{ y: '-100%', transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }}
        className="absolute inset-0 bg-[#0A0D14]"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container with exact public asset name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 shadow-lg p-2"
        >
          <img 
            src="/Favicon.png" 
            alt="Brandflip" 
            className="h-full w-full object-contain"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-5 text-base font-display font-bold tracking-wide text-white"
        >
          Brand<span className="text-blue-500">flip</span>
        </motion.p>

        <div className="mt-7 h-[3px] w-44 overflow-hidden rounded-full bg-gray-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
            animate={{ width: `${progress}%` }}
            transition={{ duration: duration / 1000, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
