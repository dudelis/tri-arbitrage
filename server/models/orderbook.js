const mongoose = require('mongoose');

var orderbookSchema = new mongoose.Schema({
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
        type: Number
    },
    asks:[[Number]],
    bids:[[Number]],
    createdAt:{
        type: Number
    }
});

var Orderbook = mongoose.model('Orderbook', orderbookSchema);

module.exports = {Orderbook};