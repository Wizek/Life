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

exports.a = {
  b: function(test) {
    test.expect(4)
    test.equal(typeof User, 'function')
    User.count(function(err, count) {
      test.equal(count, 0)
      User.create(UserValidAttributes(), function() {
        User.count(function(err, count) {
          test.equal(err, null)
          test.equal(count, 1)
          test.done()
        })
      })
    })
  },
  a: function(test) {
    /*test.expect(-1)
    var u = new User(UserValidAttributes())
    u.changePassword('baz')
    test.equal(u.password, '24h1jh45jjh135jh13h5h135h1h3j5jh13')*/
    test.done()
  }
}
