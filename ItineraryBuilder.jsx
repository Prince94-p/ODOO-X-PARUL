import React, { useState } from 'react';

const ItineraryBuilder = () => {
  const [sections, setSections] = useState([
    { id: 1, title: 'Arrival & Check-in', startDate: '', endDate: '', budget: '' },
    { id: 2, title: 'City Exploration', startDate: '', endDate: '', budget: '' },
  ]);

  const addSection = () => {
    const newId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 1;
    setSections([...sections, { id: newId, title: `New Stop`, startDate: '', endDate: '', budget: '' }]);
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setSections(sections.map(sec => sec.id === id ? { ...sec, [field]: value } : sec));
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 pb-20 relative animate-fade-in-up">
      
      {/* Optimized Background (Removed heavy GPU blurs to fix calendar lag) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gray-50">
        <img src="https://picsum.photos/1920/1080?random=100" className="w-full h-full object-cover opacity-10" alt="World Map Background" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90"></div>
      </div>

      <div className="relative z-10 flex flex-col font-sans pt-10">
        
        {/* Top Application Title */}
        <div className="max-w-5xl mx-auto w-full px-4 mb-10 text-center">
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-sm font-bold tracking-widest uppercase mb-4 shadow-sm inline-block">
            <i className="ph-fill ph-map-pin-line text-blue-500"></i> Interactive Map
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Multi-City Itinerary Builder</h1>
          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">Design your drag-and-drop timeline. Assign activities, set travel dates, and estimate your global budget.</p>
        </div>

        <div className="max-w-5xl mx-auto w-full px-4 flex-1">
          
          <main className="relative pl-4 md:pl-12">
            {/* Timeline Vertical Line */}
            <div className="absolute left-6 md:left-14 top-6 bottom-10 w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-purple-500 rounded-full opacity-30 hidden md:block"></div>

            {/* Itinerary Section Cards (Semi-Transparent Blocks) */}
            <div className="space-y-8">
              
              {sections.map((section, index) => (
                <div key={section.id} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-12 top-6 w-6 h-6 rounded-full bg-white border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] hidden md:flex items-center justify-center z-10 transition-transform group-hover:scale-125"></div>

                  <div className="bg-white/80 border border-white/60 rounded-[2rem] p-6 shadow-lg shadow-blue-900/5 hover:shadow-xl transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                    
                    {/* Glass Delete Button */}
                    <div 
                      onClick={() => removeSection(section.id)}
                      className="absolute top-6 right-6 w-10 h-10 bg-red-50 text-red-400 hover:text-white hover:bg-red-500 rounded-full flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 shadow-sm hover:shadow-md"
                      title="Remove Stop"
                    >
                      <i className="ph-bold ph-trash text-lg"></i>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-blue-500/30">
                        {index + 1}
                      </div>
                      <input 
                        type="text" 
                        value={section.title}
                        onChange={(e) => handleInputChange(section.id, 'title', e.target.value)}
                        className="text-2xl font-extrabold text-gray-900 bg-transparent border-none focus:ring-0 p-0 hover:bg-white/50 transition-colors rounded-lg px-3 -ml-3 w-3/4 outline-none"
                        placeholder="Enter Stop Name..."
                      />
                    </div>
                    
                    {/* Input Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-0 md:ml-16 mt-6">
                      
                      {/* Start Date Calendar Picker */}
                      <div className="relative group/input">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Arrival Date</label>
                        <div className="absolute bottom-3 left-3 flex items-center pointer-events-none">
                          <i className="ph-bold ph-calendar-check text-blue-500"></i>
                        </div>
                        <input 
                          type="date" 
                          value={section.startDate}
                          onChange={(e) => handleInputChange(section.id, 'startDate', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm group-hover/input:border-blue-300"
                        />
                      </div>

                      {/* End Date Calendar Picker */}
                      <div className="relative group/input">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Departure Date</label>
                        <div className="absolute bottom-3 left-3 flex items-center pointer-events-none">
                          <i className="ph-bold ph-calendar-x text-red-400"></i>
                        </div>
                        <input 
                          type="date" 
                          value={section.endDate}
                          onChange={(e) => handleInputChange(section.id, 'endDate', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm group-hover/input:border-blue-300"
                        />
                      </div>

                      {/* Budget Estimator */}
                      <div className="relative group/input">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Estimated Cost</label>
                        <div className="absolute bottom-3 left-3 flex items-center pointer-events-none">
                          <i className="ph-bold ph-currency-dollar text-green-500"></i>
                        </div>
                        <input 
                          type="text" 
                          placeholder="e.g. $450" 
                          value={section.budget}
                          onChange={(e) => handleInputChange(section.id, 'budget', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm group-hover/input:border-blue-300"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* Call to Action (CTA) with Pulse Animation */}
            <div className="mt-12 flex justify-start md:ml-16">
              <button 
                onClick={addSection}
                className="relative flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl text-sm font-bold shadow-xl hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-900/30 transition-all hover:scale-105 group"
              >
                <div className="absolute inset-0 rounded-2xl border-2 border-gray-900 animate-ping opacity-20"></div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform">
                  <i className="ph-bold ph-plus text-lg"></i>
                </div>
                Add Next Stop
              </button>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;
