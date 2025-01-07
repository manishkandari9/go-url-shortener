import React, { useState } from 'react'

export const UrlShortener = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement URL shortening logic here
    setShortUrl(`https://short.url/${Math.random().toString(36).substr(2, 6)}`)
  }

  const Input = ({ id, type, placeholder, value, onChange, required, className }) => (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  )

  const Label = ({ htmlFor, children, className }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium ${className}`}>
      {children}
    </label>
  )

  const Button = ({ type, children, className }) => (
    <button
      type={type}
      className={`px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url" className="text-gray-700 dark:text-gray-300">
          Enter a long URL
        </Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-blue-500 text-white dark:bg-blue-400 dark:text-gray-900 hover:bg-blue-600 dark:hover:bg-blue-500"
      >
        Shorten URL
      </Button>
      {shortUrl && (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Your shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline">
            {shortUrl}
          </a>
        </div>
      )}
    </form>
  )
}

