import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { QRCodeSVG } from 'qrcode.react'
import { Link, Copy, Calendar, Lock } from 'lucide-react'

export default function Home() {
  const [longURL, setLongURL] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [useCustomAlias, setUseCustomAlias] = useState(false)
  const [expiryDate, setExpiryDate] = useState('')
  const [password, setPassword] = useState('')
  const [shortURL, setShortURL] = useState('')
  const [qrCode, setQRCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement actual URL shortening logic here (will be connected to Go backend)
    const newShortURL = `http://short.ly/${customAlias || Math.random().toString(36).substr(2, 6)}`
    setShortURL(newShortURL)
    setQRCode(newShortURL)
  }

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Shorten Your URL</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="longURL" className="text-lg">Long URL</Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="longURL"
                type="url"
                value={longURL}
                onChange={(e) => setLongURL(e.target.value)}
                className="pl-10"
                placeholder="https://example.com/very-long-url"
                required
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="useCustomAlias"
              checked={useCustomAlias}
              onCheckedChange={setUseCustomAlias}
            />
            <Label htmlFor="useCustomAlias">Use custom alias</Label>
          </div>
          {useCustomAlias && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Label htmlFor="customAlias">Custom Alias</Label>
              <Input
                id="customAlias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="my-custom-url"
              />
            </motion.div>
          )}
          <div>
            <Label htmlFor="expiryDate" className="text-lg">Expiry Date (Optional)</Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="expiryDate"
                type="datetime-local"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="text-lg">Password Protection (Optional)</Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="Enter a password"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Shorten URL</Button>
        </form>
      </motion.section>

      {shortURL && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Your Shortened URL</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-lg">Short URL</Label>
              <div className="flex mt-1">
                <Input value={shortURL} readOnly className="rounded-r-none" />
                <Button
                  onClick={() => navigator.clipboard.writeText(shortURL)}
                  className="rounded-l-none"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-lg">QR Code</Label>
              <div className="mt-2 bg-white p-4 rounded-lg inline-block">
                <QRCodeSVG value={qrCode} size={200} />
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  )
}

