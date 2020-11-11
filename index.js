const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// build express server
const app = express()
const { graphqlFunc } = require('./graphql/UserSchema')
const { port, dbURI } = require('./config/environment')
const logger = require('./lib/logger')
const router = require('./config/router')
const errorHandler = require('./lib/errorHandler')

// connect mongoose to database (dbURI)
mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
  if (err) return console.log(err)
  console.log('Mongo is connected')
})

app.use(express.static(`${__dirname}/dist`))

// set up bodyParser middleware
app.use(bodyParser.json())

// set up logger middleware
app.use(logger)

// set up router middleware
app.use('/api', router)

// graphql server
app.use('/graphql', graphqlFunc)

// error handler for return the correct statuses
app.use(errorHandler)

// route for serving front end
app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

// get express running on port
app.listen(port, () => console.log(`Express is listening on port ${port}`))

module.exports = app