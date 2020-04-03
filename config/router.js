const router = require('express').Router()
const users = require('../controllers/users')
const authUsers = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')


router.route('/chefs')
  .get(users.index)

router.route('/chefs/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.destroy)

router.route('/chefs/:id/rating')
  .post(secureRoute, users.ratingCreate)

router.route('/chefs/:id/review')
  .post(secureRoute, users.reviewCreate)

router.route('/profile')
  .get(secureRoute, authUsers.showProfile)

router.route('/chefs/:id/offersAccepted')
  .post(secureRoute, users.offersAccepted)

router.route('/chefs/:id/offersAccepted/:offereyid')
  .delete(secureRoute, users.offersAcceptDelete)

router.route('/chefs/:id/offersPending')
  .post(secureRoute, users.offersPendingCreate)

router.route('/chefs/:id/offersPending/:offereyid')
  .delete(secureRoute, users.offersPendingDelete)

router.route('/offers')
  .get(secureRoute, authUsers.offers)

router.route('/register')
  .post(authUsers.register)

router.route('/login')
  .post(authUsers.login)

module.exports = router