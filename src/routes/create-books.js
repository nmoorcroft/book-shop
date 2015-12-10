'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var db = require('../model');
var Book = db.Book;

router.post('/books', function (req, res) {
    if (!req.user || req.user.role != 'superuser') {
        res.status(401).send('unauthorized');
    }

    var book = new Book({
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        description: req.body.description,
        qty: req.body.qty
    });

    book.save().then(function (saved) {
        res.status(201).send('/books/' + saved.id);

    }, function (err) {
        res.status(400).send(err);

    });

});

module.exports = router;

