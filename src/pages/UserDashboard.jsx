import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, CheckCircle, PackagePlus, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { bookings, services } = useAppContext();
  const navigate = useNavigate();

  const activeBookings = bookings.filter(b => b.status === 'Pending' || b.status === 'Accepted');
  const completedBookings = bookings.filter(b => b.status === 'Completed');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-500 tracking-tight">Welcome back, Buddy! 👋</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Here is what's happening with your bookings today.</p>
        </div>
        <button 
          onClick={() => navigate('/user/services')}
          className="bg-gray-900 dark:bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 hover:-translate-y-1"
        >
          <PackagePlus size={22} />
          Book a Service
        </button>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-6 transition-all group overflow-hidden relative">
          <div className="bg-teal-100 dark:bg-teal-500/10 p-5 rounded-2xl text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
            <Calendar size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Total Bookings</p>
            <p className="text-4xl font-black text-gray-900 dark:text-white mt-1">{bookings.length}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-6 transition-all group overflow-hidden relative">
          <div className="bg-blue-100 dark:bg-blue-500/10 p-5 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <Clock size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Active Bookings</p>
            <p className="text-4xl font-black text-gray-900 dark:text-white mt-1">{activeBookings.length}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-6 transition-all group overflow-hidden relative">
          <div className="bg-emerald-100 dark:bg-emerald-500/10 p-5 rounded-2xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            <CheckCircle size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Completed</p>
            <p className="text-4xl font-black text-gray-900 dark:text-white mt-1">{completedBookings.length}</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Recent Activity</h2>
          <button 
            onClick={() => navigate('/user/bookings')}
            className="text-white bg-gray-900 dark:bg-gray-800 hover:bg-teal-600 dark:hover:bg-teal-500 px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            View All
          </button>
        </div>

        {activeBookings.length > 0 ? (
          <div className="space-y-5">
            {activeBookings.slice(0, 3).map(booking => {
              const service = services.find(s => s.id === booking.serviceId);
              const serviceImage = service ? service.image : 'https://images.unsplash.com/photo-1542039912-88fd78da7752?q=80&w=800&auto=format&fit=crop';
              
              return (
              <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800 group hover:shadow-xl hover:-translate-y-1 transition-all gap-4">
                <div className="flex items-center gap-5 w-full sm:w-auto">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl shadow-sm group-hover:shadow-md transition-all flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                    <img src={serviceImage} alt={booking.serviceTitle} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors tracking-tight line-clamp-1">{booking.serviceTitle}</h4>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{booking.date} at {booking.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-t sm:border-t-0 border-gray-200 dark:border-gray-700 w-full sm:w-auto pt-4 sm:pt-0">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                    booking.status === 'Accepted' ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20' : 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20'
                  }`}>
                    {booking.status}
                  </span>
                  <span className="font-black text-2xl text-gray-900 dark:text-white tracking-tight">₹{booking.price}</span>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <PackagePlus className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700 mb-6" />
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-6">No active bookings found.</p>
            <button 
              onClick={() => navigate('/user/services')}
              className="px-8 py-3.5 border-2 border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-500 rounded-2xl hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-all font-bold tracking-wide shadow-sm"
            >
              Book Your First Service
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserDashboard;
