'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Link, BarChart2, Copy } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export default function URLShortener() {
  const [longURL, setLongURL] = useState('')
  const [shortURL, setShortURL] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [useCustomSlug, setUseCustomSlug] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('shorten')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setShortURL(`https://short.url/${useCustomSlug ? customSlug : Math.random().toString(36).substr(2, 6)}`)
    setIsLoading(false)
    setActiveTab('result')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">URL Shortener</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="shorten">Shorten</TabsTrigger>
            <TabsTrigger value="result">Result</TabsTrigger>
          </TabsList>
          <TabsContent value="shorten">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="longURL">Long URL</Label>
                <Input
                  id="longURL"
                  type="url"
                  placeholder="https://example.com/very-long-url"
                  value={longURL}
                  onChange={(e) => setLongURL(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="custom-slug"
                  checked={useCustomSlug}
                  onCheckedChange={setUseCustomSlug}
                />
                <Label htmlFor="custom-slug">Use custom slug</Label>
              </div>
              {useCustomSlug && (
                <div>
                  <Label htmlFor="customSlug">Custom Slug</Label>
                  <Input
                    id="customSlug"
                    type="text"
                    placeholder="my-custom-url"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                  />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Shortening...' : 'Shorten URL'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="result">
            {shortURL && (
              <div className="space-y-4">
                <div>
                  <Label>Short URL</Label>
                  <div className="flex mt-1">
                    <Input value={shortURL} readOnly />
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-2"
                      onClick={() => navigator.clipboard.writeText(shortURL)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="flex flex-col items-center">
                    <QrCode className="h-6 w-6 mb-2" />
                    QR Code
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center">
                    <Link className="h-6 w-6 mb-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center">
                    <BarChart2 className="h-6 w-6 mb-2" />
                    Analytics
                  </Button>
                </div>
                <div className="mt-4">
                  <Label>QR Code</Label>
                  <div className="flex justify-center mt-2">
                    <QRCodeSVG value={shortURL} size={200} />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

