const userModel = require('../models/users')
const articleModel = require('../models/articles')
const commentModel = require('../models/comments')

function fetchAllUsers(req, res) {
    userModel.find({})
        .then(users => res.status(200).send(users))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })

}

function fetchUser(req, res) {

    let user = req.params.id

    userModel.find({ 'username': `${user}` })
        .then(user => res.status(200).send(user))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })


}

function fetchUserComments(req, res) {
    let user = req.params.id

    commentModel.find({ "created_by": `${user}` })
        .then(userComments => res.status(200).send(userComments))
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: err })

        })

}


module.exports = { fetchUser, fetchUserComments, fetchAllUsers }