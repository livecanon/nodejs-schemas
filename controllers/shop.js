const Product = require('../models/product')

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body
  const product = new Product({ title, price, description, imageUrl })

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
  const { _id, title, price, imageUrl, description } = req.body

  Product.findByIdAndUpdate(_id, { title, price, imageUrl, description })
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
  Product.find()
    .then((products) => {
      return res.json(products)
    })
    .catch((err) => console.log(err))
}

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId

  Product.findByIdAndDelete(prodId)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => console.log(err))
}
