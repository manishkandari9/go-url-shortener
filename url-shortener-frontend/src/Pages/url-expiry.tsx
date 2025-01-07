import React from 'react'

import { useState } from 'react'

export default function URLExpiry() {
  const [longURL, setLongURL] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [shortURL, setShortURL] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to your backend
    // For demonstration, we'll just set a mock short URL
    setShortURL(`http://localhost:8080/temp-${Date.now()}`)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">URL with Expiry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="url"
              placeholder="Enter long URL"
              value={longURL}
              onChange={(e) => setLongURL(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="datetime-local"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Expiring URL
          </button>
        </form>
        {shortURL && (
          <div className="mt-4">
            <p>Your short URL (expires on {new Date(expiryDate).toLocaleString()}): <a href={shortURL} className="text-blue-500">{shortURL}</a></p>
          </div>
        )}
      </div>
    </div>
  )
}

