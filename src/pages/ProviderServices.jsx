import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../utils/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ProviderServices = () => {
  const { services, addService, editService, removeService } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  // Show all services for demonstration purposes
  const providerServices = services;

  const [formData, setFormData] = useState({
    title: '',
    category: 'Cleaning',
    price: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1542039912-88fd78da7752?w=800&auto=format&fit=crop&q=60'
  });

  const openAddModal = () => {
    setEditingService(null);
    setFormData({ title: '', category: 'Cleaning', price: '', description: '', image: 'https://images.unsplash.com/photo-1542039912-88fd78da7752?w=800&auto=format&fit=crop&q=60' });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData(service);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      editService({ ...editingService, ...formData });
    } else {
      addService({ ...formData, provider: 'Current Provider' });
    }
    setIsModalOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">Manage Offerings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Add, edit or update your service catalog to attract customers.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 hover:-translate-y-1"
        >
          <Plus size={22} />
          <span>New Service</span>
        </button>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {providerServices.map(service => (
            <motion.div 
              variants={itemVariants}
              key={service.id}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all group overflow-hidden relative flex flex-col"
            >
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-lg transition-transform relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm text-indigo-700 dark:text-indigo-400 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-lg uppercase tracking-wider">
                  {service.category}
                </span>
              </div>
              
              <div className="flex justify-between items-start mb-3 gap-4">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight line-clamp-2">{service.title}</h3>
                <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-3.5 py-1.5 rounded-[0.85rem] font-black text-lg shadow-sm border border-indigo-100 dark:border-indigo-500/20 whitespace-nowrap">₹{service.price}</span>
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed font-medium">{service.description}</p>
              
              <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 space-x-4">
                <button 
                  onClick={() => openEditModal(service)}
                  className="flex-1 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Edit2 size={18} /> Edit
                </button>
                <button 
                  onClick={() => removeService(service.id)}
                  className="flex-1 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-100 dark:border-red-500/20 px-4 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Trash2 size={18} /> Remove
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Adding/Editing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white tracking-tight">{editingService ? 'Edit Service' : 'Create New Service'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Service Title</label>
                <input 
                  required 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm font-medium"
                />
              </div>
              
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm font-medium appearance-none"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Price (₹)</label>
                  <input 
                    required 
                    type="number" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm font-medium"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea 
                  required 
                  rows="4" 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Cover Image URL</label>
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm font-medium"
                />
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 font-bold transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-4 rounded-xl hover:bg-indigo-700 font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  {editingService ? 'Save Changes' : 'Create Offering'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProviderServices;
