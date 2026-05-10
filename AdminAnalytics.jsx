import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const AdminAnalytics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState('trends');
  const [users, setUsers] = useState([]);

  // Load users from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('traveloop_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const defaultUsers = [
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'User', status: 'Active', joined: 'Oct 12, 2025' },
        { id: 2, name: 'System Admin', email: 'admin@traveloop.com', role: 'Admin', status: 'Active', joined: 'Sep 01, 2025' },
        { id: 3, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Inactive', joined: 'Nov 05, 2025' },
        { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'Moderator', status: 'Active', joined: 'Dec 02, 2025' },
      ];
      setUsers(defaultUsers);
      localStorage.setItem('traveloop_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter(u => u.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('traveloop_users', JSON.stringify(updatedUsers));
    }
  };

  const handleInviteUser = () => {
    const name = window.prompt("Enter user full name:");
    const email = window.prompt("Enter user email:");
    if (name && email) {
      const newUser = {
        id: Date.now(),
        name,
        email,
        role: 'User',
        status: 'Active',
        joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('traveloop_users', JSON.stringify(updatedUsers));
    }
  };

  const handleEditUser = (user) => {
    const newName = window.prompt("Edit name:", user.name);
    const newEmail = window.prompt("Edit email:", user.email);
    if (newName && newEmail) {
      const updatedUsers = users.map(u => u.id === user.id ? { ...u, name: newName, email: newEmail } : u);
      setUsers(updatedUsers);
      localStorage.setItem('traveloop_users', JSON.stringify(updatedUsers));
    }
  };

  const handleToggleStatus = (id) => {
    const updatedUsers = users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem('traveloop_users', JSON.stringify(updatedUsers));
  };

  // Mock Data for Charts
  const pieData = [
    { name: 'Adventure & Sports', value: 450, color: '#3b82f6' },
    { name: 'Cultural & Historic', value: 300, color: '#8b5cf6' },
    { name: 'Relaxation & Spa', value: 200, color: '#10b981' },
    { name: 'Food & Culinary', value: 150, color: '#f59e0b' },
  ];

  const lineData = [
    { date: 'Oct 01', signups: 120, active: 400 },
    { date: 'Oct 05', signups: 150, active: 450 },
    { date: 'Oct 10', signups: 180, active: 520 },
    { date: 'Oct 15', signups: 140, active: 480 },
    { date: 'Oct 20', signups: 220, active: 610 },
    { date: 'Oct 25', signups: 280, active: 750 },
    { date: 'Oct 30', signups: 250, active: 700 },
  ];

  const barData = [
    { name: 'Paris', volume: 850 },
    { name: 'Bali', volume: 620 },
    { name: 'Tokyo', volume: 590 },
    { name: 'Rome', volume: 480 },
    { name: 'New York', volume: 410 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col pb-20">
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Odoo-Style Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:flex-1 md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ph-bold ph-magnifying-glass text-gray-400 text-lg"></i>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports or metrics..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
              <i className="ph-bold ph-squares-four text-gray-500"></i> Group by
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
              <i className="ph-bold ph-funnel text-gray-500"></i> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
              <i className="ph-bold ph-sort-ascending text-gray-500"></i> Sort by...
            </button>
          </div>
        </div>

        {/* Admin Tab Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-1">
          {['trends', 'users', 'cities', 'activities'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors ${activeTab === tab ? 'font-bold text-blue-700 bg-blue-100 shadow-sm border border-blue-200' : 'font-medium text-gray-600 hover:bg-gray-200 bg-gray-100 border border-transparent'}`}
            >
              {tab === 'trends' ? 'User Trends and Analytics' : tab === 'users' ? 'Manage Users' : tab === 'cities' ? 'Popular Cities' : 'Popular Activities'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'trends' && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 flex flex-col gap-10 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-gray-100 pb-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Trip Categories Distribution</h2>
                <ul className="space-y-4">
                  {pieData.map((entry, index) => (
                    <li key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: entry.color }}></span>
                        <span className="text-sm font-semibold text-gray-700">{entry.name}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{entry.value} Trips</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-64 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }} 
                      itemStyle={{ color: '#1f2937', fontWeight: 600 }}
                    />
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border-b border-gray-100 pb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                <h2 className="text-xl font-bold text-gray-900">User Signups & Activity (Last 30 Days)</h2>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span className="flex items-center gap-1.5 text-blue-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Signups</span>
                  <span className="flex items-center gap-1.5 text-emerald-500"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Active Users</span>
                </div>
              </div>
              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    <Line type="monotone" dataKey="signups" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="w-full">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Top 5 Destinations by Volume</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                      <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                      <Bar dataKey="volume" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="w-full">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Destination Metrics</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Destination</th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Trip Volume</th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {barData.map((dest, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{dest.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{dest.volume}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                              <i className="ph-bold ph-trend-up"></i> +{(Math.random() * 15 + 5).toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">User Management</h2>
              <button 
                onClick={handleInviteUser}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
              >
                + Invite User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())).map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold uppercase">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold border ${user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : user.role === 'Moderator' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleToggleStatus(user.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 ${user.status === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}
                          title="Click to toggle status"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {user.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{user.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-900 mr-4"><i className="ph-bold ph-pencil-simple text-lg"></i></button>
                        <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-700"><i className="ph-bold ph-trash text-lg"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'cities' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
            {[
              { id: 1, name: 'Paris, France', bookings: 850, revenue: '$1.2M', img: 'https://picsum.photos/seed/paris/600/400' },
              { id: 2, name: 'Bali, Indonesia', bookings: 620, revenue: '$850K', img: 'https://picsum.photos/seed/bali/600/400' },
              { id: 3, name: 'Tokyo, Japan', bookings: 590, revenue: '$920K', img: 'https://picsum.photos/seed/tokyo/600/400' },
              { id: 4, name: 'Rome, Italy', bookings: 480, revenue: '$640K', img: 'https://picsum.photos/seed/rome/600/400' },
              { id: 5, name: 'New York, USA', bookings: 410, revenue: '$780K', img: 'https://picsum.photos/seed/ny/600/400' },
              { id: 6, name: 'Kyoto, Japan', bookings: 390, revenue: '$510K', img: 'https://picsum.photos/seed/kyoto/600/400' },
            ].map(city => (
              <div key={city.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className="h-48 relative overflow-hidden">
                  <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-blue-700 text-xs font-bold px-2 py-1 rounded shadow-sm">#{city.id} Top</div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{city.name}</h3>
                  <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                    <span className="text-gray-500 font-medium"><i className="ph-bold ph-ticket mr-1"></i> {city.bookings} Bookings</span>
                    <span className="text-green-700 font-bold"><i className="ph-bold ph-currency-dollar mr-1"></i> {city.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Highest Converting Activities</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { id: 1, name: 'Alpine Paragliding', category: 'Adventure', rating: '4.9', bookings: 320, img: 'https://picsum.photos/seed/alpine_para/150/150' },
                { id: 2, name: 'Sunset Boat Cruise', category: 'Relaxation', rating: '4.8', bookings: 290, img: 'https://picsum.photos/seed/cruise/150/150' },
                { id: 3, name: 'Historical Museum Tour', category: 'Cultural', rating: '4.6', bookings: 450, img: 'https://picsum.photos/seed/museum/150/150' },
                { id: 4, name: 'Local Food Tasting', category: 'Culinary', rating: '4.9', bookings: 510, img: 'https://picsum.photos/seed/food/150/150' },
              ].map(activity => (
                <div key={activity.id} className="p-6 flex items-center gap-6 hover:bg-gray-50 transition-colors">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0"><img src={activity.img} alt={activity.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{activity.name}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">{activity.category}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="flex items-center text-yellow-500 font-bold text-sm"><i className="ph-fill ph-star mr-1"></i> {activity.rating}</span>
                    <span className="text-sm font-medium text-gray-500"><b className="text-gray-900">{activity.bookings}</b> lifetime bookings</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminAnalytics;
