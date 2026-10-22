import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
    >
      <p className="font-display text-8xl font-extrabold text-primary-500">404</p>
      <h1 className="mt-4 text-2xl font-bold">This page wandered off</h1>
      <p className="mt-2.5 text-gray-warm max-w-sm">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button to="/" icon={ArrowLeft} iconPosition="left" className="mt-8">Back to home</Button>
    </motion.div>
  )
}
