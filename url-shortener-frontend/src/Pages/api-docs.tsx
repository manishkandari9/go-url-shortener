'use client'

import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function EnhancedAPIDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState('shorten')

  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl ${className}`}>
      {children}
    </div>
  )

  const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
    >
      {children}
    </button>
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

  const CodeBlock = ({ code, language }: { code: string; language: string }) => (
    <SyntaxHighlighter language={language} style={tomorrow} className="rounded-md text-sm">
      {code}
    </SyntaxHighlighter>
  )

  const endpoints = [
    {
      name: 'shorten',
      title: 'Shorten URL',
      method: 'POST',
      endpoint: '/api/shorten',
      description: 'Create a shortened URL from a long URL.',
      request: {
        longUrl: 'https://example.com/very/long/url',
        customAlias: 'optional-custom-alias',
        expirationDate: '2023-12-31T23:59:59Z'
      },
      response: {
        shortUrl: 'http://short.ly/abc123',
        expirationDate: '2023-12-31T23:59:59Z',
        analytics: {
          clicks: 0,
          uniqueVisitors: 0
        }
      }
    },
    {
      name: 'expand',
      title: 'Expand URL',
      method: 'GET',
      endpoint: '/api/expand/{shortCode}',
      description: 'Retrieve the original long URL from a short URL.',
      request: {},
      response: {
        longUrl: 'https://example.com/very/long/url',
        expirationDate: '2023-12-31T23:59:59Z',
        analytics: {
          clicks: 42,
          uniqueVisitors: 30
        }
      }
    }
  ]

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">API Documentation</h1>
      <div className="mb-6 flex justify-center space-x-4">
        {endpoints.map((endpoint) => (
          <Tab
            key={endpoint.name}
            label={endpoint.title}
            isActive={activeEndpoint === endpoint.name}
            onClick={() => setActiveEndpoint(endpoint.name)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {endpoints.map((endpoint) => (
          activeEndpoint === endpoint.name && (
            <React.Fragment key={endpoint.name}>
              <Card className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">{endpoint.title}</h2>
                <p className="text-gray-600 mb-4">{endpoint.description}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {endpoint.method}
                  </span>
                  <span className="font-mono text-sm">{endpoint.endpoint}</span>
                </div>
                <Button>Try it out</Button>
              </Card>
              <Card>
                <h3 className="text-xl font-semibold mb-4">Request</h3>
                <CodeBlock
                  code={JSON.stringify(endpoint.request, null, 2)}
                  language="json"
                />
              </Card>
              <Card>
                <h3 className="text-xl font-semibold mb-4">Response</h3>
                <CodeBlock
                  code={JSON.stringify(endpoint.response, null, 2)}
                  language="json"
                />
              </Card>
            </React.Fragment>
          )
        ))}
      </div>
      <Card className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
        <p className="text-gray-600 mb-4">
          All API requests require authentication. Include your API key in the header of each request:
        </p>
        <CodeBlock
          code={`Authorization: Bearer YOUR_API_KEY`}
          language="http"
        />
      </Card>
    </div>
  )
}

