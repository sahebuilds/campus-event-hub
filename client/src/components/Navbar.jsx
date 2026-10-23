import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Navbar({ user }) {
  return (
    <header className="h-20 bg-white border-b border-[#E6DFD5] px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-ivyGold bg-ivyGold/10 px-3 py-1 rounded-full">
          Portal Session: {user?.role?.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-9 h-9 bg-[#F3EFE6] border border-[#E6DFD5] rounded-xl flex items-center justify-center text-ivyNavy font-bold text-xs">
          {user?.name?.[0] || 'U'}
        </div>
        <div>
          <h4 className="text-xs font-bold text-ivyNavy">{user?.name}</h4>
          <p className="text-[10px] text-ivySlate">{user?.id || 'ID Verified'}</p>
        </div>
      </div>
    </header>
  );
}