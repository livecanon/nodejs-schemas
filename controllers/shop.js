const Product = require('../models/product')

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body
  const product = new Product(title, price, description, imageUrl, null)

  product
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.postEditProduct = (req, res, next) => {}

exports.getProducts = (req, res, next) => {}

exports.postDeleteProduct = (req, res, next) => {}
