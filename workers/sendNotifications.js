var logger = require('logfmt')
var request = require('superagent')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

getDecisions()

function getDecisions () {
  request
    .get('https://care-about.herokuapp.com/v1/decisions/?processed=false')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        logger.log({type: 'error', msg: err.message})
      } else {
        console.log(res.body.decisions)
        sendNotifications(res.body.decisions)
      }
    })
}

function sendNotifications (decisions) {
  // for each decision
  decisions.forEach((decision) => {
    var allTopics = decision.topics.concat(decision.locations)
    var message = { 
      app_id: process.env.APP_ID,
      headings: {"en": allTopics[0]},
      contents: {"en": decision.title},
      included_segments: allTopics,
      chrome_web_icon: process.env.SITE_URL + '/notification_logo.png',
      firefox_icon: process.env.SITE_URL + '/notification_logo.png',
      url: process.env.SITE_URL + '/v1/decisions/' + decision._id
    }
    sendNotification(decision._id, message)
    updateDecisionAsProcessed(decision._id)
  })
}

function sendNotification (id, message) {
  request
    .post('https://onesignal.com/api/v1/notifications/' + id)
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Basic ' + process.env.AUTH_HEADER)
    .send(message)
    .end((err, res) => {
      if (err) {
        logger.log({type: 'error', msg: err.message})
      }
    })
}

function updateDecisionAsProcessed (id) {
  request
    .put('https://care-about.herokuapp.com/v1/decisions/' + id + '/processed')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        logger.log({type: 'error', msg: err.message})
      }
    })
}
