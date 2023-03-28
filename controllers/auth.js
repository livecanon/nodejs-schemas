const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/user')

exports.signup = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { email, name, password } = req.body

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email,
        name,
        password: hashedPw,
      })
      return user.save()
    })
    .then((result) => {
      res.status(201).json({ msg: 'User created!', userId: result._id })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.signin = (req, res, next) => {
  const { email, password } = req.body

  let loadedUser

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          errors: [
            {
              non_field_error: 'Invalid credentials',
            },
          ],
        })
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(401).json({
          errors: [
            {
              non_field_error: 'Invalid credentials',
            },
          ],
        })
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        'somesupersecretsecret',
        { expiresIn: '8h' }
      )
      res.status(200).json({ token, userId: loadedUser._id.toString() })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
