'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var db = require('../model');
var Book = db.Book;

router.post('/rename-request', function (req, res) {
    var request = req.body;



});

module.exports = router;

