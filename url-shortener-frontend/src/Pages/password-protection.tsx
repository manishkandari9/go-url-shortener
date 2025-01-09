'use client'

import React, { useState } from 'react'
import { Lock, Copy, Eye, EyeOff, Shield, Clock, BarChart } from 'lucide-react'

export default function PasswordProtection() {
  const [longURL, setLongURL] = useState('')
  const [password, setPassword] = useState('')
  const [shortURL, setShortURL] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [recentURLs, setRecentURLs] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newShortURL = `http://localhost:8080/protected-${Date.now()}`
    setShortURL(newShortURL)
    setRecentURLs(prev => [newShortURL, ...prev.slice(0, 4)])
    setIsLoading(false)
    toast({
      title: "Protected URL created",
      description: "Your password-protected short URL is ready to use!",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The URL has been copied to your clipboard.",
    })
  }

  // UI Components defined directly
  const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  )

  const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${className}`}
      {...props}
    />
  )

  const Label = ({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`} {...props}>
      {children}
    </label>
  )

  const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  )

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-600 dark:text-purple-400 mb-8">Password Protected URLs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Create Protected URL</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="longURL">Long URL</Label>
                  <Input
                    id="longURL"
                    type="url"
                    placeholder="Enter long URL"
                    value={longURL}
                    onChange={(e) => setLongURL(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password for protection"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className={`w-full bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Protected URL'}
                </Button>
              </form>
              {shortURL && (
                <div className="mt-4">
                  <Label>Your password-protected short URL:</Label>
                  <div className="flex mt-2">
                    <Input value={shortURL} readOnly className="rounded-r-none" />
                    <Button
                      onClick={() => copyToClipboard(shortURL)}
                      className="rounded-l-none bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      <Copy className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Protected URLs</h3>
              <ul className="space-y-2">
                {recentURLs.map((url, index) => (
                  <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                      <a
                        href={url}
                        className="text-purple-500 dark:text-purple-400 hover:underline truncate max-w-[150px]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url}
                      </a>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(url)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Features of Password Protection</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FeatureCard
                  icon={<Shield className="h-6 w-6" />}
                  title="Enhanced Security"
                  description="Protect sensitive links from unauthorized access"
                />
                <FeatureCard
                  icon={<Clock className="h-6 w-6" />}
                  title="Timed Access"
                  description="Set expiration times for password-protected links"
                />
                <FeatureCard
                  icon={<BarChart className="h-6 w-6" />}
                  title="Access Analytics"
                  description="Track who's trying to access your protected URLs"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex-shrink-0 text-purple-500 dark:text-purple-400">{icon}</div>
      <div>
        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</h4>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  )
}

function toast({ title, description }: { title: string; description: string }) {
  // Implement your toast notification logic here
  console.log(`${title}: ${description}`)
}

