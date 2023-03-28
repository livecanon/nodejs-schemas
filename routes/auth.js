const express = require('express')

const authController = require('../controllers/auth')
const validators = require('../validators/auth')

const router = express.Router()

router.post('/signup', validators.signUpValidator, authController.signup)
router.post('/signin', validators.signInValidator, authController.signin)

module.exports = router
