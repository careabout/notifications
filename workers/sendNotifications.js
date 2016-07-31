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
      url: process.env.SITE_URL + '/#/decisions/' + decision._id
    }
    sendNotification(message)
    updateDecisionAsProcessed(decision._id)
  })
}

function sendNotification (message) {
  request
    .post('https://onesignal.com/api/v1/notifications')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Basic ' + process.env.AUTH_HEADER)
    .send(message)
    .end((err, res) => {
      if (err) {
        logger.log({type: 'error', msg: 'Notification error: ' + err.message})
      }
    })
}

function updateDecisionAsProcessed (id) {
  request
    .put(process.env.SITE_URL + '/v1/decisions/' + id + '/processed')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        logger.log({type: 'error', msg: 'Updating decision error: ' + err.message})
      }
    })
}
