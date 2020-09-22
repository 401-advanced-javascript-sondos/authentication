'use strict';

const express=require('express');
const router=express.Router();
const basicAuth=require('./middleware/basic');
const userSchema=require('./models/usersModel');
const oauth=require('./middleware/oauth');

router.get('/user',async(req,res)=>{
  // console.log('here');
  const result= await userSchema.find({});
  // console.log('result',result);
  res.status(200).json(result);
});


router.post('/signin', basicAuth, async (req,res) => {
//    const data= req.haders.authorization
  const{valid,user}=req;
  // console.log('valid',valid);
  // console.log('user',user);
  if(valid){
    // console.log('in')
    // const authraUser= new userSchema({username:user.username});
    // console.log('authUser0',authraUser)
    const token= await userSchema.generateToken(user);
    // console.log('out sign in',{token});
    res.status(200).send({ token, user });

  }else{
    res.status(401).send({msg:'username or passward is wrong'});

  }
});


router.post('/signup',async (req,res) => {
  const schema=new userSchema(req.body);
  // console.log(schema)
  const data =await schema.save();
  // console.log(data)
  res.status(201).send({data});

});


router.get('/oauth',oauth,(req,res)=>{
  res.status(200).json({token :req.token,user :req.user});

});


module.exports=router;