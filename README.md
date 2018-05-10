## Northcoders News API

A MongoDB based RESTful API for NorthCoder News serving arcticles, comments and user profiles from the NorthCoders community

Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

    Node.js - v9.2.0
    npm - v6.0.0
    MongoDB - v3.4.9

### Dev dependencies  

    "chai": "^4.1.2",
    "chance": "^1.0.13",
    "csvjson": "^5.0.0",
    "mocha": "^5.1.1",
    "mongoose": "^4.13.11",
    "nodemon": "^1.17.3",
    "supertest": "^3.0.0"
    "body-parser": "^1.15.2",
    "express": "^4.16.3",
    "dotenv": "^5.0.1",

    
### Installing

Open your terminal

Clone this repository (https://github.com/Watson230/BE-PT-northcoders-news)

Install dependencies ( npm i )

run npm i (insert dependency name here)

Start the MongoDB process
mongod

Seed the dev data
npm run seed:dev

run npm start for production ENV or npm:dev for development ENV(with nodemon) to run locally

#Testing
Each api endpoint was tested, with both successful and unsuccessful requests (where applicable)

Run the test suite with npm test

#Routes
GET /api/topics - Return all topics
GET /api/topics/:topic/articles - Return all articles for a particular topic ID
GET /api/articles - Return all articles
GET /api/articles/mostPopular - returns top 10 articles with the most votes
GET /api/articles/:id - Return an individual article by its ID
GET /api/articles/:id/comments - Return all comments for a single article ID
POST /api/articles/:id/comments - Add a new comment to the appropriate article ID
PUT /api/articles/:id - Increment/decrement votes on an article based on a vote=up or vote=down query
PUT /api/comments/:id - Increment/decrement votes on a comment based on a vote=up or vote=down query
DELETE /api/comments/:id - Delete a comment
GET /api/users/:username - Return a user profile along with their articles and comments


## Authors

***David Watson*** - *Initial work* - [Watson230](https://github.com/Watson230)
