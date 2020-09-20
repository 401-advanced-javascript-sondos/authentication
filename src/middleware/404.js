'use strict';

function notfound(req,res,next){
  res.status(404).json('Page Not Found');
}

module.exports=notfound;