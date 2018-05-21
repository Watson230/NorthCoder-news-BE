/*eslint-disable no-console*/
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
require('dotenv').config({
  path: `./.${process.env.NODE_ENV}.env`
});

const models = require('../models/models');
const mongoose = require('mongoose');
let Chance = require('chance');
let chance = new Chance();
mongoose.Promise = global.Promise;

const articleData = require('../dataCSVtoJSON').articlesJSON;
const userData = require('../dataCSVtoJSON').userJSON;
const usernamesArr = userData.map(user => { return user.username ;});
const topicsData = require('../dataCSVtoJSON').topicsJSON;


const seedArticles = function () {

  return articleData.map(article => {
    article.belongs_to = article.topic,
    article.created_by = chance.pickone(userData.map(user => { return user.username;}));
    article.created_at = chance.date();
    article.votes= Math.floor(Math.random() * 30) + 1 ;
    return new models.Articles(article);
  });
};

const seedUsers = function () {
  const users = userData.map(user => {
    return new models.Users(user).save();
  });
  return Promise.all(users);
};

const seedTopics = function () {
  const topics = topicsData.map(topic => {
    return new models.Topics(topic).save();
  });
  return Promise.all(topics);
};

const seedComments = function (articleId,num) {
  const commentsArray = Array(num).fill(null).map(comment => {
    comment = {
      body: chance.sentence(),
      votes: chance.integer({ min: 0, max: 10 }),
      created_by: chance.pickone(usernamesArr),
      belongs_to: articleId     
    };
    return new models.Comments(comment);
  });
  return commentsArray;
};
 

function seedDatabase() {
  return mongoose.connect(process.env.DB_URI, {useMongoClient: true },(err) => {
    if (err) console.log(err);
    else console.log('connection to ' + process.env.DB_URI + ' successful');
  })
    .then(() => {
      mongoose.connection.db.dropDatabase();
      return seedUsers();
    })
    .then(() => {
      seedArticles().map((article) =>{  
        article.save().then(()=>seedComments(article._id,Math.round(Math.random() * 10)).map(comment => comment.save())); 
      });
      return seedTopics();
    })
    .then(()=>{    
      console.log(`${process.env.DB_URI} Seeded`);
      process.exit();       
    });
}

seedDatabase(process.env.DB_URI);
  