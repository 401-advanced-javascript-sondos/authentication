'use strict';

const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');



let User = mongoose.Schema({
  username: { type: String, require: true ,unique: true},
  password: { type: String, require: true },
  // email: { type: string },
  // fullname: { type: string },
  // role: { type: string, enum: ['admin', 'editor', 'writer', 'user'] }
});

User.plugin(uniqueValidator);


User.pre('save', async function(next){
  this.password = await bcrypt.hash(this.password,5);
  // console.log(this.password);
  next();
});



User.methods.authenticate = async function(){
  let {username , password}=this;
  // console.log('this',this);
  let user= await this.constructor.findOne({username});
  // console.log('user',user);
  let valid= await bcrypt.compare(password,user.password);
  // console.log('valid',valid);
  return {valid,user};
};


User.methods.generateToken=function(){
  const { username } = this;
  const token=jwt.sign({username},process.env.KEY);
  // console.log('token',token);
  return token;
};


module.exports =mongoose.model('User',User);