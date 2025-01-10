import React from 'react'
import { useState, type FormEvent, type ButtonHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Copy, Download, Loader2, BarChart2, Link2, CheckCircle2, XCircle, AlertCircle, Calendar, Lock, QrCode, Hash, Tags, Share2, Filter, Search, Table, FileSpreadsheet, Trash2, Eye, EyeOff, Clock, Settings, Plus } from 'lucide-react'

type URLData = {
  original: string
  shortened: string
  alias?: string
  password?: string
  expiresAt?: Date
  tags: string[]
  qrCode?: string
  clicks: number
}

type TabType = 'input' | 'preview' | 'results' | 'analytics' | 'settings'

export default function AdvancedBulkShortening() {
  const [longURLs, setLongURLs] = useState('')
  const [shortURLs, setShortURLs] = useState<URLData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('input')
  const [error, setError] = useState<string | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [urlSettings, setUrlSettings] = useState({
    enablePassword: false,
    enableExpiration: false,
    enableCustomAlias: false,
    password: '',
    expirationDays: 7,
    customAlias: ''
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const urls = longURLs.split('\n').filter(url => url.trim() !== '')
      
      // Validate URLs
      const invalidUrls = urls.filter(url => !isValidUrl(url))
      if (invalidUrls.length > 0) {
        throw new Error(`Invalid URLs detected: ${invalidUrls.join(', ')}`)
      }

      // Simulate API call with advanced features
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const shortened = urls.map(url => ({
        original: url,
        shortened: urlSettings.enableCustomAlias && urlSettings.customAlias
          ? `http://localhost:8080/${urlSettings.customAlias}-${Math.random().toString(36).substr(2, 4)}`
          : `http://localhost:8080/${Math.random().toString(36).substr(2, 6)}`,
        password: urlSettings.enablePassword ? urlSettings.password : undefined,
        expiresAt: urlSettings.enableExpiration 
          ? new Date(Date.now() + urlSettings.expirationDays * 24 * 60 * 60 * 1000)
          : undefined,
        tags: [],
        clicks: 0,
        qrCode: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#000"/></svg>')}`
      }))
      
      setShortURLs(shortened)
      setActiveTab('results')
      showToast('Success', 'URLs shortened successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to shorten URLs')
      showToast('Error', err instanceof Error ? err.message : 'Failed to shorten URLs', true)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setLongURLs(text)
      showToast('Success', 'Content pasted from clipboard!')
    } catch (err) {
      showToast('Error', 'Failed to paste from clipboard', true)
    }
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
      showToast('Copied', 'URL copied to clipboard!')
    } catch (err) {
      showToast('Error', 'Failed to copy to clipboard', true)
    }
  }

  const exportURLs = (format: 'csv' | 'json' | 'txt') => {
    let content: string
    let mimeType: string
    let extension: string

    switch (format) {
      case 'json':
        content = JSON.stringify(shortURLs, null, 2)
        mimeType = 'application/json'
        extension = 'json'
        break
      case 'csv':
        content = `Original URL,Shortened URL,Password,Expiration,Tags\n` +
          shortURLs.map(url => 
            `${url.original},${url.shortened},${url.password || ''},${url.expiresAt || ''},${url.tags.join(';')}`
          ).join('\n')
        mimeType = 'text/csv'
        extension = 'csv'
        break
      default:
        content = shortURLs.map(url => url.shortened).join('\n')
        mimeType = 'text/plain'
        extension = 'txt'
    }

    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `shortened-urls.${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const filteredURLs = shortURLs.filter(url => {
    const matchesSearch = url.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         url.shortened.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => url.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4">
      <div className="container mx-auto">
        <GlassCard>
          <div className="mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
              Advanced Bulk URL Shortening
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Shorten multiple URLs at once with advanced features and detailed analytics
            </p>
          </div>

          <div className="mb-6">
            <nav className="flex flex-wrap gap-2">
              <Tab
                active={activeTab === 'input'}
                onClick={() => setActiveTab('input')}
                icon={<Link2 className="w-4 h-4" />}
              >
                Input
              </Tab>
              <Tab
                active={activeTab === 'preview'}
                onClick={() => setActiveTab('preview')}
                disabled={!longURLs.trim()}
                icon={<Eye className="w-4 h-4" />}
              >
                Preview
              </Tab>
              <Tab
                active={activeTab === 'results'}
                onClick={() => setActiveTab('results')}
                disabled={shortURLs.length === 0}
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Results
              </Tab>
              <Tab
                active={activeTab === 'analytics'}
                onClick={() => setActiveTab('analytics')}
                disabled={shortURLs.length === 0}
                icon={<BarChart2 className="w-4 h-4" />}
              >
                Analytics
              </Tab>
              <Tab
                active={activeTab === 'settings'}
                onClick={() => setActiveTab('settings')}
                icon={<Settings className="w-4 h-4" />}
              >
                Settings
              </Tab>
            </nav>
          </div>

          {activeTab === 'input' && (
            <div className="space-y-6">
              <div className="flex gap-4 flex-wrap">
                <Button onClick={handlePasteFromClipboard} variant="outline">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Paste from Clipboard
                </Button>
                <Button
                  onClick={() => setLongURLs('')}
                  variant="outline"
                  disabled={!longURLs}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="urls">Enter your URLs</Label>
                  <Textarea
                    id="urls"
                    placeholder="Enter long URLs (one per line)&#10;Example:&#10;https://example.com/very-long-url-1&#10;https://example.com/very-long-url-2"
                    value={longURLs}
                    onChange={(e) => setLongURLs(e.target.value)}
                    required
                    rows={8}
                  />
                  {error && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button type="submit" disabled={isLoading || !longURLs.trim()}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Shortening URLs...
                      </>
                    ) : (
                      <>
                        <Link2 className="w-4 h-4 mr-2" />
                        Shorten URLs
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Advanced Options
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">URL Settings</h3>
                  
                  <div className="space-y-4">
                    <ToggleOption
                      icon={<Lock className="w-4 h-4" />}
                      label="Password Protection"
                      enabled={urlSettings.enablePassword}
                      onToggle={() => setUrlSettings(s => ({ ...s, enablePassword: !s.enablePassword }))}
                    >
                      {urlSettings.enablePassword && (
                        <div className="mt-2">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            value={urlSettings.password}
                            onChange={e => setUrlSettings(s => ({ ...s, password: e.target.value }))}
                            className="input-field"
                          />
                        </div>
                      )}
                    </ToggleOption>

                    <ToggleOption
                      icon={<Clock className="w-4 h-4" />}
                      label="URL Expiration"
                      enabled={urlSettings.enableExpiration}
                      onToggle={() => setUrlSettings(s => ({ ...s, enableExpiration: !s.enableExpiration }))}
                    >
                      {urlSettings.enableExpiration && (
                        <div className="mt-2">
                          <input
                            type="number"
                            min="1"
                            max="365"
                            placeholder="Days until expiration"
                            value={urlSettings.expirationDays}
                            onChange={e => setUrlSettings(s => ({ ...s, expirationDays: parseInt(e.target.value) }))}
                            className="input-field"
                          />
                        </div>
                      )}
                    </ToggleOption>

                    <ToggleOption
                      icon={<Hash className="w-4 h-4" />}
                      label="Custom Alias"
                      enabled={urlSettings.enableCustomAlias}
                      onToggle={() => setUrlSettings(s => ({ ...s, enableCustomAlias: !s.enableCustomAlias }))}
                    >
                      {urlSettings.enableCustomAlias && (
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Enter custom alias prefix"
                            value={urlSettings.customAlias}
                            onChange={e => setUrlSettings(s => ({ ...s, customAlias: e.target.value }))}
                            className="input-field"
                          />
                        </div>
                      )}
                    </ToggleOption>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Features</h3>
                  <div className="space-y-2">
                    <FeatureCard
                      icon={<QrCode className="w-6 h-6" />}
                      title="QR Codes"
                      description="Automatically generate QR codes for each shortened URL"
                    />
                    <FeatureCard
                      icon={<Share2 className="w-6 h-6" />}
                      title="Social Sharing"
                      description="Easy sharing to social media platforms"
                    />
                    <FeatureCard
                      icon={<Tags className="w-6 h-6" />}
                      title="URL Tags"
                      description="Organize URLs with custom tags and categories"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'results' && shortURLs.length > 0 && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="flex-1 min-w-[200px]">
                  <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search URLs..."
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => exportURLs('csv')} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button onClick={() => exportURLs('json')} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredURLs.map((url, index) => (
                  <URLCard
                    key={index}
                    url={url}
                    onCopy={() => copyToClipboard(url.shortened, index)}
                    copied={copiedIndex === index}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && shortURLs.length > 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  title="Total URLs"
                  value={shortURLs.length}
                  icon={<Link2 className="w-6 h-6" />}
                />
                <StatCard
                  title="Total Clicks"
                  value={shortURLs.reduce((acc, url) => acc + url.clicks, 0)}
                  icon={<BarChart2 className="w-6 h-6" />}
                />
                <StatCard
                  title="Active URLs"
                  value={shortURLs.filter(url => !url.expiresAt || url.expiresAt > new Date()).length}
                  icon={<CheckCircle2 className="w-6 h-6" />}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Clicks Over Time">
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart placeholder
                  </div>
                </ChartCard>

                <ChartCard title="Top Performing URLs">
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart placeholder
                  </div>
                </ChartCard>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}

// Custom Components
const Button = ({ 
  children, 
  className = '', 
  variant = 'default',
  disabled = false,
  ...props 
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' }) => (
  <button
    className={`
      px-4 py-2 rounded-lg font-medium
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-200
      flex items-center justify-center
      backdrop-blur-sm
      ${variant === 'default' ? `
        bg-gradient-to-r from-purple-600 to-indigo-600
        hover:from-purple-700 hover:to-indigo-700
        text-white
        shadow-lg shadow-purple-500/25
        hover:shadow-purple-500/40
        dark:from-purple-500 dark:to-indigo-500
        dark:hover:from-purple-600 dark:hover:to-indigo-600
      ` : `
        border border-gray-300 dark:border-gray-600
        hover:bg-gray-50 dark:hover:bg-gray-800
        text-gray-700 dark:text-gray-300
        hover:border-purple-500 dark:hover:border-purple-400
      `}
      ${className}
    `}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)

const Textarea = ({ 
  className = '', 
  ...props 
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={`
      w-full px-4 py-3
      border border-gray-300 dark:border-gray-600
      rounded-lg
      bg-white/80 dark:bg-gray-800/80
      backdrop-blur-sm
      text-gray-900 dark:text-gray-100
      placeholder-gray-500 dark:placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-purple-500
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-200
      hover:border-purple-500 dark:hover:border-purple-400
      ${className}
    `}
    {...props}
  />
)

const Label = ({ 
  children,
  className = '',
  ...props 
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label 
    className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${className}`}
    {...props}
  >
    {children}
  </label>
)

