import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

import UserDashboard from './pages/UserDashboard';
import UserServices from './pages/UserServices';
import UserBookings from './pages/UserBookings';

import ProviderDashboard from './pages/ProviderDashboard';
import ProviderServices from './pages/ProviderServices';
import ProviderBookings from './pages/ProviderBookings';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/user" replace />} />
          
          <Route element={<Layout />}>
            {/* User Routes */}
            <Route path="user">
              <Route index element={<UserDashboard />} />
              <Route path="services" element={<UserServices />} />
              <Route path="bookings" element={<UserBookings />} />
            </Route>

            {/* Provider Routes */}
            <Route path="provider">
              <Route index element={<ProviderDashboard />} />
              <Route path="services" element={<ProviderServices />} />
              <Route path="bookings" element={<ProviderBookings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '12px',
          },
        }} 
      />
    </AppProvider>
  );
}

export default App;
