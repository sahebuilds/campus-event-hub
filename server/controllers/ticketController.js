import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";

// @desc    Create / Reserve a ticket pass
// @route   POST /api/tickets
// @access  Public / Student
export const createTicket = async (req, res) => {
  try {
    const { eventId, event, studentName, studentId, studentID, prn, email, seatAllocation } = req.body;

    // Resolve event ID (handles both eventId and event naming conventions from frontend)
    const targetEventId = eventId || event;

    if (!targetEventId) {
      return res.status(400).json({ message: "Event ID is required to book a ticket." });
    }

    // Verify event exists and has capacity
    const targetEvent = await Event.findById(targetEventId);
    if (!targetEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Generate unique verification token if not provided
    const generatedTokenId = `OX-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`;
    
    // Generate default seat allocation if not provided
    const generatedSeat = seatAllocation || `Zone-A-${Math.floor(1 + Math.random() * 50)}`;

    const newTicket = new Ticket({
      event: targetEventId,
      studentName: studentName || "Student Participant",
      studentId: studentId || studentID || prn || "STU-2521001",
      email: email || "student@campus.edu",
      tokenId: generatedTokenId,
      seatAllocation: generatedSeat
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get tickets for a specific user
// @route   GET /api/tickets/user/:userId
export const getUserTickets = async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await Ticket.find({ studentId: userId }).populate("event");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel a ticket pass and release seat
// @route   DELETE /api/tickets/:ticketId
export const cancelTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
    
    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    res.status(200).json({ message: "Ticket successfully cancelled and seat released." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get attendee roster for an event (Organizer)
// @route   GET /api/tickets/event/:eventId/attendees
export const getEventAttendees = async (req, res) => {
  try {
    const { eventId } = req.params;
    const attendees = await Ticket.find({ event: eventId });
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};