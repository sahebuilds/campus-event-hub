const express = require('express');
const router = express.Router();
const { 
    createTicket, 
    getUserTickets, 
    getEventAttendees 
} = require('../controllers/ticketController');

router.post('/', createTicket);
router.get('/user/:userId', getUserTickets);
router.get('/event/:eventId/attendees', getEventAttendees); // New Route for Organizers
const { cancelTicket } = require('../controllers/ticketController');
// Add this line with your other routes
router.delete('/:ticketId', cancelTicket);
module.exports = router;