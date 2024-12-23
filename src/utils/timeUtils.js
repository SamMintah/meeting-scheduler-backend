const { DateTime } = require('luxon'); // Assuming luxon is imported

const hasTimeConflict = (userId, startTime, endTime, meetings, excludeMeetingId = null) => {
    if (!Array.isArray(meetings)) {
        console.error("meetings is not an array:", meetings);
        throw new Error('meetings is not an array');
    }

    return meetings.some(meeting => {
        if (meeting.id === excludeMeetingId) return false;
        if (meeting.userId !== userId) return false;

        const meetingStart = DateTime.fromISO(meeting.startTime);
        const meetingEnd = DateTime.fromISO(meeting.endTime);
        const newStart = DateTime.fromISO(startTime);
        const newEnd = DateTime.fromISO(endTime);

        return (newStart < meetingEnd && newEnd > meetingStart);
    });
};


module.exports = {
    hasTimeConflict
};