import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ticket, Calendar, MapPin, Trash2, AlertCircle } from 'lucide-react';

export default function TicketWalletPage() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Retrieves user ID from localStorage or uses a fallback demo ID
    const userId = localStorage.getItem('userId') || 'sampleUserId123';

    useEffect(() => {
        fetchUserTickets();
    }, []);

    const fetchUserTickets = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/tickets/user/${userId}`);
            setTickets(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching tickets:", err);
            setError("Failed to load your ticket wallet.");
            setLoading(false);
        }
    };

    const handleCancelTicket = async (ticketId) => {
        if (!window.confirm("Are you sure you want to cancel this pass? This will free up your seat.")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`);
            // Immediately update UI state by removing the cancelled ticket
            setTickets(tickets.filter(t => t._id !== ticketId));
            alert("Pass cancelled successfully! Seat released.");
        } catch (err) {
            console.error("Error cancelling ticket:", err);
            alert("Failed to cancel the pass. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 font-medium">Loading your ticket wallet...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64 text-red-600 gap-2">
                <AlertCircle size={20} />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Ticket Wallet</h1>
                <p className="text-gray-500 mt-1">View your reserved event passes and unique check-in tokens.</p>
            </div>

            {tickets.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                    <Ticket className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-lg font-semibold text-gray-700">No Passes Reserved Yet</h3>
                    <p className="text-sm text-gray-500 mt-1">Browse upcoming campus events and secure your seat passes.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket) => {
                        const event = ticket.eventId || {};
                        return (
                            <div 
                                key={ticket._id} 
                                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden"
                            >
                                {/* Decorative top accent */}
                                <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-600" />

                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                                            {event.category || 'Event Pass'}
                                        </span>
                                        <span className="font-mono text-xs font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                            {ticket.ticketToken}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mt-2">
                                        {event.title || 'Campus Event'}
                                    </h3>

                                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={15} className="text-indigo-600" />
                                            <span>{event.date || 'Date TBA'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={15} className="text-indigo-600" />
                                            <span>{event.venue || 'Campus Venue'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-xs text-gray-400">
                                        Booked: <span className="font-medium text-gray-700">{ticket.studentName}</span>
                                    </div>
                                    <button
                                        onClick={() => handleCancelTicket(ticket._id)}
                                        className="flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <Trash2 size={15} /> Cancel Pass
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}