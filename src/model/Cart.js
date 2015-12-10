'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    last_modified: {type: Date, required: true},
    status: {type: String, required: true},
    items: [{
        sku: {type: Schema.Types.ObjectId, required: true},
        qty: {type: Number, required: true}
    }]
});

module.exports = mongoose.model('Cart', cartSchema);


