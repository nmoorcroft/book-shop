'use strict';

var jwt = require('jsonwebtoken');
var nconf = require('nconf');

module.exports = function(username) {
	return jwt.sign({username:username}, nconf.get('token_secret'));
}

