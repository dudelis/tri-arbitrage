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

fiatSchema.statics.getLatestFiats = function(){
    return this.aggregate([
        {
            $sort: {timestamp: 1}
        },
        {
            $group:{
                _id: "$symbol",
                rate: {$last: '$price'},
                timestamp: {$last: '$timestamp'},
                createdAt: {$last: '$createdAt'}
            }
        }
    ]);
};

var Fiat = mongoose.model('Fiat', fiatSchema);

module.exports = {Fiat};