import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AuthPage from './pages/AuthPage';
import EventDiscoveryPage from './pages/EventDiscoveryPage';
import TicketWalletPage from './pages/TicketWalletPage';
import OrganizerDashboardPage from './pages/OrganizerDashboardPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('discovery');

  if (!user) {
    return (
      <AuthPage 
        onLogin={(userData) => {
          setUser(userData);
          setActiveTab(userData.role === 'organizer' ? 'dashboard' : 'discovery');
        }} 
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAF6EE]">
      {/* Sidebar with user info & conditional links */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {activeTab === 'discovery' && <EventDiscoveryPage user={user} />}
        {activeTab === 'wallet' && <TicketWalletPage />}
        
        {/* Strict Role Guard: Only Organizers see the Dashboard */}
        {activeTab === 'dashboard' && (
          user.role === 'organizer' ? (
            <OrganizerDashboardPage />
          ) : (
            <div className="p-8 text-ivyNavy font-bold">
              Access Denied: Students cannot access the Organizer Portal.
            </div>
          )
        )}
      </main>
    </div>
  );
}