'use strict';

require('dotenv').config();
const base64 = require('base-64');

const { server } = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require('jsonwebtoken');

// process.env.KEY = 'mytoken';
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
    const token = jwt.verify(result.body.token, process.env.KEY);
    expect(token).toBeDefined();
  });

  // it('test post /user', async () => {
  //   const data = {
  //     username: 'Ali',
  //     password: '1234',
  //   };
  //   const autHeader = base64.encode(
  //     `${data.username}:${data.password}`,
  //   );
  //   console.log('header test', autHeader)
  //   await mockRequest.post('/signup').send(data);
  //   const bearerHeader = await jwt.sign({ username: 'sondos' }, '555');
  //   console.log('baererheader',bearerHeader)
  //   await mockRequest.get('/user').set('authorization', `Bearer ${bearerHeader}`)
  //     .then(result => {
  //       expect(result.status).toBe(200);

  //     });
  // });


});