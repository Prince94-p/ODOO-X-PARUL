import React, { useState } from 'react';

const TripNotes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  
  // Modals state
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: null, title: "", body: "", type: "Day", timestamp: "" });

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Hotel check-in details - Rome stop",
      body: "Check in after 2pm, room 302, breakfast included (7-10am). Remember to ask the concierge about the Colosseum underground tour tickets.",
      timestamp: "Day 3: June 14 2026",
      type: "Stop"
    },
    {
      id: 2,
      title: "Train transfer at Termini Station",
      body: "Platform usually announced only 15 minutes before departure. Keep luggage close and grab a quick espresso at the cafe near platform 24.",
      timestamp: "Day 5: June 16 2026",
      type: "Stop"
    },
    {
      id: 3,
      title: "Packing reminder for Amalfi Coast",
      body: "Don't forget to pack the waterproof phone pouch and the extra strength sunscreen. The boat tour requires non-slip shoes.",
      timestamp: "Day 7: June 18 2026",
      type: "Day"
    }
  ]);

  // Handlers
  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleOpenEdit = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleOpenAdd = () => {
    setCurrentNote({ id: null, title: "", body: "", type: "Day", timestamp: `Day ${Math.floor(Math.random() * 10) + 1}: ${new Date().toLocaleDateString()}` });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!currentNote.title.trim()) return;

    if (isEditing) {
      setNotes(notes.map(n => n.id === currentNote.id ? currentNote : n));
    } else {
      setNotes([...notes, { ...currentNote, id: Date.now() }]);
    }
    setShowModal(false);
  };

  // Filtering Logic
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || (activeTab === "by Day" && note.type === "Day") || (activeTab === "by Stop" && note.type === "Stop");
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen font-sans text-gray-800 pb-20 animate-fade-in-up">
      
      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto w-full px-4 py-10">
        
        {/* Page Title */}
        <div className="mb-10 text-center md:text-left">
          <span className="px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 text-sm font-bold tracking-widest uppercase mb-4 shadow-sm inline-block">
            <i className="ph-fill ph-notebook text-yellow-500"></i> Trip Journal
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Trip Notes</h1>
          <p className="text-gray-500 font-medium text-lg">Keep track of important details, reminders, and memories.</p>
        </div>

        {/* Control Bar (Glassmorphism Search & Filter) */}
        <div className="glass-panel p-3 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 shadow-sm border border-white/60">
          <div className="relative w-full md:flex-1 pl-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ph-bold ph-magnifying-glass text-yellow-600 text-lg"></i>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..." 
              className="w-full pl-12 pr-10 py-2.5 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 font-semibold"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <i className="ph-bold ph-x-circle text-lg"></i>
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 pl-0 md:pl-3">
            <button className="px-4 py-2 bg-white/60 hover:bg-white rounded-xl text-sm font-bold text-gray-700 transition-all shadow-sm">
              <i className="ph-bold ph-squares-four text-gray-500"></i> Group
            </button>
            <button className="px-4 py-2 bg-white/60 hover:bg-white rounded-xl text-sm font-bold text-gray-700 transition-all shadow-sm">
              <i className="ph-bold ph-funnel text-gray-500"></i> Filter
            </button>
          </div>
        </div>

        {/* Header & Context Section */}
        <section className="glass-card rounded-[2.5rem] p-8 shadow-lg shadow-yellow-900/5 mb-8 border border-white/80 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl -ml-10 -mt-10"></div>
          
          <div className="relative z-10 w-full md:w-auto">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Active Itinerary</h2>
            <div className="relative inline-block w-full sm:w-80">
              <select className="w-full pl-5 pr-12 py-3 bg-white/80 border border-white/60 rounded-xl text-lg font-extrabold text-gray-900 shadow-sm appearance-none focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all cursor-pointer">
                <option>Trip: Paris & Rome Adventure</option>
                <option>Trip: Weekend in Tokyo</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <i className="ph-bold ph-caret-down text-gray-500"></i>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleOpenAdd}
            className="w-full md:w-auto relative z-10 flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-extrabold shadow-xl hover:bg-black transition-all hover:-translate-y-1 active:scale-95"
          >
            <i className="ph-bold ph-plus-circle text-xl"></i> Create Note
          </button>
        </section>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 px-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setActiveTab("All")}
            className={`px-6 py-2.5 rounded-full text-sm font-extrabold transition-all shadow-sm whitespace-nowrap ${activeTab === "All" ? "bg-gray-900 text-white" : "bg-white border-2 border-white/60 text-gray-600 hover:border-gray-200"}`}
          >
            All Notes
          </button>
          <button 
            onClick={() => setActiveTab("by Day")}
            className={`px-6 py-2.5 rounded-full text-sm font-extrabold transition-all shadow-sm whitespace-nowrap ${activeTab === "by Day" ? "bg-yellow-500 text-white shadow-yellow-500/30 ring-2 ring-yellow-500 ring-offset-2" : "bg-white border-2 border-white/60 text-gray-600 hover:border-gray-200"}`}
          >
            <i className="ph-bold ph-calendar-blank mr-1"></i> By Day
          </button>
          <button 
            onClick={() => setActiveTab("by Stop")}
            className={`px-6 py-2.5 rounded-full text-sm font-extrabold transition-all shadow-sm whitespace-nowrap ${activeTab === "by Stop" ? "bg-blue-500 text-white shadow-blue-500/30 ring-2 ring-blue-500 ring-offset-2" : "bg-white border-2 border-white/60 text-gray-600 hover:border-gray-200"}`}
          >
            <i className="ph-bold ph-map-pin mr-1"></i> By Stop
          </button>
        </div>

        {/* Notes Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <i className="ph-fill ph-notebook text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">No notes found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div key={note.id} className="glass-card rounded-[2rem] p-6 shadow-md border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col relative overflow-hidden">
                
                {/* Decorative Top Bar */}
                <div className={`absolute top-0 left-0 w-full h-2 ${note.type === 'Day' ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>

                {/* Top Row: Title & Actions */}
                <div className="flex items-start justify-between mb-4 mt-2">
                  <h3 className="text-xl font-extrabold text-gray-900 leading-tight pr-4 group-hover:text-yellow-600 transition-colors">{note.title}</h3>
                  <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenEdit(note)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Edit Note">
                      <i className="ph-bold ph-pencil-simple text-lg"></i>
                    </button>
                    <button onClick={() => handleDelete(note.id)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Delete Note">
                      <i className="ph-bold ph-trash text-lg"></i>
                    </button>
                  </div>
                </div>
                
                {/* Middle: Body */}
                <p className="text-gray-600 mb-6 leading-relaxed flex-1 font-medium text-base">
                  {note.body}
                </p>

                {/* Bottom: Timestamp & Type */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100/50">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/60 backdrop-blur border border-white rounded-lg text-xs font-bold text-gray-500 shadow-sm">
                    <i className="ph-bold ph-clock text-yellow-500"></i> {note.timestamp}
                  </span>
                  <span className={`text-xs font-black uppercase tracking-wider ${note.type === 'Day' ? 'text-yellow-600' : 'text-blue-600'}`}>
                    {note.type}
                  </span>
                </div>
                
              </div>
            ))
          )}
        </section>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
            <div className="glass-card w-full max-w-xl p-8 rounded-[2.5rem] relative z-10 shadow-2xl border border-white animate-fade-in-up">
              <h3 className="text-3xl font-extrabold text-gray-900 mb-6">{isEditing ? 'Edit Note' : 'Create New Note'}</h3>
              <form onSubmit={handleSaveNote} className="space-y-6">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-500 mb-2">Note Title</label>
                    <input 
                      type="text" 
                      value={currentNote.title}
                      onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                      className="w-full px-5 py-4 bg-white/50 border-2 border-gray-100 rounded-2xl focus:border-yellow-500 outline-none font-bold text-gray-900 transition-colors"
                      placeholder="e.g. Flight booking reference"
                      autoFocus
                    />
                  </div>
                  
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-500 mb-2">Category</label>
                    <div className="relative">
                      <select 
                        value={currentNote.type}
                        onChange={(e) => setCurrentNote({...currentNote, type: e.target.value})}
                        className="w-full px-5 py-4 bg-white/50 border-2 border-gray-100 rounded-2xl focus:border-yellow-500 outline-none font-bold text-gray-900 appearance-none transition-colors"
                      >
                        <option value="Day">By Day</option>
                        <option value="Stop">By Stop</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <i className="ph-bold ph-caret-down text-gray-500"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-500 mb-2">Date / Time (Optional)</label>
                    <input 
                      type="text" 
                      value={currentNote.timestamp}
                      onChange={(e) => setCurrentNote({...currentNote, timestamp: e.target.value})}
                      className="w-full px-5 py-4 bg-white/50 border-2 border-gray-100 rounded-2xl focus:border-yellow-500 outline-none font-bold text-gray-900 transition-colors"
                      placeholder="Day 1"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-500 mb-2">Note Content</label>
                    <textarea 
                      value={currentNote.body}
                      onChange={(e) => setCurrentNote({...currentNote, body: e.target.value})}
                      className="w-full px-5 py-4 bg-white/50 border-2 border-gray-100 rounded-2xl focus:border-yellow-500 outline-none font-medium text-gray-900 h-32 resize-none transition-colors"
                      placeholder="Write your details here..."
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100/50">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-bold text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
                  <button type="submit" className="flex-[2] px-8 py-4 bg-yellow-500 text-white rounded-2xl font-extrabold shadow-lg shadow-yellow-500/30 hover:bg-yellow-600 transition-all">
                    {isEditing ? 'Save Changes' : 'Save Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default TripNotes;
