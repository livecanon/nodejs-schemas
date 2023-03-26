const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoConnect = require('./utils/database').mongoConnect
const router = require('./routes')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', router)

mongoConnect(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
