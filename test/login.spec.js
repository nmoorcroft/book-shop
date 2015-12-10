'use strict';

var _ = require('lodash');
var request = require('supertest');
var jwt = require('jsonwebtoken');
var nconf = require('nconf');
var assert = require('chai').assert;

describe('login api', function () {

    var app;

    beforeEach(function () {
        app = require('./helpers/setup');
    });

    it('should be unathorized for invalid username', function (done) {
        var credentials = { username: "invalid", password: "password" };
        request(app).post('/api/login')
            .set('Content-Type', 'application/json')
            .send(credentials)
            .expect(401)
            .end(done);

    });

    it('should be unathorized for invalid password', function (done) {
        var credentials = { username: "admin", password: "invalid" };
        request(app).post('/api/login')
            .set('Content-Type', 'application/json')
            .send(credentials)
            .expect(401)
            .end(done);

    });

    it('should be unathorized for invalid payload', function (done) {
        var credentials = { };
        request(app).post('/api/login')
            .set('Content-Type', 'application/json')
            .send(credentials)
            .expect(401)
            .end(done);

    });


    it('should return a valid json web token for valid username & password', function (done) {
        var credentials = { username: 'admin', password: 'password' };
        request(app).post('/api/login')
            .set('Content-Type', 'application/json')
            .send(credentials)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                assert.ok(_(res.body).has('token'));
                var token = res.body.token;
                jwt.verify(token, nconf.get('token_secret'), function(err, decoded) {
                    assert.equal(decoded.username, 'admin');
                    assert.equal(decoded.role, 'superuser');
                    done(err);
                });
            });

    });

    it('should only verify jwt with same token_secret', function (done) {
        var credentials = { username: "admin", password: "password" };
        request(app).post('/api/login')
            .set('Content-Type', 'application/json')
            .send(credentials)
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


