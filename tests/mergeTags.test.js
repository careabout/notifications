var test = require('tape')

var mergeTags = require('../services/tagHelpers').mergeTags

test('Tags are blanked out', (t) => {
  var old = {"existing": "not changed", "deleted": "has value"}
  var current = {"new": "is new", "existing": "not changed"}
  var expected = {"new": "is new", "existing": "not changed", "deleted": ""}

  var actual = mergeTags(old, current)

  t.deepEqual(actual, expected)
  t.end()
})
