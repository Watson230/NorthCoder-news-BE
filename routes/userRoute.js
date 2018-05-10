const express = require('express');
const router = express.Router();

const{fetchUserArticles} =require('../controllers/articlesCtrl');
const{fetchUser,fetchUserComments, fetchAllUsers} = require('../controllers/usersCtrl');

router.get('', fetchAllUsers);

router.get('/:username', fetchUser);

router.get('/:id/articles', fetchUserArticles);

router.get('/:id/comments', fetchUserComments);


module.exports = router;