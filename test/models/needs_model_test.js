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
    test.expect(1)
    Need.getAllActive(function(err, activeNeeds) {
      test.deepEqual(activeNeeds, [])
      User.create(new UserValidAttributes, function(err, user) {
        console.log(user.errors)
        user.needs.create({needee: 'bread'}, function(err, need) {
          console.log(need.errors)
          Need.getAllActive(function(err, activeNeed) {
            test.equal(activeNeed.length, 1)
            test.deepEqual(activeNeed[0], {needee: 'bread'})
            test.done()
          })
        })
      })
    })
  }
}
