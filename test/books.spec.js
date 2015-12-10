'use strict';

var Q = require('q');
var _ = require('lodash');
var request = require('supertest');
var assert = require('chai').assert;

describe('books api', function () {

    var app, db, helper;

    beforeEach(function () {
        app = require('./helpers/setup');
        db = require('../src/model');
        helper = require('./helpers/db-helper')(db);
    });

    it('should retrieve all books from the book shop', function (done) {
        helper.createSampleBooks().then(function () {
            request(app).get('/api/books')
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
        helper.createSampleBooks().then(function () {
            return db.Book.find({});

        }).then(function(books) {
            request(app).get('/api/books/' + books[0]._id)
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
            .expect(404)
            .end(done);

    });

    it('should get 404 for unknown id', function (done) {
        request(app).get('/api/books/5536958388a60d701386ffbc')
            .expect(404)
            .end(done);

    });


});


