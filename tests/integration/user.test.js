const request = require('supertest');
const mongoose = require('mongoose');

describe('/api/users', () => {
    afterAll(async () => await mongoose.connection.close());

    let server;
    beforeEach(() => {
        server = require('../../src/server');
    });

    afterEach(() => {
        server.close();
    });

    describe('POST', () => {
        const execute = (user) => {
            return request(server)
                .post('/api/users')
                .send(user);
        };

        it('should response with 400 status with message ""username" is required" ' +
            'when given user does not have "username" property', async function () {
            const res = await execute({
                password: "pass"
            });

            expect(res.status).toBe(400);
            expect(res.body.message[0].message).toBe('"username" is required')
        });

        it('should response with 400 status with message ""password" is required" ' +
            'when given user does not have "password" property', async function () {
            const res = await execute({
                username: "user"
            });

            expect(res.status).toBe(400);
            expect(res.body.message[0].message).toBe('"password" is required')
        });

        it('should response with 201 status and contains user._id and user.username in request body', async function () {
            const res = await execute({
                username: "user",
                password: "pass"
            });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('username', 'user');
            expect(res.body).not.toHaveProperty('password')
        });
    })
});
