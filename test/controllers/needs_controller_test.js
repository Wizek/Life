require('../test_helper.js').controller('needs', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        needee: '',
        satisfaction: ''
    };
}

exports['needs controller'] = {

    'GET new': function (test) {
        test.get('/needs/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/needs', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Need.find;
        Need.find = sinon.spy(function (id, callback) {
            callback(null, new Need);
        });
        test.get('/needs/42/edit', function () {
            test.ok(Need.find.calledWith('42'));
            Need.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Need.find;
        Need.find = sinon.spy(function (id, callback) {
            callback(null, new Need);
        });
        test.get('/needs/42', function (req, res) {
            test.ok(Need.find.calledWith('42'));
            Need.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var need = new ValidAttributes;
        var create = Need.create;
        Need.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, need);
            callback(null, need);
        });
        test.post('/needs', {Need: need}, function () {
            test.redirect('/needs');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var need = new ValidAttributes;
        var create = Need.create;
        Need.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, need);
            callback(new Error, need);
        });
        test.post('/needs', {Need: need}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Need.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/needs/1', new ValidAttributes, function () {
            test.redirect('/needs/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Need.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/needs/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

