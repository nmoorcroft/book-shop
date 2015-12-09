'use strict';

var Q = require('q');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var request = require('supertest');
var nconf = require('nconf');
var assert = require('chai').assert;

describe('login api', function () {

    var app;

    beforeEach(function () {
        app = require('./helpers/setup');
    });

    it('should be unathorized for invalid username', function (done) {
        request(app).get('/api/login?username=invalid&password=password')
            .expect(401)
            .end(done);

    });

    it('should be unathorized for invalid password', function (done) {
        request(app).get('/api/login?username=admin&password=invalid')
            .expect(401)
            .end(done);

    });

    it('should be unathorized for missing params', function (done) {
        request(app).get('/api/login')
            .expect(401)
            .end(done);

    });


    it('should return a valid json web token for valid username & password', function (done) {
        request(app).get('/api/login?username=admin&password=password')
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                assert.ok(_(res.body).has('token'));
                var token = res.body.token;
                jwt.verify(token, nconf.get('token_secret'), function(err, decoded) {
                    done(err);
                });
            });

    });

    it('should only verify jwt with same token_secret', function (done) {
        request(app).get('/api/login?username=admin&password=password')
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                assert.ok(_(res.body).has('token'));
                var token = res.body.token;
                jwt.verify(token, 'invalid token_secret', function(err, decoded) {
                    assert.ok(err);
                    done();
                });
            });

    });



});


