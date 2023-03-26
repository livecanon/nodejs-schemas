const Product = require('../models/product')

exports.createProduct = (req, res) => {
  const { title, price, description } = req.body
  const product = new Product({ title, price, description })

  product
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      return res.json(products)
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

exports.updateProduct = (req, res) => {
  const { id, title, price, description } = req.body

  Product.findByIdAndUpdate(id, { title, price, description }, { new: true })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => console.log(err))
}

exports.deleteProduct = (req, res) => {
  const id = req.params.id

  Product.findByIdAndDelete(id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => console.log(err))
}
