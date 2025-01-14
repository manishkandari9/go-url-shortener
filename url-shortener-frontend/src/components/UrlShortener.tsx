import React, { useState } from 'react';
import axios from 'axios';

export const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShortUrl('');

    try {
      // Sending the URL to the Go backend for shortening
      const response = await axios.post('http://localhost:8080/api/shorten', { url });

      // Storing the shortened URL from the response
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      console.error('Error shortening URL:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url" className="text-gray-700 dark:text-gray-300">
            Enter a long URL
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com/very/long/url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white dark:bg-blue-400 dark:text-gray-900 hover:bg-blue-600 dark:hover:bg-blue-500"
          disabled={isLoading}
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}
        {shortUrl && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Your shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </form>
    </div>
  );
};
