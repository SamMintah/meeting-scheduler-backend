const meetings = [];

const addMeeting = (meeting) => {
    meetings.push(meeting);
};

const getAllMeetings = () => meetings;

const removeMeeting = (id) => {
    const index = meetings.findIndex((m) => m.id === id);
    if (index !== -1) {
        return meetings.splice(index, 1)[0]; // Return the removed meeting
    }
    return null;
};

const updateUserMeeting = (id, updatedMeeting) => {
    const index = meetings.findIndex((m) => m.id === id);
    if (index !== -1) {
        meetings[index] = { ...meetings[index], ...updatedMeeting };
        return meetings[index];
    }
    return null;
};

const getMeeting = (id) => meetings.find((m) => m.id === id);

const getUserMeetings = (userId) => meetings.filter((m) => m.userId === userId);

module.exports = {
    addMeeting,
    removeMeeting,
    getAllMeetings,
    updateUserMeeting,
    getMeeting,
    getUserMeetings
};
