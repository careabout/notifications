var request = require('superagent')

var mergeTags = require('./tagHelpers').mergeTags
var createTags = require('./tagHelpers').createTags

module.exports = { update }

var headers = {
  "Content-Type": "application/json",
  "Authorization": "Basic " + process.env.AUTH_HEADER
}

function update (id, topics) {
  return new Promise ((resolve, reject) => {
    var options = {
      headers: headers,
      host: "onesignal.com",
      method: "PUT",
      path: "/api/v1/players/" + id,
      port: 443
    }

    var newTags = createTags(topics)
    getTags(id).then((oldTags) => {
      var message = { 
        id: id,
        app_id: process.env.APP_ID,
        tags: mergeTags(oldTags, newTags)
      }

      var https = require('https')
      var req = https.request(options, function(res) {  
        res.on('data', function(data) {
          resolve()
        })
      })
      
      req.on('error', function(e) {
        console.log("ERROR:")
        console.log(e)
        reject(e)
      })
      
      req.write(JSON.stringify(message))
      req.end()
    })
  })
}

function getTags (id) {
  return new Promise ((resolve, reject) => {
    var options = {
      headers: headers,
      host: "onesignal.com",
      method: "GET",
      path: "/api/v1/players/" + id,
      port: 443
    }

    var message = { 
      id: id,
      app_id: process.env.APP_ID
    }

    var https = require('https')
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
        resolve(data.tags)
      })
    })
    
    req.on('error', function(e) {
      console.log("ERROR:")
      console.log(e)
      reject(e)
    })
    
    req.write(JSON.stringify(message))
    req.end()
  })
}
