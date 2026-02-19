const app = require('../app');
const request  = require('supertest');
const connectDB = require('../data/database');
const {ObjectId} = require('mongodb');

describe('Test all GET methods in the reservations collection', () => {

    let test_id;

    beforeAll(async () => {
        await connectDB();
    });
    afterAll( () => {
        console.log('Done Reservations');
    });

    it('return a 200 status code after a GET request to /reservations', async () => {
        const response = await request(app).get('/reservations');
        test_id = response._body[0];
        expect(response.statusCode).toBe(200);
        expect(response._body).not.toBeNull();
        expect(response._body).not.toBeUndefined();
    });

    it('return a 200 status code after a GET request to /reservations/{id}', async () => {
        const response = await request(app).get(`/reservations/${test_id._id}`);
        expect(response.statusCode).toBe(200);
        expect(response._body).not.toBeNull();
        expect(response._body).not.toBeUndefined();
    });

    it('return a 400 error code after a GET request to /reservations/{id} with invalid id', async () => {
        const _id = '6995daa528664de82b562dbz';
        const response = await request(app).get(`/reservations/${_id}`);
        expect(response.statusCode).toBe(400);
        expect(response.text).toMatch(/Must use a valid Reservation id/);
    });

    it('return a 404 not found error code after a GET request to /reservations/{id} for an unknown Id', async () => {
        const _id = new ObjectId();
        const response = await request(app).get(`/reservations/${_id}`);
        expect(response.statusCode).toBe(404);
        expect(response.text).toMatch(/Reservation not found/);
    });
});
