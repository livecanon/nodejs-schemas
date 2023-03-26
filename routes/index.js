const express = require('express')

const router = express.Router()

// Routes
const productsRoutes = require('./products')

router.use('/products', productsRoutes)

module.exports = router
