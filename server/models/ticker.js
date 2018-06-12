const mongoose = require('mongoose');

const tickerSchema = new mongoose.Schema({
    _exchange:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Exchange'
    },
    // _exchangeName:{
    //     type: String,
    //     required: true
    // },
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

tickerSchema.statics.getArbitrageTickers = async function(base) {
    const regex = new RegExp(`^${base}`); //getting all the tickers for a certain CryptoCurrency
    return this.aggregate([
        {
            $sort: {_id: 1}
        },
        {
            $group:{
                _id: "$_exchange",
                _tickerId: {$last: '$_id'},
                timestamp: {$last: '$timestamp'},
                createdAt: {$last: '$createdAt'},
                bid: {$last: '$bid'},
                ask: {$last: '$ask'},
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
    ]);
};

const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = {Ticker};