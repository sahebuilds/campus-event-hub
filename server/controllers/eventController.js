const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/events
const createEvent = async (req, res) => {
  try {
    const { title, category, venue, date, capacity, price, tierPrivilege } = req.body;

    if (!title || !category || !venue || !date || !capacity) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const event = new Event({
      title,
      category,
      venue,
      date,
      capacity: Number(capacity),
      price: price ? Number(price) : 0,
      tierPrivilege: tierPrivilege || 'Delegate',
      reservedCount: 0,
      status: 'Active'
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  createEvent
};