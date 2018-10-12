const UserService = require('../../src/user/user.service');
const MockUserModel = require('./mock.user.model');

describe('UserDalTest', () => {
    describe('save', () => {
        it('should not return password', async function () {
            let requestUser = {
                username: "user",
                password: "pass"
            };

            const service = new UserService(MockUserModel);
            const user = await service.save(requestUser);
            expect(user).toHaveProperty('_id');
            expect(user).toHaveProperty('username', 'user');
            expect(user).not.toHaveProperty('password');
        });

        it('should hash the user password', async function () {
            let requestUser = {
                username: "user",
                password: "pass"
            };

            const service = new UserService(MockUserModel);
            await service.save(requestUser);
            const user = MockUserModel.getLastSavedUser();
            expect(user.password).not.toEqual("pass");
        });
    })
});