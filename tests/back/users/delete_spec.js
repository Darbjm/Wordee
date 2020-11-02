/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../../models/user')
const jwt = require('jsonwebtoken') 
const { secret } = require('../../../config/environment')

const testUserData = [{
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

describe('Test deleting own user profile', () => {
  let token, user, falseToken

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' })
        falseToken = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' })
        user = users
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => done())
  })

  it('should return a 401 if not their id is incorrect', done => {
    api.delete(`/api/brands/${user[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
      })
    done()
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/brands/${user[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should return no data', done => {
    api.delete(`/api/brands/${user[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.deep.eq({})
        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.delete(`/api/brands/${user[0]._id}`)
      .set('Authorization', `Bearer ${falseToken}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})