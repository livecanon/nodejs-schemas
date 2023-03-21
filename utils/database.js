const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb://root:password@127.0.0.1:27017?retryWrites=true'
  )
    .then((client) => {
      console.log('Connected to the database!')
      _db = client.db()
      callback()
    })
    .catch((err) => {
      console.log('Unable to connect to the database!')
      console.log(err)
      throw err
    })
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
