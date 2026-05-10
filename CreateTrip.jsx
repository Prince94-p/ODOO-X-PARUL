import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: ''
  });

  const [addedActivities, setAddedActivities] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] = useState([]);

  const toggleActivity = (id) => {
    if (addedActivities.includes(id)) {
      setAddedActivities(addedActivities.filter(activityId => activityId !== id));
    } else {
      setAddedActivities([...addedActivities, id]);
    }
  };

  const generateDynamicSuggestions = (dest) => {
    // Capitalize first letter of each word for aesthetics
    const cityName = dest.trim().replace(/\b\w/g, l => l.toUpperCase()) || "Your Destination";
    const seedBase = cityName.toLowerCase().replace(/\s+/g, '');
    
    return [
      {
        id: 1,
        title: `${cityName} Walking Tour`,
        desc: `Discover the hidden gems and historical landmarks of ${cityName} with a local expert guide.`,
        budget: "$40",
        duration: "3 Hours",
        img: `https://picsum.photos/seed/${seedBase}walk/600/400`
      },
      {
        id: 2,
        title: `Authentic ${cityName} Cuisine`,
        desc: `Taste the absolute best local dishes and street food that ${cityName} has to offer.`,
        budget: "$65",
        duration: "2.5 Hours",
        img: `https://picsum.photos/seed/${seedBase}food/600/400`
      },
      {
        id: 3,
        title: `${cityName} Museum Pass`,
        desc: `Get priority access to the top museums, galleries, and historical sites in ${cityName}.`,
        budget: "$55",
        duration: "Full Day",
        img: `https://picsum.photos/seed/${seedBase}museum/600/400`
      },
      {
        id: 4,
        title: `Scenic Views of ${cityName}`,
        desc: `Take a scenic ride or hike to get the absolute best panoramic views overlooking ${cityName}.`,
        budget: "$25",
        duration: "2 Hours",
        img: `https://picsum.photos/seed/${seedBase}view/600/400`
      },
      {
        id: 5,
        title: `${cityName} Nightlife Experience`,
        desc: `Experience the vibrant evening atmosphere, premier bars, and entertainment in ${cityName}.`,
        budget: "$80",
        duration: "Evening",
        img: `https://picsum.photos/seed/${seedBase}night/600/400`
      },
      {
        id: 6,
        title: `${cityName} Day Trip`,
        desc: `Escape the main city and explore the beautiful surrounding natural regions of ${cityName}.`,
        budget: "$120",
        duration: "Full Day",
        img: `https://picsum.photos/seed/${seedBase}trip/600/400`
      }
    ];
  };

  const handleGenerate = () => {
    if (!formData.destination || !formData.startDate || !formData.endDate) {
      alert("Please fill out the destination and both travel dates to generate an itinerary.");
      return;
    }
    setIsGenerating(true);
    setShowSuggestions(false);
    
    // Simulate API call for intelligent itinerary generation
    setTimeout(() => {
      setDynamicSuggestions(generateDynamicSuggestions(formData.destination));
      setIsGenerating(false);
      setShowSuggestions(true);
      // Scroll down to suggestions smoothly
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 1500);
  };

  const handleProceed = () => {
    const savedTrips = JSON.parse(localStorage.getItem('traveloop_trips') || '[]');
    
    // Format date range string with safety fallback
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const startObj = new Date(formData.startDate);
    const endObj = new Date(formData.endDate);
    
    const start = isNaN(startObj.getTime()) ? "TBD" : startObj.toLocaleDateString('en-US', options);
    const end = isNaN(endObj.getTime()) ? "TBD" : endObj.toLocaleDateString('en-US', options);
    
    const newTrip = {
      id: Date.now(), // Unique ID
      title: formData.destination.trim().replace(/\b\w/g, l => l.toUpperCase()) || "New Trip",
      dateRange: start === "TBD" ? "Dates to be set" : `${start} - ${end}`,
      destinations: addedActivities.length || 1,
      status: "Upcoming"
    };

    localStorage.setItem('traveloop_trips', JSON.stringify([...savedTrips, newTrip]));
    navigate('/trip/build');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
        
        {/* Trip Creation Form Container */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-10 mb-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan a New Trip</h1>
            <p className="text-gray-500">Create your personalized travel itinerary</p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            
            {/* Destination Input */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Destination</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ph-bold ph-map-pin text-blue-500 text-xl"></i>
                </div>
                <input 
                  type="text" 
                  placeholder="Search destinations (e.g., Paris, Kyoto, Maldives)..." 
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-base shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Travel Start Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="ph-bold ph-calendar-blank text-gray-400 text-xl"></i>
                  </div>
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-base shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer text-gray-700"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">Travel End Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="ph-bold ph-calendar-blank text-gray-400 text-xl"></i>
                  </div>
                  <input 
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-base shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`mt-4 w-full text-white font-bold py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 ${isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5'}`}
            >
              {isGenerating ? (
                <>
                  <i className="ph-bold ph-spinner animate-spin"></i> Generating...
                </>
              ) : (
                <>
                  Generate Suggestions <i className="ph-bold ph-magic-wand"></i>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Suggestion Section (Only shown after generation) */}
        {showSuggestions && (
          <section className="animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
              <h2 className="text-xl font-bold text-gray-900">Suggested Activities to Perform</h2>
              <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">{addedActivities.length} Added</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {dynamicSuggestions.map((item) => {
                const isAdded = addedActivities.includes(item.id);
                
                return (
                  <div key={item.id} className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-1 ${isAdded ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'}`}>
                    
                    {/* Image Header with Add Button */}
                    <div className="h-48 w-full relative overflow-hidden bg-gray-100">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button 
                        onClick={() => toggleActivity(item.id)}
                        className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 ${isAdded ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        title={isAdded ? "Remove from Itinerary" : "Add to Itinerary"}
                      >
                        <i className={`ph-bold text-xl ${isAdded ? 'ph-check' : 'ph-plus'}`}></i>
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight pr-4">{item.title}</h3>
                        <button className="text-gray-300 hover:text-red-500 transition-colors mt-0.5">
                          <i className="ph-fill ph-heart text-xl"></i>
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-2">{item.desc}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="flex items-center text-green-700 font-bold text-sm">
                          <i className="ph-bold ph-currency-dollar mr-1"></i> {item.budget.replace('$', '')}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                          <i className="ph-bold ph-clock"></i> {item.duration}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
            
            {/* Proceed Action Container - Always visible once suggestions are ready */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-8 mt-4">
              <div className="text-gray-500 text-sm font-medium">
                <i className="ph-bold ph-info text-blue-500 mr-1"></i> 
                {addedActivities.length > 0 
                  ? `You've added ${addedActivities.length} activities to your plan.` 
                  : "You can save this trip now and add activities later in the builder."}
              </div>
              <button 
                onClick={handleProceed}
                className="w-full md:w-auto bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-extrabold shadow-xl shadow-gray-900/20 transition-all flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95 group"
              >
                Save Trip & Open Builder 
                <i className="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
            
          </section>
        )}

      </main>
    </div>
  );
};

export default CreateTrip;
