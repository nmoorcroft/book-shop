'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var db = require('../model');
var Book = db.Book;

router.post('/restock-request', function (req, res) {
    if (!req.user || req.user.role != 'superuser') {
        res.status(401).send('unauthorized');
    }

    res.status(201).send();


});

module.exports = router;

