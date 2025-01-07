// Mock data for demonstration
import React from "react"
const urlHistory = [
    { shortUrl: 'http://short.ly/abc123', longUrl: 'https://example.com/very/long/url/1', createdAt: '2023-07-01' },
    { shortUrl: 'http://short.ly/def456', longUrl: 'https://example.com/very/long/url/2', createdAt: '2023-07-02' },
    { shortUrl: 'http://short.ly/ghi789', longUrl: 'https://example.com/very/long/url/3', createdAt: '2023-07-03' },
  ]
  
  export default function URLHistory() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">URL Shortening History</h1>
        <div className="space-y-4">
          {urlHistory.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{item.shortUrl}</h2>
              <p>Long URL: {item.longUrl}</p>
              <p>Created: {item.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  