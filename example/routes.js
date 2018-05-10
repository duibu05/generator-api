const Router = require('express').Router
const router = new Router()

const user = require('./modules/user/router')
const pet = require('./modules/pet/router')

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to example-api API!' })
})

router.use('/user', user)
router.use('/pet', pet)

module.exports = router
