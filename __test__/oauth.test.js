'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

process.env.SECRET = 'muysecreto';


describe('server.js', () => {

    it('should respond with 404 on an invalid route', async () => {
        let result = await mockRequest.get('/class').send();

        // return mockRequest.get('/class')
        // .then((results) => {
        expect(result.status).toBe(404);
        // }).catch(console.error);
    });


    // it('should oauth ', async () => {

    //     const data = {
    //         'username': 'sondos',
    //         'password': '1234',
    //     };
    //     await mockRequest.post('/signup').send(data);


    //     let result = await mockRequest.get('/oauth').send(data);
    //     // expect(result).toBe();
    //     expect(result.token).toBe('1');

        

    // });

});