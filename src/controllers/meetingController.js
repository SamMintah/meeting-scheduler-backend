const {
  addMeeting,
  removeMeeting,
  updateUserMeeting,
  getMeeting,
  getAllMeetings
} = require('../services/meetingService');
const { DateTime } = require('luxon');
const { findUser, users } = require('../services/userService');
const { hasTimeConflict } = require('../utils/timeUtils');
const { sendNotification } = require('../utils/notifications');

// Create meeting
const createMeeting = (req, res) => {
  const { userId, title, description, startTime, endTime, participants } = req.body;

  // Validate input
  if (!userId || !title || !startTime || !endTime || !participants || participants.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate user exists
  const user = findUser(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Get the list of existing meetings for the user
  const meetings = getAllMeetings(); 

  // Check for time conflicts
  if (hasTimeConflict(userId, startTime, endTime, meetings)) {
    return res.status(409).json({ error: 'Time slot conflict' });
  }
  // Create meeting
  const meeting = {
    id: Date.now(),
    userId,
    title,
    description,
    startTime,
    endTime,
    participants
  };

  addMeeting(meeting);
  // Mock notification
  sendNotification('created', meeting);
  res.status(201).json(meeting);
};

// Get meetings for a user
const getUserMeetings = (req, res) => {
  const userId = parseInt(req.params.userId);

  // Validate user existence
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Retrieve user's meetings from the meetings array
  const userMeetings = getAllMeetings().filter((m) => m.userId === userId);

  // If no meetings found for the user
  if (userMeetings.length === 0) {
    return res.status(404).json({ error: 'No meetings found for this user' });
  }
  
  const response = {
    message: 'meetings fetched successfully',
    data: userMeetings
  }
  res.json(response);
};

// Get available slots
const getAvailableSlots = (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = findUser(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { date } = req.query; // Get the date from query params
  if (!date) {
    return res.status(400).json({ error: 'Date query parameter is required' });
  }

  // Parse the provided date and set the time to the start of the day
  const selectedDate = DateTime.fromISO(date, { zone: user.timezone }).startOf('day');
  if (!selectedDate.isValid) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  const availableSlots = [];
  const meetings = getAllMeetings().filter((m) => m.userId === userId);
  // Fetch meetings for the user

  for (let hour = 9; hour < 17; hour++) {
    const slotStart = selectedDate.plus({ hours: hour });
    const slotEnd = slotStart.plus({ hours: 1 });

    // Check for time conflicts with existing meetings
    if (!hasTimeConflict(userId, slotStart.toISO(), slotEnd.toISO(), meetings)) {
      availableSlots.push({
        startTime: slotStart.toISO(),
        endTime: slotEnd.toISO(),
      });
    }
  }
 
  const response = {
    message: 'available time fetched successfully',
    data: availableSlots
  }
  res.json(response);
};


// Update meeting
const updateMeeting = (req, res) => {
  const meetingId = parseInt(req.params.meetingId);
  const { startTime, endTime, title, description } = req.body; 

  const meeting = getMeeting(meetingId);
  if (!meeting) {
    return res.status(404).json({ error: 'Meeting not found' });
  }

  // Fetch all meetings for the user (you may get this from the database or an array)
  const userMeetings = getAllMeetings().filter((m) => m.userId === meeting.userId);

  // Check for time conflicts if time is being updated
  if (startTime && endTime) {
    if (hasTimeConflict(meeting.userId, startTime, endTime, userMeetings, meetingId)) {
      return res.status(409).json({ error: 'Time slot conflict' });
    }
  }

  // Pass all updatable fields to `updateUserMeeting`
  const updatedMeeting = updateUserMeeting(meetingId, {
    startTime,
    endTime,
    title,
    description,
  });

  // Mock notification
  sendNotification('updated', updatedMeeting);
  res.json(updatedMeeting);
};



// Delete meeting
const deleteMeeting = (req, res) => {
  const meetingId = parseInt(req.params.meetingId);

  const meeting = removeMeeting(meetingId);

  if (!meeting) {
    return res.status(404).json({ error: 'Meeting not found' });
  }

  // Mock notification
  sendNotification('cancelled', meeting);
  res.status(200).json({message:'meeting cancelled'});
};

module.exports = {
  createMeeting,
  getAvailableSlots,
  updateMeeting,
  deleteMeeting,
  getUserMeetings
};
