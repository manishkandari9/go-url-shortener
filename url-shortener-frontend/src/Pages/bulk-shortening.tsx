import React from 'react'
import { useState } from 'react'

export default function BulkShortening() {
  const [longURLs, setLongURLs] = useState('')
  const [shortURLs, setShortURLs] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to your backend
    // For demonstration, we'll just set mock short URLs
    const urls = longURLs.split('\n').filter(url => url.trim() !== '')
    const mockShortURLs = urls.map(url => `http://localhost:8080/${Math.random().toString(36).substr(2, 6)}`)
    setShortURLs(mockShortURLs)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Bulk URL Shortening</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              placeholder="Enter long URLs (one per line)"
              value={longURLs}
              onChange={(e) => setLongURLs(e.target.value)}
              required
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Shorten URLs
          </button>
        </form>
        {shortURLs.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Shortened URLs:</h3>
            <ul className="list-disc pl-5">
              {shortURLs.map((url, index) => (
                <li key={index}>
                  <a href={url} className="text-blue-500">{url}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}


