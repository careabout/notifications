module.exports = { createTags, mergeTags }

function mergeTags (old, current) {

}

function createTags (topics) {
 return topics.reduce((acc, topic) => {
    acc[topic] = true
    return acc
  }, {})
}
