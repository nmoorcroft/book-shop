'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var db = require('../model');
var Book = db.Book;

router.post('/books', function (req, res) {
    var book = new Book(req.body);
    book.save().then(function (saved) {
        res.status(201).send('/books/' + saved.id);

    }, function (err) {
        res.status(400).send(err);

    });

});

module.exports = router;

