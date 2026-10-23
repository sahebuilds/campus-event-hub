const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  identifier: { type: String, required: true, unique: true }, // STU-ID or ORG-ID
  role: { type: String, enum: ['student', 'organizer'], default: 'student' },
  email: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);