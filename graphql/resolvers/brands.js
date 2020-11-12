const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')
const { findUser, transformUser, createUser } = require('./merge')
const { secret } = require('../../config/environment')

module.exports = {
  users: async () => {
    try {
      const allUsers = await User.find()
      console.log(allUsers)
      return allUsers.map(user => {
        return findUser(user._id)
      })
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
      return singleUser
    } catch (err) {
      throw err
    }
  },
  createUser: async (args) => {
    try {
      const user = createUser(args.userInput)
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
      const editUser = createUser(args)
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
  }
}