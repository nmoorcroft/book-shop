'use strict';

var _ = require('lodash');
var express = require('express');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var bcrypt = require('bcrypt');
var nconf = require('nconf');
var bcrypt = require('bcrypt');
var router = express.Router();

var users = JSON.parse(fs.readFileSync(nconf.get('users')));

router.post('/login', function (req, res) {

    var credentials = req.body;
    var user = users[credentials.username];

    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
        res.status(401).send('invalid username or password');

    } else {
        var payload = {username: credentials.username, role: user.role};
        jwt.sign(payload, nconf.get('token_secret'), {expiresIn: '2 days'}, function (token) {
            res.status(200).send({token: token});
        });

    }

});

module.exports = router;

