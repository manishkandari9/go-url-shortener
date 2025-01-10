import React from 'react'
import { useState } from 'react'
import { Download, Copy, Loader2, QrCode, History, Settings, Trash2, Check, RefreshCcw } from 'lucide-react'

type QRCodeType = {
  url: string
  size: number
  color: string
  backgroundColor: string
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
  timestamp: Date
}

type TabType = 'generate' | 'history' | 'settings'

export default function QRCodeGenerator() {
  const [url, setUrl] = useState('')
  const [qrCode, setQRCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('generate')
  const [history, setHistory] = useState<QRCodeType[]>([])
  const [settings, setSettings] = useState({
    size: 200,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    errorCorrectionLevel: 'M' as const
  })
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${settings.size}x${settings.size}&data=${encodeURIComponent(url)}&color=${settings.color.substring(1)}&bgcolor=${settings.backgroundColor.substring(1)}&ecc=${settings.errorCorrectionLevel}`
      setQRCode(qrUrl)
      
      // Add to history
      setHistory(prev => [{
        url,
        ...settings,
        timestamp: new Date()
      }, ...prev].slice(0, 10)) // Keep only last 10 items
    } catch (error) {
      console.error('Failed to generate QR code:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadQRCode = async () => {
    try {
      const response = await fetch(qrCode)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `qr-code-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download QR code:', error)
    }
  }

  const copyQRCode = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  const clearHistory = () => {
    setHistory([])
  }

  const regenerateFromHistory = (item: QRCodeType) => {
    setUrl(item.url)
    setSettings({
      size: item.size,
      color: item.color,
      backgroundColor: item.backgroundColor,
      errorCorrectionLevel: item.errorCorrectionLevel
    })
    setActiveTab('generate')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 mb-2">
              QR Code Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Generate custom QR codes with advanced styling options
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['generate', 'history', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm
                  flex items-center gap-2 transition-all duration-200
                  ${activeTab === tab
                    ? 'bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 text-purple-900 dark:text-purple-100 shadow-lg shadow-purple-500/10'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {tab === 'generate' && <QrCode className="w-4 h-4" />}
                {tab === 'history' && <History className="w-4 h-4" />}
                {tab === 'settings' && <Settings className="w-4 h-4" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Generate Tab */}
          {activeTab === 'generate' && (
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="url"
                    placeholder="Enter URL for QR code"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="
                      w-full px-4 py-3 pl-11
                      bg-white/80 dark:bg-gray-800/80
                      border border-gray-300 dark:border-gray-600
                      rounded-lg
                      text-gray-900 dark:text-gray-100
                      placeholder-gray-500 dark:placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-purple-500
                      transition-all duration-200
                    "
                  />
                  <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !url}
                  className="
                    w-full px-4 py-3 rounded-lg font-medium
                    bg-gradient-to-r from-purple-600 to-indigo-600
                    hover:from-purple-700 hover:to-indigo-700
                    text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                    flex items-center justify-center gap-2
                  "
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-5 h-5" />
                      Generate QR Code
                    </>
                  )}
                </button>
              </form>

              {qrCode && (
                <div className="space-y-4">
                  <div className="flex justify-center p-8 bg-white dark:bg-gray-900 rounded-lg">
                    <img src={qrCode} alt="Generated QR Code" className="max-w-full" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={downloadQRCode}
                      className="
                        flex-1 px-4 py-2 rounded-lg font-medium
                        border border-gray-300 dark:border-gray-600
                        hover:bg-gray-50 dark:hover:bg-gray-800
                        text-gray-700 dark:text-gray-300
                        focus:outline-none focus:ring-2 focus:ring-purple-500
                        transition-all duration-200
                        flex items-center justify-center gap-2
                      "
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={copyQRCode}
                      className="
                        flex-1 px-4 py-2 rounded-lg font-medium
                        border border-gray-300 dark:border-gray-600
                        hover:bg-gray-50 dark:hover:bg-gray-800
                        text-gray-700 dark:text-gray-300
                        focus:outline-none focus:ring-2 focus:ring-purple-500
                        transition-all duration-200
                        flex items-center justify-center gap-2
                      "
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy URL
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Recent QR Codes
                </h3>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="
                      px-3 py-2 rounded-lg text-sm font-medium
                      text-red-600 dark:text-red-400
                      hover:bg-red-50 dark:hover:bg-red-900/20
                      focus:outline-none focus:ring-2 focus:ring-red-500
                      transition-all duration-200
                      flex items-center gap-2
                    "
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear History
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No QR codes generated yet
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="
                        flex items-center justify-between
                        p-4 rounded-lg
                        bg-white/50 dark:bg-gray-800/50
                        border border-gray-200 dark:border-gray-700
                        transition-all duration-200
                        hover:shadow-lg hover:shadow-purple-500/10
                      "
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {item.url}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => regenerateFromHistory(item)}
                        className="
                          ml-4 p-2 rounded-lg
                          text-purple-600 dark:text-purple-400
                          hover:bg-purple-50 dark:hover:bg-purple-900/20
                          focus:outline-none focus:ring-2 focus:ring-purple-500
                          transition-all duration-200
                        "
                      >
                        <RefreshCcw className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    QR Code Size
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    step="50"
                    value={settings.size}
                    onChange={(e) => setSettings(s => ({ ...s, size: Number(e.target.value) }))}
                    className="
                      w-full h-2 rounded-lg
                      bg-gray-200 dark:bg-gray-700
                      appearance-none cursor-pointer
                      accent-purple-600
                    "
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {settings.size}px x {settings.size}px
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Error Correction Level
                  </label>
                  <select
                    value={settings.errorCorrectionLevel}
                    onChange={(e) => setSettings(s => ({ ...s, errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H' }))}
                    className="
                      w-full px-3 py-2
                      bg-white/80 dark:bg-gray-800/80
                      border border-gray-300 dark:border-gray-600
                      rounded-lg
                      text-gray-900 dark:text-gray-100
                      focus:outline-none focus:ring-2 focus:ring-purple-500
                      transition-all duration-200
                    "
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    QR Code Color
                  </label>
                  <input
                    type="color"
                    value={settings.color}
                    onChange={(e) => setSettings(s => ({ ...s, color: e.target.value }))}
                    className="
                      w-full h-10
                      rounded-lg
                      bg-white/80 dark:bg-gray-800/80
                      border border-gray-300 dark:border-gray-600
                      cursor-pointer
                    "
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={settings.backgroundColor}
                    onChange={(e) => setSettings(s => ({ ...s, backgroundColor: e.target.value }))}
                    className="
                      w-full h-10
                      rounded-lg
                      bg-white/80 dark:bg-gray-800/80
                      border border-gray-300 dark:border-gray-600
                      cursor-pointer
                    "
                  />  
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

