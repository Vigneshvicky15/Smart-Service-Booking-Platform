import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Wrench, PackagePlus, Menu, X, UserCircle, Sun, Moon, LogOut, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { role, setRole, theme, toggleTheme } = useAppContext();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Define navigation links based on role
  const navLinks = role === 'user'
    ? [
        { path: '/user', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/user/services', label: 'Book Services', icon: PackagePlus },
        { path: '/user/bookings', label: 'My Bookings', icon: Calendar },
      ]
    : [
        { path: '/provider', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/provider/services', label: 'Manage Services', icon: Wrench },
        { path: '/provider/bookings', label: 'Booking Requests', icon: Calendar },
      ];

  const handleRoleToggle = () => {
    const newRole = role === 'user' ? 'provider' : 'user';
    setRole(newRole);
    navigate(`/${newRole}`);
    closeSidebar();
    setIsProfileOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col z-50 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-2xl md:shadow-none`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-teal-500 to-indigo-500 p-2 rounded-xl shadow-md">
              <Wrench size={24} className="text-white transform -rotate-45" />
            </div>
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-500 tracking-tight">
              ServicePro
            </h1>
          </div>
          <button className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group font-medium ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  }`
                }
              >
                <Icon size={20} className="transition-transform group-hover:scale-110" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium text-center">Current Mode</p>
            <button
              onClick={handleRoleToggle}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 hover:-translate-y-0.5"
            >
              <UserCircle size={18} />
              {role === 'user' ? 'Switch to Provider' : 'Switch to User'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 transition-colors">
          <div className="flex items-center justify-between px-4 sm:px-8 py-3 w-full">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1"
                onClick={toggleSidebar}
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 capitalize hidden sm:block tracking-wide">
                {role} Portal
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
              >
                {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
              </button>

              <div className="relative">
                <div 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="h-10 w-10 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:shadow-lg transition-all transform hover:scale-105 border-2 border-white dark:border-gray-800"
                >
                  {role === 'user' ? 'U' : 'P'}
                </div>
                
                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 text-gray-800 dark:text-gray-200"
                    >
                      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                        <p className="font-semibold">{role === 'user' ? 'Buddy' : 'CleanPros, Chennai'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{role}@servicepro.in</p>
                      </div>
                      <div className="p-2">
                        <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <Settings size={16} className="text-gray-500" /> Settings
                        </button>
                        <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <UserCircle size={16} className="text-gray-500" /> My Profile
                        </button>
                      </div>
                      <div className="p-2 border-t border-gray-100 dark:border-gray-800">
                        <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors font-medium">
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-8 relative">
          <div className="max-w-7xl mx-auto z-0 animate-fade-in pb-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
