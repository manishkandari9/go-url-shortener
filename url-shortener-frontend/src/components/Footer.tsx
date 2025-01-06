import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8"
    >
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">&copy; 2023 URL Shortener Pro. All rights reserved.</p>
      </div>
    </motion.footer>
  )
}

