/*eslint-disable no-console*/
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
require('dotenv').config({
  path: `./.${process.env.NODE_ENV}.env`
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apirouter =  require('./routes/apiRoute').router;
const app = express();
const config = require('./config');
const cors = require('cors');

const path = require('path');
mongoose.Promise = Promise;




mongoose.connect(process.env.DB_URI, { useMongoClient: true })
  .then(() => console.log('successfully connected to', process.env.DB_URI))
  .catch(err => console.log('connection failed', err));



app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    
  return res.status(200).sendfile(path.join(__dirname + '/endPoints.html'));
}
);

app.use('/api', apirouter);


module.exports = {app};
