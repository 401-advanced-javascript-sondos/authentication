'use strict';

const user = require('../models/usersModel');

module.exports = (req, res, next) => {

  // Checks the Users model to see if this is a valid user and the right password
  if (!req.headers.authorization) {
    next('Invalid Login!!!');
    return;
  };

  // console.log('req.header auth-------->',req.headers.authorization);
  const auth = req.headers.authorization.split(' ');

  if (auth[0] == 'Bearer') {
    const token = auth[1];
    console.log('token', token);
    user.authenticateToken(token).then(result => {
      req.user = result;
      next();

    });

  } else {
    return 'Invalid Token';
  };


};