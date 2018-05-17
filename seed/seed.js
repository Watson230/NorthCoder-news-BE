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

  return articleData.map(article => {
    article.belongs_to = article.topic,
    article.created_by = chance.pickone(userData.map(user => { return user.username;}));
    article.created_at = chance.date();
    article.votes= Math.floor(Math.random() * 30) + 1 ;

    return new models.Articles(article);
  });
    

};

const seedUsers = function () {
  return  userData.map(user => {
    return new models.Users(user);
  });
};

const seedTopics = function () {
  return topicsData.map(topic => {
    return new models.Topics(topic);
  });
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
    })

    .then(() => {
      seedArticles().map((article) =>{
        
        article.save();
        article.comments.push(seedComments(article._id,Math.round(Math.random() * 10)).map(comment => comment.save()));
 
      }); 
      seedTopics().map(topic => topic.save());
      seedUsers().map(user => user.save());
    })
    .then(()=>{    
      console.log(`${process.env.DB_URI} Seeded`);
      process.exit();       
    });


}

seedDatabase(process.env.DB_URI);
  