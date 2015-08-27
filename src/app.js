'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var nconf = require('nconf');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.connect(nconf.get('mongodb'));

var routes = require('./routes');
app.use(nconf.get('base_uri'), routes);

module.exports = app;


