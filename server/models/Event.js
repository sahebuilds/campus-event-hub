const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: String, required: true },
  capacity: { type: Number, required: true },
  reservedCount: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  tierPrivilege: { type: String, default: 'Delegate' },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);