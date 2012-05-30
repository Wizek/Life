User.validatesPresenceOf('email', 'username', 'password', 'reputation')
User.validatesLengthOf('username', {min:3, max:20})
User.validatesLengthOf('password', {min:8})
User.validatesFormatOf('email', {with: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i})
User.validatesUniquenessOf('email', 'username')
User.validate('reputation', function(bad){var i=this.reputation;!(i>=1)&&bad()}, {message: 'Bad reputation'});
