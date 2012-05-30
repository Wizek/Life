Need.validatesPresenceOf('needee', 'neederID', 'createdAt', 'updatedAt', 'importance')
//Need.validatesNumericalityOf('importance')
Need.validate('importance', function(bad){var i=this.importance;!(i>=0&&i<=1)&&bad()}, {message: 'Bad importance'});

Need.getAllActive = function(cb) {
  return Need.all({where: {fulfillerID: null}}, cb)
}
