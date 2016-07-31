var express = require('express')

var db = require('../db/subscriptions')
var onesignal = require('../services/onesignal')

var router = express.Router()

router.post('/:id', (req, res) => {
  var id = req.params.id
  var topics = req.body.topics
  onesignal.update(id, topics)
    .then(() => {
      db.save(id, topics)
        .then(() => {
          res.sendStatus(200)
        })
        .catch((err) => {
          res.sendStatus(500, err.message)
        })
    })
    .catch((e) => res.sendStatus(500, e.message))
})

router.get('/:id', (req, res) => {
  var id = req.params.id
  db.get(id)
    .then((doc) => {
      res.send(doc)
    })
    .catch((err) => {
      res.send(500, err.message)
    })
})

router.put('/:id', (req, res) => {
  var id = req.params.id
  var topics = req.body.topics
  onesignal.update(id, topics)
    .then(() => {
      db.update(id, topics)
        .then(() => {
          res.sendStatus(200)
        })
        .catch((err) => {
          res.send(500, err.message)
        })
    })
    .catch((e) => res.sendStatus(500, e.message))
})

module.exports = router
