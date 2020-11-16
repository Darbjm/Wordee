const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')
const { findUsers, transformUser, createUser } = require('./merge')
const { secret } = require('../../config/environment')

module.exports = {
  users: async (args, req) => {
    const admin = await User.findById(req.userId)
    if (!req.isAuth || !admin) {
      throw new Error('Unauthenticated!')
    }
    try {
      const allUsers = await User.find()
      return findUsers(allUsers)
    } catch (err) {
      throw err
    }
  },
  singleUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    try {
      const singleUser = await User.findById(req.userId)
      return transformUser(singleUser)
    } catch (err) {
      throw err
    }
  },
  createUser: async (args) => {
    try {
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
      const savedUser = await user.save()
      return transformUser(savedUser)
    } catch (err) {
      throw err
    }
  },
  editUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    try {
      const user = await User.findById(req.userId)
      if (!user) throw new Error('Not Found')
      Object.assign(user, args.userInput)
      const editedUser = await user.save()
      return transformUser(editedUser)
    } catch (err) {
      throw err
    }
  },
  editUserReport: async (args, req) => {
    const admin = await User.findOne({ _id: req.userId })
    if (!req.isAuth || !admin) throw new Error('Unauthenticated!')
    try {
    const brand = await User.findById(args.userInput.userId)
      if (!brand) throw new Error('Not Found')
      brand.reportSummary = args.userInput.reportSummary
      const editedBrand = brand.save()
      return transformUser(editedBrand)
    }
    catch (err) {
      throw err
    }
  },
  deleteUser: async (args) => {
    try {
      const brand = User.findById(args.userId)
      await brand.deleteOne({ _id: args.userId })
      return brand
    } catch (err) {
      throw err
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email })
    if (!user) throw new Error('Unauthorized')
    const isEqual = bcrypt.compareSync(password, user.password)
    if (!isEqual) throw new Error('Unauthorized')
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
    return { userId: user._id, token: token }
  },
  backLogin: async ({ email, password }) => {
    if (email !== 'wordee@email.co.uk') throw new Error('Unauthorized')
    const user = await User.findOne({ email: email })
    if (!user) throw new Error('Unauthorized')
    const isEqual = bcrypt.compareSync(password, user.password)
    if (!isEqual) throw new Error('Unauthorized')
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
    return { userId: user._id, token: token }
  }
}