const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          username: 'admin',
          email: 'wordee@email.co.uk',
          password: 'A{}SFDSjn823adxaklnj',
          passwordConfirmation: 'A{}SFDSjn823adxaklnj'
        },
        {
          username: 'test',
          email: 'test@email',
          password: 'pass',
          passwordConfirmation: 'pass'
        }
      ])
    })
    .then(createdUsers => {
      console.log(`${createdUsers.length} users created `)
    })
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})