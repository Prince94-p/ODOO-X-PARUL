import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Slideshow Logic
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx(prev => (prev + 1) % images.length);
    }, 5000); // Cross-fade every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const isAdminEmail = email.toLowerCase() === 'admin@traveloop.com';
    const isAdminPassword = password === '2709';

    if (isAdminEmail) {
      if (isAdminPassword) {
        localStorage.setItem('userRole', 'admin');
        navigate('/admin');
      } else {
        setError("Invalid password for admin account.");
      }
    } else {
      // Regular user logic
      localStorage.setItem('userRole', 'user');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Background Animated Blobs (Extreme UI) */}
      <div className="fixed top-0 -left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob z-0 pointer-events-none"></div>
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob z-0 pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="fixed -bottom-10 left-1/4 w-[600px] h-[600px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob z-0 pointer-events-none" style={{ animationDelay: '4s' }}></div>

      <div className="glass-card rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.1)] flex flex-col md:flex-row overflow-hidden max-w-5xl w-full border border-white/60 relative z-10 animate-fade-in-up">
        
        {/* Auth Form */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white/40 backdrop-blur-md transition-all duration-500">
          <div className="flex items-center gap-3 text-2xl font-extrabold text-gray-900 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 ring-2 ring-white">
              <i className="ph-fill ph-paper-plane-tilt"></i>
            </div>
            <span className="tracking-tight">Traveloop</span>
          </div>
          
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Workspace'}
          </h2>
          <p className="text-gray-500 mb-8 font-medium">
            {isLogin ? 'Log in to your intelligent travel workspace.' : 'Sign up to start planning incredible journeys.'}
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-bold animate-shake">
              <i className="ph-bold ph-warning-circle text-lg"></i>
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {!isLogin && (
              <div className="animate-fade-in-up">
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="ph-bold ph-user text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-medium text-gray-900" 
                    required={!isLogin} 
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ph-bold ph-envelope-simple text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-medium text-gray-900" 
                  required 
                  placeholder="admin@traveloop.com"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                {isLogin && <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">Forgot?</a>}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ph-bold ph-lock-key text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-medium text-gray-900" 
                  required 
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button type="submit" className="w-full py-3.5 mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:scale-[1.02] hover:shadow-blue-500/50 transition-all duration-300 text-lg">
              {isLogin ? 'Secure Login' : 'Create Account'} <i className={`ph-bold ${isLogin ? 'ph-arrow-right' : 'ph-user-plus'} ml-2 inline-block transition-transform group-hover:translate-x-1`}></i>
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            {isLogin ? (
              <>Don't have an account? <button onClick={() => setIsLogin(false)} className="text-blue-600 font-bold hover:underline">Create workspace</button></>
            ) : (
              <>Already have an account? <button onClick={() => setIsLogin(true)} className="text-blue-600 font-bold hover:underline">Log in</button></>
            )}
          </div>
        </div>
        
        {/* Cover Image Side (Dynamic 8K Crossfade Slideshow) */}
        <div className="hidden md:flex w-1/2 relative overflow-hidden group bg-gray-900">
          
          {/* Images Map */}
          {images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out group-hover:scale-105 ${currentImageIdx === idx ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`} 
              alt={`Travel Destination ${idx + 1}`} 
            />
          ))}

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent flex flex-col justify-end p-14 pointer-events-none z-10">
            <div className="flex gap-2 mb-6">
              {images.map((_, idx) => (
                <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${currentImageIdx === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}></div>
              ))}
            </div>
            <h3 className="text-3xl font-bold text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              Discover the World.
            </h3>
            <p className="text-gray-200 text-lg font-medium translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
              Plan, budget, and experience your dream destinations in one seamless workspace.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
