const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {UserModel} = require('../../src/user/user.model');
const UserService = require('../../src/user/user.service');

const userService = new UserService();

describe('/api/sessions', () => {
    afterAll(async () => await mongoose.connection.close());

    let server;
    beforeEach(async () => {
        server = require('../../src/server');
        await UserModel.deleteMany({})
    });

    afterEach(() => {
        server.close();
    });

    describe('POST', () => {
        it('should response with 400 status with message ""username" is required" ' +
            'when given user does not have "username" property', async function () {
            const res = await request(server)
                .post('/api/sessions')
                .send({
                    password: "pass"
                });

            expect(res.status).toBe(400);
            expect(res.body.message[0].message).toBe('"username" is required')
        });

        it('should response with 400 status with message ""password" is required" ' +
            'when given user does not have "password" property', async function () {
            const res = await request(server)
                .post('/api/sessions')
                .send({
                    username: "user"
                });

            expect(res.status).toBe(400);
            expect(res.body.message[0].message).toBe('"password" is required')
        });

        it('should response with 400 status with message "invalid username or password" ' +
            'when given invalid password', async function () {
            const res = await request(server)
                .post('/api/sessions')
                .send({
                    username: "user",
                    password: "invalidPass"
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('invalid username or password')
        });

        it('should response with 400 status with message "invalid username or password" ' +
            'when given invalid username', async function () {
            const res = await request(server)
                .post('/api/sessions')
                .send({
                    username: "invalidUsername",
                    password: "pass"
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('invalid username or password')
        });

        it('should response with 200 status and send JWT token in response ' +
            'when given valid credential', async function () {
            await userService.save({
                username: "user",
                password: "pass"
            });

            const res = await request(server)
                .post('/api/sessions')
                .send({
                    username: "user",
                    password: "pass"
                });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('token');
            const decoded = jwt.verify(res.body.token, 'privateKey');
            expect(decoded).toHaveProperty('username', 'user');
            expect(decoded).toHaveProperty('userId')
        });
    })
});