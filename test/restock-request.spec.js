'use strict';

var request = require('supertest');
var assert = require('chai').assert;
var Q = require('q');
var authz = require('./helpers/authz');

describe('restock api', function () {

    var app, db, helper;

    beforeEach(function () {
        app = require('./helpers/setup');
        db = require('../src/model');
        helper = require('./helpers/db-helper')(db);
    });

    it('should increase stock of a book to the library', function (done) {
        helper.createSampleBooks().then(function () {
            return db.Book.find({title: 'Domain-Driven Design'});

        }).then(function(books) {
            var restock_request = {
                sku: books[0]._id,
                qty: 10

            };
            request(app).post('/api/restock-request')
                .set('Authorization', authz.header('admin', 'superuser'))
                .set('Content-Type', 'application/json')
                .send(restock_request)
                .expect(201)
                .end(done);

        });


    });

    it('should be superuser to restock', function (done) {
        request(app).post('/api/restock-request')
            .set('Authorization', authz.header('bob', 'user'))
            .set('Content-Type', 'application/json')
            .send({})
            .expect(401)
            .end(done);


    });

    it('should be logged in to restock', function (done) {
        request(app).post('/api/restock-request')
            .set('Content-Type', 'application/json')
            .send({})
            .expect(401)
            .end(done);


    });


});


