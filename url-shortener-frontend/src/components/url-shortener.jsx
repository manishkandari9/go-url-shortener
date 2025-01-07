// app/page.jsx
'use client'

import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 text-gray-900 dark:text-gray-100">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <AnimatePresence mode="wait">
          <motion.main
            key={isLoggedIn ? 'dashboard' : 'home'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-4 py-8"
          >
            {isLoggedIn ? <Dashboard /> : <Home />}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </ThemeProvider>
  )
}