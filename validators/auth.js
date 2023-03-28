const { body } = require('express-validator')

const User = require('../models/user')

exports.signUpValidator = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject('E-Mail address already exists!')
        }
      })
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 5 }),
  body('name').trim().not().isEmpty(),
  body('phone').trim().optional().isLength({ min: 9 }),
]

exports.signInValidator = [
  body('email').isEmail(),
  body('password').trim().not().isEmpty(),
]
