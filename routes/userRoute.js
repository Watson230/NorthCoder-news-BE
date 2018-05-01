const express = require('express');
const router = express.Router();

const articlesCtrl =require('../controllers/articlesCtrl');
const usersCtrl = require('../controllers/usersCtrl');

router.get('', usersCtrl.fetchAllUsers);

router.get('/:username', usersCtrl.fetchUser);

router.get('/:id/articles', articlesCtrl.fetchUserArticles);

router.get('/:id/comments', usersCtrl.fetchUserComments);


module.exports = router;