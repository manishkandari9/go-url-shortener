
import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function AdvancedURLExpiry() {
  const [longURL, setLongURL] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [shortURL, setShortURL] = useState('')
  const [activeTab, setActiveTab] = useState('create')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to your backend
    // For demonstration, we'll just set a mock short URL
    const alias = customAlias || `temp-${Date.now()}`
    setShortURL(`http://localhost:8080/${alias}`)
  }

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
      {children}
    </div>
  )

  const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
    >
      {children}
    </button>
  )

  const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    />
  )

  const Tab = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold transition-all duration-300 ${
        isActive
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-blue-600'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Advanced URL Shortener</h1>
        <div className="mb-6 flex justify-center space-x-4">
          <Tab label="Create URL" isActive={activeTab === 'create'} onClick={() => setActiveTab('create')} />
          <Tab label="Manage URLs" isActive={activeTab === 'manage'} onClick={() => setActiveTab('manage')} />
        </div>
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Expiring URL</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Long URL</label>
                  <Input
                    type="url"
                    placeholder="Enter long URL"
                    value={longURL}
                    onChange={(e) => setLongURL(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <Input
                    type="datetime-local"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Alias (Optional)</label>
                  <Input
                    type="text"
                    placeholder="Enter custom alias"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                  />
                </div>
                <Button type="submit">Create Expiring URL</Button>
              </form>
            </Card>
            <Card>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Result</h2>
              {shortURL ? (
                <div className="space-y-4">
                  <p className="text-lg">
                    Your short URL (expires on {new Date(expiryDate).toLocaleString()}):
                  </p>
                  <a href={shortURL} className="text-blue-500 hover:underline break-all">
                    {shortURL}
                  </a>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">QR Code</h3>
                    <QRCodeSVG value={shortURL} size={200} />
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Your shortened URL will appear here</p>
              )}
            </Card>
          </div>
        )}
        {activeTab === 'manage' && (
          <Card>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage URLs</h2>
            <p className="text-gray-600">
              Here you can add functionality to view, edit, and delete your shortened URLs.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

