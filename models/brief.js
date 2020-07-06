const mongoose = require('mongoose')

const BriefSchema = new mongoose.Schema({
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


module.exports = mongoose.model('Brief', BriefSchema)