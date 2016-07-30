var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
require('dotenv').config()

var subscriptions = require('./routes/subscription')

var PORT = process.env.PORT || 3000
var app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'static')))
app.use('/v1/subscriptions', subscriptions)

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
