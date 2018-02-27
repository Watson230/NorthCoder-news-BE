const express = require('express');
const router = express.Router();

const topicCtrl = require('../controllers/topicsCtrl.js')
const articlesCtrl =require('../controllers/articlesCtrl')
const usersCtrl = require('../controllers/usersCtrl')




router.get('', );



router.get('/topics', topicCtrl.fetchTopicsAPI);

router.get('/topics/:id/articles', topicCtrl.fetchTopicsArticles)

router.get('/articles',articlesCtrl.fetchArticles )

router.get('/articles/:id/comments',articlesCtrl.fetchArticleComments )

router.get('/users/:id', usersCtrl.fetchUser)


module.exports = {router}