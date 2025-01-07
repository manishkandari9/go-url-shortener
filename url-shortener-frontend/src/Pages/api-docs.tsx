import React from "react"
export default function APIDocs() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">URL Shortening API</h2>
          <div>
            <h3 className="text-xl font-semibold mb-2">Endpoint: /api/shorten</h3>
            <p className="mb-4">Method: POST</p>
            <h4 className="text-lg font-semibold mb-2">Request Body:</h4>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify({
                longUrl: "https://example.com/very/long/url",
                customAlias: "optional-custom-alias"
              }, null, 2)}
            </pre>
            <h4 className="text-lg font-semibold mt-4 mb-2">Response:</h4>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify({
                shortUrl: "http://short.ly/abc123"
              }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    )
  }
  
  