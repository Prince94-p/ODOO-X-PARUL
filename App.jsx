import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import GlobalLayout from './GlobalLayout';

// Screens
import Auth from './Auth';
import Dashboard from './Dashboard';
import MyTrips from './MyTrips';
import ItineraryBuilder from './ItineraryBuilder';
import ItineraryBudget from './ItineraryBudget';
import ActivitySearch from './ActivitySearch';
import CommunityFeed from './CommunityFeed';
import PackingChecklist from './PackingChecklist';
import TripNotes from './TripNotes';
import InvoiceBilling from './InvoiceBilling';
import UserProfile from './UserProfile';
import AdminAnalytics from './AdminAnalytics';
import CreateTrip from './CreateTrip';

// Protected Route Component for Admins
const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('userRole');
  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Dynamic Home Router to handle the root path ("/")
const HomeRouter = () => {
  const role = localStorage.getItem('userRole');
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  // Immediately redirect admins back to their dashboard if they hit the homepage
  if (role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  // Regular users see the main dashboard
  return <Dashboard />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public Route */}
        <Route path="/login" element={<Auth />} />

        {/* Authenticated SPA Routes wrapped in GlobalLayout */}
        <Route element={<GlobalLayout />}>
          
          {/* Dynamic Root Route */}
          <Route path="/" element={<HomeRouter />} />

          {/* Protected Admin Route */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminAnalytics />
            </AdminRoute>
          } />

          {/* Shared / User Routes */}
          <Route path="/trips" element={<MyTrips />} />
          <Route path="/trip/build" element={<ItineraryBuilder />} />
          <Route path="/trip/view" element={<ItineraryBudget />} />
          <Route path="/trip/create" element={<CreateTrip />} />
          <Route path="/discover" element={<ActivitySearch />} />
          <Route path="/community" element={<CommunityFeed />} />
          <Route path="/packing" element={<PackingChecklist />} />
          <Route path="/notes" element={<TripNotes />} />
          <Route path="/invoice" element={<InvoiceBilling />} />
          <Route path="/profile" element={<UserProfile />} />
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
