var app = require('railway').createServer();

function UserValidAttributes () {
  return(
    { username: 'Wiz'
    , password: '12345678'
    , email: 'valid@mail.com'
    , reputation: 9001
    , geoLat: 47.476941
    , geoLon: 19.059659
    }
  )
}

exports.needTests = {
  testGetAllActive: function(test) {
    test.expect(7)
    Need.getAllActive(function(err, activeNeeds) {
      // Ensure that there is no needs yet
      test.deepEqual(activeNeeds, [])
      // Create new user
      User.create(new UserValidAttributes, function(err, user) {
        // Create new need
        user.needs.create({needee: 'bread'}, function(err, need) {
          // Get test users needs and check them
          user.needs(function(err, userNeeds) {
            test.equal(userNeeds.length, 1)
            test.equal(userNeeds[0].needee, 'bread')
            test.equal(userNeeds[0].neederID, user.id)
            // Get all active needs and check them
            Need.getAllActive(function(err, activeNeeds) {
              test.equal(activeNeeds.length, 1)
              test.deepEqual(activeNeeds[0].needee, 'bread')
              test.equal(activeNeeds[0].neederID, user.id)
              test.done()
            })
          })
        })
      })
    })
  }
}
