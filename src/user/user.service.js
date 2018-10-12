const _ = require('lodash');
const bcrypt = require('bcrypt');
const { UserModel } = require('./user.model');

class UserService {

    constructor(Model) {
        this.Model = Model || UserModel;
    }

    async save(requestUser) {
        let user = new this.Model(requestUser);
        user.password = await this.hashPassword(user.password);
        user = await user.save();
        return _.pick(user, '_id', 'username')
    }

    async hashPassword(pass) {
        let salt = await bcrypt.genSalt(10);
        return bcrypt.hash(pass, salt)
    }
}

module.exports = UserService;
