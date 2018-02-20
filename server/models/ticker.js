const mongoose = require('mongoose');

var tickerSchema = new mongoose.Schema({
    _exchange:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Exchange'
    },
    symbol: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    timestamp:{
        type: Number,
        required: true
    },
    high:{
        type: Number
    },
    low:{
        type: Number
    },
    bid: {
        type: Number
    },
    ask:{
        type: Number
    },
    vwap:{
        type: Number
    },
    last:{
        type: Number
    },
    baseVolume: {
        type: Number
    },
    createdAt:{
        type: Number
    }
});

var Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = {Ticker};