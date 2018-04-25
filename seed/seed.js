

var models = require('../models/models');
var mongoose = require('mongoose');
let Chance = require('chance');
let chance = new Chance();
mongoose.Promise = global.Promise;
const DBUrl = require(`../config`).DB.dev


let articleData = require('../dataCSVtoJSON').articlesJSON;
let userData = require('../dataCSVtoJSON').userJSON;
const usernamesArr = userData.map(user => { return user.username });
let topicsData = require('../dataCSVtoJSON').topicsJSON

// This should seed your development database using the CSV file data
// Feel free to use the async library, or native Promises, to handle the asynchronicity of the seeding operations.

let article_id = []
let articles = function () {


  return new Promise((resolve, reject) => {

    resolve(articleData.map(article => {
        article.belongs_to = article.topic,
        article.created_by = chance.pickone(userData.map(user => { return user.username }))
        article.created_at = chance.date()
        article.votes= Math.floor(Math.random() * 30) + 1 

      return new models.Articles(article)

     

    }))
  })
}

let users = function () {
  return new Promise((resolve, reject) => {


    resolve(userData.map(user => {


      return new models.Users(user)

    }))

  })
}

let topics = function () {

  return new Promise((resolve, reject) => {

    resolve(topicsData.map(topic => {

      return new models.Topics(topic)


    }))

    reject(console.log(error))

  });

};



let comments = function (docId, num) {

  return new Promise((resolve, reject) => {

    let commentsArray = Array(num).fill(null).map(comment => {

      comment = {
        body: chance.sentence(),
      
        votes: chance.integer({ min: 0, max: 10 }),
        created_by: chance.pickone(usernamesArr),
       
        belongs_to: docId
       
      };

      return new models.Comments(comment)


    })
    resolve(commentsArray)

  })

}


function seedDatabase(DBUrl) {

  const articleIds = {};
  // const article_id =[];
  const topicsIds = {};
  const userIds = {}
  const commentIds = {};

  return mongoose.connect(DBUrl, { useMongoClient: true })

    .then(() => {
      mongoose.connection.db.dropDatabase();
    })

    .then(() => {

      const articlesPromises = articles()
      //  console.log(typeof articlesPromises,'articles promise')
      articlesPromises.then(articles => articles.map((article, i) =>

        article.save().then(doc => {
          articleIds[article] = doc.id;

          article_id.push(doc._id)

          const commentPromises = comments(doc._id, Math.round(Math.random() * 10))
            .then(comments =>

              comments.map(comment => comment.save().then(doc => {
                commentIds[comment] = doc.id;
                article.comments.push(comment)
                return doc

              })))
              
          return doc
        })))

      const topicsPromises = topics()
        .then(topics => topics.map(topic => topic.save().then(doc => {
          topicsIds[topic] = doc.id;
          return doc

        })))

      const userPromises = users()
        .then(users => users.map(user => user.save().then(doc => {
          userIds[user] = doc.id;
          return doc

        })))




      console.log('Database seeded!');

      return Promise.all([Promise.all(articlesPromises), Promise.all(topicsPromises), Promise.all(userPromises), Promise.all(commentPromises)])


    })



}

seedDatabase(DBUrl)
  