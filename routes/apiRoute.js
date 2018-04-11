const express = require('express');
const router = express.Router();

const topicCtrl = require('../controllers/topicsCtrl.js')
const articlesCtrl =require('../controllers/articlesCtrl')
const usersCtrl = require('../controllers/usersCtrl')


console.log('api router')

router.get('', );



router.get('/topics', topicCtrl.fetchTopicsAPI);

router.get('/topics/:id/articles', topicCtrl.fetchTopicsArticles)

router.get('/articles',articlesCtrl.fetchArticles )

router.get('/articles/:id', articlesCtrl.fetchArticle)

router.get('/articles/:id/comments',articlesCtrl.fetchArticleComments )

router.get('/users', usersCtrl.fetchAllUsers)

router.get('/users/:id', usersCtrl.fetchUser)

router.get('/users/:id/articles', articlesCtrl.fetchUserArticles)

router.get('/users/:id/comments', usersCtrl.fetchUserComments)


router.put('/articles/:id', articlesCtrl.patchVotes)

router.post('/articles/:article_id/comments', articlesCtrl.addComment)

// router.delete()







module.exports = {router}