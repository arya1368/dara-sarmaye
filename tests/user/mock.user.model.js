const mongoose = require('mongoose');

class MockUserModel {

    constructor(requestUser) {
        MockUserModel.repository = [];
        this.user = requestUser;
        this.user._id = mongoose.Types.ObjectId();
    }

    save() {
        MockUserModel.repository.push(this.user);
        return Promise.resolve(this.user)
    }

    static getLastSavedUser() {
        return MockUserModel.repository[MockUserModel.repository.length - 1]
    }

    get password() {
        return this.user.password
    }

    set password(pass) {
        this.user.password = pass
    }
}

module.exports = MockUserModel;