const express = require('express');
const router = express.Router();

const articlesCtrl =require('../controllers/articlesCtrl');


router.get('',articlesCtrl.fetchArticles );

router.get('/mostPopular',articlesCtrl.fetchMostPopularArticles );

router.get('/:id', articlesCtrl.fetchArticle);

router.get('/:id/comments',articlesCtrl.fetchArticleComments );

router.post('/:id/comments', articlesCtrl.addComment);

router.put('/:id', articlesCtrl.patchVotes);



module.exports = router;