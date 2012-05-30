var app = require('railway').createServer();

function UserValidAttributes () {
  return(
    { username: 'Wiz' + Math.floor(Math.random() * 1000000)
    , password: '12345678'
    , email: 'valid' + Math.floor(Math.random() * 1000000) + '@mail.com'
    , reputation: 9001
    , geoLat: 47.476941
    , geoLon: 19.059659
    }
  )
}

exports.needTests = {
  testGetAllActive: function(test) {
    test.expect(10)
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
            var testNeed = userNeeds[0]
            test.equal(testNeed.needee, 'bread')
            // Get the needer of this need
            testNeed.needer(function(err, needer) {
              test.deepEqual(needer, user)

              // Get all active needs and check them
              Need.getAllActive(function(err, activeNeeds) {
                test.equal(activeNeeds.length, 1)
                var activeNeed = activeNeeds[0]
                test.equal(activeNeed.needee, 'bread')
                // Get the needer of this activeNeed
                activeNeed.needer(function(err, activeNeedNeeder) {
                  test.deepEqual(activeNeedNeeder, user)

                  // Create a new user as user2
                  User.create(new UserValidAttributes, function(err, user2) {
                    // Fulfill the active need with user2
                    user2.fulfillNeed(activeNeed, function(err, fulfilledNeed) {
                      test.equal(fulfilledNeed.needee, 'bread')
                      // Get the fulfiller of this fulfilled need
                      fulfilledNeed.fulfiller(function(err, fulfiller) {
                        test.deepEqual(fulfiller, user2)

                        // Get active needs again and ensure the list is empty
                        Need.getAllActive(function(err, allActiveNeeds) {
                          test.equal(allActiveNeeds.length, 0)
                          test.done()
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }
}
