process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;

const app = require('../index');
const request = require('supertest');

describe('Test the root path', () => {
    it('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).equal(200);
    });
    
})
