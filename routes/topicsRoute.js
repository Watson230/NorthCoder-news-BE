const express = require('express');
const router = express.Router();

const topicCtrl = require('../controllers/topicsCtrl.js')


router.get('/', topicCtrl.fetchTopicsAPI);

router.get('/:id/articles', topicCtrl.fetchTopicsArticles)



module.exports = router