import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, DollarSign, Users, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProviderDashboard = () => {
  const { bookings, services } = useAppContext();
  const navigate = useNavigate();

  // Show all bookings and services for demonstration purposes
  const providerServiceIds = services.map(s => s.id);

  const providerBookings = bookings.filter(b => providerServiceIds.includes(b.serviceId));

  const totalEarnings = providerBookings
    .filter(b => b.status === 'Completed')
    .reduce((acc, curr) => acc + curr.price, 0);

  const pendingRequests = providerBookings.filter(b => b.status === 'Pending').length;
  const activeJobs = providerBookings.filter(b => b.status === 'Accepted').length;

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
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 tracking-tight">Provider Overview 🛠️</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Manage your services and track earnings in real-time.</p>
        </div>
        <button 
          onClick={() => navigate('/provider/services')}
          className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 hover:-translate-y-1"
        >
          <Briefcase size={22} />
          Manage Services
        </button>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-6 transition-all group overflow-hidden relative cursor-pointer">
          <div className="bg-emerald-100 dark:bg-emerald-500/10 p-5 rounded-2xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            <DollarSign size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Total Earnings</p>
            <p className="text-4xl font-black text-gray-900 dark:text-white mt-1">₹{totalEarnings}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-6 transition-all group overflow-hidden relative cursor-pointer">
          <div className="bg-blue-100 dark:bg-blue-500/10 p-5 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <Calendar size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Active Jobs</p>
            <p className="text-4xl font-black text-gray-900 dark:text-white mt-1">{activeJobs}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-6 transition-all group overflow-hidden relative cursor-pointer">
          <div className="bg-yellow-100 dark:bg-yellow-500/10 p-5 rounded-2xl text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform">
            <Users size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Pending</p>
            <p className="text-4xl font-black text-gray-900 dark:text-white mt-1">{pendingRequests}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-6 transition-all group overflow-hidden relative cursor-pointer">
          <div className="bg-purple-100 dark:bg-purple-500/10 p-5 rounded-2xl text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
            <Briefcase size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Your Services</p>
            <p className="text-4xl font-black text-gray-900 dark:text-white mt-1">{providerServiceIds.length}</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Recent Requests</h2>
          <button 
            onClick={() => navigate('/provider/bookings')}
            className="text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Manage All
          </button>
        </div>

        {providerBookings.filter(b => b.status === 'Pending').length > 0 ? (
          <div className="space-y-5">
            {providerBookings.filter(b => b.status === 'Pending').slice(0, 3).map(booking => (
              <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800 group hover:shadow-xl hover:-translate-y-1 transition-all gap-4">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xl shadow-sm">
                    {booking.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">{booking.customerName}</h4>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Needs <span className="font-bold text-gray-700 dark:text-gray-300">{booking.serviceTitle}</span> on {booking.date}</p>
                  </div>
                </div>
                <div className="flex items-center border-t sm:border-t-0 border-gray-200 dark:border-gray-700 w-full sm:w-auto pt-4 sm:pt-0 pl-1 sm:pl-0">
                  <span className="font-black text-2xl text-gray-900 dark:text-white tracking-tight">₹{booking.price}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <Users className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700 mb-6" />
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">No pending requests right now.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProviderDashboard;
