import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const destinations = [
    { id: 1, title: 'Cinque Terre, Italy', rating: '4.9', type: 'Coastal Region', img: 'https://picsum.photos/600/400?random=11' },
    { id: 2, title: 'Paris, France', rating: '4.8', type: 'City Escape', img: 'https://picsum.photos/600/400?random=12' },
    { id: 3, title: 'Kyoto, Japan', rating: '4.9', type: 'Historic Hub', img: 'https://picsum.photos/600/400?random=13' },
    { id: 4, title: 'Dubai, UAE', rating: '4.7', type: 'Luxury Travel', img: 'https://picsum.photos/600/400?random=14' }
  ];

  const [recentTrips, setRecentTrips] = useState([]);

  useEffect(() => {
    const savedTrips = localStorage.getItem('traveloop_trips');
    if (savedTrips) {
      // Get the 2 most recent trips
      const parsed = JSON.parse(savedTrips);
      const mapped = parsed.slice(-2).reverse().map(trip => ({
        id: trip.id,
        title: trip.title,
        dates: trip.dateRange,
        budget: 'Draft',
        budgetClass: 'bg-blue-500/20 text-blue-700',
        img: `https://picsum.photos/600/400?seed=${trip.id}`,
        status: trip.status
      }));
      setRecentTrips(mapped);
    } else {
      const defaultRecent = [
        { id: 1, title: 'Alpine Adventure', dates: 'Oct 12 - Oct 19, 2026', budget: 'Medium Budget', budgetClass: 'bg-blue-500/20 text-blue-700', img: 'https://picsum.photos/600/400?random=21', status: 'Upcoming' },
        { id: 2, title: 'Tropical Getaway', dates: 'Jan 05 - Jan 14, 2026', budget: 'Premium', budgetClass: 'bg-purple-500/20 text-purple-700', img: 'https://picsum.photos/600/400?random=22', status: 'Completed' },
      ];
      setRecentTrips(defaultRecent);
    }
  }, []);

  return (
    <div className="font-sans text-gray-800 pb-20 animate-fade-in-up">
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Extreme Hero Banner Section */}
        <section className="relative w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] mb-12 flex items-center justify-start border border-white/40 group">
          <img src="https://picsum.photos/1600/600?random=30" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110" alt="Hero Background"/>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-start text-left px-12 md:px-20 max-w-4xl">
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-sm font-bold tracking-widest uppercase mb-6 shadow-lg shadow-black/20 flex items-center gap-2">
              <i className="ph-fill ph-sparkle text-yellow-400"></i> Next-Gen Workspace
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-300 mb-6 tracking-tight leading-tight drop-shadow-sm">
              Architect Your <br className="hidden md:block"/> Perfect Journey.
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl font-medium leading-relaxed drop-shadow-md">
              Intelligently plan, budget, and explore global destinations using our extreme-fidelity enterprise engine.
            </p>
            <div className="flex gap-4">
              <Link to="/trip/create" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:scale-[1.05] hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-3 text-lg">
                <i className="ph-bold ph-rocket text-xl"></i> Launch Planner
              </Link>
              <Link to="/discover" className="glass-panel text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-white/20 hover:scale-[1.05] transition-all duration-300 flex items-center gap-3 text-lg">
                <i className="ph-bold ph-compass text-xl"></i> Explore
              </Link>
            </div>
          </div>
        </section>

        {/* Dynamic Widget Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Budget Analytics Widget (Interactive 3D feel) */}
          <div className="lg:col-span-1 glass-card rounded-[2rem] p-8 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl group-hover:bg-purple-400/40 transition-colors duration-500"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-1">Financial Overview</h3>
                <p className="text-sm font-medium text-gray-500">Q4 Travel Expenditure</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-inner">
                <i className="ph-bold ph-chart-pie-slice text-xl"></i>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center py-4">
              {/* Fake 3D Pie Chart UI */}
              <div className="relative w-40 h-40 rounded-full border-[16px] border-gray-100 shadow-[inset_0_10px_20px_rgba(0,0,0,0.05)] flex items-center justify-center mb-6">
                <div className="absolute inset-0 rounded-full border-[16px] border-blue-500 border-r-transparent border-b-transparent transform -rotate-45 hover:rotate-0 transition-transform duration-500"></div>
                <div className="absolute inset-0 rounded-full border-[16px] border-cyan-400 border-l-transparent border-t-transparent transform rotate-45 hover:rotate-90 transition-transform duration-500"></div>
                <div className="text-center z-10">
                  <span className="block text-2xl font-black text-gray-900">$8.4K</span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</span>
                </div>
              </div>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 font-bold text-gray-700"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></span> Flights</span>
                  <span className="font-bold text-gray-900">45%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 font-bold text-gray-700"><span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50"></span> Hotels</span>
                  <span className="font-bold text-gray-900">35%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 font-bold text-gray-700"><span className="w-3 h-3 rounded-full bg-gray-200"></span> Other</span>
                  <span className="font-bold text-gray-900">20%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Trips Carousel (Span 2) */}
          <div className="lg:col-span-2 glass-card rounded-[2rem] p-8 flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-1">Active Workspaces</h3>
                <p className="text-sm font-medium text-gray-500">Your recent itinerary drafts and planned trips.</p>
              </div>
              <Link to="/trips" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                View All <i className="ph-bold ph-arrow-right"></i>
              </Link>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentTrips.length === 0 && (
                <div className="col-span-2 flex flex-col items-center justify-center py-10 text-gray-400">
                  <i className="ph-bold ph-suitcase-rolling text-5xl mb-4 opacity-20"></i>
                  <p className="font-bold">No active workspaces yet.</p>
                  <Link to="/trip/create" className="text-blue-500 hover:underline mt-2">Start planning your first trip!</Link>
                </div>
              )}
              {recentTrips.map(trip => (
                <div key={trip.id} className="relative rounded-2xl overflow-hidden group cursor-pointer border border-white shadow-sm hover:shadow-xl transition-all duration-300">
                  <img src={trip.img} alt={trip.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border border-white/20 ${trip.status === 'Upcoming' ? 'bg-blue-500/80 text-white' : trip.status === 'Ongoing' ? 'bg-green-500/80 text-white' : 'bg-gray-500/80 text-white'}`}>
                      {trip.status}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h4 className="text-xl font-bold text-white mb-1">{trip.title}</h4>
                    <p className="text-sm text-gray-300 font-medium mb-3 flex items-center gap-1.5"><i className="ph-bold ph-calendar-blank text-blue-400"></i> {trip.dates}</p>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to="/trip/view" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-white/30">Open Trip</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Global Discovery Grid */}
        <section className="mb-12 glass-card rounded-[2rem] p-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">Trending Global Destinations</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all"><i className="ph-bold ph-caret-left"></i></button>
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all"><i className="ph-bold ph-caret-right"></i></button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <div key={dest.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
                <div className="h-56 relative overflow-hidden">
                  <img src={dest.img} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-lg transition-colors">
                    <i className="ph-fill ph-heart text-xl"></i>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20">
                    {dest.type}
                  </div>
                </div>
                <div className="p-5 relative">
                  <div className="absolute -top-6 right-5 w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center z-10 group-hover:scale-110 transition-transform">
                    <span className="text-xs font-bold text-yellow-500"><i className="ph-fill ph-star"></i></span>
                    <span className="text-sm font-black text-gray-900">{dest.rating}</span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg mb-2 pt-2">{dest.title}</h3>
                  <button className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors flex items-center gap-1">
                    Explore City <i className="ph-bold ph-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
