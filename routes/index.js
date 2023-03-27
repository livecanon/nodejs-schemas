const express = require('express')

const router = express.Router()

// Routes
const productsRoutes = require('./products')
const authRoutes = require('./auth')

router.use('/products', productsRoutes)
router.use('/auth', authRoutes)

module.exports = router
