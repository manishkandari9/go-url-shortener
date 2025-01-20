'use client'
import React from 'react'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for demonstrations
const urlHistory = [
  { id: 'abc123', shortUrl: 'http://short.ly/abc123', longUrl: 'https://example.com/very/long/url/1', createdAt: '2023-07-01', clicks: 150 },
  { id: 'def456', shortUrl: 'http://short.ly/def456', longUrl: 'https://example.com/very/long/url/2', createdAt: '2023-07-02', clicks: 89 },
  { id: 'ghi789', shortUrl: 'http://short.ly/ghi789', longUrl: 'https://example.com/very/long/url/3', createdAt: '2023-07-03', clicks: 234 },
  { id: 'jkl012', shortUrl: 'http://short.ly/jkl012', longUrl: 'https://example.com/very/long/url/4', createdAt: '2023-07-04', clicks: 67 },
  { id: 'mno345', shortUrl: 'http://short.ly/mno345', longUrl: 'https://example.com/very/long/url/5', createdAt: '2023-07-05', clicks: 312 },
]

export default function EnhancedURLHistory() {
  const [selectedUrl, setSelectedUrl] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredHistory = urlHistory.filter(item =>
    item.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.longUrl.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">URL Shortening History</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search URLs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHistory.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">{item.shortUrl}</h2>
            <p className="text-gray-600 mb-2 truncate" title={item.longUrl}>Long URL: {item.longUrl}</p>
            <p className="text-gray-500 mb-4">Created: {item.createdAt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Clicks: {item.clicks}</span>
              <button
                onClick={() => handleCopy(item.shortUrl)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => setSelectedUrl(selectedUrl === item.id ? null : item.id)}
              className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300"
            >
              {selectedUrl === item.id ? 'Hide Details' : 'Show Details'}
            </button>
            {selectedUrl === item.id && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">Click Distribution (Last 7 days)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { day: 'Mon', clicks: Math.floor(Math.random() * 50) },
                    { day: 'Tue', clicks: Math.floor(Math.random() * 50) },
                    { day: 'Wed', clicks: Math.floor(Math.random() * 50) },
                    { day: 'Thu', clicks: Math.floor(Math.random() * 50) },
                    { day: 'Fri', clicks: Math.floor(Math.random() * 50) },
                    { day: 'Sat', clicks: Math.floor(Math.random() * 50) },
                    { day: 'Sun', clicks: Math.floor(Math.random() * 50) },
                  ]}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clicks" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No results found for "{searchTerm}"
        </div>
      )}
    </div>
  )
}

