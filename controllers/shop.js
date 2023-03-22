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

exports.postEditProduct = (req, res) => {
  const { productId, title, price, imageUrl, description } = req.body

  const product = new Product(title, price, description, imageUrl, productId)
  product
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => console.log(err))
}

exports.getProduct = (req, res) => {
  const id = req.params.id

  Product.findById(id)
    .then((product) => {
      res.json(product)
    })
    .catch((err) => console.log(err))
}

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      return res.json(products)
    })
    .catch((err) => console.log(err))
}

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId

  Product.deleteById(prodId)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => console.log(err))
}
