const mongoose = require('mongoose');

var fiatSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    price:{
        type: Number
    },
    timestamp:{
        type: Number
    },
    createdAt:{
        type: Number
    }
});

var Fiat = mongoose.model('Fiat', fiatSchema);

module.exports = {Fiat};