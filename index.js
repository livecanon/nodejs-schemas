const express = require('express')
const dotenv = require('dotenv')
const mongoConnect = require('./utils/database').mongoConnect

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoConnect(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
