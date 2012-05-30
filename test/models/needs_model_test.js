var app = require('railway').createServer();

function ValidAttributes () {
  return {
    needee: 'bread'
  };
}

exports.needTests = {
  testGetAllActive: function(test) {
    test.expect(1)
    Need.getAllActive(function(err, activeNeeds) {
      test.deepEqual(activeNeeds, [])
      Need.create({}, function() {})
      test.done()
    })
  }
}
