'use strict';

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var db = require('../model');
var Book = db.Book;

router.get('/books', function (req, res) {
    Book.find().then(function (books) {
        res.status(200).json(_(books).map(asHal));
    });
});

router.get('/books/:id', function (req, res) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(404).send('invalid book id ' + req.params.id);

    } else {
        Book.findById(req.params.id).then(function (book) {
            if (!book) res.status(404).send('no such book ' + req.params.id);
            else res.status(200).json(asHal(book));
        });
    }
});

function asHal(book) {
    var id = book._id;
    var self = '/books/' + id;
    return {
        _links: {
            self: {href: self}
        },
        id: id,
        title: book.title,
        author: book.author,
        price: book.price,
        description: book.description
    };
}

module.exports = router;

