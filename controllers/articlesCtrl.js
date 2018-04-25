const articleModel = require('../models/articles')
const commentModel = require('../models/comments')


function fetchArticles(req, res) {
    const lastSeen = req.query.last_seen;
    const query = lastSeen ? { _id: { $gt: lastSeen } } : {};

    return articleModel.find(query).limit(10)
        .then(articles => res.status(200).send(articles))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })
}

function fetchArticle(req, res) {

    let articleId = req.params.id

    return articleModel.find({ '_id': articleId })
        .then(article => res.status(200).send(article))
        .catch(err => {
            console.log(err);
            // err.name === 'CastError'
            return res.status(500).send({ error: err })

        })
}


function fetchArticleComments(req, res) {

    let articleId = req.params.id

    return commentModel.find({ 'belongs_to': articleId })

        .then(comments => res.status(200).send(comments))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })


}

function fetchUserArticles(req, res) {

    let user = req.params.id


    articleModel.find({ 'created_by': `${user}` })

        .then(userArticles => res.status(200).send(userArticles))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })



}

function patchVotes(req, res) {

    const articleId = req.params.id
    const vote = req.query.vote
    let voteInc

    if (vote === 'up') voteInc = 1
    if (vote === 'down') voteInc = -1

    articleModel.findOneAndUpdate({ '_id': articleId }, { $inc: { votes: voteInc } }, { returnNewDocument: true })

        .then(Article => res.status(200).send(Article))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })
}

function addComment(req, res) {
    console.log('hello')
    let articleId = req.params.id
    console.log(req.body)
    const comment = commentModel({
        body: req.body.comment,
        belongs_to: articleId
    }).save().then(newComment =>{res.status(200).send(newComment)})
    .catch(err => {
        console.log(err);
        return res.status(500).send({ error: err })

    })
}





module.exports = { fetchArticles, fetchArticleComments, fetchUserArticles, fetchArticle, patchVotes, addComment }