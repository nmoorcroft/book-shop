'use strict';

var _ = require('lodash');
var express = require('express');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var nconf = require('nconf');
var router = express.Router();

var users = JSON.parse(fs.readFileSync(nconf.get('users')));

router.get('/login', function (req, res) {
    var username = req.query.username;
    if (!users[username] || users[username] != req.query.password) {
        res.status(401).send('invalid username or password');

    } else {
        jwt.sign({'username': username}, nconf.get('token_secret'), { expiresIn: 86400 }, function(token) {
            res.status(200).send({token: token});
        });
        
    }
});

module.exports = router;

