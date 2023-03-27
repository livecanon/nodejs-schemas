/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs')

const User = require('../models/user')

exports.signUp = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        res.json({
          error: {
            email: 'E-Mail exists already, please pick a different one.',
          },
        })
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
          })
          return user.save()
        })
        .then(() => {
          res.json({
            message: 'User succesfully created, you can sign in now.',
          })
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.signIn = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          error: {
            _non_field_error: 'Invalid email or password',
          },
        })
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true
            req.session.user = user
            return req.session.save(() => {
              res.sendStatus(200)
            })
          }
          res.status(401).json({
            error: {
              _non_field_error: 'Invalid email or password',
            },
          })
        })
        .catch((err) => {
          console.log(err)
          res.sendStatus(401)
        })
    })
    .catch((err) => console.log(err))
}

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.sendStatus(200)
  })
}
