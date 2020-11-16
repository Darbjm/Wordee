const Brief = require('../../models/brief')
const User = require('../../models/user')
const { transformBrief, findUser } = require('./merge')


module.exports = {
  brief: async (agrs, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!')
    // }
    try {
      await Brief.deleteMany()
      const briefs = await Brief.find()
      return briefs.map(brief => {
        return transformBrief(brief)
      })
    } catch (err) {
      throw err
    }
  },
  singleBrief: async ({briefId}, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    try {
      const brief = await Brief.findById(briefId)
      return brief
    } catch (err) {
      throw err
    }
    // convert all old briefs to new briefs that can be found on the server
    // const allUsers = await User.find()
    // allUsers.map(user => {
    //   user.liveBriefs.map(async brief => {
    //     const newBrief = new Brief({
    //       title: brief.title,
    //       content: brief.content,
    //       length: brief.length,
    //       level: brief.level,
    //       purpose: brief.purpose,
    //       prodName: brief.prodName,
    //       new: brief.new,
    //       keypoints: brief.keypoints,
    //       message: brief.message,
    //       url: brief.url,
    //       first_draft: brief.first_draft,
    //       topic: brief.topic,
    //       keyword1: brief.keyword1,
    //       keyword2: brief.keyword2,
    //       keyword3: brief.keyword3,
    //       brand: brief._id
    //     })
    //     user.liveBriefs = []
    //     user.save()
    //     const briefUpdate = await newBrief.save()
    //     user.liveBriefs.push(briefUpdate)
    //     await creator.save()
    //   })
    // })
    // try {
    //   const user = await User.findById(req.userId)
    //   const brief = user.liveBriefs.find(liveBrief => (
    //     liveBrief._id == briefId
    //   ))
    //   return brief
    // } catch (err) {
    //   throw err
    // }
  },
  createBrief: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    const creator = await User.findById(req.userId)
    if (!creator) {
      throw new Error('User not found')
    }
    if (args.briefInput.prodName === 'undefined') args.briefInput.prodName = ''
    if (args.briefInput.new === 'undefined') args.briefInput.new = ''
    if (args.briefInput.keypoints === 'undefined') args.briefInput.keypoints = ''
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
      creator.liveBriefs.push(brief)
      await creator.save()
      return createdBrief
    } catch (err) {
      throw err
    }
  },
  editBrief: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!')
    }
    if (args.briefInput.prodName === 'undefined') args.briefInput.prodName = ''
    if (args.briefInput.new === 'undefined') args.briefInput.new = ''
    if (args.briefInput.keypoints === 'undefined') args.briefInput.keypoints = ''
    try {
      const brief = await Brief.findById(args.briefInput._id)
      if (!brief) throw new Error('Not Found')
      Object.assign(brief, args.briefInput)
      const editedBrief = await brief.save()
      return editedBrief
      //could not find briefs by ID's so had to use this method
      // const user = await User.findById(req.userId)
      // const brief = user.liveBriefs.filter(liveBrief => (
      //   liveBrief._id == args.briefInput._id
      // ))
      // user.save()
      // Object.assign(brief, args.briefInput)
      // user.liveBriefs.push(brief)
      // return brief
    } catch (err) {
      throw err
    }
  },
  deleteBrief: async (args) => {
    try {
      const brief = await Brief.findById(args.briefId)
      const brand = await User.findById(brief.brand)
      brand._doc.liveBriefs.map((liveBrief, i)=> {
        if (liveBrief._id == args.briefId) {
          brand.liveBriefs.splice(i, 1)
        }
      })
      await brand.save()
      await Brief.deleteOne({ _id: args.briefId })
      return brand
    } catch (err) {
      throw err
    }
  }
}
