//var Model = require('Model');
var State = require('ampersand-state');
var Helper = require('Helper');
var _ = require('lodash');

var defaultAttr = {

};

var User = State.extend({
    props: {
        first_name: 'string',
        last_name: 'string',
        email: 'string',
        netid: 'string',
        phone: 'string'
    }
});



module.exports = User;