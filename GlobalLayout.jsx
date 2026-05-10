import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const GlobalLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const role = localStorage.getItem('userRole') || 'user';
  
  const [profileImg, setProfileImg] = useState(null);

  // Sync avatar with local storage
  useEffect(() => {
    const loadProfile = () => {
      const currentRole = localStorage.getItem('userRole') || 'user';
      try {
        const savedData = localStorage.getItem(`profileData_${currentRole}`);
        if (savedData && savedData !== "undefined") {
          setProfileImg(JSON.parse(savedData).image);
        } else {
          setProfileImg(currentRole === 'admin' ? null : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80');
        }
      } catch (e) {
        console.error("Failed to parse profile data for GlobalLayout", e);
        setProfileImg(currentRole === 'admin' ? null : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80');
      }
    };
    
    loadProfile();
    window.addEventListener('profileUpdated', loadProfile);
    return () => window.removeEventListener('profileUpdated', loadProfile);
  }, []);
  
  const userNavItems = [
    { name: 'Dashboard', path: '/', icon: 'ph-squares-four' },
    { name: 'My Trips', path: '/trips', icon: 'ph-suitcase-rolling' },
    { name: 'Discover', path: '/discover', icon: 'ph-compass' },
    { name: 'Community', path: '/community', icon: 'ph-users' },
    { name: 'Packing', path: '/packing', icon: 'ph-check-square-offset' },
    { name: 'Notes', path: '/notes', icon: 'ph-notebook' },
    { name: 'Invoice', path: '/invoice', icon: 'ph-receipt' },
    { name: 'Settings', path: '/profile', icon: 'ph-gear' }
  ];

  const adminNavItems = [
    { name: 'Admin Panel', path: '/admin', icon: 'ph-shield-check' },
    { name: 'Community', path: '/community', icon: 'ph-users' },
    { name: 'Settings', path: '/profile', icon: 'ph-gear' }
  ];

  const navItems = role === 'admin' ? adminNavItems : userNavItems;

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-[#f8fafc]">
      
      {/* Optimized Static Background (No GPU Lag) */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-blue-50 via-white to-purple-50 z-0"></div>

      <header className="bg-white/80 border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-50 shrink-0 print:hidden shadow-sm">
        <Link to="/" className="flex items-center gap-3 text-xl font-extrabold text-gray-900 hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 ring-2 ring-white">
            <i className="ph-fill ph-paper-plane-tilt"></i>
          </div>
          <span className="tracking-tight">Traveloop</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl mx-8">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ph-bold ph-magnifying-glass text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
            </div>
            <input 
              type="text" 
              placeholder="Global Search..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleLogout} className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-md hover:bg-red-50">
            Logout
          </button>
          
          <Link to="/profile" className="w-10 h-10 rounded-full bg-white overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform shrink-0 flex items-center justify-center text-blue-700 font-bold text-sm ring-1 ring-gray-200">
            {profileImg ? (
              <img src={profileImg} alt="User Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{role === 'admin' ? 'AD' : 'U'}</span>
            )}
          </Link>
        </div>
      </header>

      <div className="flex flex-1 relative z-10 max-w-[1600px] mx-auto w-full">
        
        <aside className="w-64 bg-white border border-gray-200 hidden lg:flex flex-col py-6 shrink-0 sticky top-20 h-[calc(100vh-6rem)] z-40 print:hidden my-4 ml-4 rounded-2xl shadow-sm">
          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <i className={`ph-bold ${item.icon} text-lg transition-transform ${isActive ? 'text-white' : 'text-gray-400'}`}></i>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {role !== 'admin' && (
            <div className="px-4 mt-auto pb-4">
              <Link to="/trip/create" className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 shadow-md shadow-gray-900/10 transition-all hover:-translate-y-0.5">
                <i className="ph-bold ph-plus text-lg"></i> Plan New Trip
              </Link>
            </div>
          )}
        </aside>

        <main className="flex-1 overflow-y-auto w-full relative">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default GlobalLayout;
