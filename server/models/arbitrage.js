const mongoose = require('mongoose');

var arbitrageSchema = new mongoose.Schema({
    _askexchange:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Exchange'
    },
    _bidexchange:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Exchange'
    },
    arbitragesymbol:{
        type: String
    },
    ask:{
        type: Number
    },
    asksymbol:{
        type: String
    },
    bid:{
        type: Number
    },   
    bidsymbol:{
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

arbitrageSchema.statics.getArbitrage = async function(crypto, volume, timestamp = new Date().getTime()){
    try{
    return this.aggregate([
        {
            $match:{
                $and:[
                    {crypto: crypto},
                    {volume: volume},
                    {createdAt: {$lte: timestamp}}
                ]
            },
        },
        {
            $sort:{_id: 1}
        },
        {
            $group:{
                _id: { askexchange: "$_askexchange", bidexchange:"$_bidexchange"},
                _askexchange: {$last: "$_askexchange"},
                _bidexchange: {$last: "$_bidexchange"},
                ask: {$last: "$ask"},
                askSymbol: {$last: "$askSsmbol"},
                bid : {$last: "$bid"},
                bidSymbol: {$last: "$bidsymbol"},
                value: {$last: "$value"},
                volume: {$last: "$volume"},
                crypto: {$last: "$crypto"}
            }
        },
        {
            $lookup:{
                from: "exchanges",
                localField: "_askexchange",
                foreignField: "_id",
                as: "askexchange"
            },
        },
        {
            $lookup:{
                from: "exchanges",
                localField: "_bidexchange",
                foreignField: "_id",
                as: "bidexchange"
            }
        },
        {
            $addFields:{
                askexchange: {$arrayElemAt: ['$askexchange', 0]},
                bidexchange: {$arrayElemAt: ['$bidexchange', 0]},
            }
        }

    ]);
    }catch(e){
        console.log(e);
    }

}

const Arbitrage = mongoose.model('Arbitrage', arbitrageSchema);

module.exports = {Arbitrage};