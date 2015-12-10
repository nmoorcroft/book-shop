'use strict';

var Q = require('q');

module.exports = function(db) {
    return new BooksHelper(db);
};

function BooksHelper(db) {
    this.db = db;
}

BooksHelper.prototype.createSampleBooks = function() {
    return this.removeBooks().then(Q.all([
        this.createBook('Domain-Driven Design', 'Eric Evans', 3600, 5),
        this.createBook('Test-Driven Development', 'Kent Beck', 2999, 2)
    ]));
};

BooksHelper.prototype.removeBooks = function() {
    return this.db.Book.remove();
};

BooksHelper.prototype.createBook = function(title, author, price, qty) {
    return new this.db.Book({title: title, author: author, price: price, qty: qty}).save();
};

