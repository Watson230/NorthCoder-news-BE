const commentModel = require('../models/comments')


function patchVotes(req, res, next) {
   

    const commentId = req.params.id
    const vote = req.query.vote
    

    if (vote === 'up') voteInc = 1
    if (vote === 'down') voteInc = -1
    

    commentModel.findOneAndUpdate({ '_id': commentId }, { $inc: { votes: voteInc } }, { 'new': true })

        .then(comment=> {
            return res.status(200).send(comment)})

        .catch(err => {
            console.log(err);
            if(err.name === 'CastError') return next({ status: 404, msg: `comment ${commentId} does not exist` })
            return res.status(500).send({ error: err })

        })
}


module.exports={patchVotes}