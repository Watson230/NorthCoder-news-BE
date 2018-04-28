const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/commentsCtrl')

router.put('/:id', commentsCtrl.patchVotes)
router.delete('/:id', commentsCtrl.deleteComment)


// router.delete()

module.exports = router