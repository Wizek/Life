/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

var User = describe('User', function () {
    property('username', String);
    property('password', String);
    property('email', String);
    property('reputation', Number, {default: 1});
    property('geoLat', Number);
    property('geoLon', Number);
    property('createdAt', Date, {default: Date});
    property('updatedAt', Date, {default: Date});
});
var Need = describe('Need', function () {
    property('needee', String);
    property('importance', Number, {default: 0});
    property('satisfaction', String);
    property('createdAt', Date, {default: Date});
    property('updatedAt', Date, {default: Date});
});

Need.belongsTo(User, {as: 'fulfiller', foreignKey: 'fulfillerID'});
User.hasMany(Need, {as: 'needs', foreignKey: 'neederID'});
