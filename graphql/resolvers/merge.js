const User = require('../../models/user')
const Brief = require('../../models/brief')
const { dateToString } = require('../helpers/index')

const findBriefs = async briefsIds => {
  try {
    const briefs = await Brief.find({ _id: { $in: briefsIds } })
    return briefs.map(brief => {
      return transformBrief(brief)
    })
  } catch (err) {
    throw err
  }
}

const singleBrief = async briefId => {
  try {
    const brief = await Brief.findById(briefId)
    return transformBrief(brief)
  } catch (err) {
    throw err
  }
}

const transformBrief = brief => {
  try {
    return { 
      ...brief._doc, 
      createdAt: dateToString(brief._doc.createdAt),
      updatedAt: dateToString(brief._doc.updatedAt),
      brand: findUser.bind(this, brief.brand) 
    }
  } catch (err) {
    throw err
  }
}

const findUser = async userId => {
  try {
    const user = await User.findById(userId)
    return transformUser(user)
  } catch (err) {
    throw err
  }
}

const transformUser = user => {
  return {
    ...user._doc,
    createdAt: dateToString(user._doc.createdAt),
    updatedAt: dateToString(user._doc.updatedAt),
    password: null,
    liveBriefs: findBriefs.bind(this, user._doc.liveBriefs)
  }
}

const createUser = args => {
  const user = new User({
    username: args.username,
    email: args.email,
    password: args.password,
    passwordConfirmation: args.passwordConfirmation,
    logo: args.logo,
    cover: args.cover,
    summary: args.summary,
    website: args.website,
    blog: args.blog,
    reportSummary: args.reportSummary,
  })
  return user
}

exports.findUser = findUser
exports.transformBrief = transformBrief
exports.singleBrief = singleBrief
exports.findBriefs = findBriefs
exports.transformUser = transformUser
exports.createUser = createUser