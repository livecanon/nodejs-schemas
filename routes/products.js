const express = require('express')

const isAuthenticated = require('../middleware/isAuthenticated')

const productsController = require('../controllers/products')

const router = express.Router()

router.post('/', isAuthenticated, productsController.createProduct)
router.get('/', isAuthenticated, productsController.getAllProducts)
router.get('/:id', isAuthenticated, productsController.getProduct)
router.put('/', isAuthenticated, productsController.updateProduct)
router.delete('/:id', isAuthenticated, productsController.deleteProduct)

module.exports = router
