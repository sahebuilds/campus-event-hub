import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Calendar, MapPin, Users, Ticket, Sparkles, X, CheckCircle2 } from 'lucide-react';

export default function EventDiscoveryPage({ user }) {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Booking Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [studentName, setStudentName] = useState(user?.name || '');
  const [studentId, setStudentId] = useState(user?.id || '');
  const [email, setEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await axios.post('http://localhost:5000/api/tickets', {
        eventId: selectedEvent._id,
        studentName,
        studentId,
        email,
        seatAllocation: `Stalls Row ${String.fromCharCode(65 + Math.floor(Math.random() * 5))} • Seat #${Math.floor(10 + Math.random() * 80)}`
      });

      setBookingSuccess(res.data);
      setSelectedEvent(null);
      fetchEvents(); // Refresh event capacities
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to book ticket');
    }
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-[#FAF6EE] p-8 relative">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-ivyGold font-semibold text-xs tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Collegiate Registry & Symposia
          </div>
          <h1 className="text-2xl font-bold text-ivyNavy">Event Discovery</h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-ivySlate" />
          <input
            type="text"
            placeholder="Search symposia, venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E6DFD5] rounded-xl text-sm text-ivyNavy placeholder-ivySlate focus:outline-none focus:border-ivyNavy shadow-sm"
          />
        </div>
      </div>

      {bookingSuccess && (
        <div className="mb-6 bg-ivyGreen/10 border border-ivyGreen/30 text-ivyGreen p-4 rounded-2xl text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Successfully booked pass for <strong>{bookingSuccess.event?.title || 'Event'}</strong>! Token ID: <strong>{bookingSuccess.tokenId}</strong></span>
          </div>
          <button onClick={() => setBookingSuccess(null)} className="text-ivyGreen hover:opacity-70 font-bold text-xs">DISMISS</button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-ivySlate text-sm">
          Loading collegiate events from cluster...
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white border border-[#E6DFD5] rounded-2xl p-12 text-center">
          <p className="text-ivyNavy font-medium mb-1">No events found</p>
          <p className="text-xs text-ivySlate">Try checking your database or create one in the organizer dashboard.</p>
        </div>
      ) : (
        /* Event Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div 
              key={event._id} 
              className="bg-white border border-[#E6DFD5] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category & Price Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F3EFE6] text-ivyNavy px-2.5 py-1 rounded-lg">
                    {event.category}
                  </span>
                  <span className="text-xs font-bold text-ivyGold bg-ivyGold/10 px-2 py-0.5 rounded">
                    {event.price === 0 ? 'Free Access' : `$${event.price}`}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-bold text-ivyNavy text-base mb-2 leading-snug">
                  {event.title}
                </h3>

                {/* Event Metadata */}
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

              {/* Action Footer */}
              <div className="pt-4 border-t border-[#F1ECE4] flex items-center justify-between">
                <span className="text-[11px] font-medium text-ivySlate">
                  Privilege: <span className="text-ivyNavy font-semibold">{event.tierPrivilege}</span>
                </span>
                <button 
                  onClick={() => setSelectedEvent(event)}
                  disabled={event.reservedCount >= event.capacity}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                    event.reservedCount >= event.capacity 
                      ? 'bg-ivySlate/20 text-ivySlate cursor-not-allowed' 
                      : 'bg-ivyNavy text-white hover:bg-ivyNavy/90'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5 text-ivyGold" />
                  {event.reservedCount >= event.capacity ? 'Sold Out' : 'Reserve Pass'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E6DFD5] rounded-3xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 text-ivySlate hover:text-ivyNavy p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F3EFE6] text-ivyNavy px-2.5 py-1 rounded">
              Pass Reservation
            </span>
            <h2 className="text-lg font-bold text-ivyNavy mt-2 mb-1">{selectedEvent.title}</h2>
            <p className="text-xs text-ivySlate mb-6">{selectedEvent.venue} • {selectedEvent.date}</p>

            {errorMsg && (
              <div className="mb-4 bg-ivyRed/10 text-ivyRed p-3 rounded-xl text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleBookSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ivyNavy uppercase tracking-wider mb-1">Student Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={studentName} 
                  onChange={e => setStudentName(e.target.value)} 
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E6DFD5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ivyNavy uppercase tracking-wider mb-1">Student ID</label>
                <input 
                  type="text" 
                  required 
                  value={studentId} 
                  onChange={e => setStudentId(e.target.value)} 
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E6DFD5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ivyNavy uppercase tracking-wider mb-1">Collegiate Email (.edu)</label>
                <input 
                  type="email" 
                  required 
                  placeholder="student@university.edu"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E6DFD5] rounded-xl text-sm"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 bg-[#F3EFE6] text-ivyNavy py-3 rounded-xl text-xs font-semibold hover:bg-[#E6DFD5]"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-ivyNavy text-white py-3 rounded-xl text-xs font-semibold hover:bg-ivyNavy/90 shadow-sm"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}