const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <div className="
    backdrop-blur-xl bg-white/80 dark:bg-gray-800/80
    shadow-2xl shadow-purple-500/10
    rounded-2xl p-6 max-w-5xl mx-auto
    border border-gray-200 dark:border-gray-700
    transition-all duration-300
    hover:shadow-purple-500/20
  ">
    {children}
  </div>
)

const Tab = ({ 
  children, 
  active = false, 
  disabled = false,
  icon,
  onClick 
}: { 
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  onClick?: () => void
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-4 py-2 rounded-lg font-medium text-sm
      flex items-center gap-2
      transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      ${active ? `
        bg-gradient-to-r from-purple-100 to-indigo-100
        dark:from-purple-900/50 dark:to-indigo-900/50
        text-purple-900 dark:text-purple-100
        shadow-lg shadow-purple-500/10
      ` : `
        text-gray-600 dark:text-gray-400
        hover:bg-gray-100 dark:hover:bg-gray-700
      `}
    `}
  >
    {icon}
    {children}
  </button>
)

const StatCard = ({ 
  title, 
  value, 
  icon 
}: { 
  title: string
  value: string | number
  icon: React.ReactNode 
}) => (
  <div className="
    bg-white/50 dark:bg-gray-800/50
    backdrop-blur-sm
    rounded-lg p-4
    border border-gray-200 dark:border-gray-700
    transition-all duration-300
    hover:shadow-lg hover:shadow-purple-500/10
  ">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 rounded-lg text-purple-600 dark:text-purple-400">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  </div>
)

const URLCard = ({
  url,
  onCopy,
  copied
}: {
  url: URLData
  onCopy: () => void
  copied: boolean
}) => (
  <div className="
    bg-white/50 dark:bg-gray-800/50
    backdrop-blur-sm
    rounded-lg p-4
    border border-gray-200 dark:border-gray-700
    transition-all duration-300
    hover:shadow-lg hover:shadow-purple-500/10
  ">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{url.original}</p>
        <a
          href={url.shortened}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 dark:text-purple-400 hover:underline font-medium truncate block"
        >
          {url.shortened}
        </a>
        {url.expiresAt && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Expires: {url.expiresAt.toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={onCopy}
          variant="outline"
          className="!px-3"
        >
          {copied ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
        <Button
          variant="outline"
          className="!px-3"
          onClick={() => window.open(url.qrCode)}
        >
          <QrCode className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="!px-3"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
)

const SearchBar = ({
  value,
  onChange,
  placeholder
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full pl-10 pr-4 py-2
        border border-gray-300 dark:border-gray-600
        rounded-lg
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-sm
        text-gray-900 dark:text-gray-100
        placeholder-gray-500 dark:placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-purple-500
        transition-all duration-200
      "
    />
  </div>
)

const ChartCard = ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="
    bg-white/50 dark:bg-gray-800/50
    backdrop-blur-sm
    rounded-lg
    border border-gray-200 dark:border-gray-700
    overflow-hidden
    transition-all duration-300
    hover:shadow-lg hover:shadow-purple-500/10
  ">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
)

const ToggleOption = ({
  icon,
  label,
  enabled,
  onToggle,
  children
}: {
  icon: React.ReactNode
  label: string
  enabled: boolean
  onToggle: () => void
  children?: React.ReactNode
}) => (
  <div className="space-y-2">
    <button
      onClick={onToggle}
      className={`
        w-full px-4 py-3 rounded-lg
        flex items-center justify-between
        transition-all duration-200
        ${enabled ? 
          'bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-100' : 
          'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
        }
      `}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <div className={`
        w-10 h-6 rounded-full p-1
        transition-all duration-200
        ${enabled ? 'bg-purple-600 dark:bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}
      `}>
        <div className={`
          w-4 h-4 rounded-full bg-white
          transition-all duration-200
          ${enabled ? 'translate-x-4' : 'translate-x-0'}
        `} />
      </div>
    </button>
    {children}
  </div>
)

const FeatureCard = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) => (
  <div className="
    flex items-start gap-4 p-4
    bg-white/50 dark:bg-gray-800/50
    backdrop-blur-sm rounded-lg
    border border-gray-200 dark:border-gray-700
    transition-all duration-300
    hover:shadow-lg hover:shadow-purple-500/10
  ">
    <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 rounded-lg text-purple-600 dark:text-purple-400">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-gray-900 dark:text-gray-100">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
)

function showToast(title: string, message: string, isError = false) {
  console.log(`${isError ? '❌' : '✅'} ${title}: ${message}`)
}

function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

