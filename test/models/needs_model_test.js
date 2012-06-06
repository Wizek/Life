var app = require('railway').createServer();
var async = require('async')

function UserValidAttributes () {
  return(
    { username: 'Wiz'
    , password: '12345678'
    , email: 'valid@mail.com'
    , reputation: 9001
    }
  )
}

function UserValidAttributes2 () {
  return(
    { username: 'Wiz2'
    , password: '12345678'
    , email: 'valid2@mail.com'
    , reputation: 9001
    }
  )
}

exports.needTests = {
  testGetAllActive: function(test) {
    test.expect(10)

    var yield = {}

    async.waterfall(
      [ function(cb) {
          Need.getAllActive(cb)
        }
      , function(activeNeeds, cb) {
          // Ensure that there is no needs yet
          test.deepEqual(activeNeeds, [])
          // Create new user
          User.create(new UserValidAttributes, cb)
        }
      , function(user, cb) {
          yield.user = user
          // Create new need
          yield.user.needs.create({needee: 'bread'}, cb)
        }
      , function(need, cb) {
          // Get test users needs
          yield.user.needs(cb)
        }
      , function(userNeeds, cb) {
          test.equal(userNeeds.length, 1)
          var testNeed = userNeeds[0]
          test.equal(testNeed.needee, 'bread')
          // Get the needer of this need
          testNeed.needer(cb)
        }
      , function(needer, cb) {
          test.deepEqual(needer, yield.user)
          // Get all active needs
          Need.getAllActive(cb)
        }
      , function(activeNeeds, cb) {
          test.equal(activeNeeds.length, 1)
          yield.activeNeed = activeNeeds[0]
          test.equal(yield.activeNeed.needee, 'bread')
          // Get the needer of this activeNeed
          yield.activeNeed.needer(cb)
        }
      , function(activeNeedNeeder, cb) {
          test.deepEqual(activeNeedNeeder, yield.user)
          // Create a new user as user2
          User.create(new UserValidAttributes2, cb)
        }
      , function(user2, cb) {
          yield.user2 = user2
          // Fulfill the active need with user2
          yield.user2.fulfillNeed(yield.activeNeed, cb)
        }
      , function(fulfilledNeed, cb) {
          test.equal(fulfilledNeed.needee, 'bread')
          // Get the fulfiller of this fulfilled need
          fulfilledNeed.fulfiller(cb)
        }
      , function(fulfiller, cb) {
          test.deepEqual(fulfiller, yield.user2)
          Need.getAllActive(cb)
        }
      , function(allActiveNeeds, cb) {
          test.equal(allActiveNeeds.length, 0)
          test.done()
        }
      ]
    )
  }
}
