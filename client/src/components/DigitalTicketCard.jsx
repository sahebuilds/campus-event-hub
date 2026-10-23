import React from 'react';
import { Calendar, MapPin, User, QrCode } from 'lucide-react';

export default function DigitalTicketCard({ ticket }) {
  return (
    <div className="bg-white border border-[#E6DFD5] rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-ivyNavy text-ivyGold px-4 py-1.5 rounded-bl-2xl text-xs font-bold tracking-wider">
        {ticket.tokenId}
      </div>

      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F3EFE6] text-ivyNavy px-2.5 py-1 rounded">
          {ticket.event?.category || 'Symposium Pass'}
        </span>
        
        <h3 className="font-bold text-ivyNavy text-lg mt-3 mb-2">
          {ticket.event?.title || 'Campus Event'}
        </h3>

        <div className="space-y-1.5 mb-6 text-xs text-ivySlate">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-ivyNavy" />
            <span>{ticket.event?.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-ivyNavy" />
            <span>{ticket.event?.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-ivyNavy" />
            <span>Holder: <strong className="text-ivyNavy">{ticket.studentName}</strong> ({ticket.studentId})</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F1ECE4] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-ivyNavy font-medium">
          <QrCode className="w-5 h-5 text-ivyGold" />
          <span>Seat: {ticket.seatAllocation}</span>
        </div>
        <span className="text-[10px] bg-ivyGreen/10 text-ivyGreen font-bold px-2.5 py-1 rounded">
          {ticket.status}
        </span>
      </div>
    </div>
  );
}