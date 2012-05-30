User.create(
  { username: 'Wiz'
  , password: '123'
  , email: 'a@a.a'
  , reputation: 9001
  , geoLat: 47.476941
  , geoLon: 19.059659
  }, function() {
    console.log('GREAT SUCCESS!')
  })
