const { UserModel } = require('./user.model');
const _ = require('lodash');

module.exports = class UserDal {

    static async save(requestUser) {
        let user = new UserModel(requestUser);
        await user.save();
        return _.pick(user, '_id', 'username')
    }
};
