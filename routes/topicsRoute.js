const express = require('express');
const router = express.Router();

const{ fetchTopics, fetchTopicsArticles }= require('../controllers/topicsCtrl.js');


router.get('/', fetchTopics);

router.get('/:topicName/articles', fetchTopicsArticles);



module.exports = router;