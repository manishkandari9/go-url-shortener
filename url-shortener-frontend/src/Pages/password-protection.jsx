import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Lock, Copy, Eye, EyeOff, Shield, Clock, BarChart } from 'lucide-react';

export default function PasswordProtection() {
  const [longURL, setLongURL] = useState('');
  const [password, setPassword] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recentURLs, setRecentURLs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // Validate URL
      if (!isValidUrl(longURL)) {
        throw new Error('Please enter a valid URL');
      }

      // Validate password
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Making POST request to the backend (adjust the URL to match your backend endpoint)
      const response = await axios.post('http://localhost:8080/create', {
        url: longURL,
        password: password,
      });

      const newShortURL = response.data.shortUrl;
      setShortURL(newShortURL);
      setRecentURLs(prev => [newShortURL, ...prev.slice(0, 4)]);

      showToast('Success', 'Your password-protected short URL is ready to use!');
    } catch (error) {
      showToast('Error', error.response?.data?.error || 'Failed to create protected URL', true);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied', 'The URL has been copied to your clipboard.');
    } catch (error) {
      showToast('Error', 'Please try copying manually.', true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-600 dark:text-purple-400 mb-8">
          Password Protected URLs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Create Protected URL</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="longURL">Long URL</Label>
                  <Input
                    id="longURL"
                    type="url"
                    placeholder="Enter long URL"
                    value={longURL}
                    onChange={(e) => setLongURL(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password for protection"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-gray-700 dark:hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Protected URL'}
                </Button>
              </form>

              {shortURL && (
                <div className="mt-4 space-y-2">
                  <Label>Your password-protected short URL:</Label>
                  <div className="flex">
                    <Input value={shortURL} readOnly />
                    <Button onClick={() => copyToClipboard(shortURL)} className="ml-2">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Protected URLs</h3>
              <ul className="space-y-2">
                {recentURLs.map((url, index) => (
                  <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                      <a
                        href={url}
                        className="text-purple-500 dark:text-purple-400 hover:underline truncate max-w-[150px]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url}
                      </a>
                    </div>
                    <Button onClick={() => copyToClipboard(url)} className="!p-2">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Features of Password Protection</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FeatureCard
                  icon={<Shield className="h-6 w-6" />}
                  title="Enhanced Security"
                  description="Protect sensitive links from unauthorized access"
                />
                <FeatureCard
                  icon={<Clock className="h-6 w-6" />}
                  title="Timed Access"
                  description="Set expiration times for password-protected links"
                />
                <FeatureCard
                  icon={<BarChart className="h-6 w-6" />}
                  title="Access Analytics"
                  description="Track who's trying to access your protected URLs"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Custom Components with Tailwind
const Button = ({ children, className = '', disabled = false, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md font-medium bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${className}`}
    {...props}
  />
);

const Label = ({ children, className = '', ...props }) => (
  <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`} {...props}>
    {children}
  </label>
);

const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div className="flex-shrink-0 text-purple-500 dark:text-purple-400">{icon}</div>
    <div>
      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</h4>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

function showToast(title, message, isError = false) {
  // Simple console.log for demonstration
  // In a real app, you'd implement a proper toast notification system
  console.log(`${isError ? '❌' : '✅'} ${title}: ${message}`);
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
