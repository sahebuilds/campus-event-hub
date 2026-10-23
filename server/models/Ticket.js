const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true 
  },
  studentName: { type: String, required: true },   // e.g., Julian Vance
  studentId: { type: String, required: true },     // e.g., STU-94021
  email: { type: String, required: true },         // .edu email address
  tokenId: { type: String, required: true, unique: true }, // e.g., #OX-9924-A
  seatAllocation: { type: String, required: true }, // e.g., Nave Row C, Stalls #14
  status: { 
    type: String, 
    enum: ['Valid', 'Archived', 'Transferred'], 
    default: 'Valid' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);