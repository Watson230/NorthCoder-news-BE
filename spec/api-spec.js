process.env.NODE_ENV = 'test';

const request = require('supertest')
const { expect } = require('chai')
const saveTestData = require(`../seed/test.seed.js`)
const mongoose = require('mongoose')
const app = require('../server').app

describe('API', (done) => {
    let usefulData = {};
    beforeEach(() => {
        return mongoose.connection
            .dropDatabase()
            .then(saveTestData)
            .then(data => {
                usefulData = data;
            })
            .catch(console.log);
    });

    after(() => {
        mongoose.disconnect();
    });



    describe(' /API  routes', function () {

        describe('GET /users', function () {
            it('responds with users array', function (done) {
                request(app)
                    .get('/api/users')
                    .end((err, res) => {
                        expect(res.body.length).to.equal(1)
                        expect(res.status).to.equal(200)
                        done()
                    })
            })

            describe(' GET /users/:username', function () {
                it('responds with user with specified username', function (done) {
                    let userID = usefulData.user.username
                    request(app)
                        .get(`/api/users/${userID}`)
                        .end((err, res) => {
                            expect(res.body[0].username).to.equal(userID)
                            expect(res.status).to.equal(200)
                            done()
                        })

                })

                it('responds with 404 if specified username does not exist', function (done) {
                    let userID = 'dave'
                    request(app)
                        .get(`/api/users/${userID}`)
                        .end((err, res) => {
                            expect(res.status).to.equal(404)
                            done()
                        })

                })

                describe(' GET /users/:username/comments', function () {
                    it('responds with specified users comments', function (done) {
                        let userID = usefulData.user.username

                        request(app)
                            .get(`/api/users/${userID}/comments`)
                            .end((err, res) => {
                                expect(res.body[0].created_by).to.equal(userID)
                                expect(res.status).to.equal(200)
                                done()
                            })
                    })

                    it('responds with 404 if specified username does not have any comments', function (done) {
                        let userID = 'dave'
    
                        request(app)
                            .get(`/api/users/${userID}`)
                            .end((err, res) => {                               
                                expect(res.status).to.equal(404)
                                done()
                            })
    
                    })
                })



            })

        })

        describe('GET /topics', function () {

            describe('/topics', function () {

                it('respond with an array of topics', function (done) {

                    request(app)
                        .get(`/api/topics`)
                        .end((err, res) => {
                            expect(res.body.length).to.equal(3)
                            expect(res.status).to.equal(200)
                            done()
                        })


                })

            })

            describe('/topics/:topicName/articles', function () {

                it('respond with an array of articles on a topic', function (done) {
                    let topic = 'football'
                    request(app)
                        .get(`/api/topics/${topic}/articles`)
                        .end((err, res) => {
                            expect(res.body.length).to.equal(1)
                            expect(res.status).to.equal(200)
                            done()
                        })
                })

                it('respond with an 404 if topic has no articles', function (done) {
                    let topic = 'tennis'
                    request(app)
                        .get(`/api/topics/${topic}/articles`)
                        .end((err, res) => {
                           
                            expect(res.status).to.equal(404)
                            done()
                        })


                })

            })

        })

        describe(' PUT /comments/:id', function () {

            it('should return an updated articles with increased vote count', function (done) {
                let commentId = usefulData.comments[0]._id                
                request(app)
                    .put(`/api/comments/${commentId}?vote=up`)
                    .end((err, res) => {

                        expect(res.body.votes).to.equal(1)
                        expect(res.status).to.equal(200)
                        done()
                    })
            })

            it('should return a 404 if voted comment does not exist', function (done) {
                let commentId = '1234'              
                request(app)
                    .put(`/api/comments/${commentId}?vote=up`)
                    .end((err, res) => {
                        expect(res.status).to.equal(404)
                        done()
                    })
            })


        })

        describe('/api/articles', function () {

            describe(' GET /articles', function () {

                it('should respond with array of articles', function (done) {
                    request(app)
                        .get(`/api/articles`)
                        .end((err, res) => {
                            
                            expect(res.body.length).to.equal(2)
                            expect(res.status).to.equal(200)
                            done()
                        })
                })
            })


            describe(' GET /articles/:id', function () {

                it('should respond with artices with specified ID', function (done) {

                    let articleId = usefulData.articles[0]._id
                    request(app)
                        .get(`/api/articles/${articleId}`)
                        .end((err, res) => {
                          
                            expect(res.body.length).to.equal(1)
                            expect(res.body[0].belongs_to).to.equal('cats')
                            expect(res.status).to.equal(200)
                            done()
                        })


                })

                it('should respond with  404 if artices with specified ID does not exist', function (done) {

                    let articleId = '4423ffewwewerwqf'

                    request(app)
                        .get(`/api/articles/${articleId}`)
                        .end((err, res) => {
                            expect(res.status).to.equal(404)
                            done()
                        })
                })
            })

            describe(' GET /articles', function () {

                it('should respond with array of comments of a specified article', function (done) {
                    let articleId = usefulData.articles[0]._id

                    request(app)
                        .get(`/api/articles/${articleId}/comments`)
                        .end((err, res) => {
                            
                            expect(res.body.length).to.equal(2)
                            expect(res.status).to.equal(200)
                            done()
                        })
                })

                it('should respond with 404  array of comments of a specified article is of length 0', function (done) {
                    let articleId = ''

                    request(app)
                        .get(`/api/articles/${articleId}/comments`)
                        .end((err, res) => {
                            expect(res.status).to.equal(404)
                            done()
                        })
                })
            })

            describe(' Put /articles/:id', function () {

                it('should increment vote of article with specified ID', function (done) {
                    let articleId = usefulData.articles[0]._id

                    request(app)
                        .put(`/api/articles/${articleId}?vote=up`)
                        .end((err, res) => {
                            
                            expect(res.body.votes).to.equal(1)
                            expect(res.status).to.equal(200)
                            done()
                        })
                })

                it('should give 404 vote for article with specified ID is not UP or DOWN', function (done) {
                    let articleId = usefulData.articles[0]._id

                    request(app)
                        .put(`/api/articles/${articleId}?vote=hello`)
                        .end((err, res) => {                  
                            expect(res.status).to.equal(404)
                            done()
                        })
                })


                it('should give 404 article with specified ID does not exist', function (done) {
                    let articleId = '2345'

                    request(app)
                        .put(`/api/articles/${articleId}?vote=up`)
                        .end((err, res) => {
                            expect(res.status).to.equal(404)
                            done()
                        })
                })


            })

            describe(' POST /articles/:id/comments', function () {

                it('should add new comment to article with specified ID', function (done) {
                    let articleId = usefulData.articles[1]._id

                    request(app)
                        .post(`/api/articles/${articleId}/comments`)
                        .send({
                            comment:'hello',
                            belongs_to:articleId
                        })
                        .end((err, res) => {
                            
                            expect(res.body.body).to.equal('hello')
                            expect(res.body.belongs_to).to.equal(`${articleId}`)
                            expect(res.status).to.equal(200)
                            done()
                        })


                })
            })
            // describe(' DELETE /comment/:id', function () {

            //     it('should delete a comment with specified ID', function (done) {
            //         let commentId = usefulData.articles[1]._id

            //         request(app)
            //             .delete(`/api/comments/${commentId}`)
            //             .send({
            //                 comment:'hello',
            //                 belongs_to:articleId
            //             })
            //             .end((err, res) => {
                            
            //                 expect(res.body.body).to.equal('hello')
            //                 expect(res.body.belongs_to).to.equal(`${articleId}`)
            //                 expect(res.status).to.equal(200)
            //                 done()
            //             })


            //     })
            // })






        })




    })




})