import React, { useState, useEffect } from 'react';

const PackingChecklist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [shareStatus, setShareStatus] = useState(false);

  // Initialize mock data state
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Documents",
      items: [
        { id: 101, text: "Passport", checked: true },
        { id: 102, text: "Flight Tickets (printed)", checked: true },
        { id: 103, text: "Travel Insurance", checked: true },
        { id: 104, text: "Hotel booking confirmation", checked: false },
      ]
    },
    {
      id: 2,
      name: "Clothing",
      items: [
        { id: 201, text: "Casual Shirts", checked: true },
        { id: 202, text: "Trousers / jeans", checked: false },
        { id: 203, text: "Comfortable walking shoes", checked: false },
        { id: 204, text: "Light jacket / windbreaker", checked: false },
      ]
    },
    {
      id: 3,
      name: "Electronics",
      items: [
        { id: 301, text: "Phone charger", checked: true },
        { id: 302, text: "Universal power adapter", checked: false },
        { id: 303, text: "Earphones / headphones", checked: false },
      ]
    }
  ]);

  // Derived state for overall progress
  const [progress, setProgress] = useState({ packed: 0, total: 0, percentage: 0 });

  useEffect(() => {
    let packedCount = 0;
    let totalCount = 0;
    
    categories.forEach(cat => {
      cat.items.forEach(item => {
        totalCount++;
        if (item.checked) packedCount++;
      });
    });
    
    setProgress({
      packed: packedCount,
      total: totalCount,
      percentage: totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0
    });
  }, [categories]);

  const toggleItem = (categoryId, itemId) => {
    setCategories(prevCats => 
      prevCats.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          items: cat.items.map(item => 
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      })
    );
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    setCategories(prevCats => 
      prevCats.map(cat => {
        if (cat.id === parseInt(selectedCategory)) {
          return {
            ...cat,
            items: [...cat.items, { id: Date.now(), text: newItemText, checked: false }]
          };
        }
        return cat;
      })
    );
    setNewItemText("");
    setShowAddModal(false);
  };

  const handleShare = () => {
    setShareStatus(true);
    setTimeout(() => setShareStatus(false), 2000);
  };

  const resetAll = () => {
    setCategories(prevCats => 
      prevCats.map(cat => ({
        ...cat,
        items: cat.items.map(item => ({ ...item, checked: false }))
      }))
    );
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 pb-20 animate-fade-in-up">
      
      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto w-full px-4 py-10">
        
        {/* Page Title */}
        <div className="mb-10 text-center md:text-left">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-sm font-bold tracking-widest uppercase mb-4 shadow-sm inline-block">
            <i className="ph-fill ph-package text-emerald-500"></i> Smart Packing
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Packing Checklist</h1>
          <p className="text-gray-500 font-medium text-lg">Never forget an essential item again.</p>
        </div>

        {/* Control Bar */}
        <div className="glass-panel p-3 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 shadow-sm border border-white/60">
          <div className="relative w-full md:flex-1 pl-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ph-bold ph-magnifying-glass text-emerald-600 text-lg"></i>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search checklist items..." 
              className="w-full pl-12 pr-10 py-2.5 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 font-semibold"
            />
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

        {/* Progress Card */}
        <section className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-emerald-900/5 mb-10 border border-white/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                  <i className="ph-fill ph-check-circle text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Itinerary</h3>
                  <p className="text-xl font-extrabold text-gray-900 leading-tight">Paris & Rome Adventure</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-extrabold text-gray-900">{progress.percentage}%</span>
                  <span className="text-sm font-bold text-gray-500">{progress.packed} / {progress.total} Items Packed</span>
                </div>
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-1">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <button 
                onClick={() => setShowAddModal(true)}
                className="w-full md:w-48 flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-2xl font-extrabold shadow-xl hover:bg-black transition-all hover:-translate-y-1 active:scale-95"
              >
                <i className="ph-bold ph-plus-circle text-xl"></i> Add Item
              </button>
              <button 
                onClick={handleShare}
                className={`w-full md:w-48 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-extrabold shadow-lg transition-all ${
                  shareStatus ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-gray-100 text-gray-900 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                {shareStatus ? <><i className="ph-bold ph-check text-xl"></i> Shared!</> : <><i className="ph-bold ph-share-network text-xl"></i> Share List</>}
              </button>
            </div>
          </div>
        </section>

        {/* Categorized Checklist */}
        <section className="flex flex-col gap-8">
          {categories.map((category) => {
            const filteredItems = category.items.filter(item => 
              item.text.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredItems.length === 0) return null; // Hide category if no matches

            return (
              <div key={category.id} className="glass-card rounded-[2rem] overflow-hidden border border-white/60 shadow-lg group">
                <div className="bg-white/40 px-8 py-5 flex justify-between items-center border-b border-white/40">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">{category.name}</h3>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100/50 px-3 py-1 rounded-full border border-emerald-200/50">
                    {category.items.filter(i => i.checked).length} / {category.items.length}
                  </span>
                </div>

                <div className="flex flex-col">
                  {filteredItems.map(item => (
                    <label 
                      key={item.id} 
                      className={`flex items-center px-8 py-5 cursor-pointer hover:bg-white/40 transition-all border-b last:border-b-0 border-white/20 group/item ${item.checked ? 'bg-emerald-50/20' : ''}`}
                    >
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={item.checked}
                          onChange={() => toggleItem(category.id, item.id)}
                          className="peer appearance-none w-6 h-6 border-2 border-gray-200 rounded-lg bg-white checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer"
                        />
                        <i className="ph-bold ph-check text-white absolute text-base opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></i>
                      </div>
                      <span className={`ml-6 text-lg transition-all duration-300 ${item.checked ? 'text-gray-400 line-through font-medium' : 'text-gray-900 font-extrabold'}`}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Reset Action */}
        <div className="mt-12 text-center">
          <button 
            onClick={resetAll}
            className="px-8 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-black hover:bg-red-100 transition-all uppercase tracking-widest border border-red-100"
          >
            Clear All Selections
          </button>
        </div>

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
            <div className="glass-card w-full max-w-md p-8 rounded-[2.5rem] relative z-10 shadow-2xl border border-white animate-fade-in-up">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6">New Packing Item</h3>
              <form onSubmit={handleAddItem} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-2">Item Name</label>
                  <input 
                    type="text" 
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    className="w-full px-5 py-4 bg-white/50 border-2 border-gray-100 rounded-2xl focus:border-emerald-500 outline-none font-bold text-gray-900"
                    placeholder="e.g. Hiking Boots"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-2">Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-5 py-4 bg-white/50 border-2 border-gray-100 rounded-2xl focus:border-emerald-500 outline-none font-bold text-gray-900 appearance-none"
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 font-bold text-gray-500 hover:text-gray-900">Cancel</button>
                  <button type="submit" className="flex-2 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-extrabold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all">Add to List</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default PackingChecklist;
