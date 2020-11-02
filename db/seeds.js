const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
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
    .finally(() => mongoose.connection.close())
    .catch(err => console.log(err))
})