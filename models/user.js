const mongoose = require('mongoose') // This is needed to create a new schema and model
const bcrypt = require('bcrypt') // Our chosen our library used to hash passwords

const docSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  brand: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const completedBriefSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  length: { type: String, required: true },
  level: { type: String, required: true },
  purpose: { type: String, required: true },
  sentance: { type: String, required: true },
  message: { type: String, required: true },
  url: { type: String, required: true },
  first_draft: { type: String, required: true },
  topic: { type: String, required: true },
  keyword1: { type: String, required: true },
  keyword2: { type: String, required: true },
  keyword3: { type: String, required: true },
  brand: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }

}, {
  timestamps: true
})

const liveBriefSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  length: { type: String, required: true },
  level: { type: String, required: true },
  purpose: { type: String, required: true },
  sentance: { type: String, required: true },
  message: { type: String, required: true },
  url: { type: String, required: true },
  first_draft: { type: String, required: true },
  topic: { type: String, required: true },
  keyword1: { type: String, required: true },
  keyword2: { type: String, required: true },
  keyword3: { type: String, required: true },
  brand: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }

}, {
  timestamps: true
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  logo: { type: String },
  cover: { type: String },
  summary: { type: String },
  website: { type: String },
  blog: { type: String },
  docs: [docSchema],
  image: [imageSchema],
  liveBriefs: [liveBriefSchema],
  completedBriefs: [completedBriefSchema]
}, {
  timestamps: true
})

userSchema.plugin(require('mongoose-unique-validator'))

userSchema
  .set('toJSON', {
    virtuals: true,
    transform(doc, json) {
      delete json.password
      return json
    }
  })

// This validates whether a password is correct at login
userSchema.methods.validatePassword = function validatePassword(password) {
  console.log(password, this.password, this)
  return bcrypt.compareSync(password, this.password) // bcyrpt hashes the password our user is trying to login with the same it hashed the one stored in the DB when they registered, it then compares them for us to see if they match, and returns true or false depending on the outcome
}

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) { // running before validation step
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match') // throws an error back to the controllers if the password passConf do not match
    }
    next() // otherwise allows to move on the Validate step
  })

userSchema
  .pre('save', function hashPassword(next) { // this happens before the mode is saved
    if (this.isModified('password')) { // if the password has been created or changed
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)) // reassign as a hash of itself
    }
    next() // now move on to saving
  })


module.exports = mongoose.model('User', userSchema)