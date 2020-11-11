const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const User = require('../models/user')

const graphqlFunc = graphqlHTTP({
  schema: buildSchema(`
    type User {
      _id: ID!
      username: String!
      email: String!
      logo: String,
      cover: String,
      summary: String,
      website: String,
      blog: String,
      reportSummary: String,
    }

    input UserInput {
      username: String!
      email: String!
      password: String!
      passwordConfirmation: String!
      logo: String
      cover: String
      summary: String
      website: String
      blog: String
      reportSummary: String
    }

    type RootQuery {
      users: [User!]!
    }

    type RootMutation {
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    users: () => {
      return User
        .find()
        .then(user => {
          console.log(user)
          return user
        })
        .catch(err => {
          throw err
        }) 
    },
    createUser: args => {
      const user = new User({
        username: args.userInput.username,
        email: args.userInput.email,
        password: args.userInput.password,
        passwordConfirmation: args.userInput.passwordConfirmation,
        logo: args.userInput.logo,
        cover: args.userInput.cover,
        summary: args.userInput.summary,
        website: args.userInput.website,
        blog: args.userInput.blog,
        reportSummary: args.userInput.reportSummary
      // docs: [docSchema],
      // image: [imageSchema],
      // liveBriefs: [liveBriefSchema],
      // completedBriefs: [completedBriefSchema]
      })
      return user
        .save()
        .then(result => {
          console.log(result)
          return { ...result._doc }
        }).catch(err => {
          console.log(err)
          throw err
        })
    }
  },
  graphiql: true
})

module.exports = { graphqlFunc }