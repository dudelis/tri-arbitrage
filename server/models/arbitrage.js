const mongoose = require('mongoose');

var arbitrageSchema = new mongoose.Schema({
    _askExchange:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Exchange'
    },
    _bidExchange:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Exchange'
    },
    ask:{
        type:Number
    },
    bid:{
        type:Number
    },
    askSymbol:{
        type: String
    },
    bidSymbol:{
        type: String
    },
    arbitrage:{
        type: Number,
        required: true
    },
    timestamp:{
        type: Number,
        required: true
    },
    exchangeRate:{
        type: Number
    }

});

const Arbitrage = mongoose.model('Arbitrage', arbitrageSchema);

module.exports = {Arbitrage};