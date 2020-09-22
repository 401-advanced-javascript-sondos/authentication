'use strict';

const express=require('express');
require('dotenv').config();
const cors=require('cors');
const morgan=require('morgan');
const notfound =require('./middleware/404');
const handdleerror=require('./middleware/500');
const router =require('./auth/router');


const app=express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


//==============
app.use('/',router);


//--------error 500---------
app.get('/error', (req, res) => {
  throw new Error('bad Request .... ');
});

//=====================
app.use('*',notfound);
app.use(handdleerror);

//===================== exported server =============
module.exports={
  server:app,
  start: port=>{
    let PORT=port || process.env.PORT || 3000;
    app.listen(PORT,()=>console.log(`listen to port : ${PORT}`));
  },
};







