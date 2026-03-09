import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

const ProviderBookings = () => {
  const { bookings, updateBookingStatus, services } = useAppContext();

  // Update: Show all incoming bookings to provider for demonstration
  const providerServiceIds = services.map(s => s.id);

  const incomingBookings = bookings.filter(b => providerServiceIds.includes(b.serviceId));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">Incoming Requests</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Manage incoming and active jobs from customers.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
        {incomingBookings.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Calendar className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No requests yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">New booking requests will pop up here.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {incomingBookings.map((booking) => {
                const service = services.find(s => s.id === booking.serviceId);
                const serviceImage = service ? service.image : 'https://images.unsplash.com/photo-1542039912-88fd78da7752?q=80&w=800&auto=format&fit=crop';
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, height: 0 }}
                    className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all group overflow-hidden"
                  >
                    <div className="flex-shrink-0 w-full xl:w-32 h-32 xl:h-24 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                      <img src={serviceImage} alt={booking.serviceTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 space-y-3 w-full">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-gray-900 dark:text-white text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
                        {booking.serviceTitle}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm
                        ${
                          booking.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' :
                          booking.status === 'Accepted' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20' :
                          booking.status === 'Cancelled' ? 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20' :
                          'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Customer: <span className="font-medium">{booking.customerName}</span></p>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 font-medium pb-2 xl:pb-0">
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"><Calendar size={16} className="text-indigo-500"/> {booking.date}</div>
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"><Clock size={16} className="text-teal-500"/> {booking.time}</div>
                      <div className="flex items-center gap-2 pt-1 xl:pt-0"><MapPin size={16} className="text-gray-400"/> {booking.address}</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-end justify-between w-full xl:w-auto gap-4 mt-2 xl:mt-0 pt-4 xl:pt-0 border-t border-gray-200 dark:border-gray-700 xl:border-t-0">
                    <div className="font-black text-gray-900 dark:text-white text-3xl tracking-tight">₹{booking.price}</div>
                    
                    {booking.status === 'Pending' && (
                      <div className="flex gap-3 w-full sm:w-auto">
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                          className="flex-1 sm:flex-none text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-100 dark:border-red-500/20 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm flex justify-center items-center gap-2"
                        >
                          <XCircle size={18} /> Reject
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'Accepted')}
                          className="flex-1 sm:flex-none bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex justify-center items-center gap-2"
                        >
                          <CheckCircle size={18} /> Accept
                        </button>
                      </div>
                    )}
                    
                    {booking.status === 'Accepted' && (
                      <button 
                        onClick={() => updateBookingStatus(booking.id, 'Completed')}
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex justify-center items-center gap-2"
                      >
                        <CheckCircle size={18} /> Mark as Done
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

export default ProviderBookings;
