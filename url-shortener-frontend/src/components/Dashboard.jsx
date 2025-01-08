import React from 'react'
import { BarChart3, Calendar, Code2, Fingerprint, History, Link2, QrCode, Settings, Share2, Shield, Upload, Users } from 'lucide-react'
import { UrlShortener } from './UrlShortener'
import Navbar from './navbar'
import Analytics from '../Pages/analytics'
import APIDocs from '../Pages/api-docs'
import Auth from '../Pages/auth'
import BrandedURLs from '../Pages/branded-urls'
import BulkShortening from '../Pages/bulk-shortening'
import CustomRedirect from '../Pages/custom-redirect'
import CustomShortURLs from '../Pages/custom-short-urls'
import PasswordProtection from '../Pages/password-protection'
import QRCode from '../Pages/qr-code'
import URLExpiry from '../Pages/url-expiry'
import URLHistory from '../Pages/url-history'


const Dashboard = () => {
  const Card = ({ children, className }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  )

  const CardHeader = ({ children }) => (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      {children}
    </div>
  )

  const CardTitle = ({ children, className }) => (
    <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h3>
  )

  const CardDescription = ({ children }) => (
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {children}
    </p>
  )

  const CardContent = ({ children }) => (
    <div className="p-4">
      {children}
    </div>
  )

  const Stat = ({ label, value, change, icon, subtext }) => (
    <div className="space-y-2 rounded-lg bg-gray-100 dark:bg-gray-800 p-4 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
          {subtext && <p className="text-xs text-gray-500 dark:text-gray-500">{subtext}</p>}
        </div>
        {icon && icon}
      </div>
      {change && <p className="text-sm text-gray-500 dark:text-gray-500">{change} from last month</p>}
    </div>
  )

  const StatBar = ({ label, value }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-500 ease-out" 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  ) 

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 mt-12">
        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card className="col-span-full lg:col-span-2">
              <CardContent>
                <UrlShortener />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  Custom Short URLs
                </CardTitle>
                <CardDescription>Create branded and memorable short links</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Stat label="Active Links" value="8,234" change="+12%" />
                  <Stat label="Total Clicks" value="45,678" change="+8%" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  Analytics
                </CardTitle>
                <CardDescription>Track clicks and user engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <StatBar label="Desktop" value={64} />
                  <StatBar label="Mobile" value={28} />
                  <StatBar label="Tablet" value={8} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  URL Expiry
                </CardTitle>
                <CardDescription>Set expiration dates for links</CardDescription>
              </CardHeader>
              <CardContent>
                <Stat label="Links expiring this week" value="156" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  Password Protection
                </CardTitle>
                <CardDescription>Secure your links with passwords</CardDescription>
              </CardHeader>
              <CardContent>
                <Stat label="Protected links active" value="432" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  User Authentication
                </CardTitle>
                <CardDescription>Manage user accounts and access</CardDescription>
              </CardHeader>
              <CardContent>
                <Stat label="Active users" value="1,234" icon={<Users className="h-8 w-8 text-blue-500 dark:text-blue-400 opacity-70" />} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  Bulk Shortening
                </CardTitle>
                <CardDescription>Shorten multiple URLs at once</CardDescription>
              </CardHeader>
              <CardContent>
                <Stat label="Bulk links created" value="5,678" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  QR Codes
                </CardTitle>
                <CardDescription>Generate QR codes for your links</CardDescription>
              </CardHeader>
              <CardContent>
                <Stat label="QR codes generated" value="2,345" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  URL History
                </CardTitle>
                <CardDescription>Track your shortened URLs</CardDescription>
              </CardHeader>
              <CardContent>
                <Stat label="Total URLs tracked" value="12,456" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-2 w-5 text-blue-500 dark:text-blue-400" />
                  <BrandedURLs/>
                </CardTitle>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  Redirect Settings
                </CardTitle>
                <CardDescription>Configure redirect behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <Stat label="Redirect types available" value="301/302" />
              </CardContent>
            </Card>

            <Card className="col-span-full lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  API Access
                </CardTitle>
                <CardDescription>Integrate URL shortening into your applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Stat label="API Requests" value="1.2M" subtext="This month" />
                  <Stat label="Active API Keys" value="156" subtext="Across all users" />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-full lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  password
                </CardTitle>
                <CardDescription>Password </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <CustomRedirect/>
                 
                  {/* <Stat label="API Requests" value="1.2M" subtext="This month" />
                  <Stat label="Active API Keys" value="156" subtext="Across all users" /> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard

