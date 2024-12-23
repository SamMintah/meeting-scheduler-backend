const sendNotification = (type, meeting) => {
    const messages = {
        created: `Meeting created: ${meeting.title} for user ${meeting.userId}`,
        updated: `Meeting updated: ${meeting.title} for user ${meeting.userId}`,
        cancelled: `Meeting cancelled: ${meeting.title} for user ${meeting.userId}`
    };
    console.log(messages[type]);
};

module.exports = {
    sendNotification
};
