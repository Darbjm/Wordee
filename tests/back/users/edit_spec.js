/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../../models/user')
const jwt = require('jsonwebtoken') // again needed just like in create, we need to be able to pass tokens with requests.
const { secret } = require('../../../config/environment') // and our secret to encode that token with

const editUser = {
  username: 'first',
  email: 'first@email',
  reportSummary: 'www.working.com',
  logo: 'logolink',
  blog: 'google',
  summary: 'the best briefing app',
  website: 'google.com',
  cover: 'cover.jpg'
}

const users = [{
  username: 'first',
  email: 'first@email',
  password: 'test',
  passwordConfirmation: 'test'
},
{
  username: 'second',
  email: 'second@email',
  password: 'test',
  passwordConfirmation: 'test'
}]

describe('Test a Put request to edit user', () => {
  let token, testUsers, falseToken

  beforeEach(done => { // making a user before each test, this is the user we are going to test 'logging in'
    User.create(users)
      .then(user => {
        token = jwt.sign({ sub: user[0]._id }, secret, { expiresIn: '6h' })
        falseToken = jwt.sign({ sub: user[1]._id }, secret, { expiresIn: '6h' })
        testUsers = user
        done()
      })
  })

  afterEach(done => { // making sure that user is removed after each test finishes
    User.deleteMany().then(() => done())
  })

  it('should return a 202 response if the user is able to edit their profile', done => {
    api.put(`/api/brands/${testUsers[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(editUser)
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })


  it('should return a 401 response if the user is not the correct one', done => {
    api.put(`/api/brands/${testUsers[0]._id}`)
      .set('Authorization', `Bearer ${falseToken}`)
      .send(editUser)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })
})