/* global api, describe, it, expect beforeEach, afterEach */
const User = require('../../../models/user')

const testDataIncorrect = {
  username: 'test',
  email: 'testincorrect@email',
  password: 'test',
  passwordConfirmation: 'wrong'
}

const testDataCorrect = {
  username: 'test',
  email: 'test@email',
  password: 'test',
  passwordConfirmation: 'test'
}


describe('Test to check if email already exists /register', () => {
  beforeEach(done => {
    User.create({
      username: 'test',
      email: 'test@email',
      password: 'test',
      passwordConfirmation: 'test'
    })
      .then(() => done())
  })
  it('should return a 422 response if email already exists', done => {
    api.post('/api/brands/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })
  afterEach(done => { // as always emptying the db after the tests
    User.deleteMany().then(() => done())
  })
}),

afterEach(done => { // as always emptying the db after the tests
  User.deleteMany().then(() => done())
})


describe('Tests to check if password confirmation matches password, and if its returning an object correctly / register', () => {

  afterEach(done => { // as always emptying the db after the tests
    User.deleteMany().then(() => done())
  })

  it('should return a 422 response if password does not match passwordConfirmation', done => {
    api.post('/api/brands/register')
      .send(testDataIncorrect)
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 201 response if password matches passwordConfirmation', done => {
    api.post('/api/brands/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object if request is correct', done => {
    api.post('/api/brands/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return an object with a message key if request is correct', done => {
    api.post('/api/brands/register')
      .send(testDataCorrect)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          'message'
        ])
        done()
      })
  })
})
