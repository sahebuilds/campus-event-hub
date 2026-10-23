import React from 'react';
import { Compass, Ticket, LayoutDashboard } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, user }) {
  const isOrganizer = user?.role === 'organizer';

  const navItems = [
    { id: 'discovery', label: 'Event Discovery', icon: Compass, show: true },
    { id: 'wallet', label: 'My Tickets Wallet', icon: Ticket, show: true },
    { id: 'dashboard', label: 'Organizer Dashboard', icon: LayoutDashboard, show: isOrganizer },
  ].filter(item => item.show);

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#FAF6EE] border-r border-[#E6DFD5] min-h-screen p-6 justify-between">
      <div>
        {/* Brand Header without 'E' logo box */}
        <div className="mb-8">
          <h1 className="font-bold text-ivyNavy text-lg leading-tight">Campus Event Hub</h1>
          <p className="text-xs text-ivySlate">Collegiate Portal</p>
        </div>

        {/* User Badge Profile */}
        <div className="bg-[#F3EFE6] border border-[#E6DFD5] p-3 rounded-xl mb-8">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-sm text-ivyNavy truncate">{user?.name || 'Sahejata'}</span>
            <span className="text-[10px] bg-ivyNavy text-white px-2 py-0.5 rounded font-medium uppercase">
              {user?.role || 'STUDENT'}
            </span>
          </div>
          <p className="text-xs text-ivySlate">ID: {user?.id || 'STU-8820'}</p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-wider text-ivySlate uppercase px-3 mb-2">Collegiate Access</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-ivyNavy text-white shadow-sm'
                    : 'text-ivyNavy hover:bg-[#EFEADF]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-ivyGold' : 'text-ivySlate'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}