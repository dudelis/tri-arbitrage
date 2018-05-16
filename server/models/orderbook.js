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

orderbookSchema.statics.getArbitrageOrderBooks = async function(base){
    const regex = new RegExp(`^${base}`); //getting all the tickers for a certain CryptoCurrency
    return this.aggregate([
        {
            $sort:{_id: 1}
        },
        {
            $group:{
                _id: "$_exchange",
                _orderbookid: {$last: '$_id'},
                timestamp: {$last: '$timestamp'},
                createdAt: {$last: '$createdAt'},
                bids: {$last: '$bids'},
                asks: {$last: '$asks'},
                symbol: {$last: '$symbol'}
        }},
        { 
            $lookup:{
                from: "exchanges",
                localField: "_id",
                foreignField: "_id",
                as: "exchange"
        }},
        {
            "$match":{
                $and:[{
                    'exchange.includeIntoQuery': true,
                },{
                    symbol: regex
                }
            ]
            }
        },
        {
            $addFields:{
                exchange: {$arrayElemAt: ['$exchange', 0]}
            }
        }
    ]
    );
}

var Orderbook = mongoose.model('Orderbook', orderbookSchema);

module.exports = {Orderbook};