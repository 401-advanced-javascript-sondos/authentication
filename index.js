'use strict';

require('dotenv').config();

const mongoose=require('mongoose');
const serverModul=require('./src/server');

const mongoose_url=process.env.URL;

const options={
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(mongoose_url,options);
serverModul.start();