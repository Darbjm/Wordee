const router = require('express').Router()
const users = require('../controllers/users')
const authUsers = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/brands/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.destroy)

router.route('/all')
  .get(secureRoute, authUsers.showProfileAll)

router.route('/brands/register')
  .post(authUsers.register)

router.route('/brands/login')
  .post(authUsers.login)

router.route('/admin/login')
  .post(authUsers.admin)

router.route('/briefs/add')
  .post(secureRoute, users.briefsCreate)

router.route('/briefs/:id')
  .get(secureRoute, users.briefs)
  .put(secureRoute, users.briefsEdit)
  .delete(secureRoute, users.briefsDestroy)

router.route('/images/add')
  .post(secureRoute, users.imagesAdd)

router.route('/images/delete/:id')
  .delete(secureRoute, users.imagesDestory)

router.route('/docs/add')
  .post(secureRoute, users.docsAdd)

router.route('/docs/delete/:id')
  .delete(secureRoute, users.docsDestory)

module.exports = router