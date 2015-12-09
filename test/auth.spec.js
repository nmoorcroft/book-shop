'use strict';

var Q = require('q');
var _ = require('lodash');
var request = require('supertest');
var nconf = require('nconf');
var assert = require('chai').assert;

describe('auth', function () {

    var app;

    beforeEach(function () {
        nconf.overrides({disable_auth: false});
        app = require('./helpers/setup');
    });

    it('should require a token', function (done) {
        request(app).get('/api/books')
            .expect(401)
            .end(done);

    });

    it('should fail with invalid token', function (done) {
        request(app).get('/api/books')
            .set('x-access-token', 'invalid')
            .expect(401)
            .end(done);

    });

    it('should require valid token', function (done) {
        request(app).get('/api/books')
            .set('x-access-token', require('./helpers/token')())
            .expect(200)
            .end(done);

    });



});


