const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res) {
  User
    .create(req.body)
    .then(user => { 
      res.status(201).json({ 'message': `Thanks for registering ${user.username}` })
    })
    .catch(err => console.log(err))
}

//res.status(422).json(err)

function login(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
      res.status(202).json({
        message: `Welcome back ${user.username}`,
        token
      })
    })
    .catch(err => console.log(err))
}

function admin(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (req.body.email !== 'wordee@email.co.uk') return res.status(401).json({ message: 'Unauthorized' })
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
      res.status(202).json({
        message: `Welcome back ${user.username}`,
        token
      })
    })
    .catch(err => console.log(err))
}

function showProfileAll(req, res) {
  User
    .find()
    .then(selectedUsers => {
      if (req.currentUser.email !== 'wordee@email.co.uk') return res.status(401).json({ message: 'Unauthorized' })
      res.status(200).json(selectedUsers)
    })
    .catch(err => res.json(err))
}

module.exports = { register, login, showProfileAll, admin }
