'use strict';

var jwt = require('jsonwebtoken');
var nconf = require('nconf');

module.exports = function (username, role) {
    return 'Bearer ' + jwt.sign({username: username, role: role}, nconf.get('token_secret'));
};



