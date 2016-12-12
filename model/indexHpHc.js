"use strict";
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let index       = new Schema ({
    hc : Number,
    hp : Number,
    created_at : String
});
module.exports  = mongoose.model('index', index);