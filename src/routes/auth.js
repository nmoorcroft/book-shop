'use strict';

var _ = require('lodash');
var jwt = require('jsonwebtoken');
var nconf = require('nconf');

module.exports = function(req, res, next) {

	var token = req.headers['x-access-token'];

	if (req.path == '/login') next();
	else {
		if (token) {
			jwt.verify(token, nconf.get('token_secret'), function(err, decoded) {
				if (err) res.status(401).send('invalid x-access-token');
				else {
					req.username = decoded.username;
					next();
				}
			});
		} else {
			res.status(401).send('missing x-access-token');
		}
	}

};

