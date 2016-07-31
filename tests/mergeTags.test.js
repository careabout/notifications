var test = require('tape')

var mergeTags = require('../mergeTags)

test('Tags are blanked out', (t) => {
  var old = {"existing": "not chnaged", "deleted": "has value"}
  var current = {"new": "is new", "existing": "not changed"}
  var expected = {"new": "is new", "existing": "not changed", "deleted": ""}

  var actual = mergeTags(old, current)

  t.deepEqual(actual, expected)
  t.end()
})
