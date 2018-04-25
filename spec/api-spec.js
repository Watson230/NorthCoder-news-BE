process.env.NODE_ENV = 'test';

const request = require('supertest')
const { expect } = require('chai')
const saveTestData = require(`../seed/test.seed.js`)
const mongoose = require('mongoose')
const app = require('../server').app

describe('API', () => {
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
                .end((err,res) =>{
                        
                    expect(res.body.length).to.equal(4)
                    done()
                })



            })

        })

    })



})