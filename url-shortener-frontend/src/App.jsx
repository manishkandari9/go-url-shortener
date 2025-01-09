import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './components/Dashboard';
import { UrlShortener } from './components/UrlShortener';
import Analytics from './Pages/analytics';
import APIDocs from './Pages/api-docs';
import Auth from './Pages/auth';
import BrandedURLs from './Pages/branded-urls';
import BulkShortening from './Pages/bulk-shortening';
import CustomRedirect from './Pages/custom-redirect';
import CustomShortURLs from './Pages/custom-short-urls';
import PasswordProtection from './Pages/password-protection';
import QRCode from './Pages/qr-code';
import URLExpiry from './Pages/url-expiry';
import URLHistory from './Pages/url-history';


import './index.css';

function App() {

  return (
    
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/navabr' element={<Navbar/>}/>
            <Route path="/urlshortener" element={<UrlShortener />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/api-docs" element={<APIDocs />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/branded-urls" element={<BrandedURLs />} />
            <Route path="/bulk-shortening" element={<BulkShortening />} />
            <Route path="/custom-redirect" element={<CustomRedirect />} />
            <Route path="/custom-short-urls" element={<CustomShortURLs />} />
            <Route path="/password-protection" element={<PasswordProtection />} />
            <Route path="/qr-code" element={<QRCode />} />
            <Route path="/url-expiry" element={<URLExpiry />} />
            <Route path="/url-history" element={<URLHistory />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
