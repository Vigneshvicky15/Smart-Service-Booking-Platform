import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_SERVICES, INITIAL_BOOKINGS } from '../utils/mockData';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState('user'); // 'user' or 'provider'
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [theme, setTheme] = useState('light');

  // Load Initial Data and Theme
  useEffect(() => {
    const localServices = localStorage.getItem('servicePro_services');
    const localBookings = localStorage.getItem('servicePro_bookings');
    const localTheme = localStorage.getItem('servicePro_theme') || 'light';

    if (localServices) {
      setServices(JSON.parse(localServices));
    } else {
      setServices(INITIAL_SERVICES);
      localStorage.setItem('servicePro_services', JSON.stringify(INITIAL_SERVICES));
    }

    if (localBookings) {
      setBookings(JSON.parse(localBookings));
    } else {
      setBookings(INITIAL_BOOKINGS);
      localStorage.setItem('servicePro_bookings', JSON.stringify(INITIAL_BOOKINGS));
    }
    
    setTheme(localTheme);
  }, []);

  // Theme Sync
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('servicePro_theme', theme);
  }, [theme]);

  // Persist Data
  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem('servicePro_services', JSON.stringify(services));
    }
  }, [services]);

  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem('servicePro_bookings', JSON.stringify(bookings));
    }
  }, [bookings]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    toast.success(`${theme === 'light' ? 'Dark' : 'Light'} mode enabled`, { id: 'theme-toast' });
  };

  const addService = (service) => {
    const newService = { ...service, id: `s${Date.now()}`, rating: 0, reviews: 0 };
    setServices((prev) => [newService, ...prev]);
    toast.success('Service added successfully!');
  };

  const editService = (updatedService) => {
    setServices((prev) => prev.map((s) => (s.id === updatedService.id ? updatedService : s)));
    toast.success('Service updated successfully!');
  };

  const removeService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success('Service removed successfully!');
  };

  const bookService = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: `b${Date.now()}`,
      status: 'Pending',
    };
    setBookings((prev) => [newBooking, ...prev]);
    toast.success('Service booked successfully! Waiting for provider acceptance.');
  };

  const updateBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    if (status === 'Cancelled') {
      toast.success('Booking cancelled.');
    } else {
      toast.success(`Booking marked as ${status}.`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        services,
        bookings,
        theme,
        toggleTheme,
        addService,
        editService,
        removeService,
        bookService,
        updateBookingStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
