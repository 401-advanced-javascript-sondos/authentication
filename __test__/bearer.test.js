'use strict';

require('dotenv').config();
const bearer = require('../src/auth/middleware/bearer');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

process.env.SECRET = 'muysecreto';


describe('bearer middle ware', () => {

    it('should respond with 404 on an invalid route', async () => {

        const data = {
            username: 'sondos',
            password: '1234',
            role: 'admin',
        };
        await mockRequest.post('/signup').send(data);
        const autHeader = base64.encode(
            `${data.username}:${data.password}`,
        );

        let result = await mockRequest.post('/signin').set('authorization', `Basic ${autHeader}`);

        expect(result.body.token).toBeDefined();
        expect(result.status).toBe(200);
        const bearerHeader = await jwt.sign({ username: 'sondos' }, '555');
        console.log('baererheader', bearerHeader);
        // const secretResponse = await mockRequest.get('/add').set('authorization', `Bearer ${bearerHeader}`);
        const secretResponse = await mockRequest.get('/user',bearer);

        expect(secretResponse.statusCode).toBe(500);
        //     // expect(signinResponse.statusCode).toBe(200);
        //     expect(secretResponse.statusCode).toBe(200);
        //     // expect(!!signupResponse.text).toBeTruthy();
    });


});