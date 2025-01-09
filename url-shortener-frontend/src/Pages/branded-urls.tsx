'use client'

import React, { useState } from 'react'
import { Copy, Link, Sparkles, ArrowRight } from 'lucide-react'

export default function BrandedURLs() {
  const [longURL, setLongURL] = useState('')
  const [brandDomain, setBrandDomain] = useState('')
  const [shortURL, setShortURL] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentURLs, setRecentURLs] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newShortURL = `http://${brandDomain}/${Math.random().toString(36).substr(2, 6)}`
    setShortURL(newShortURL)
    setRecentURLs(prev => [newShortURL, ...prev.slice(0, 4)])
    setIsLoading(false)
    toast({
      title: "Branded URL created",
      description: "Your new short URL is ready to use!",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The URL has been copied to your clipboard.",
    })
  }

  // UI Components defined directly with dark mode support
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

  const CardHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  )

  const CardContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  )

  const CardFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`px-6 py-4 bg-gray-50 dark:bg-gray-700 ${className}`} {...props}>
      {children}
    </div>
  )
  return (

  <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all hover:scale-[1.01]">
        <CardHeader>
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Branded URLs</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create custom short URLs with your brand</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="longURL">Long URL</Label>
              <Input
                id="longURL"
                type="url"
                placeholder="Enter long URL"
                value={longURL}
                onChange={(e) => setLongURL(e.target.value)}
                required
                className="transition-all focus:border-blue-500 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brandDomain">Brand Domain</Label>
              <Input
                id="brandDomain"
                type="text"
                placeholder="Enter your brand domain (e.g., yourbrand.co)"
                value={brandDomain}
                onChange={(e) => setBrandDomain(e.target.value)}
                required
                className="transition-all focus:border-blue-500 dark:focus:border-blue-400 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </div>
            <Button
              type="submit"
              className={`w-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Branded URL'}
            </Button>
          </form>
        </CardContent>
        {shortURL && (
          <CardFooter className="flex flex-col items-start space-y-2">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Your branded short URL:</p>
            <div className="flex items-center space-x-2 w-full">
              <Input value={shortURL} readOnly className="bg-gray-100 dark:bg-gray-700" />
              <Button
                onClick={() => copyToClipboard(shortURL)}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 focus:ring-gray-500 dark:focus:ring-gray-400"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      <Card className="transform transition-all hover:scale-[1.01]">
        <CardHeader>
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Recent URLs</h3>
        </CardHeader>
        <CardContent>
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
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:ring-gray-500 dark:focus:ring-gray-400"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 lg:col-span-1 transform transition-all hover:scale-[1.01]">
        <CardHeader>
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Features</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                <Sparkles className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Custom branded domains</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Link className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Shortened URLs</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <Copy className="h-5 w-5 text-green-500 dark:text-green-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Easy copy to clipboard</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                <ArrowRight className="h-5 w-5 text-purple-500 dark:text-purple-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">Instant redirection</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</div>
)
}

function toast({ title, description }: { title: string; description: string }) {
// Implement your toast notification logic here
console.log(`${title}: ${description}`)
}