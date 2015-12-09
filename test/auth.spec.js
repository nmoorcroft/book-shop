'use strict';

var request = require('supertest');

describe('auth', function () {

    var app;

    beforeEach(function () {
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
            .set('x-access-token', require('./helpers/tokenHelper')())
            .expect(200)
            .end(done);

    });



});


