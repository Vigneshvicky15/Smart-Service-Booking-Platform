import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Search } from 'lucide-react';

const UserBookings = () => {
  const { bookings, updateBookingStatus, services } = useAppContext();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">My Bookings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage and track your service appointments in real-time.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
        {bookings.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Calendar className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No bookings yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">When you book a service, it will appear here.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {bookings.map((booking) => {
                const service = services.find(s => s.id === booking.serviceId);
                const serviceImage = service ? service.image : 'https://images.unsplash.com/photo-1542039912-88fd78da7752?q=80&w=800&auto=format&fit=crop';
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, height: 0 }}
                    className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all group overflow-hidden"
                  >
                    <div className="flex-shrink-0 w-full sm:w-32 h-32 sm:h-24 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                      <img src={serviceImage} alt={booking.serviceTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 space-y-3 w-full">
                    <div className="flex items-center gap-4 flex-wrap">
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {booking.serviceTitle}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm
                        ${
                          booking.status === 'Completed'
                            ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20'
                            : booking.status === 'Accepted'
                            ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20'
                            : booking.status === 'Cancelled'
                            ? 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20'
                            : 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                        <Calendar size={16} className="text-teal-500" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                        <Clock size={16} className="text-indigo-500" />
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-2 pt-1 lg:pt-0">
                        <MapPin size={16} className="text-gray-400" />
                        {booking.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full lg:w-auto gap-6 mt-2 lg:mt-0 pb-1 lg:pb-0 border-t lg:border-t-0 border-gray-200 dark:border-gray-700 pt-4 lg:pt-0">
                    <div className="font-black text-gray-900 dark:text-white text-3xl tracking-tight">₹{booking.price}</div>
                    {(booking.status === 'Pending' || booking.status === 'Accepted') && (
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                        className="text-white bg-gray-900 dark:bg-red-500 hover:bg-red-600 dark:hover:bg-red-600 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
