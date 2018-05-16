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

let articleData = require('../dataCSVtoJSON').articlesJSON;
let userData = require('../dataCSVtoJSON').userJSON;
const usernamesArr = userData.map(user => { return user.username ;});
let topicsData = require('../dataCSVtoJSON').topicsJSON;



// This should seed your development database using the CSV file data
// Feel free to use the async library, or native Promises, to handle the asynchronicity of the seeding operations.


const seedArticles = function () {


  return new Promise((resolve, reject) => {

    resolve(articleData.map(article => {
      article.belongs_to = article.topic,
      article.created_by = chance.pickone(userData.map(user => { return user.username;}));
      article.created_at = chance.date();
      article.votes= Math.floor(Math.random() * 30) + 1 ;

      return new models.Articles(article);

  

    }));
    reject(null);
  });
};

const seedUsers = function () {
  return new Promise((resolve, reject) => {


    resolve(userData.map(user => {


      return new models.Users(user);

    }));
    reject(null);

  });
};

const seedTopics = function () {
  return new Promise((resolve, reject) => {
    resolve(topicsData.map(topic => {
      return new models.Topics(topic);
    }));
    reject(null);
  });
};



const seedComments = function (articleIdArray,num) {

  return new Promise((resolve, reject) => {

    const commentsArray = Array(num).fill(null).map(comment => {

      comment = {
        body: chance.sentence(),
      
        votes: chance.integer({ min: 0, max: 10 }),
        created_by: chance.pickone(usernamesArr),
        belongs_to: chance.pickone(articleIdArray)
       
      };
      return new models.Comments(comment);
    });
    resolve(commentsArray);
    reject(null);
  });
};


function seedDatabase() {
 
  return mongoose.connect(process.env.DB_URI, {useMongoClient: true },(err) => {
    if (err) console.log(err);
    else console.log('connection to ' + process.env.DB_URI + ' successful');
  })

    .then(() => {
      mongoose.connection.db.dropDatabase();
    })

    .then(() => {
      seedArticles().then(articles => {articles.map((article) =>article.save());
        return articles;
      })
        .then(articles =>{
          return articles.map(doc => doc._id);
        })
        .then((articleIds)=>{
          seedComments(articleIds,Math.round(Math.random() * 10))
            .then(comments =>
              comments.map(comment => comment.save()));
        });
    }).then(()=>{

      seedTopics().then(topics => topics.map(topic => topic.save()));
      seedUsers().then(users => users.map(user => user.save()));

    })
    .then(()=>{
      
      console.log(`${process.env.DB_URI} Seeded`);
      process.exit();
        
    });


      


      
    
  

}

seedDatabase(process.env.DB_URI);
  