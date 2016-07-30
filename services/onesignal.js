module.exports = {
  add
}

function add (id, topics, locations) {
  return new Promise ( (resolve, reject) => {
    var headers = {
      "Content-Type": "application/json",
      "Authorization": "Basic " + process.env.AUTH_HEADER
    }
    
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/players/" + id,
      method: "PUT",
      headers: headers
    }
    
    var message = { 
      id: id,
      app_id: process.env.APP_ID,
      tags: createTags(topics.concat(locations))
    }

    var https = require('https')
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
        console.log("Response:")
        console.log(data.toString())
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
}


function createTags (topics) {
 return topics.reduce((acc, topic) => {
    acc[topic] = true
    return acc
  }, {})
}
