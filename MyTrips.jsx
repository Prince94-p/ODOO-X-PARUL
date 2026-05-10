import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyTrips = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [trips, setTrips] = useState([]);

  // Load trips from localStorage on mount
  useEffect(() => {
    const savedTrips = localStorage.getItem('traveloop_trips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    } else {
      const defaultTrips = [
        {
          id: 1,
          title: "European Summer Tour",
          dateRange: "Jul 15, 2026 - Aug 02, 2026",
          destinations: 4,
          status: "Ongoing",
        },
        {
          id: 2,
          title: "Bali Tropical Retreat",
          dateRange: "Oct 05, 2026 - Oct 14, 2026",
          destinations: 2,
          status: "Upcoming",
        },
        {
          id: 3,
          title: "New York Business + Leisure",
          dateRange: "Feb 10, 2026 - Feb 15, 2026",
          destinations: 1,
          status: "Completed",
        },
        {
          id: 4,
          title: "Weekend in Paris",
          dateRange: "Dec 22, 2025 - Dec 25, 2025",
          destinations: 1,
          status: "Completed",
        }
      ];
      setTrips(defaultTrips);
      localStorage.setItem('traveloop_trips', JSON.stringify(defaultTrips));
    }
  }, []);

  const handleDeleteTrip = (id) => {
    const updatedTrips = trips.filter(t => t.id !== id);
    setTrips(updatedTrips);
    localStorage.setItem('traveloop_trips', JSON.stringify(updatedTrips));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ongoing":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-500/20 text-green-700 border border-green-500/30 backdrop-blur-sm"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>Ongoing</span>;
      case "Upcoming":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-700 border border-blue-500/30 backdrop-blur-sm"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Upcoming</span>;
      case "Completed":
        return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gray-500/10 text-gray-600 border border-gray-200 backdrop-blur-sm"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>Completed</span>;
      default:
        return null;
    }
  };

  const TripCard = ({ trip }) => (
    <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-4 group cursor-pointer border border-white/50">
      
      {/* Left side: Trip Title, Date, Destinations */}
      <div className="flex-1 relative">
        <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{trip.title}</h3>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
          <span className="flex items-center gap-1.5"><i className="ph-bold ph-calendar-blank text-blue-500"></i> {trip.dateRange}</span>
          <span className="flex items-center gap-1.5"><i className="ph-bold ph-map-pin text-red-500"></i> {trip.destinations} Stops</span>
        </div>
      </div>

      {/* Middle: Status Badge */}
      <div className="md:px-8 flex justify-start md:justify-center">
        {getStatusBadge(trip.status)}
      </div>

      {/* Right side: Action Buttons */}
      <div className="flex items-center gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 opacity-80 group-hover:opacity-100 transition-opacity">
        <Link to="/trip/view" className="p-2.5 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm rounded-xl transition-all" title="View Full Budget & Details">
          <i className="ph-bold ph-eye text-xl"></i>
        </Link>
        <Link to="/trip/build" className="p-2.5 flex items-center justify-center text-gray-400 hover:text-amber-600 hover:bg-amber-50 hover:shadow-sm rounded-xl transition-all" title="Edit Itinerary">
          <i className="ph-bold ph-pencil-simple text-xl"></i>
        </Link>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteTrip(trip.id); }}
          className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:shadow-sm rounded-xl transition-all" title="Delete Trip"
        >
          <i className="ph-bold ph-trash text-xl"></i>
        </button>
      </div>
    </div>
  );

  const filteredTrips = trips.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-sans text-gray-800 pb-20 animate-fade-in-up">
      
      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        
        {/* Page Title */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Workspaces</h1>
            <p className="text-gray-500 font-medium">Manage and edit your travel itineraries.</p>
          </div>
          <Link to="/trip/create" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:scale-[1.05] transition-transform flex items-center gap-2">
            <i className="ph-bold ph-plus"></i> New Trip
          </Link>
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
              placeholder="Search workspaces by name or destination..." 
              className="w-full pl-12 pr-4 py-2.5 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 font-semibold"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 pl-0 md:pl-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-bold text-gray-700 transition-all shadow-sm">
              <i className="ph-bold ph-squares-four text-gray-500"></i> Group by
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-bold text-gray-700 transition-all shadow-sm">
              <i className="ph-bold ph-funnel text-gray-500"></i> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-bold text-gray-700 transition-all shadow-sm">
              <i className="ph-bold ph-sort-ascending text-gray-500"></i> Sort by...
            </button>
          </div>
        </div>

        {/* List Sections */}
        <div className="space-y-12">
          
          {/* Ongoing Section */}
          <section>
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <i className="ph-fill ph-play-circle text-green-500"></i> Ongoing Journeys
            </h2>
            <div className="flex flex-col">
              {filteredTrips.filter(t => t.status === "Ongoing").map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>

          {/* Upcoming Section */}
          <section>
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <i className="ph-fill ph-clock text-blue-500"></i> Upcoming Plans
            </h2>
            <div className="flex flex-col">
              {filteredTrips.filter(t => t.status === "Upcoming").map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>

          {/* Completed Section */}
          <section>
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <i className="ph-fill ph-check-circle text-gray-400"></i> Past Archives
            </h2>
            <div className="flex flex-col">
              {filteredTrips.filter(t => t.status === "Completed").map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>

        </div>
        
      </main>
    </div>
  );
};

export default MyTrips;
