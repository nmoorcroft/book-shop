'use strict';

var request = require('supertest');
var assert = require('chai').assert;

describe('create-books api', function () {

    var app, db, authz;

    beforeEach(function () {
        app = require('./helpers/setup');
        db = require('../src/model');
        authz = require('./helpers/authzHelper')();
    });

    it('should add a new book to the library', function (done) {
        var new_book = {
            title: 'Refactoring: Improving the Design of Existing Code',
            price: 2999,
            author: 'Martin Fowler'
        };

        removeBooks().then(function() {
            request(app).post('/api/books')
                .set('Authorization', authz)
                .set('Content-Type', 'application/json')
                .send(new_book)
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    db.Book.find(function (err, books) {
                        assert.equal(books.length, 1);
                        assert.equal(books[0].title, 'Refactoring: Improving the Design of Existing Code');
                        done(err);

                    });

                });

        });

    });

    it('should return 400 for invalid post', function (done) {
        var book = {};
        request(app).post('/api/books')
            .set('Authorization', authz)
            .set('Content-Type', 'application/json')
            .send(book)
            .expect(400)
            .end(done);

    });

    function removeBooks() {
        return db.Book.remove();
    }


});


    