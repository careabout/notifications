var express = require('express')

var db = require('../db/subscriptions')
var onesignal = require('../services/onesignal')

var router = express.Router()

router.post('/:id', (req, res) => {
  var id = req.params.id
  var topics = req.body.topics
  var locations = req.body.locations
  onesignal.add(id, topics, locations)
    .then(() => {
      db.save(id, topics, locations)
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
  var locations = req.body.locations
  db.update(id, topics, locations)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((err) => {
      res.send(500, err.message)
    })
})

module.exports = router
