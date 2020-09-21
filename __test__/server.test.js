'use strict';

const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

// process.env.KEY = 'mytoken';
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

describe('server.js', () => {

  it('should respond with 404 on an invalid route', async () => {
    let result = await mockRequest.get('/class').send();

    // return mockRequest.get('/class')
    // .then((results) => {
    expect(result.status).toBe(404);
    // }).catch(console.error);
  });


  it('should respond with 500 Error with error path ', () => {
    return mockRequest
      .get('/error').then(results => {
        expect(results.status).toBe(500);
      }).catch(e => console.error(e));
  });


  it('test post /signup', () => {
    const data = {
      'username': 'sondos',
      'password': '1234',
    };
    return mockRequest.post('/signup')
      .send(data)
      .then(result => {
        expect(result.status).toBe(201);
      }).catch(err => {
        console.log(err);
      }).catch(console.error);
  });


  it('test post /signin', async () => {
    const data = {
      'username': 'sondos1',
      'password': '1234',
    };
    await mockRequest.post('/signup').send(data);
    let result = await mockRequest.post('/signin').auth('sondos1', '1234');
    expect(result.status).toBe(200);

  });

  it('test post /user', async() => {
    // const data = {
    //   'username': 'sondos',
    //   'password': '1234',
    // };
    // await mockRequest.post('/signup').send(data);
    await mockRequest.get('/user').then(result=>{
      expect(result.status).toBe(200);

    });
  });


});