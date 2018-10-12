const users = require('../../user/user.route');
const sessions = require('../../session/session.route');

module.exports = function (app) {
    app.use('/api/users', users);
    app.use('/api/sessions', sessions);
};
