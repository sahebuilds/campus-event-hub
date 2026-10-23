import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, X, Calendar, MapPin, Download, AlertCircle } from 'lucide-react';

export default function OrganizerDashboardPage() {
    const [events, setEvents] = useState([]);
    const [selectedEventAttendees, setSelectedEventAttendees] = useState([]);
    const [activeEventTitle, setActiveEventTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrganizerEvents();
    }, []);

    const fetchOrganizerEvents = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/events');
            setEvents(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching events:", err);
            setError("Failed to load organizer events.");
            setLoading(false);
        }
    };

    const handleViewAttendees = async (eventId, eventTitle) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tickets/event/${eventId}/attendees`);
            setSelectedEventAttendees(response.data);
            setActiveEventTitle(eventTitle);
            setIsModalOpen(true);
        } catch (err) {
            console.error("Error fetching attendees:", err);
            alert("Failed to load attendees for this event.");
        }
    };

    const exportToCSV = () => {
        if (selectedEventAttendees.length === 0) {
            alert("No attendees to export!");
            return;
        }

        const headers = "Student Name,Email,Pass Token,Booking Date\n";
        const rows = selectedEventAttendees.map(att => 
            `"${att.studentName}","${att.studentEmail}","${att.ticketToken}","${new Date(att.createdAt).toLocaleDateString()}"`
        ).join("\n");

        const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${activeEventTitle.replace(/\s+/g, '_')}_attendees.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 font-medium">Loading organizer dashboard...</p>
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
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Organizer Command Center</h1>
                    <p className="text-gray-500 mt-1">Monitor campus events, track capacities, and manage registered attendees.</p>
                </div>
            </div>

            {events.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                    <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-lg font-semibold text-gray-700">No Events Published</h3>
                    <p className="text-sm text-gray-500 mt-1">Publish new events to start tracking student registrations.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((ev) => {
                        const capacityPercentage = Math.round((ev.reservedCount / ev.capacity) * 100) || 0;
                        return (
                            <div key={ev._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                                            {ev.category}
                                        </span>
                                        <span className="text-xs font-medium text-gray-500">
                                            {capacityPercentage}% Filled
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mt-2">{ev.title}</h3>
                                    
                                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={15} className="text-indigo-600" />
                                            <span>{ev.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={15} className="text-indigo-600" />
                                            <span>{ev.venue}</span>
                                        </div>
                                    </div>

                                    {/* Capacity Progress Bar */}
                                    <div className="mt-5">
                                        <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                                            <span>Reserved Seats</span>
                                            <span>{ev.reservedCount} / {ev.capacity}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div 
                                                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                                                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleViewAttendees(ev._id, ev.title)}
                                    className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm text-sm"
                                >
                                    <Users size={16} /> View Attendees
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Attendee Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
                        <div className="flex justify-between items-center pb-4 border-b">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Registered Attendees</h2>
                                <p className="text-sm text-gray-500">{activeEventTitle}</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 py-4">
                            {selectedEventAttendees.length === 0 ? (
                                <div className="text-center py-12">
                                    <Users className="mx-auto text-gray-300 mb-3" size={40} />
                                    <p className="text-gray-500 font-medium">No students have registered for this event yet.</p>
                                </div>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b text-xs uppercase text-gray-400 font-semibold">
                                            <th className="pb-3 px-2">Student Name</th>
                                            <th className="pb-3 px-2">Email</th>
                                            <th className="pb-3 px-2">Pass Token</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {selectedEventAttendees.map((att) => (
                                            <tr key={att._id} className="hover:bg-gray-50">
                                                <td className="py-3 px-2 font-medium text-gray-800">{att.studentName}</td>
                                                <td className="py-3 px-2 text-gray-600">{att.studentEmail}</td>
                                                <td className="py-3 px-2 font-mono text-indigo-600 font-semibold">{att.ticketToken}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <div className="pt-4 border-t flex justify-between items-center">
                            <button
                                onClick={exportToCSV}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm shadow-sm"
                            >
                                <Download size={16} /> Export Attendee List (CSV)
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-xl transition-colors text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}