const express = require('express')

const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/products', shopController.getProducts)
router.get('/product/:id', shopController.getProduct)
router.post('/add-product', shopController.postAddProduct)
router.post('/edit-product', shopController.postEditProduct)
router.post('/delete-product', shopController.postDeleteProduct)

module.exports = router
