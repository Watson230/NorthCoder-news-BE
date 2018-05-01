const express = require('express');
const router = express.Router();

const topicCtrl = require('../controllers/topicsCtrl.js');


router.get('/', topicCtrl.fetchTopicsAPI);

router.get('/:topicName/articles', topicCtrl.fetchTopicsArticles);



module.exports = router;