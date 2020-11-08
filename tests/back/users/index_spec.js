/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../../models/user')
const jwt = require('jsonwebtoken') // again needed just like in create, we need to be able to pass tokens with requests.
const { secret } = require('../../../config/environment') // and our secret to encode that token with

describe('Test a Get request to index users', () => {
  let user, token
  beforeEach(done => { // making a user before each test, this is the user we are going to test 'logging in'
    User.create({
      username: 'test',
      email: 'test@email',
      password: 'test',
      passwordConfirmation: 'test'
    })
      .then(users => {
        token = jwt.sign({ sub: users._id }, secret, { expiresIn: '6h' })
        user = users
        done()
      })
  })

  afterEach(done => { // making sure that user is removed after each test finishes
    User.deleteMany().then(() => done())
  })

  it('should return a 200 response if the user can search themself', done => {
    api.get(`/api/brands/${user._id}`)
      .set('Authorization', `Bearer ${token}`)  
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/brands/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })


  it('should return an array of objects with the correct fields', done => {
    api.get(`/api/brands/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'username',
          'email',
          'docs',
          'image',
          'liveBriefs',
          'completedBriefs',
          '__v',
          'createdAt',
          'updatedAt',
          'id'
        ])
        done()
      })
  })

  it('should return an object with the correct fields and types of values', done => {
    api.get(`/api/brands/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string')
        expect(res.body.username).to.be.a('string')
        expect(res.body.email).to.be.a('string')
        expect(res.body.image).to.be.an('array')
        expect(res.body.docs).to.be.an('array')
        expect(res.body.liveBriefs).to.be.an('array')
        expect(res.body.completedBriefs).to.be.an('array')
        done()
      })
  })
})
