import React, { useState } from 'react';

const ActivitySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState('default');
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [addedActivities, setAddedActivities] = useState([]); // Added state to track saved activities

  const activities = [
    {
      id: 1,
      title: "Alpine Paragliding Experience",
      description: "Soar above the Swiss Alps with breathtaking views of the snow-capped mountains and crystal clear lakes.",
      duration: "2 hours",
      cost: "$150",
      image: "https://picsum.photos/seed/alpine_para/800/600",
      rating: 4.9
    },
    {
      id: 2,
      title: "Coastal Cliff Gliding",
      description: "Take off from majestic sea cliffs and enjoy a serene tandem flight over the turquoise ocean coastline.",
      duration: "1.5 hours",
      cost: "$120",
      image: "https://picsum.photos/seed/cliff_glide/800/600",
      rating: 4.7
    },
    {
      id: 3,
      title: "Sunrise Valley Paraglide",
      description: "Experience the ultimate tranquility of an early morning flight over the lush green valleys.",
      duration: "3 hours",
      cost: "$180",
      image: "https://picsum.photos/seed/sunrise_glide/800/600",
      rating: 5.0
    },
    {
      id: 4,
      title: "Urban Skyline Tandem Jump",
      description: "A thrilling adventure allowing you to view the sprawling city skyline from thousands of feet in the air.",
      duration: "1 hour",
      cost: "$95",
      image: "https://picsum.photos/seed/urban_jump/800/600",
      rating: 4.5
    },
    {
      id: 5,
      title: "Advanced Thermal Flying Course",
      description: "For experienced flyers looking to ride thermal currents higher and longer. Certification included.",
      duration: "Full Day",
      cost: "$350",
      image: "https://picsum.photos/seed/thermal_fly/800/600",
      rating: 4.8
    }
  ];

  const handleSortToggle = () => {
    if (sortBy === 'default') setSortBy('price-asc');
    else if (sortBy === 'price-asc') setSortBy('price-desc');
    else setSortBy('default');
  };

  const handleAddToTrip = (id) => {
    if (!addedActivities.includes(id)) {
      setAddedActivities([...addedActivities, id]);
    } else {
      // Optional: allow removing it
      setAddedActivities(addedActivities.filter(a => a !== id));
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 pb-20 animate-fade-in-up">
      
      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 py-10">
        
        {/* Page Title */}
        <div className="mb-10 text-center md:text-left">
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 text-sm font-bold tracking-widest uppercase mb-4 shadow-sm inline-block">
            <i className="ph-fill ph-compass text-cyan-500"></i> Global Experiences
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Discover Activities</h1>
          <p className="text-gray-500 font-medium text-lg">Find and add breathtaking experiences to your workspace.</p>
        </div>

        {/* Control Bar (Glassmorphism Search & Filter) */}
        <div className="glass-panel p-3 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 shadow-sm border border-white/60">
          
          {/* Search Input */}
          <div className="relative w-full md:flex-1 pl-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ph-bold ph-magnifying-glass text-blue-600 text-lg"></i>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by destination or activity..." 
              className="w-full pl-12 pr-10 py-2.5 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 font-semibold"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
              >
                <i className="ph-bold ph-x-circle text-lg"></i>
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 pl-0 md:pl-3">
            
            <div className="relative">
              <button onClick={() => { setShowGroupMenu(!showGroupMenu); setShowFilterMenu(false); }} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${showGroupMenu ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white/60 hover:bg-white border-white/40 text-gray-700'}`}>
                <i className={`ph-bold ph-squares-four ${showGroupMenu ? 'text-blue-600' : 'text-gray-500'}`}></i> Group by
              </button>
              {showGroupMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 animate-fade-in-up">
                  <div className="px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer flex justify-between items-center transition-colors">By Duration <i className="ph-bold ph-clock text-blue-500"></i></div>
                  <div className="px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer flex justify-between items-center transition-colors">By Region <i className="ph-bold ph-map-pin text-red-400"></i></div>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => { setShowFilterMenu(!showFilterMenu); setShowGroupMenu(false); }} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${showFilterMenu ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white/60 hover:bg-white border-white/40 text-gray-700'}`}>
                <i className={`ph-bold ph-funnel ${showFilterMenu ? 'text-blue-600' : 'text-gray-500'}`}></i> Filter
              </button>
              {showFilterMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 animate-fade-in-up">
                  <div className="px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer flex items-center gap-3 transition-colors"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> Under $100</div>
                  <div className="px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer flex items-center gap-3 transition-colors"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" /> Full Day Only</div>
                </div>
              )}
            </div>

            <button onClick={handleSortToggle} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${sortBy !== 'default' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white/60 hover:bg-white border-white/40 text-gray-700'}`}>
              <i className={`ph-bold ${sortBy === 'price-desc' ? 'ph-sort-descending' : 'ph-sort-ascending'} ${sortBy !== 'default' ? 'text-blue-600' : 'text-gray-500'}`}></i> 
              {sortBy === 'default' ? 'Sort by...' : sortBy === 'price-asc' ? 'Price: Low to High' : 'Price: High to Low'}
            </button>
            
          </div>
        </div>

        {/* Results Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <i className="ph-fill ph-sparkle text-amber-400"></i> Top Experiences
              <span className="ml-2 text-sm font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {activities.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase())).length}
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {activities
              .filter(activity => 
                activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                activity.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .sort((a, b) => {
                if (sortBy === 'price-asc') return parseInt(a.cost.replace('$', '')) - parseInt(b.cost.replace('$', ''));
                if (sortBy === 'price-desc') return parseInt(b.cost.replace('$', '')) - parseInt(a.cost.replace('$', ''));
                return 0;
              })
              .map((activity) => {
                const isAdded = addedActivities.includes(activity.id);
                return (
                  <div 
                    key={activity.id} 
                    className="glass-card border border-white/60 rounded-[2rem] p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                  >
                    
                    {/* Far Left: High-Res Image */}
                    <div className="w-full md:w-56 h-56 md:h-40 shrink-0 rounded-2xl overflow-hidden relative shadow-md">
                      {activity.image ? (
                        <>
                          <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
                            <i className="ph-fill ph-star text-amber-500"></i> {activity.rating}
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-300">
                          <i className="ph-bold ph-image text-4xl"></i>
                        </div>
                      )}
                    </div>

                    {/* Middle: Title & Description */}
                    <div className="flex-1 w-full">
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{activity.title}</h3>
                      <p className="text-gray-500 leading-relaxed font-medium mb-4">{activity.description}</p>
                      
                      {/* Metadata Tags */}
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-sm font-bold text-blue-700">
                          <i className="ph-bold ph-clock"></i> {activity.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-50 border border-green-100 text-sm font-bold text-green-700">
                          <i className="ph-bold ph-currency-dollar"></i> {activity.cost}
                        </span>
                      </div>
                    </div>

                    {/* Far Right: Interactive CTA Button */}
                    <div className="shrink-0 w-full md:w-auto mt-2 md:mt-0 md:px-4">
                      <button 
                        onClick={() => {
                          handleAddToTrip(activity.id);
                          // Auto-save logic: if added, create a workspace entry
                          if (!addedActivities.includes(activity.id)) {
                            const savedTrips = JSON.parse(localStorage.getItem('traveloop_trips') || '[]');
                            const newTrip = {
                              id: Date.now() + activity.id,
                              title: activity.title,
                              dateRange: "Dates to be set",
                              destinations: 1,
                              status: "Upcoming"
                            };
                            localStorage.setItem('traveloop_trips', JSON.stringify([...savedTrips, newTrip]));
                          }
                        }}
                        className={`w-full md:w-40 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-extrabold shadow-lg transition-all duration-300 ${
                          isAdded 
                            ? 'bg-green-500 text-white shadow-green-500/30 ring-2 ring-green-500 ring-offset-2' 
                            : 'bg-white border-2 border-gray-100 text-gray-900 hover:border-blue-600 hover:text-blue-600 hover:shadow-blue-500/10 hover:-translate-y-0.5'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <i className="ph-bold ph-check text-xl"></i> Saved!
                          </>
                        ) : (
                          <>
                            <i className="ph-bold ph-plus text-xl"></i> Add to Trip
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
            })}
          </div>
        </section>

      </main>
    </div>
  );
};

export default ActivitySearch;
