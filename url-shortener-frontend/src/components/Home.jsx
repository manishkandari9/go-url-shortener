// components/Home.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, ArrowRight } from 'lucide-react'

export default function Home() {
  const [longURL, setLongURL] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the longURL to your Go backend
    console.log('URL to shorten:', longURL)
  }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          URL Shortener Pro
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Simplify your links, amplify your reach
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <div className="mb-4">
            <label htmlFor="longURL" className="text-lg mb-2 block">
              Enter your long URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="longURL"
                type="url"
                placeholder="https://example.com/very-long-url"
                value={longURL}
                onChange={(e) => setLongURL(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300 flex items-center justify-center"
          >
            Shorten URL
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          By using our service you agree to our{' '}
          <a href="#" className="underline hover:text-purple-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-purple-500">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  )
}