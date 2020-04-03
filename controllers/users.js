const User = require('../models/user')
function index(req, res) {
  User
    .find()
    .populate('user')
    .then(foundUsers => res.status(200).json(foundUsers))
    .catch(err => res.json(err))
}
function show(req, res) {
  User
    .findById(req.params.id)
    .populate('user')
    .then(selectedUser => res.status(200).json(selectedUser))
    .catch(err => res.status(404).json(err))
}
function update(req, res) {
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) throw new Error('Not Found')
      if (!user._id.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      Object.assign(user, req.body) 
      return user.save()  
    })
    .then(updatedUser => res.status(202).json(updatedUser))
    .catch(err => res.status(401).json(err))
}
function destroy(req, res) {
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      user.remove().then(() => res.sendStatus(204))
    })
    .catch(err => res.json(err))
}
function ratingCreate(req, res) {
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found ' })
      if (user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      user.rating.push(req.body)
      return user.save()
    })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(404).json(err))
}
function offersPendingCreate(req, res) {
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      if (user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      user.offersPending.push({ offeringUser: req.currentUser })
      return user.save()
    })
    .then(user => res.status(201).json(user))
    .catch(err => res.json(err))
}
function offersPendingDelete(req, res) {
  User
    .findById(req.currentUser)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      const offerToDelete = user.offersPending.find(offer => offer.offeringUser == req.params.offereyid)
      // const offerToDelete = user.offersPending.find(offer => offer.offeringUser.equals(req.params.offereyid))
      offerToDelete.remove()
      return user.save()
    })
    .then(() => res.sendStatus(204)) 
    .catch(err => res.status(401).json(err))
}
function offersAccepted(req, res) {
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      if (user.equals(req.body._id)) return res.status(401).json({ message: 'Unauthorized' })
      user.offersAccepted.push({ acceptedUser: req.body })
      return user.save()
    })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(401).json(err))
}
function offersAcceptDelete(req, res) {
  User
    .findById(req.currentUser)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      const offerToDelete = user.offersAccepted.find(offer => offer.acceptedUser == req.params.offereyid)
      offerToDelete.remove()
      return user.save()
    })
    .then(() => res.sendStatus(204)) 
    .catch(err => res.status(401).json(err))
}
function reviewCreate(req, res) {
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      if (user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Not Found' })
      user.review.push(req.body)
      return user.save()
    })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(404).json(err))
}
module.exports = { index, show, update, ratingCreate, offersPendingCreate, reviewCreate, offersPendingDelete, offersAccepted, offersAcceptDelete, destroy }
