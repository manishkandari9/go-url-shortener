'use client'
import React from 'react'
import { useState } from 'react'
import { Copy, Link, ArrowRight, CheckCircle } from 'lucide-react'

export default function CustomRedirect() {
  const [longURL, setLongURL] = useState('')
  const [redirectType, setRedirectType] = useState('302')
  const [shortURL, setShortURL] = useState('')
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setShortURL(`http://localhost:8080/${Math.random().toString(36).substr(2, 6)}`)
    setIsLoading(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortURL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-800">Custom Redirect</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="url"
                placeholder="Enter long URL"
                value={longURL}
                onChange={(e) => setLongURL(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              />
              <Link className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="relative">
              <select
                value={redirectType}
                onChange={(e) => setRedirectType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out appearance-none"
              >
                <option value="301">301 (Permanent)</option>
                <option value="302">302 (Temporary)</option>
              </select>
              <ArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating...' : 'Create Custom Redirect URL'}
            </button>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Your Short URL</h3>
          {shortURL ? (
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg break-all">
                <a href={shortURL} className="text-blue-600 hover:underline">{shortURL}</a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Redirect Type: {redirectType}</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  {copied ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
                  <span>{copied ? 'Copied!' : 'Copy URL'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-400">
              No short URL generated yet
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Redirects</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Long URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">http://short.url/{Math.random().toString(36).substr(2, 6)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">https://example.com/very/long/url/path</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.random() > 0.5 ? '301' : '302'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.floor(Math.random() * 1000)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

