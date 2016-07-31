var _ = require('lodash')

module.exports = { createTags, mergeTags }

function mergeTags (old, current) {
  var deletedTags = _.intersection(_.keys(old), _.difference(_.keys(old), _.keys(current)))
  var deletedObj = deletedTags.reduce((acc, elem) => {
    acc[elem] = ""
    return acc
  }, {})
  return Object.assign(current, deletedObj)
}

function createTags (topics) {
 return topics.reduce((acc, topic) => {
    acc[topic] = true
    return acc
  }, {})
}
