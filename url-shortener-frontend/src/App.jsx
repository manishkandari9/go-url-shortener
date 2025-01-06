'use client'

import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Import your components
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import URLShortener from './components/url-shortener'

export default function App() {
  // State to manage whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <ThemeProvider attribute="class">
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 text-gray-900 dark:text-gray-100">
          {/* Pass login state and setter to the Header */}
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          
          {/* Animate presence for smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto px-4 py-8"
            >
              {/* Define the routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Home />} />
                <Route path="/url-shortener" element={<UrlShortener />} />
              </Routes>
            </motion.main>
          </AnimatePresence>
          
          {/* Footer component */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}
