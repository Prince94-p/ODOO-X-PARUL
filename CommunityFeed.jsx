import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CommunityFeed = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Divya Patel",
      avatar: "https://i.pravatar.cc/150?img=5",
      time: "2 hours ago",
      title: "5 Days in Bali on a Budget",
      description: "Just got back from an amazing 5-day trip to Bali! Managed to keep the budget strictly under $500 while exploring Ubud, surfing in Canggu, and eating the best local food. Check out my full itinerary!",
      saves: 124,
      likes: 89,
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      author: "Marcus Chen",
      avatar: "https://i.pravatar.cc/150?img=11",
      time: "1 day ago",
      title: "The Ultimate Tokyo Tech & Culture Tour",
      description: "Mapped out a crazy intense 7-day trip around Tokyo blending traditional shrines with the best gaming arcades and tech spots in Akihabara. Highly recommend the teamLab Planets exhibit!",
      saves: 412,
      likes: 256,
      isLiked: false,
      isSaved: false
    },
    {
      id: 3,
      author: "Sarah Jenkins",
      avatar: "https://i.pravatar.cc/150?img=9",
      time: "3 days ago",
      title: "Weekend Backpacking in the Swiss Alps",
      description: "For all the hikers out there, I compiled the exact train routes and mountain lodges we used for our 3-day trek near Zermatt. The views of the Matterhorn were unreal.",
      saves: 85,
      likes: 120,
      isLiked: false,
      isSaved: false
    },
    {
      id: 4,
      author: "Liam O'Connor",
      avatar: "https://i.pravatar.cc/150?img=12",
      time: "1 week ago",
      title: "Hidden Gems of Rome",
      description: "Skip the massive lines at the Colosseum. Here is my itinerary for exploring the quieter, incredibly beautiful neighborhoods of Trastevere and some amazing local pasta spots you won't find on TikTok.",
      saves: 530,
      likes: 401,
      isLiked: false,
      isSaved: false
    }
  ]);

  const handleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleSave = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          saves: post.isSaved ? post.saves - 1 : post.saves + 1,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));
  };

  const [copyStatus, setCopyStatus] = useState(null);
  const handleCopyTrip = (id) => {
    setCopyStatus(id);
    setTimeout(() => {
      setCopyStatus(null);
      navigate('/trips');
    }, 1500);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 pb-20 animate-fade-in-up">
      
      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto w-full px-4 py-10">
        
        {/* Page Title */}
        <div className="mb-10 text-center md:text-left">
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 text-sm font-bold tracking-widest uppercase mb-4 shadow-sm inline-block">
            <i className="ph-fill ph-users text-indigo-500"></i> Global Community
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Explore Shared Journeys</h1>
          <p className="text-gray-500 font-medium text-lg">Inspiration from travelers around the world.</p>
        </div>

        {/* Control Bar */}
        <div className="glass-panel p-3 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 shadow-sm border border-white/60">
          
          {/* Search Input */}
          <div className="relative w-full md:flex-1 pl-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ph-bold ph-magnifying-glass text-indigo-600 text-lg"></i>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trips, destinations, or authors..." 
              className="w-full pl-12 pr-10 py-2.5 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 font-semibold"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 pl-0 md:pl-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white border-white/40 rounded-xl text-sm font-bold text-gray-700 transition-all shadow-sm">
              <i className="ph-bold ph-squares-four text-gray-500"></i> Group by
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white border-white/40 rounded-xl text-sm font-bold text-gray-700 transition-all shadow-sm">
              <i className="ph-bold ph-funnel text-gray-500"></i> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white border-white/40 rounded-xl text-sm font-bold text-gray-700 transition-all shadow-sm">
              <i className="ph-bold ph-sort-ascending text-gray-500"></i> Sort by...
            </button>
          </div>
        </div>

        {/* Main Feed Section */}
        <section>
          <div className="flex flex-col gap-8">
            {posts
              .filter(post => 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.author.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((post) => (
              <div key={post.id} className="flex flex-col md:flex-row gap-6 group">
                
                {/* Left Column: Avatar (Desktop) */}
                <div className="hidden md:block shrink-0 pt-2">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg ring-1 ring-gray-100 cursor-pointer hover:scale-110 transition-transform">
                    <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Right Column: Content Card */}
                <div className="glass-card rounded-[2rem] p-6 md:p-8 flex-1 shadow-lg shadow-indigo-900/5 hover:shadow-xl transition-all duration-300 relative border border-white/60 group-hover:-translate-y-1">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {/* Mobile Avatar */}
                      <div className="md:hidden w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shrink-0 shadow-sm">
                        <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer">{post.author}</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{post.time}</p>
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all">
                      <i className="ph-bold ph-dots-three text-2xl"></i>
                    </button>
                  </div>

                  {/* Body */}
                  <div className="mb-8">
                    <h4 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors cursor-pointer">{post.title}</h4>
                    <p className="text-gray-600 leading-relaxed font-medium text-lg">{post.description}</p>
                  </div>

                  {/* Footer / Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-gray-100/50">
                    
                    {/* Metrics */}
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 font-bold text-sm transition-all hover:scale-110 ${post.isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                      >
                        <i className={`ph-fill ${post.isLiked ? 'ph-heart' : 'ph-heart'} text-2xl`}></i> {post.likes}
                      </button>
                      <button 
                        onClick={() => handleSave(post.id)}
                        className={`flex items-center gap-2 font-bold text-sm transition-all hover:scale-110 ${post.isSaved ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'}`}
                      >
                        <i className={`ph-fill ${post.isSaved ? 'ph-bookmark-simple' : 'ph-bookmark-simple'} text-2xl`}></i> {post.saves}
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <Link to="/trip/view" className="px-6 py-3 bg-white border border-indigo-600 text-indigo-600 rounded-xl text-sm font-extrabold hover:bg-indigo-50 transition-all shadow-sm">
                        View Itinerary
                      </Link>
                      <button 
                        onClick={() => handleCopyTrip(post.id)}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold transition-all shadow-lg ${
                          copyStatus === post.id 
                            ? 'bg-green-500 text-white shadow-green-500/30' 
                            : 'bg-indigo-600 text-white shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-0.5'
                        }`}
                      >
                        {copyStatus === post.id ? (
                          <><i className="ph-bold ph-check text-lg"></i> Copied!</>
                        ) : (
                          <><i className="ph-bold ph-copy text-lg"></i> Copy Trip</>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>

        </section>

      </main>
    </div>
  );
};

export default CommunityFeed;
