const topicModels = require(`../models/topics`)
const articleModels = require(`../models/articles`)



function fetchTopicsAPI(req, res) {


    return topicModels.find({})

        .then(topics => res.status(200).send(topics))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })

}



function fetchTopicsArticles(req, res, next) {


    const topicName = req.params.id

    return articleModels.find({ 'belongs_to': topicName })

        .then(articles =>  {
            if (articles.length === 0) return next({status: 404, msg: `No articles for ${topicName}`})
            res.status(200).send(articles)
        }
        )

        .catch(err => {
            console.log(err);
            return next(err);

        })

}

module.exports = { fetchTopicsAPI, fetchTopicsArticles }