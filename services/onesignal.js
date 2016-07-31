var request = require('superagent')

var mergeTags = require('./tagHelpers').mergeTags
var createTags = require('./tagHelpers').createTags

module.exports = { update }

function update (id, topics) {
  return new Promise ((resolve, reject) => {
    var newTags = createTags(topics)

    getTags(id).then((oldTags) => {
      var message = { 
        id: id,
        app_id: process.env.APP_ID,
        tags: mergeTags(oldTags, newTags)
      }

      request
        .put('https://onesignal.com/api/v1/players/' + id)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Basic ' + process.env.AUTH_HEADER)
        .send(message)
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
    })
  })
}

function getTags (id) {
  return new Promise ((resolve, reject) => {
    var message = { 
      id: id,
      app_id: process.env.APP_ID
    }

    request
      .get('https://onesignal.com/api/v1/players/' + id)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic ' + process.env.AUTH_HEADER)
      .send(message)
      .end((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res.body.tags)
        }
      })
  })
}
