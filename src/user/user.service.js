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

    isValid(credential) {
        return new Promise(async (resolve, reject) => {
            const user = await this.Model.findOne({
                username: credential.username
            });
            if (!user)
                return reject(new Error('invalid username or password'));

            const isValidPassword = bcrypt.compare(credential.password, user.password);
            if (!isValidPassword)
                return reject(new Error('invalid username or password'));

            return resolve(_.pick(user, '_id', 'username'))
        })
    }
}

module.exports = UserService;
