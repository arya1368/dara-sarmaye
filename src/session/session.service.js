const UserService = require('../user/user.service');
const jwt = require('jsonwebtoken');

const userService = new UserService();

class SessionService {

    static async newInstance(credential) {
        const user = await userService.isValid(credential);
        return new SessionService(user)
    }

    constructor(user) {
        this.user = user;
    }

    generateToken() {
        return jwt.sign({
            userId: this.user._id,
            username: this.user.username
        }, 'privateKey')
    }
}

module.exports = SessionService;