const express = require('express');
const router = express.Router();
const {
  createMeeting,
  deleteMeeting,
  getAvailableSlots,
  updateMeeting,
  getUserMeetings
} = require('../controllers/meetingController');

router.post('/meetings', createMeeting);
router.get('/users/:userId/meetings', getUserMeetings);
router.get('/users/:userId/available-slots', getAvailableSlots);
router.put('/meetings/:meetingId', updateMeeting);
router.delete('/meetings/:meetingId', deleteMeeting);

module.exports = router;
