'use client'

import React, { useState } from 'react'
import { Copy, Link, Sparkles, Clock, BarChart, Shield } from 'lucide-react'

export default function CustomShortURLs() {
  const [longURL, setLongURL] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [shortURL, setShortURL] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentURLs, setRecentURLs] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API calls
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newShortURL = `http://localhost:8080/${customAlias}`
    setShortURL(newShortURL)
    setRecentURLs(prev => [newShortURL, ...prev.slice(0, 4)])
    setIsLoading(false)
    toast({
      title: "Short URL created",
      description: "Your custom short URL is ready to use!",
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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">Custom Short URLs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Create Your Short URL</h2>
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
                  <Label htmlFor="customAlias">Custom Alias</Label>
                  <Input
                    id="customAlias"
                    type="text"
                    placeholder="Enter custom alias"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Short URL'}
                </Button>
              </form>
              {shortURL && (
                <div className="mt-4">
                  <Label>Your short URL:</Label>
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
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent URLs</h3>
              <ul className="space-y-2">
                {recentURLs.map((url, index) => (
                  <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <a
                      href={url}
                      className="text-blue-500 dark:text-blue-400 hover:underline truncate max-w-[200px]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url}
                    </a>
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
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FeatureCard icon={<Sparkles className="h-6 w-6" />} title="Custom Aliases" description="Create memorable short URLs" />
                <FeatureCard icon={<Clock className="h-6 w-6" />} title="URL Expiration" description="Set expiration dates for your links" />
                <FeatureCard icon={<BarChart className="h-6 w-6" />} title="Click Analytics" description="Track clicks and user engagement" />
                <FeatureCard icon={<Shield className="h-6 w-6" />} title="Link Privacy" description="Password-protect your short URLs" />
                <FeatureCard icon={<Link className="h-6 w-6" />} title="QR Codes" description="Generate QR codes for your short URLs" />
                <FeatureCard icon={<Copy className="h-6 w-6" />} title="Bulk Shortening" description="Shorten multiple URLs at once" />
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
      <div className="flex-shrink-0 text-blue-500 dark:text-blue-400">{icon}</div>
      <div>
        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</h4>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  )
}

function toast({ title, description }: { title: string; description: string }) {
  console.log(`${title}: ${description}`)
}

