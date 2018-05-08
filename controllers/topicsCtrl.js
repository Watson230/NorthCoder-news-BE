/*eslint-disable no-console*/

const topicModels = require('../models/topics');
const articleModels = require('../models/articles');



function fetchTopics(req, res) {

  return topicModels.find({})
    .then(topics => res.status(200).send(topics))
    .catch(err => {
      
      return res.status(500).send({ error: err });

    });

}

function fetchTopicsArticles(req, res, next) {

  const topicName = req.params.topicName;
  return articleModels.find({ 'belongs_to': topicName })
    .then(articles =>  {
      if (articles.length === 0) return next({ status: 404, msg:`Thre are no articles for topic:${topicName}  ` });
      res.status(200).send(articles);
    }
    )
    .catch(err => {
      if (err.name === 'CastError') {    
        return next({ status: 404, msg:` articles for ${topicName} could not be found ` });
      }
      return next(err);
    });

}

module.exports = { fetchTopics, fetchTopicsArticles };