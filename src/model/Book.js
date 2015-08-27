'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String}
});

module.exports = mongoose.model('Book', bookSchema);


