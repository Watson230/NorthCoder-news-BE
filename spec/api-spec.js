process.env.NODE_ENV = 'test';

const request = require('supertest');
const {expect} = require('chai');
const saveTestData = require('../seed/test.seed.js');
const mongoose = require('mongoose');
const app = require('../server').app;

mongoose.promise = Promise;

describe('API', () => {
  let usefulData = {};
  beforeEach(()=> {
    return mongoose.connection
      .dropDatabase()
      .then(saveTestData)
      .then(data => {
        usefulData = data;
        
      })
      .catch();
  });

  after(() => {
    mongoose.disconnect();
  });




  describe('Routes', function () {

    describe('GET /users', function () {

      it('/users responds with users array',  ()=> {
        return request(app)
          .get('/api/users')
          .expect(200)
          .then((res) => {
            expect(res.body.length).to.equal(1);
          })
          .catch(err =>{
            throw err;
          });
      });

      it(' /users/:username responds with user with specified username',()=>{
        let userID = usefulData.user.username;
        return request(app)
          .get(`/api/users/${userID}`)
          .expect(200)
          .then((res) => {
            expect(res.body[0].username).to.equal(userID);
          })
          .catch(err =>{
            throw err;
          });

      });

      it(' /users/:username responds with 404 if specified username does not exist', ()=>{
        let userID = 'dave';
        return request(app)
          .get(`/api/users/${userID}`)
          .expect(404)
          .catch(err =>{
            throw err;
          });
      });

      it('/users/:username/comments responds with specified users comments', ()=>{
        let userID = usefulData.user.username;

        return request(app)
          .get(`/api/users/${userID}/comments`)
          .expect(200)
          .then((res) => {
            expect(res.body[0].created_by).to.equal(userID);
          })
          .catch(err =>{
            throw err;
          });
      });
      it('/users/:username/articles responds with specified users articles', ()=>{
        let userID = usefulData.user.username;

        return request(app)
          .get(`/api/users/${userID}/articles`)
          .expect(200)
          .then((res) => {
            expect(res.body[0].created_by).to.equal(userID);
          })
          .catch(err =>{
            throw err;
          });
      });

    });

    describe('GET /topics', function () {

      it('/topics should respond with an array of topics', ()=>{

        return request(app)
          .get('/api/topics')
          .expect(200)
          .then((res) => {
            expect(res.body.length).to.equal(3); 
          })
          .catch(err =>{
            throw err;
          });
      });

      it('topics/:topicName/articles should respond with an array of articles on a topic', ()=>{
        let topic = usefulData.articles[0].belongs_to;
        return request(app)
          .get(`/api/topics/${topic}/articles`)
          .expect(200)
          .then(res => {
            expect(res.status).to.equal(200);           
          })
          .catch(err =>{
            throw err;
          });
      });

      it('topics/:topicName/articles respond with an 404 if topic has no articles',  ()=>{
        let topic = 'tennis';
        return request(app)
          .get(`/api/topics/${topic}/articles`)
          .expect(404)
          .catch(err =>{
            throw err;
          });
      });
    });

    describe(' PUT /comments/:id', function () {

      it('should return an updated articles with increased vote count', ()=>{
        let commentId = usefulData.comments[0]._id;
        return request(app)
          .put(`/api/comments/${commentId}?vote=up`)
          .expect(200)
          .then(res => {
            expect(res.body.votes).to.equal(1);          
          })
          .catch(err =>{
            throw err;
          });
      });

      it('should return a 404 if voted comment does not exist', ()=>{
        let commentId = '1234';
        return request(app)
          .put(`/api/comments/${commentId}?vote=up`)
          .expect(404)
          .catch(err =>{
            throw err;
          });
    
      });


    });

    describe(' GET /articles', function () {

      it('should respond with array of articles', () =>{
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then((res) => {
            expect(res.body.length).to.equal(2);
          })
          .catch(err =>{
            throw err;
          });         
      });

      it('/articles/:id should respond with artices with specified ID', ()=>{

        let articleId = usefulData.articles[0]._id;
        return request(app)
          .get(`/api/articles/${articleId}`)
          .expect(200)
          .then((res) => {
            expect(res.body.length).to.equal(1);
            expect(res.body[0].belongs_to).to.equal( usefulData.articles[0].belongs_to);
          })
          .catch(err =>{
            throw err;
          });             
      });

      it(' /articles/:id should respond with  404 if articles with specified ID does not exist', ()=>{

        let articleId = '4423ffewwewerwqf';

        return request(app)
          .get(`/api/articles/${articleId}`)
          .expect(404)
          .catch(err =>{
            throw err;
          });
      });


      it('/articles/:articleID/comments should respond with array of comments of a specified article', ()=>{
        let articleId = usefulData.articles[0]._id;

        return request(app)
          .get(`/api/articles/${articleId}/comments`)
          .expect(200)
          .then((res) => {
            expect(res.body.length).to.equal(2); 
          })
          .catch(err =>{
            throw err;
          });
      });

      it('/articles/:articleID/comments should respond with 404  array of comments of a specified article is of length 0', ()=>{
        let articleId = '';

        return request(app)
          .get(`/api/articles/${articleId}/comments`)
          .expect(404)
          .catch(err =>{
            throw err;
          });
        
      });
    });

    describe(' PUT /articles/:id', function () {

      it('should increment vote of article with specified ID',()=>{
        let articleId = usefulData.articles[0]._id;
        return request(app)
          .put(`/api/articles/${articleId}?vote=up`)
          .expect(200)
          .then((res) => { 
            expect(res.body.votes).to.equal(1);
          })
          .catch(err =>{
            throw err;
          });
      });

      it('should give 404 article with specified ID does not exist', ()=>{
        let articleId = '2345';
        return request(app)
          .put(`/api/articles/${articleId}?vote=up`)
          .expect(404)
          .catch(err =>{
            throw err;
          });
      });

    });

    describe(' POST /articles/:id/comments', function () {

      it('should add new comment to article with specified ID',()=>{
        let articleId = usefulData.articles[1]._id;
        request(app)
          .post(`/api/articles/${articleId}/comments`)
          .send({
            comment: 'hello'
          })
          .expect(201)
          .then((res) => {            
            expect(res.body.body).to.equal('hello');
            expect(res.body.belongs_to).to.equal(`${articleId}`);
          });
      });
    });
  });

});