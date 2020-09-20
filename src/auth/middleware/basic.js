'use strict';

const base64 = require('base-64');
const UserSchema = require('../models/usersModel');

module.exports = async (req,res,next)=>{
  // pass the username and password to this method;
  // Basic Authentication (HTTP Headers)
  // we expect to have req headers
  // Basic YWhtYWQ6MTIzNA==
  const auth = req.headers.authorization.split(' ');
  //   console.log('auth',auth)
  if (auth[0] === 'Basic') {
  // take the auth[1]: YWhtYWRfc2hlbGEgOjEyMzQ=
  // after decode ahmad_shela:1234
  // 1st decode auth[1] -> then split it on :
    const [username, password] = base64.decode(auth[1]).split(':');
    // console.log([username, password])
    const authUser = new UserSchema({ username, password });
    // console.log('authuser',authUser)
    const { valid, user } = await authUser.authenticate();
    req.valid = valid;
    req.user = user;
    next();
  }else{
    next('Invalid Login!! ');}
};

// module.exports = basic;