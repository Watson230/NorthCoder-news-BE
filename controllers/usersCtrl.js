const userModel = require('../models/users');
const commentModel = require('../models/comments');



function fetchAllUsers(req, res, next) {
  userModel.find({})
    .then(users => res.status(200).send(users))
    .catch(err => {
      return next(err);
    });

}

function fetchUser(req, res, next) {

  let user = req.params.username;
  userModel.find({ 'username': `${user}` })
    .then(user => {
      if (user.length === 0) return next({ status: 404, msg: 'user does not exist'});
      return res.status(200).send(user);
    })
    .catch(err => {
      return next(err);
    });


}

function fetchUserComments(req, res, next) {
  let user = req.params.id;

  commentModel.find({ 'created_by': `${user}` })
    .then(userComments => {
      if (userComments.length === 0) return res.status(200).send({msg:`${user} has made no comments` });
      return res.status(200).send(userComments);})
    .catch(err => {
      if (err.name === 'CastError') {    
        return next({ status: 404, msg: `${user} doest not exist`});
      }
      return next(err);
    });

}


module.exports = { fetchUser, fetchUserComments, fetchAllUsers };