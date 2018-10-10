const request = require('supertest');
const mongoose = require('mongoose');

describe('/api/users', () => {
    afterAll(() => mongoose.disconnect());

    let server;
    beforeEach(() => {
        server = require('../../src/server');
    });

    afterEach(() => {
        server.close();
    });

    describe('POST', () => {
        it('should response with 400 status with message ""username" is required" when given user does not have "username" property', async function () {
            const res = await request(server)
                .post('/api/users')
                .send({
                    password: "pass"
                });

            expect(res.status).toBe(400);
            expect(res.body.message[0].message).toBe('"username" is required')
        });

        it('should response with 400 status with message ""password" is required" when given user does not have "password" property', async function () {
            const res = await request(server)
                .post('/api/users')
                .send({
                    username: "user"
                });

            expect(res.status).toBe(400);
            expect(res.body.message[0].message).toBe('"password" is required')
        });

        it('should response with 201 status and contains user._id and user.username in request body', async function () {
            const res = await request(server)
                .post('/api/users')
                .send({
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
