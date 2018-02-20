require('../config/index');
const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Ticker} = require('../server/models/ticker');

console.log(process.env.MONGODB_URI);

var objectID = new ObjectID();

var ticker = new Ticker({
    _exchange: objectID,
    symbol: "BTC/EUR",
    timestamp: new Date().getTime(),
    high: 0.123312312
});
let timerId = setTimeout(function saveTicker(){
    ticker.save().then((ticker)=>{
        console.log(ticker);
    }).catch((e)=>{
        console.log(e);
    })
    setTimeout(saveTicker, process.env.QUERY_INTERVAL)
}, process.env.QUERY_INTERVAL)

