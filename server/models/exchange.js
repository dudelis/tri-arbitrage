const mongoose = require('mongoose');

var exchangeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength: 1,
        trim: true,
        unique: true
    },
    ccxt_id:{
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unque: true
    },
    localCurrency:{
        type: String,
        required: true,
        minlength:1,
        trim: true
    },
    includeIntoQuery:{
        type: Boolean,
        default: false
    },
    symbols: [{
        type: String
    }],
    createdAt:{
        type: Number,
        default: new Date().getTime()
    },
    updatedAt:{
        type: Number
    }
});

var Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = {Exchange};