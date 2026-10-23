import React from 'react';

export default function MetricCard({ title, value, icon: Icon, change }) {
  return (
    <div className="bg-white border border-[#E6DFD5] rounded-2xl p-5 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs text-ivySlate font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-ivyNavy mt-1">{value}</h3>
        {change && <p className="text-[10px] text-ivyGreen font-semibold mt-1">{change}</p>}
      </div>
      <div className="w-12 h-12 bg-[#FAF6EE] border border-[#E6DFD5] rounded-xl flex items-center justify-center text-ivyNavy">
        <Icon className="w-6 h-6 text-ivyGold" />
      </div>
    </div>
  );
}