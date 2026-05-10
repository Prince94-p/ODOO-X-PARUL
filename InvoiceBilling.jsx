import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const InvoiceBilling = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTripId, setSelectedTripId] = useState(1);

  // Dynamic Trip Data
  const tripsData = [
    {
      id: 1,
      name: "Trip to Europe Adventure",
      dates: "May 30 - Jun 05, 2025 • 4 cities",
      invoiceId: "INV-EUR-30290",
      date: "May 20, 2025",
      status: "Pending",
      travelers: ["James", "Arjun", "Jerry", "Cristina"],
      budget: { spent: 22000, total: 20000 },
      items: [
        { id: 1, category: "hotel", desc: "Hotel booking Paris (Le Meurice)", qty: "3 nights", unit: 3000, amount: 9000 },
        { id: 2, category: "travel", desc: "Flight bookings (JFK -> CDG)", qty: "4 pax", unit: 3000, amount: 12000 },
      ],
      discount: 50,
      taxRate: 0.05,
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Weekend in Tokyo",
      dates: "Oct 12 - Oct 15, 2025 • 1 city",
      invoiceId: "INV-TOK-44012",
      date: "Sep 01, 2025",
      status: "Paid",
      travelers: ["Divya", "Marcus"],
      budget: { spent: 3200, total: 4000 },
      items: [
        { id: 1, category: "hotel", desc: "Shinjuku Granbell Hotel", qty: "3 nights", unit: 400, amount: 1200 },
        { id: 2, category: "travel", desc: "Shinkansen Tickets (Roundtrip)", qty: "2 pax", unit: 150, amount: 300 },
        { id: 3, category: "activity", desc: "teamLab Planets Tokyo Entrance", qty: "2 pax", unit: 25, amount: 50 },
      ],
      discount: 0,
      taxRate: 0.08,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const currentTrip = tripsData.find(t => t.id === parseInt(selectedTripId)) || tripsData[0];

  // Calculations
  const isOverBudget = currentTrip.budget.spent > currentTrip.budget.total;
  const remainingBudget = currentTrip.budget.total - currentTrip.budget.spent;
  
  const budgetChartData = [
    { name: 'Spent', value: currentTrip.budget.spent, color: isOverBudget ? '#ef4444' : '#10b981' },
    { name: 'Remaining', value: isOverBudget ? 0 : remainingBudget, color: '#e5e7eb' }, 
  ];

  const subtotal = currentTrip.items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * currentTrip.taxRate;
  const grandTotal = subtotal + tax - currentTrip.discount;

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="min-h-screen font-sans text-gray-800 pb-24 print:pb-0 animate-fade-in-up print:bg-white">
      
      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 py-10 print:py-0 print:px-0">
        
        {/* Breadcrumb & Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 print:hidden">
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 w-full">
            <Link to="/trips" className="px-5 py-2.5 bg-white/60 hover:bg-white border border-white/60 rounded-xl text-blue-600 text-sm font-extrabold flex items-center gap-2 transition-all shadow-sm shrink-0 w-fit">
              <i className="ph-bold ph-arrow-left"></i> All Trips
            </Link>
            
            {/* Dynamic Trip Selector */}
            <div className="relative w-full md:w-80 shrink-0 z-20">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="ph-fill ph-map-pin text-blue-500"></i>
              </div>
              <select 
                value={selectedTripId}
                onChange={(e) => setSelectedTripId(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-white/80 border-2 border-white/80 rounded-2xl text-sm font-extrabold text-gray-900 shadow-lg shadow-blue-900/5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer appearance-none"
              >
                {tripsData.map(trip => (
                  <option key={trip.id} value={trip.id}>{trip.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <i className="ph-bold ph-caret-down text-gray-500"></i>
              </div>
            </div>

            {/* Local Search Input */}
            <div className="relative w-full md:max-w-md ml-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="ph-bold ph-magnifying-glass text-gray-400"></i>
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search invoice items..." 
                className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-white/80 rounded-2xl text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Print-Only Formal Invoice Header */}
        <div className="hidden print:flex justify-between items-start mb-8 border-b-2 border-gray-900 pb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-1 uppercase">Traveloop Inc.</h1>
            <p className="text-gray-600 font-bold text-sm">123 Corporate Blvd, Suite 400<br/>San Francisco, CA 94107<br/>hello@traveloop.app</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-black text-gray-900 mb-1 tracking-widest uppercase">Invoice</h2>
            <p className="text-gray-900 font-extrabold text-lg">#{currentTrip.invoiceId}</p>
            <p className="text-gray-500 font-bold text-sm mt-1">Date: {currentTrip.date}</p>
          </div>
        </div>

        {/* Top Information Section (Split Layout) */}
        <div className="flex flex-col lg:flex-row gap-8 mb-10 print:block print:mb-8">
          
          {/* Left Card (Invoice Details) */}
          <div className="glass-card rounded-[2.5rem] p-8 lg:w-2/3 border border-white/60 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row gap-8 items-center sm:items-start relative overflow-hidden print:w-full print:border-none print:shadow-none print:p-0 print:bg-transparent print:rounded-none print:overflow-visible">
            
            {/* Image Box */}
            <div className="w-full sm:w-48 h-48 sm:h-auto sm:self-stretch rounded-2xl overflow-hidden shrink-0 shadow-md relative group print:hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10"></div>
              <img 
                src={currentTrip.image} 
                alt={currentTrip.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 z-20">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-lg ${currentTrip.status === 'Paid' ? 'bg-emerald-500/80 text-white' : 'bg-yellow-500/80 text-white'}`}>
                  <i className={`ph-bold ${currentTrip.status === 'Paid' ? 'ph-check' : 'ph-clock'}`}></i> {currentTrip.status}
                </span>
              </div>
            </div>

            {/* Info Container */}
            <div className="flex-1 flex flex-col w-full relative z-10 print:mt-4">
              <div className="mb-6 text-center sm:text-left">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{currentTrip.name}</h1>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{currentTrip.dates}</p>
              </div>

              {/* Invoice Meta Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 print:grid-cols-3 print:gap-2">
                <div className="bg-white/50 border border-white rounded-2xl p-4 shadow-sm print:border-gray-200 print:bg-transparent print:rounded-none print:p-2">
                  <span className="block text-xs font-black text-blue-400 print:text-gray-500 uppercase tracking-wider mb-1">Invoice ID</span>
                  <span className="text-sm font-extrabold text-gray-900">{currentTrip.invoiceId}</span>
                </div>
                <div className="bg-white/50 border border-white rounded-2xl p-4 shadow-sm print:border-gray-200 print:bg-transparent print:rounded-none print:p-2">
                  <span className="block text-xs font-black text-blue-400 print:text-gray-500 uppercase tracking-wider mb-1">Generated</span>
                  <span className="text-sm font-extrabold text-gray-900">{currentTrip.date}</span>
                </div>
                <div className="hidden print:block border border-gray-200 rounded-none p-2">
                  <span className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1">Status</span>
                  <span className="text-sm font-extrabold text-gray-900 uppercase">{currentTrip.status}</span>
                </div>
              </div>

              {/* Traveler Details */}
              <div>
                <span className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Billed For (Travelers)</span>
                <div className="flex flex-wrap gap-2 text-sm font-bold text-gray-700">
                  {currentTrip.travelers.map((traveler, idx) => (
                    <span key={idx} className="bg-white/80 border border-white px-3 py-1.5 rounded-lg shadow-sm print:border-gray-300 print:shadow-none print:rounded-none print:bg-transparent">
                      <i className="ph-fill ph-user text-blue-500 print:text-gray-700 mr-1.5"></i> {traveler}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Card (Budget Insights) */}
          <div className="glass-card rounded-[2.5rem] p-8 lg:w-1/3 border border-white/60 shadow-xl shadow-blue-900/5 flex flex-col print:hidden relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 ${isOverBudget ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}></div>
            
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 relative z-10">Budget Overview</h2>
            
            <div className="flex flex-col items-center gap-6 mb-8 relative z-10">
              {/* Simple Donut Chart */}
              <div className="w-32 h-32 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={60}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={4}
                    >
                      {budgetChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px', padding: '8px 12px', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Spent</span>
                  <span className={`text-sm font-black ${isOverBudget ? 'text-red-600' : 'text-emerald-600'}`}>
                    {Math.round((currentTrip.budget.spent / currentTrip.budget.total) * 100)}%
                  </span>
                </div>
              </div>

              {/* Text Metrics */}
              <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between gap-4 text-sm bg-white/50 border border-white px-4 py-2.5 rounded-xl">
                  <span className="text-gray-500 font-bold">Total Budget</span>
                  <span className="font-black text-gray-900">{formatCurrency(currentTrip.budget.total)}</span>
                </div>
                <div className="flex justify-between gap-4 text-sm bg-white/50 border border-white px-4 py-2.5 rounded-xl">
                  <span className="text-gray-500 font-bold">Total Spent</span>
                  <span className="font-black text-gray-900">{formatCurrency(currentTrip.budget.spent)}</span>
                </div>
                <div className={`flex justify-between gap-4 text-sm px-4 py-2.5 rounded-xl border ${isOverBudget ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
                  <span className={`${isOverBudget ? 'text-red-600' : 'text-emerald-600'} font-black`}>Remaining</span>
                  <span className={`font-black ${isOverBudget ? 'text-red-600' : 'text-emerald-600'}`}>{formatCurrency(remainingBudget)}</span>
                </div>
              </div>
            </div>

            <button className="mt-auto w-full flex items-center justify-center py-4 bg-gray-900 rounded-xl text-sm font-extrabold text-white hover:bg-black transition-all shadow-xl active:scale-95 relative z-10">
              View Detailed Analytics
            </button>
          </div>
        </div>

        {/* The Invoice Data Table */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden mb-8 border border-white/60 shadow-xl shadow-blue-900/5 print:border-none print:shadow-none print:rounded-none print:bg-transparent">
          <div className="overflow-x-auto print:overflow-visible">
            <table className="min-w-full divide-y divide-gray-100 print:divide-gray-400">
              <thead className="bg-white/80 border-b border-gray-100 print:bg-gray-100 print:border-gray-400">
                <tr>
                  <th scope="col" className="px-8 print:px-2 py-5 print:py-3 text-left text-xs font-black text-gray-400 print:text-gray-800 uppercase tracking-widest w-12">#</th>
                  <th scope="col" className="px-8 print:px-2 py-5 print:py-3 text-left text-xs font-black text-gray-400 print:text-gray-800 uppercase tracking-widest">Category</th>
                  <th scope="col" className="px-8 print:px-2 py-5 print:py-3 text-left text-xs font-black text-gray-400 print:text-gray-800 uppercase tracking-widest">Description</th>
                  <th scope="col" className="px-8 print:px-2 py-5 print:py-3 text-center text-xs font-black text-gray-400 print:text-gray-800 uppercase tracking-widest">Qty/details</th>
                  <th scope="col" className="px-8 print:px-2 py-5 print:py-3 text-right text-xs font-black text-gray-400 print:text-gray-800 uppercase tracking-widest">Unit Cost</th>
                  <th scope="col" className="px-8 print:px-2 py-5 print:py-3 text-right text-xs font-black text-gray-400 print:text-gray-800 uppercase tracking-widest">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white/40 divide-y divide-gray-100/50 print:bg-transparent print:divide-gray-300">
                {currentTrip.items
                  .filter(item => 
                    item.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item, idx) => (
                  <tr key={item.id} className="hover:bg-white/80 transition-colors print:hover:bg-transparent">
                    <td className="px-8 print:px-2 py-5 print:py-3 whitespace-nowrap text-sm font-bold text-gray-400 print:text-gray-800">{idx + 1}</td>
                    <td className="px-8 print:px-2 py-5 print:py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-blue-100 text-blue-700 capitalize print:bg-transparent print:border print:border-gray-400 print:text-gray-800 print:rounded-none">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 print:px-2 py-5 print:py-3 text-sm font-extrabold text-gray-900">{item.desc}</td>
                    <td className="px-8 print:px-2 py-5 print:py-3 whitespace-nowrap text-sm font-bold text-gray-500 print:text-gray-800 text-center">{item.qty}</td>
                    <td className="px-8 print:px-2 py-5 print:py-3 whitespace-nowrap text-sm font-bold text-gray-900 text-right">{formatCurrency(item.unit)}</td>
                    <td className="px-8 print:px-2 py-5 print:py-3 whitespace-nowrap text-sm font-black text-gray-900 text-right">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Footer */}
          <div className="bg-white/80 border-t border-gray-100 px-8 py-8 flex justify-end print:bg-transparent print:border-gray-400 print:py-6">
            <div className="w-full sm:w-80 space-y-4 print:space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-500 print:text-gray-800">Subtotal</span>
                <span className="font-extrabold text-gray-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-500 print:text-gray-800">Tax ({(currentTrip.taxRate * 100).toFixed(0)}%)</span>
                <span className="font-extrabold text-gray-900">{formatCurrency(tax)}</span>
              </div>
              {currentTrip.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-500 print:text-gray-800">Discount</span>
                  <span className="font-extrabold text-emerald-600 print:text-gray-900">-{formatCurrency(currentTrip.discount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-4 border-t-2 border-gray-100 border-dashed print:border-gray-400 print:border-solid print:pt-2">
                <span className="text-lg font-black text-gray-900 uppercase">Grand Total</span>
                <span className="text-2xl font-black text-blue-600 print:text-gray-900">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Bottom Action Bar (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-40 print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-col sm:flex-row">
            <button onClick={() => window.print()} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm">
              <i className="ph-bold ph-download-simple text-lg"></i> Download Invoice
            </button>
            <button onClick={() => window.print()} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm">
              <i className="ph-bold ph-file-pdf text-lg"></i> Export PDF
            </button>
          </div>
          
          <button className={`w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3 text-white rounded-xl text-sm font-black shadow-lg transition-all active:scale-95 ${currentTrip.status === 'Paid' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 shadow-blue-500/30'}`}>
            <i className={`ph-bold ${currentTrip.status === 'Paid' ? 'ph-check-circle' : 'ph-check'}`}></i> 
            {currentTrip.status === 'Paid' ? 'Invoice Paid' : 'Mark as Paid'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default InvoiceBilling;
