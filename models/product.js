const mongodb = require('mongodb')
const getDb = require('../utilss/database').getDb

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = id ? new mongodb.ObjectId(id) : null
  }

  save() {}

  static fetchAll() {}

  static findById() {}

  static deleteById() {}
}

module.exports = Product
