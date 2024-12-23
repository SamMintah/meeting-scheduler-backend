const users = [
    { id: 1, name: 'User 1', timezone: 'America/New_York' },
    { id: 2, name: 'User 2', timezone: 'Europe/London' }
];

const findUser = (id) => users.find((u) => u.id === id);

module.exports = {
    users,
    findUser
};
