const express = require('express');
const router = express.Router();

const {patchVotes, deleteComment} = require('../controllers/commentsCtrl');

router.put('/:id', patchVotes);
router.delete('/:id', deleteComment);




module.exports = router;