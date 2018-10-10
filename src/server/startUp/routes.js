const users = require('../../user/user.route');

module.exports = function (app) {
    app.use('/api/users', users);
};
