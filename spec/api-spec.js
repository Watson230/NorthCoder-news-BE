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



    describe(' /API', function () {

        describe(' GET /users', function () {
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
                })



            })

        })

        describe('GET /topics', function() {

            describe('/topics', function (){

                it('respond with an array of topics', function(done){

                    request(app)
                    .get(`/api/topics`)
                    .end((err, res) => {
                        expect(res.body.length).to.equal(3)
                        expect(res.status).to.equal(200)
                        done()
                    })


                })

            })

            describe('/topics/:topicName/articles', function (){

                it('respond with an array of articles on a topic', function(done){
                    let topic= 'football'
                    request(app)
                    .get(`/api/topics/${topic}/articles`)
                    .end((err, res) => {
                        expect(res.body.length).to.equal(1)
                        expect(res.status).to.equal(200)
                        done()
                    })


                })

            })

        })



    })

})