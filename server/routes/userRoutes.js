const express = require('express')
const authController = require('./../controllers/authController')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/loggedUser', authController.loggedUser)

module.exports = router
