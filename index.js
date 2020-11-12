const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// build express server
const app = express()
const { graphqlHTTP } = require('express-graphql')
const graphQLSchema = require('./graphql/schema/index')
const graphQLResolver = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')
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
// app.use('/api', router)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth)

// graphql server
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolver,
    graphiql: true
  })
)
// error handler for return the correct statuses
app.use(errorHandler)

// route for serving front end
app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

// get express running on port
app.listen(port, () => console.log(`Express is listening on port ${port}`))

module.exports = app