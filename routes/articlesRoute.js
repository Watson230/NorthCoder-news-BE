const express = require('express');
const router = express.Router();

const {fetchArticles,fetchArticleComments,fetchArticle, 
  patchVotes,addComment,fetchMostPopularArticles} =require('../controllers/articlesCtrl');



router.get('', fetchArticles );

router.get('/mostPopular',fetchMostPopularArticles );

router.get('/:id', fetchArticle);

router.get('/:id/comments',fetchArticleComments );

router.post('/:id/comments', addComment);

router.put('/:id', patchVotes);



module.exports = router;