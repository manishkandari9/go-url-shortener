
import React, { useState } from 'react'
import axios from 'axios'

export const UrlShortener = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setShortUrl('')

    try {
      const response = await axios.post('/api/shorten', { url })
      setShortUrl(response.data.shortUrl)
    } catch (err) {
      setError('Failed to shorten URL. Please try again.')
      console.error('Error shortening URL:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const Input = ({ id, type, placeholder, value, onChange, required, className }: {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
    className: string;
  }) => (
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

  const Label = ({ htmlFor, children, className }: {
    htmlFor: string;
    children: React.ReactNode;
    className: string;
  }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium ${className}`}>
      {children}
    </label>
  )

  const Button = ({ type, children, className, disabled }: {
    type: 'submit' | 'button';
    children: React.ReactNode;
    className: string;
    disabled?: boolean;
  }) => (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
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
        disabled={isLoading}
      >
        {isLoading ? 'Shortening...' : 'Shorten URL'}
      </Button>
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}
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

