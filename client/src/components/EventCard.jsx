import React from 'react';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';

export default function EventCard({ event, onReserve }) {
  const isSoldOut = event.reservedCount >= event.capacity;

  return (
    <div className="bg-white border border-[#E6DFD5] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F3EFE6] text-ivyNavy px-2.5 py-1 rounded-lg">
            {event.category}
          </span>
          <span className="text-xs font-bold text-ivyGold bg-ivyGold/10 px-2 py-0.5 rounded">
            {event.price === 0 ? 'Free Access' : `$${event.price}`}
          </span>
        </div>

        <h3 className="font-bold text-ivyNavy text-base mb-2 leading-snug">{event.title}</h3>

        <div className="space-y-2 mb-6 text-xs text-ivySlate">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-ivyNavy" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-ivyNavy" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-ivyNavy" />
            <span>Capacity: {event.reservedCount} / {event.capacity} seats</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1ECE4] flex items-center justify-between">
        <span className="text-[11px] font-medium text-ivySlate">
          Privilege: <span className="text-ivyNavy font-semibold">{event.tierPrivilege}</span>
        </span>
        <button 
          onClick={() => onReserve(event)}
          disabled={isSoldOut}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
            isSoldOut ? 'bg-ivySlate/20 text-ivySlate cursor-not-allowed' : 'bg-ivyNavy text-white hover:bg-ivyNavy/90'
          }`}
        >
          <Ticket className="w-3.5 h-3.5 text-ivyGold" />
          {isSoldOut ? 'Sold Out' : 'Reserve Pass'}
        </button>
      </div>
    </div>
  );
}