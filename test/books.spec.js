'use strict';

var Q = require('q');
var _ = require('lodash');
var request = require('supertest');
var assert = require('chai').assert;

describe('books api', function () {

    var app, db, token;

    beforeEach(function () {
        app = require('./helpers/setup');
        db = require('../src/model');
        token = require('./helpers/tokenHelper')();
    });

    it('should retrieve all books from the book shop', function (done) {
        createSampleBooks().then(function () {
            request(app).get('/api/books')
                .set('x-access-token', token)
                .expect(200)
                .expect(function (res) {
                    assert.equal(res.body.length, 2);
                    assert.ok(_.find(res.body, _.matchesProperty('title', 'Domain-Driven Design')));
                    assert.ok(_.find(res.body, _.matchesProperty('title', 'Test-Driven Development')));
                })
                .end(done);
        });

    });

    it('should retrieve a book by id', function (done) {
        createSampleBooks().then(function () {
            return db.Book.find({});

        }).then(function(books) {
            request(app).get('/api/books/' + books[0]._id)
                .set('x-access-token', token)
                .expect(200)
                .expect(function (res) {
                    assert.ok(_(res.body).has('_links'));
                    assert.ok(_(res.body).has('_links.self'));
                    assert.equal(res.body.title, books[0].title);
                    assert.equal(res.body.id, books[0]._id);
                })
                .end(done);

            });

    });

    it('should get 404 for invalid id', function (done) {
        request(app).get('/api/books/123')
            .set('x-access-token', token)
            .expect(404)
            .end(done);

    });

    it('should get 404 for unknown id', function (done) {
        request(app).get('/api/books/5536958388a60d701386ffbc')
            .set('x-access-token', token)
            .expect(404)
            .end(done);

    });

    function createSampleBooks() {
        return removeBooks().then(Q.all([
            createBook('Domain-Driven Design', 'Eric Evans', 3600),
            createBook('Test-Driven Development', 'Kent Beck', 2999)
        ]));
    }

    function removeBooks() {
        return db.Book.remove();
    }

    function createBook(title, author, price) {
        return new db.Book({title: title, author: author, price: price}).save();
    }


});


