'use strict';


function handdelError(err,req,res,next){
  console.log('error type 500');
  res.status(500);
  res.json({error:err});
}

module.exports=handdelError;