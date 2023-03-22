const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoConnect = require('./utils/database').mongoConnect

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const shopRoutes = require('./routes/shop')
app.use('/shop', shopRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoConnect(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
