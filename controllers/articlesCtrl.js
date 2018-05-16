/*eslint-disable no-console*/

const articleModel = require('../models/articles');
const commentModel = require('../models/comments');


function fetchArticles(req, res, next) {

  return articleModel.find()
    .then(articles => res.status(200).send(articles))
    .catch(err => {
      return next(err);
    });
}

function fetchMostPopularArticles(req, res, next) {
 
  return articleModel.find().sort({ 'votes': -1 }).limit(10)
    .then(articles => res.status(200).send(articles))
    .catch(err => {
    
      return next(err);

    });
}

function fetchArticle(req, res, next) {

  const articleId = req.params.id;

  return articleModel.find({ '_id': articleId })
    .then(article => {
      return res.status(200).send(article);
    })
    .catch(err => {
      if (err.name === 'CastError') {    
        return next({ status: 404, msg: `article ${articleId} does not exist` });
      }
      return next(err);
    });
}


function fetchArticleComments(req, res, next) {

  const articleId = req.params.id;

  return commentModel.find({ 'belongs_to': articleId })
    .then(comments => {
      return res.status(200).send(comments);
    })
    .catch(err => {  
      if (err.name === 'CastError') {    
        return next({ status: 404, msg: `comments for  ${articleId} could not be found ` });
      }
      else return next(err);
    });


}

function fetchUserArticles(req, res, next) {

  const user = req.params.id;

  articleModel.find({ 'created_by': `${user}` })
    .then(userArticles => {
      if (userArticles.length === 0) return res.status(200).send({msg: `${user} has no articles`});
      return res.status(200).send(userArticles);})
    .catch(err => {
      if (err.name === 'CastError') {    
        return next({ status: 404, msg: `user ${user} articles could not be found ` });
      }
      return next(err);
    });
}

function patchVotes(req, res, next) {

  const articleId = req.params.id;
  const vote = req.query.vote;
  let voteInc;

  if (vote === 'up') voteInc = 1;
  else if (vote === 'down') voteInc = -1;
  else voteInc = 0;

  articleModel.findOneAndUpdate({ '_id': articleId }, { $inc: { votes: voteInc } }, { 'new': true })
    .then(Article => {
      return res.status(200).send(Article);
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ status: 404, msg: `article  ${articleId} does not exist` });
      return next(err);
    });
}

function addComment(req, res, next) {

  const articleId = req.params.id;
 
  articleModel.findOne({_id: articleId}).lean()
    .then(article => {
      return commentModel({
        body: req.body.comment,
        belongs_to: article._id
      }).save();
    })
    .then(newComment => { 
      return res.status(201).send(newComment);})
    .catch(err => {
      if (err.name === 'ValidationError') return next({status: 400, msg: `${err.errors.body.message} no comment string sent in request body`});
      if (err.name === 'CastError') return next({ status: 404, msg: `Unable to post comment, article ${articleId} does not exist` });
      return next(err);
    });
}


module.exports = { fetchArticles, fetchArticleComments, fetchUserArticles, fetchArticle, patchVotes, addComment, fetchMostPopularArticles };