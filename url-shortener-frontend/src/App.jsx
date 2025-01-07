// app/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Dashboard from './components/Dashboard'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Router> {/* Ensure Router wraps the Routes */}
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </Router> 
  )
}
