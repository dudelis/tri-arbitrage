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
        type: Number
    },
    askSymbol:{
        type: String
    },
    bid:{
        type: Number
    },   
    bidSymbol:{
        type: String
    },
    value:{
        type: Number,
        required: true
    },
    volume:{
        type: Number,
        required: true
    },
    crypto:{
        type: String,
        required: true
    },
    createdAt:{
        type: Number,
        default: new Date().getTime()
    }
});

const Arbitrage = mongoose.model('Arbitrage', arbitrageSchema);

module.exports = {Arbitrage};