const Brief = require('../../models/brief')
const User = require('../../models/user')
const { transformBrief, findUser } = require('./merge')


module.exports = {
  brief: async () => {
    try {
      const briefs = await Brief.find()
      return briefs.map(brief => {
        return transformBrief(brief)
      })
    } catch (err) {
      throw err
    }
  },
  createBrief: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    const brief = new Brief({
      title: args.briefInput.title,
      content: args.briefInput.content,
      length: args.briefInput.length,
      level: args.briefInput.level,
      purpose: args.briefInput.purpose,
      prodName: args.briefInput.prodName,
      new: args.briefInput.new,
      keypoints: args.briefInput.keypoints,
      message: args.briefInput.message,
      url: args.briefInput.url,
      first_draft: args.briefInput.first_draft,
      topic: args.briefInput.topic,
      keyword1: args.briefInput.keyword1,
      keyword2: args.briefInput.keyword2,
      keyword3: args.briefInput.keyword3,
      brand: req.userId
    })
    let createdBrief
    try {
      const result = await brief.save()
      createdBrief = transformBrief(result)
      const creator = await User.findById(req.userId)
      if (!creator) {
        throw new Error('User not found')
      }
      creator.liveBriefs.push(brief)
      await creator.save()
      return createdBrief
    } catch (err) {
      throw err
    }
  },
  deleteBrief: async (args) => {
    try {
      const brief = Brief.findById(args.briefId)
      const brand = findUser(brief.brand)
      await Brief.deleteOne({ _id: args.briefId })
      return brand
    } catch (err) {
      throw err
    }
  }
}

