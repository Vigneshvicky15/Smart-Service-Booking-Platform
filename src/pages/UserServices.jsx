import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../utils/mockData';
import { Search, MapPin, Grid, List as ListIcon, Star, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserServices = () => {
  const { services, bookService, theme } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  const filteredServices = services.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openBookModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const formatTimeAMPM = (timeStr) => {
    if (!timeStr) return '';
    if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
    const [hours, minutes] = timeStr.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; 
    return `${h.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;

    bookService({
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      price: selectedService.price,
      date: bookingDate,
      time: formatTimeAMPM(bookingTime),
      customerName: 'Buddy',
      address: 'Anna Nagar, Chennai'
    });
    
    setIsModalOpen(false);
    setBookingDate('');
    setBookingTime('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">Explore Services</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Find top-rated professionals near you in India.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-teal-500 transition-shadow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder-gray-400 dark:placeholder-gray-600"
            />
          </div>
          
          <div className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-1 shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-3">
        <Filter className="text-gray-400 dark:text-gray-500 hidden sm:block" size={20} />
        <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-hide py-1 flex-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                selectedCategory === cat 
                ? 'bg-gray-900 dark:bg-teal-500 text-white shadow-lg transform scale-105' 
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid/List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
      >
        <AnimatePresence>
          {filteredServices.map(service => (
            <motion.div 
              variants={itemVariants}
              key={service.id} 
              className={`bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 group flex ${viewMode === 'list' ? 'flex-row items-center h-48' : 'flex-col'}`}
            >
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-56 h-full flex-shrink-0' : 'h-52 w-full'}`}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <span className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gray-800 dark:text-gray-100 shadow-lg flex items-center gap-1.5">
                  <Star className="text-yellow-500 fill-current" size={14} /> {service.rating} ({service.reviews})
                </span>
                
                <span className="absolute bottom-4 left-4 bg-teal-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">
                  {service.category}
                </span>
              </div>
              
              <div className={`p-6 flex-1 flex flex-col justify-between bg-white dark:bg-gray-900 ${viewMode === 'list' ? 'py-5' : ''}`}>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1">{service.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
                  <p className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 gap-1.5 mb-5 bg-gray-50 dark:bg-gray-800/50 w-fit px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800">
                    <MapPin size={14} className="text-teal-500" /> by <span className="text-gray-700 dark:text-gray-200 font-semibold">{service.provider}</span>
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-5 mt-auto">
                  <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">₹{service.price}</span>
                  <button 
                    onClick={() => openBookModal(service)}
                    className="bg-gray-900 dark:bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    Book
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredServices.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
          <Search className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">No services found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
        </motion.div>
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] w-full max-w-lg p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Confirm Booking</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-all">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              
              {selectedService && (
                <div className="mb-8 p-5 bg-teal-50 dark:bg-teal-500/10 rounded-2xl border border-teal-100 dark:border-teal-500/20 flex gap-4 items-center shadow-sm">
                  <div className="h-16 w-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                    <img src={selectedService.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{selectedService.title}</h3>
                    <p className="text-teal-600 dark:text-teal-400 font-black text-xl mt-1">₹{selectedService.price}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleBook} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Date</label>
                  <input 
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Time</label>
                  <input 
                    type="time" 
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium shadow-sm"
                  />
                </div>
                
                <div className="pt-6 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 font-bold transition-all shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-gray-900 dark:bg-teal-500 text-white px-4 py-3.5 rounded-xl hover:bg-teal-600 dark:hover:bg-teal-600 font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    Confirm & Book
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserServices;
