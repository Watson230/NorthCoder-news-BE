const express = require('express');
const router = express.Router();
const path = require('path');

const topicsRouter = require('../routes/topicsRoute');
const articlesRouter = require('../routes/articlesRoute');
const commentsRouter = require('../routes/commentsRoute');
const userRouter = require('../routes/userRoute');




router.use('/', (req, res)=>{
    
  return res.status(200).sendfile(path.join(__dirname + '/endPoints.html'));
}
);

router.use('/topics', topicsRouter);

router.use('/articles', articlesRouter);

router.use('/comments', commentsRouter);

router.use('/users', userRouter );







module.exports = {router};


