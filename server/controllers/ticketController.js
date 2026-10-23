const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

// Create Ticket (with Duplicate Booking Prevention)
exports.createTicket = async (req, res) => {
    try {
        const { eventId, userId, studentName, studentEmail } = req.body;

        // Check if student already booked this event
        const existingTicket = await Ticket.findOne({ eventId, userId });
        if (existingTicket) {
            return res.status(400).json({ message: "You have already registered for this event!" });
        }

        // Check event capacity
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.reservedCount >= event.capacity) {
            return res.status(400).json({ message: "Event is currently sold out!" });
        }

        // Generate a unique token ID (#OX-XXXX-X)
        const uniqueToken = `#OX-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`;

        const newTicket = new Ticket({
            eventId,
            userId,
            studentName,
            studentEmail,
            ticketToken: uniqueToken
        });

        await newTicket.save();

        // Increment reserved count on the event
        event.reservedCount += 1;
        await event.save();

        res.status(201).json({ message: "Pass reserved successfully!", ticket: newTicket });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Attendees for a Specific Event (For Organizers)
exports.getEventAttendees = async (req, res) => {
    try {
        const { eventId } = req.params;
        const attendees = await Ticket.find({ eventId }).sort({ createdAt: -1 });
        res.status(200).json(attendees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Tickets (For Student Wallet)
exports.getUserTickets = async (req, res) => {
    try {
        const { userId } = req.params;
        const tickets = await Ticket.find({ userId }).populate('eventId');
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel Ticket & Release Seat
exports.cancelTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await Ticket.findById(ticketId);
        
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Find the event and decrement reserved count
        const event = await Event.findById(ticket.eventId);
        if (event && event.reservedCount > 0) {
            event.reservedCount -= 1;
            await event.save();
        }

        // Delete the ticket document
        await Ticket.findByIdAndDelete(ticketId);

        res.status(200).json({ message: "Pass cancelled successfully. Seat released." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};