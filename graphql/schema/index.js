const { buildSchema } = require('graphql')

module.exports = buildSchema(
  `
    type User {
      _id: ID!
      username: String!
      email: String!
      password: String
      logo: String
      cover: String
      summary: String
      website: String
      blog: String
      reportSummary: String
      docs: [Doc!]
      image: [Image!]
      liveBriefs: [Brief!]
      completedBriefs: [Brief!]
      createdAt: String
      updatedAt: String
    }

    type Brief {
      _id: ID!
      title: String
      content: String
      length: String
      level: String
      purpose: String
      message: String
      key: String
      url: String
      prodName: String
      new: String
      keypoints: String
      first_draft: String
      topic: String
      keyword1: String
      keyword2: String
      keyword3: String
      brand: String
      createdAt: String
      updatedAt: String
    }

    type Doc {
      _id: ID!
      url: String!
      name: String!
      brand: User!
    }

    type Image {
      _id: ID!
      url: String!
      brand: User!
    }

    type AuthData {
      userId: ID!
      token: String!
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
    }

    input EditUserInput {
      username: String!
      email: String!
      logo: String
      cover: String
      summary: String
      website: String
      blog: String
    }

    input BriefInput {
      _id: String
      title: String!
      content: String!
      length: String!
      level: String!
      purpose: String!
      prodName: String
      new: String
      keypoints: String
      message: String!
      url: String!
      first_draft: String!
      topic: String!
      keyword1: String!
      keyword2: String!
      keyword3: String!
    }

    input DocInput {
      url: String!
      name: String!
      brand: String!
    }

    input ImageInput {
      url: String!
      brand: String!
    }

    input ReportInput {
      userId: String!
      reportSummary: String!
    }

    type RootQuery {
      users: [User!]!
      singleUser: User!
      brief: [Brief!]
      singleBrief(briefId: String!): Brief!
      login(email: String!, password: String!): AuthData!
      backLogin(email: String!, password: String!): AuthData!
    }

    type RootMutation {
      createUser(userInput: UserInput): User
      editUser(userInput: EditUserInput): User
      editUserReport(userInput: ReportInput): User
      deleteUser(userId: ID!): User
      createBrief(briefInput: BriefInput): Brief
      editBrief(briefInput: BriefInput): Brief
      deleteBrief(briefId: ID!): User
      createDoc(docInput: DocInput): Doc
      deleteDoc(docId: ID!): User
      createImage(imageInput: ImageInput): Image
      deleteImage(imageId: ID!): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `)







