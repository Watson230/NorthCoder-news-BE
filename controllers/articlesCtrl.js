const articleModel = require('../models/articles')
const commentModel = require('../models/comments')


function fetchArticles(req, res) {

    return articleModel.find({})
        .then(articles => res.status(200).send(articles))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })
}


function fetchArticleComments(req, res) {

    let articleId = req.params.id




    return commentModel.find({'belongs_to': articleId})

        .then(comments => res.status(200).send(comments))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })


}



module.exports = { fetchArticles, fetchArticleComments }