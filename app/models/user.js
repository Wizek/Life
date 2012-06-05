User.validatesPresenceOf('email', 'username', 'password', 'reputation')
User.validatesLengthOf('username', {min:3, max:20})
User.validatesLengthOf('password', {min:8})
User.validatesFormatOf('email', {with: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i})
User.validatesUniquenessOf('email', 'username')
User.validate('reputation', function(bad){var i=this.reputation;!(i>=1)&&bad()}, {message: 'Bad reputation'});

User.prototype.fulfillNeed = function(need, cb) {
  cb = cb || function() {}
  if (typeof cb != 'function') return

  if (typeof need != 'object') cb('First parameter must be an object')
  if (!need instanceof Need) cb('First parameter must be a Need instance')

  need.fulfiller(this)
  cb(null, need)
}
