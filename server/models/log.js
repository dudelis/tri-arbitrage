const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    timestamp:{
        type: Date
    },
    level:{
        type: String
    },
    message:{
        type: String
    },
    meta: {
        type: Object
    }

},{
    collection: 'log'
});

const Log = mongoose.model('Log', logSchema);

module.exports = {Log};