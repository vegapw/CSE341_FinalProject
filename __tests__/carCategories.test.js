const app = require('../app');
const request  = require('supertest');
const connectDB = require('../data/database');
const {ObjectId} = require('mongodb');

describe('Test all GET methods in the carCategories collection', () => {

    let test_id;

    beforeAll(async () => {
        await connectDB();
    });
    afterAll( () => {
        console.log('Done CarCategories');
    });

    it('return a 200 status code after a GET request to /carCategories', async () => {
        const response = await request(app).get('/carCategories');
        test_id = response._body[0];
        expect(response.statusCode).toBe(200);
        expect(response._body).not.toBeNull();
        expect(response._body).not.toBeUndefined();
    });

    it('return a 200 status code after a GET request to /carCategories/{id}', async () => {
        const response = await request(app).get(`/carCategories/${test_id._id}`);
        expect(response.statusCode).toBe(200);
        expect(response._body).not.toBeNull();
        expect(response._body).not.toBeUndefined();
    });

    it('return a 400 error code after a GET request to /carCategories/{id} with invalid id', async () => {
        const _id = '6995daa528664de82b562dbz';
        const response = await request(app).get(`/carCategories/${_id}`);
        expect(response.statusCode).toBe(400);
        expect(response.text).toMatch(/Must use a valid Car Category id/);
    });

    it('return a 404 not found error code after a GET request to /cars/{id} for an unknown Id', async () => {
        const _id = new ObjectId();
        const response = await request(app).get(`/carCategories/${_id}`);
        expect(response.statusCode).toBe(404);
        expect(response.text).toMatch(/Car Category not found/);
    });
});
