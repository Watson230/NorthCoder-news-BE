const userModel = require('../models/users')
const articleModel = require('../models/articles')
const commentModel = require('../models/comments')



function fetchAllUsers(req, res, next) {
    userModel.find({})
        .then(users => res.status(200).send(users))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })

}

function fetchUser(req, res, next) {

    let user = req.params.username

    userModel.find({ 'username': `${user}` })
        .then(user => {

            if (user.length === 0) return next({ status: 404, msg: `No users with username ${user}` })
            return res.status(200).send(user)
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })


}

function fetchUserComments(req, res, next) {
    let user = req.params.id

    commentModel.find({ "created_by": `${user}` })
        .then(userComments => {
            if (userComments.length === 0) return next({ status: 404, msg: `${user} has made no comments` })
            res.status(200).send(userComments)})
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })

}


module.exports = { fetchUser, fetchUserComments, fetchAllUsers }