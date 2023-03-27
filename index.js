const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const router = require('./routes')
const User = require('./models/user')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const store = new MongoDBStore({
  uri: 'mongodb://root:password@127.0.0.1:27017?retryWrites=true',
  collection: 'sessions',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
)

app.use((req, res, next) => {
  if (!req.session.user) {
    return next()
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => console.log(err))
})

app.use('/api', router)

mongoose
  .connect('mongodb://root:password@127.0.0.1:27017?retryWrites=true')
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
