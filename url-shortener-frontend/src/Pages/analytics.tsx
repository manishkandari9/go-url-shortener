// Mock data for demonstration
import React from "react"
const analyticsData = [
    { url: 'http://short.ly/abc123', clicks: 100, topLocation: 'USA' },
    { url: 'http://short.ly/def456', clicks: 75, topLocation: 'India' },
    { url: 'http://short.ly/ghi789', clicks: 50, topLocation: 'UK' },
  ]
  
  export default function Analytics() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>
        <div className="space-y-4">
          {analyticsData.map((data) => (
            <div key={data.url} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{data.url}</h2>
              <p>Total Clicks: {data.clicks}</p>
              <p>Top Location: {data.topLocation}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  