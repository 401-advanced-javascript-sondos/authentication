'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const uniqueValidator = require('mongoose-unique-validator');



let User = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  email: { type: String },
  fullname: { type: String },
  role: { type: String, enum: ['admin', 'editor', 'writer', 'user'] }
});

// User.plugin(uniqueValidator);


User.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 5);
  // console.log(this.password);
  next();
});



User.statics.authenticate = async function (username, password) {
  //username and password come from new schema from basic auth line 19
  // password here is not bcrypt
  // let {username , password}=this;
  // console.log('this',this);
  let user = await this.findOne({ username });
  console.log('user', user);
  let valid = await bcrypt.compare(password, user.password);
  // console.log('valid',valid);
  return { valid, user };
};


// User.methods.generateToken=function(){
//   const { username } = this;
//   const token=jwt.sign({username},process.env.KEY);
//   // console.log('token',token);
//   return token;
// };


User.statics.generateToken = function (user) {
  // const { username } = this;
  const token = jwt.sign({ username: user.username }, process.env.KEY);
  // console.log('token',token);
  return token;
};



User.statics.get = async function (user) {
  console.log(user);
  let result = await this.findOne({ username: user.username });
  if (result) {
    return result;
  } else {
    console.log('create new useer');
    let newuser = new this ({username:user.username,password:user.password });
    return newuser.save();
  };
};

module.exports = mongoose.model('User', User);