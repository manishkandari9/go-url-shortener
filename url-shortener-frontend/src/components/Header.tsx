import { useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Moon, Sun, Menu, X } from 'lucide-react'

interface HeaderProps {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
}

export default function Header({ isLoggedIn, setIsLoggedIn }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {isLoggedIn ? (
              <Button onClick={() => setIsLoggedIn(false)}>Logout</Button>
            ) : (
              <Button onClick={() => setShowLoginForm(!showLoginForm)}>Login</Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 space-y-2"
          >
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
            {isLoggedIn ? (
              <Button className="w-full justify-start" onClick={() => setIsLoggedIn(false)}>
                Logout
              </Button>
            ) : (
              <Button className="w-full justify-start" onClick={() => setShowLoginForm(!showLoginForm)}>
                Login
              </Button>
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
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Password" required />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </motion.div>
      )}
    </header>
  )
}


