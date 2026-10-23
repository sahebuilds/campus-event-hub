import React, { useState } from 'react';
import { ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';

export default function AuthPage({ onLogin }) {
  const [role, setRole] = useState('student'); // 'student' or 'organizer'
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onLogin({
      name,
      role,
      id: identifier || (role === 'student' ? 'STU-8820' : 'ORG-001')
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-[#E6DFD5] rounded-3xl p-8 shadow-sm">
        
        {/* Header without 'E' logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ivyNavy">Campus Event Hub</h1>
          <p className="text-xs text-ivySlate mt-1">Registration Portal</p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-[#F3EFE6] p-1.5 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              role === 'student' ? 'bg-white text-ivyNavy shadow-sm' : 'text-ivySlate hover:text-ivyNavy'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-ivyBlue" />
            Student Portal
          </button>
          <button
            type="button"
            onClick={() => setRole('organizer')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              role === 'organizer' ? 'bg-white text-ivyNavy shadow-sm' : 'text-ivySlate hover:text-ivyNavy'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-ivyGold" />
            Organizer Portal
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ivyNavy uppercase tracking-wider mb-1.5">
              {role === 'student' ? 'Student Full Name' : 'Organizer / Faculty Name'}
            </label>
            <input
              type="text"
              required
              placeholder={role === 'student' ? 'e.g., Sahejata' : 'e.g., Prof. Chetan'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF6EE] border border-[#E6DFD5] rounded-xl text-sm text-ivyNavy focus:outline-none focus:border-ivyNavy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ivyNavy uppercase tracking-wider mb-1.5">
              {role === 'student' ? 'Student ID Number' : 'Organizer Passcode / ID'}
            </label>
            <input
              type="text"
              placeholder={role === 'student' ? 'e.g., STU-94021' : 'e.g., ORG-001'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF6EE] border border-[#E6DFD5] rounded-xl text-sm text-ivyNavy focus:outline-none focus:border-ivyNavy"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 bg-ivyNavy text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-ivyNavy/90 transition-all shadow-sm"
          >
            Enter Portal <ArrowRight className="w-4 h-4 text-ivyGold" />
          </button>
        </form>

      </div>
    </div>
  );
}