'use strict';

var jwt = require('jsonwebtoken');
var nconf = require('nconf');

module.exports = function (req, res, next) {

    var authz = req.headers['authorization']; // Authorization: Bearer <token>

    if (authz) {
        var token = authz.substr(7);
        jwt.verify(token, nconf.get('token_secret'), function (err, decoded) {
            if (err) res.status(401).send('invalid Authorization header');
            else {
                req.user = {username: decoded.username, role: decoded.role};
                next();
            }
        });

    } else {
        next();

    }


};

