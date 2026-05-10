import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const role = localStorage.getItem('userRole') || 'user';
  const storageKey = `profileData_${role}`;
  
  // Set dynamic initial state based on the RBAC role
  const defaultData = role === 'admin' 
    ? {
        name: 'System Administrator',
        email: 'admin@traveloop.com',
        language: 'English',
        image: null
      }
    : {
        name: 'Standard User',
        email: 'user@example.com',
        language: 'English',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
      };

  const loadData = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      // Guard against the literal string "undefined" or null
      if (saved && saved !== "undefined") {
        const parsed = JSON.parse(saved);
        // Merge with defaultData to ensure all properties exist even for legacy saves
        return { ...defaultData, ...parsed };
      }
    } catch (e) {
      console.error("Failed to parse profile data from local storage", e);
    }
    return defaultData;
  };

  const [formData, setFormData] = useState(loadData);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setIsSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(formData));
    setIsSaved(true);
    
    // Notify the GlobalLayout that the profile picture may have changed
    window.dispatchEvent(new Event('profileUpdated'));
    
    // Hide saved message after 3 seconds
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Mock Grid Data for Users Only
  const preplannedTrips = [
    { id: 1, title: 'Summer in Kyoto', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Swiss Alps Retreat', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80' }
  ];

  const previousTrips = [
    { id: 4, title: 'New York Weekend', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80' },
    { id: 5, title: 'Bali Backpacking', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' }
  ];

  const GridCard = ({ trip }) => (
    <div className="glass-card rounded-[2rem] overflow-hidden shadow-lg border border-white/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10"></div>
        <img src={trip.img} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="p-6 flex flex-col flex-1 relative z-20 -mt-6 bg-white/80 backdrop-blur-md rounded-t-[2rem]">
        <h3 className="text-xl font-extrabold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">{trip.title}</h3>
        <div className="mt-auto">
          <Link to="/trip/view" className="w-full py-3 px-4 bg-gray-900 rounded-xl text-sm font-extrabold text-white hover:bg-black transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
            View Trip <i className="ph-bold ph-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col pb-20 animate-fade-in-up">
      
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
        
        {/* Page Title */}
        <div className="mb-10 text-center md:text-left">
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-sm font-bold tracking-widest uppercase mb-4 shadow-sm inline-block">
            <i className="ph-fill ph-gear-six text-blue-500"></i> Settings
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-500 font-medium text-lg">Manage your personal details, preferences, and view your travel history.</p>
        </div>

        {/* User Details Banner (Top Section) */}
        <section className="glass-card rounded-[2.5rem] p-8 md:p-12 mb-10 border border-white/60 shadow-xl shadow-blue-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

          <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
            
            {/* Left: Dynamic Profile Card */}
            <div className="flex flex-col items-center shrink-0 w-full md:w-72 bg-white/40 p-8 rounded-3xl border border-white shadow-sm">
              <div 
                onClick={handleImageClick}
                className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl group cursor-pointer bg-gray-100 flex items-center justify-center mb-6"
              >
                {formData.image ? (
                  <img src={formData.image} alt="Profile" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-5xl font-black text-gray-400">{role === 'admin' ? 'AD' : 'U'}</span>
                )}
                
                <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <i className="ph-fill ph-camera text-white text-3xl mb-1 translate-y-2 group-hover:translate-y-0 transition-transform"></i>
                  <span className="text-white text-xs font-bold uppercase tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform delay-75">Upload Photo</span>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
              
              <h3 className="text-2xl font-black text-gray-900 text-center mb-1 w-full truncate px-2">{formData.name || 'Your Name'}</h3>
              <p className="text-sm font-bold text-gray-500 text-center mb-5 w-full truncate px-2">{formData.email || 'your.email@example.com'}</p>
              
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
                {role === 'admin' ? 'Administrator' : 'Traveler'}
              </span>
            </div>

            {/* Right: Editable Form Area */}
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between border-b-2 border-gray-100/50 pb-4 mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900">Personal Information</h2>
                {isSaved && (
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm animate-fade-in-up">
                    <i className="ph-bold ph-check-circle"></i> Saved
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Name Input */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="ph-bold ph-user text-blue-500 text-lg"></i>
                    </div>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-white focus:border-blue-500 rounded-xl text-sm font-bold text-gray-900 shadow-sm outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="ph-bold ph-envelope-simple text-blue-500 text-lg"></i>
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-white focus:border-blue-500 rounded-xl text-sm font-bold text-gray-900 shadow-sm outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Language Dropdown */}
                <div className="flex flex-col sm:col-span-2 md:col-span-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Language Preference</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="ph-bold ph-globe text-blue-500 text-lg"></i>
                    </div>
                    <select 
                      name="language"
                      value={formData.language || 'English'}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-10 py-3.5 bg-white/50 border-2 border-white focus:border-blue-500 rounded-xl text-sm font-bold text-gray-900 shadow-sm appearance-none outline-none transition-all cursor-pointer"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <i className="ph-bold ph-caret-down text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t-2 border-gray-100/50">
                <button 
                  onClick={handleSave}
                  className="px-8 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-extrabold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                >
                  <i className="ph-bold ph-floppy-disk text-lg"></i> Save Profile
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <div className="flex justify-end mb-12">
          <button className="flex items-center gap-2 px-6 py-3 bg-red-50 border border-red-100 rounded-xl text-sm font-bold text-red-600 shadow-sm hover:bg-red-100 hover:border-red-200 transition-colors">
            <i className="ph-bold ph-warning-circle text-lg"></i>
            Delete Account
          </button>
        </div>

        {/* Trip Grids (Only Show to Regular Users) */}
        {role !== 'admin' && (
          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ph-fill ph-push-pin text-blue-500"></i> Saved Destinations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {preplannedTrips.map(trip => <GridCard key={trip.id} trip={trip} />)}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ph-fill ph-clock-counter-clockwise text-gray-400"></i> Previous Trips
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {previousTrips.map(trip => <GridCard key={trip.id} trip={trip} />)}
              </div>
            </section>
          </div>
        )}
        
      </main>
    </div>
  );
};

export default UserProfile;
