const express = require('express')

const productsController = require('../controllers/products')

const router = express.Router()

router.post('/', productsController.createProduct)
router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProduct)
router.put('/', productsController.updateProduct)
router.delete('/:id', productsController.deleteProduct)

module.exports = router
