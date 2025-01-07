import React from 'react'

import { useState } from 'react'

export default function QRCode() {
  const [url, setUrl] = useState('')
  const [qrCode, setQRCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to your backend to generate QR code
    // For demonstration, we'll just set a mock QR code image
    setQRCode(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">QR Code Generation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="url"
              placeholder="Enter URL for QR code"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate QR Code
          </button>
        </form>
        {qrCode && (
          <div className="mt-4 flex justify-center">
            <img src={qrCode} alt="Generated QR Code" />
          </div>
        )}
      </div>
    </div>
  )
}

