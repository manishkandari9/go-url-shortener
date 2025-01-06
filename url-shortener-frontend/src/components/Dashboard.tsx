import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Clipboard, Link, QrCode, Trash2 } from 'lucide-react'

export default function Dashboard() {
  const [urls, setUrls] = useState([
    { id: 1, originalUrl: 'https://example.com/very-long-url-1', shortUrl: 'http://short.ly/abc123', clicks: 100 },
    { id: 2, originalUrl: 'https://example.com/very-long-url-2', shortUrl: 'http://short.ly/def456', clicks: 50 },
  ])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Dashboard</h2>
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Quick Shorten</h3>
          <form className="space-y-4">
            <Input placeholder="Enter long URL" />
            <Button className="w-full">Shorten</Button>
          </form>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Total URLs</h3>
          <p className="text-4xl font-bold">{urls.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Total Clicks</h3>
          <p className="text-4xl font-bold">{urls.reduce((sum, url) => sum + url.clicks, 0)}</p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">Your URLs</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-2">Original URL</th>
                <th className="text-left p-2">Short URL</th>
                <th className="text-left p-2">Clicks</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url.id} className="border-b dark:border-gray-700">
                  <td className="p-2">{url.originalUrl}</td>
                  <td className="p-2">{url.shortUrl}</td>
                  <td className="p-2">{url.clicks}</td>
                  <td className="p-2">
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost">
                        <Clipboard className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <BarChart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}

