// components/Header.jsx
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const { theme, setTheme } = useTheme()
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
    setShowLoginForm(false)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
          >
            URL Shortener Pro
          </motion.h1>
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {isLoggedIn ? (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowLoginForm(!showLoginForm)}
              >
                Login
              </button>
            )}
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 space-y-2"
          >
            <button
              className="w-full text-left p-2 rounded-md bg-gray-200 dark:bg-gray-700"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 mr-2 inline" /> : <Moon className="h-5 w-5 mr-2 inline" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            {isLoggedIn ? (
              <button
                className="w-full text-left p-2 rounded-md bg-red-500 text-white"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </button>
            ) : (
              <button
                className="w-full text-left p-2 rounded-md bg-purple-500 text-white"
                onClick={() => setShowLoginForm(!showLoginForm)}
              >
                Login
              </button>
            )}
          </motion.div>
        )}
      </div>
      {showLoginForm && !isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="container mx-auto px-4 py-4"
        >
          <form onSubmit={handleLogin} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email"
              required
              className="p-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="p-2 border rounded-md"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white p-2 rounded-md"
            >
              Login
            </button>
          </form>
        </motion.div>
      )}
    </header>
  )
}