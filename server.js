var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

//if (process.env.NODE_ENV !== 'production') {
  //require('dotenv').config()
//}
require('dotenv').config({silent: true});

var subscriptions = require('./routes/subscription')

var PORT = process.env.PORT || 3000
var app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'static')))
app.use('/v1/subscriptions', subscriptions)

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
