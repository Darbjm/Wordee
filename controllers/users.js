const User = require('../models/user')

function show(req, res) {
  User
    .findById(req.currentUser._id)
    .then(selectedUser => res.status(200).json(selectedUser))
    .catch(err => res.status(404).json(err))
}

function update(req, res) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      if (!user._id.equals(req.params.id)) return res.status(401).json({ message: 'Unauthorized' })
      Object.assign(user, req.body) 
      return user.save()  
    })
    .then(updatedUser => res.status(202).json(updatedUser))
    .catch(err => res.status(401).json(err))
}

function destroy(req, res) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      if (!user._id.equals(req.params.id)) return res.status(401).json({ message: 'Unauthorized' }) //This line was deleted when merged
      if (!user) return res.status(404).json({ message: 'Not Found' })
      user.remove().then(() => res.sendStatus(204))
    })
    .catch(err => res.status(403).json(err))
}
/**Show brief */
function showBriefs(req, res) {
  User
    .findById(req.currentUser._id)
    .then(brand => {
      if (!brand) return res.status(404).json({ message: 'Not Found' })
      const brief = brand.liveBriefs.find(checkBrief => checkBrief.id === req.params.id)
      return brief 
    })
    .then(Brief => res.status(202).json(Brief)) 
    .catch(err => res.status(404).json(err))
}

function briefsCreate(req, res) {
  req.body.brand = req.currentUser
  User
    .findById(req.currentUser._id)
    .then(brand => {
      if (!brand) return res.status(404).json({ message: 'Not Found' })
      brand.liveBriefs.push(req.body)
      return brand.save()
    })
    .then(brand => res.status(202).json(brand))
    .catch(err => res.status(422).json(err))
}

function briefsEdit(req, res) {
  User
    .findById(req.currentUser._id)
    .then(brand => {
      if (!brand) return res.status(404).json({ message: 'Not Found' })
      const brief = brand.liveBriefs.find(checkBrief => checkBrief.id === req.params.id)
      Object.assign(brief, req.body) 
      return brand.save()  
    })
    .then(updatedBrief => res.status(202).json(updatedBrief)) 
    .catch(err => res.status(404).json(err))
}

function briefsDestroy(req, res) {
  User
    .findById(req.currentUser._id)
    .then(brand => {
      if (!brand) return res.status(404).json({ message: 'Not Found' })
      if (!brand.liveBriefs.length) return res.status(404).json({ message: 'Not Found' })
      const indexBrief = brand.liveBriefs.findIndex(brief => brief.id === req.params.id)
      brand.liveBriefs.splice(indexBrief, 1)
      brand.save()
    })
    .then(() => res.sendStatus(204))
    .catch(err => res.status(404).json(err))
}

function imagesAdd(req, res) {
  User
    .findById(req.currentUser._id)
    .then(brand => {
      if (!brand) return res.status(404).json({ message: 'Not Found' })
      const add = req.body.url
      if (brand.image.some(address => address.url === add)) {
        return brand
      }
      brand.image.push({ 
        url: add,
        brand: req.currentUser
      })
      return brand.save()
    })
    .then(brand => res.status(202).json(brand))
    .catch(err => res.status(422).json(err))
}

function imagesDestory(req, res) {
  User
    .findById(req.currentUser._id)
    .then(brand => { 
      if (!brand) return res.status(404).json({ message: 'Not Found' })
      const image = brand.image.id(req.params.id)
      if (!image) return res.status(404).json({ message: 'Not Found' })
      if (!image.brand.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      image.remove()
      return brand.save()
    })
    .then(brand => res.status(204).json(brand))
    .catch(err => res.status(404).json(err))
}

function docsAdd(req, res) {
  User
    .findById(req.currentUser._id)
    .then(brand => {
      if (!brand) return res.status(404).json({ message: 'Not Found' })
      const add = req.body.url
      if (brand.docs.some(address => address.url === add)) {
        return brand
      }
      brand.docs.push({ 
        url: add,
        name: req.body.name,
        brand: req.currentUser
      })
      return brand.save()
    })
    .then(brand => res.status(202).json(brand))
    .catch(err => res.status(422).json(err))
}

function docsDestory(req, res) {
  User
    .findById(req.currentUser._id)
    .then(brand => { 
      if (!brand) return res.status(404).json({ message: 'Not Found' })
      const doc = brand.docs.id(req.params.id)
      if (!doc) return res.status(404).json({ message: 'Not Found' })
      if (!doc.brand.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      doc.remove()
      return brand.save()
    })
    .then(brand => res.status(204).json(brand))
    .catch(err => res.status(404).json(err))
}

function addReport(req, res) {
  console.log(req)
  User
    .findOne({ _id: req.params.id })
    .then(brand => {
      if (!brand) return res.status(404).json({ message: 'Not Found' })
      if (req.currentUser.email !== 'wordee@email.co.uk') return res.status(401).json({ message: 'Unauthorized' })
      Object.assign(brand, req.body)
      return brand.save()
    })
    .then(updatedBrand => res.status(202).json(updatedBrand))
    .catch(err => res.status(422).json(err))
}


module.exports = { show, update, destroy, showBriefs, briefsCreate, briefsEdit, briefsDestroy, imagesAdd, imagesDestory, docsAdd, docsDestory, addReport }
