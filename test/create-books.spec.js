'use strict';

var request = require('supertest');
var assert = require('chai').assert;
var authz = require('./helpers/authz');

describe('create-books api', function () {

    var app, db, helper;

    beforeEach(function () {
        app = require('./helpers/setup');
        db = require('../src/model');
        helper = require('./helpers/db-helper')(db);
    });

    it('should add a new book to the library', function (done) {
        var new_book = {
            title: 'Refactoring: Improving the Design of Existing Code',
            price: 2999,
            author: 'Martin Fowler',
            qty: 5
        };

        helper.removeBooks().then(function() {
            request(app).post('/api/books')
                .set('Authorization', authz.header('admin', 'superuser'))
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
            .set('Authorization', authz.header('admin', 'superuser'))
            .set('Content-Type', 'application/json')
            .send(book)
            .expect(400)
            .end(done);

    });

    it('should be superuser to create books', function (done) {
        var book = {};
        request(app).post('/api/books')
            .set('Authorization', authz.header('bob', 'user'))
            .set('Content-Type', 'application/json')
            .send(book)
            .expect(401)
            .end(done);

    });

    it('should be logged in to create books', function (done) {
        var book = {};
        request(app).post('/api/books')
            .set('Content-Type', 'application/json')
            .send(book)
            .expect(401)
            .end(done);

    });



});


    