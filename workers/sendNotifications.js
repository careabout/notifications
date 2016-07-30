require('dotenv').config()

var message = { 
  app_id: process.env.APP_ID,
  contents: {"en": "This is your Auckland notification."},
  included_segments: ["Auckland"]
}

sendNotification(message)

function sendNotification (data) {
  var headers = {
    "Content-Type": "application/json",
    "Authorization": "Basic " + process.env.AUTH_HEADER
  }
  
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  }
  
  var https = require('https')
  var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:")
      console.log(JSON.parse(data))
    })
  })
  
  req.on('error', function(e) {
    console.log("ERROR:")
    console.log(e)
  })
  
  req.write(JSON.stringify(data))
  req.end()
}
