const DataLoader = require('dataloader')
const User = require('../../models/user')
const Brief = require('../../models/brief')
const { dateToString } = require('../helpers/index')

const briefLoader = new DataLoader((briefIds) => {
  return findBriefs(briefIds)
})

const userLoader = new DataLoader((userIds) => {
  return User.find({_id: {$in: userIds}})
})

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

const findUsers = async userIds => {
  try {
    const users = await User.find({ _id: { $in: userIds } })
    return users.map(user => {
      return transformUser(user)
    })
  } catch (err) {
    throw err
  }
}

const singleBrief = async briefId => {
  try {
    const brief = await briefLoader.load(briefId.toString())
    return brief
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
      brand: () => userLoader.load(brief.brand.toString()) 
    }
  } catch (err) {
    throw err
  }
}

const findUser = async userId => {
  try {
    const user = await userLoader.load(userId.toString())
    return transformUser(user)
  } catch (err) {
    throw err
  }
}

const transformUser = (brand) => {
  console.log(brand)
  return {
    ...brand._doc,
    createdAt: dateToString(brand._doc.createdAt),
    updatedAt: dateToString(brand._doc.updatedAt),
    password: null,
  }
}


exports.findUser = findUser
exports.transformBrief = transformBrief
exports.singleBrief = singleBrief
exports.findBriefs = findBriefs
exports.transformUser = transformUser
exports.findUsers = findUsers