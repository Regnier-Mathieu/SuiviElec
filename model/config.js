/**
 * Created by mathieu on 13/12/16.
 */

"use strict";
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

let config       = new Schema ({
    exist : Boolean,
    hc : Number,
    hp : Number,
    Monthly : Number,
    subscription : Number,
    unitHpPrice : Number,
    unitHcPrice : Number,
    billingDate : String,
    lowTVA : Number,
    HighTVA : Number,
    CSPEprice : Number,
    taxMuni : Number,
    taxDep : Number,
    CTA : Number
});
module.exports  = mongoose.model('Config', config);