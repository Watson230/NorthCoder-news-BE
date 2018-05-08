const express = require('express');
const router = express.Router();

const fetchArticles =require('../controllers/articlesCtrl').fetchArticles;
const fetchMostPopularArticles = require('../controllers/articlesCtrl').fetchMostPopularArticles;
const fetchArticle= require('../controllers/articlesCtrl').fetchArticle;
const fetchArticleComments= require('../controllers/articlesCtrl').fetchArticleComments;
const addComment= require('../controllers/articlesCtrl').addComment;
const patchVotes= require('../controllers/articlesCtrl').patchVotes;


router.get('', fetchArticles );

router.get('/mostPopular',fetchMostPopularArticles );

router.get('/:id', fetchArticle);

router.get('/:id/comments',fetchArticleComments );

router.post('/:id/comments', addComment);

router.put('/:id', patchVotes);



module.exports = router;