var mongoClient = require('mongodb').MongoClient
require('dotenv').config()

module.exports = { save, get, update }

function save(id, topics) {
  return new Promise ((resolve, reject) => {
    mongoClient.connect(process.env.SUBSCRIPTION_DB, (err, db) => {
      db.collection('subscriptions').insertOne({
        "id": id,
        "topics": topics
      }, (err, result) => {
        db.close()
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  })
}

function update(id, topics) {
  return new Promise ((resolve, reject) => {
    mongoClient.connect(process.env.SUBSCRIPTION_DB, (err, db) => {
      db.collection('subscriptions').updateOne({"id": id}, {$set: {
        "topics": topics
      }}, (err, result) => {
        db.close()
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  })
}

function get (id) {
  return new Promise ((resolve, reject) => {
    mongoClient.connect(process.env.SUBSCRIPTION_DB, (err, db) => {
      db.collection('subscriptions').findOne({"id": id}, (err, doc) => {
        db.close()
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  })
}
