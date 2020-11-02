const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const User = require('../models/user')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
  mongoose.connection.db.dropDatabase()
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
      console.log(`${createdUsers.length} users created`)
    })
    .finally(() => mongoose.connection.close())
    .catch(error => console.log(error))
})