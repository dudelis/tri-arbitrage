require('../config/index');
const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Ticker} = require('../server/models/ticker');
const {Exchange} = require('../server/models/exchange');
const {Fiat} = require('../server/models/fiat');

console.log(process.env.MONGODB_URI);


const getTickers = async () =>{
    //var tickers = await Ticker.find().distinct('_exchange').sort({timestamp: -1});
    
    const tickers = await Ticker.getArbitrageTickers('BTC');

    const fiats = await Fiat.getLatestFiats();

    console.log(tickers[0], fiats[0]);
};

getTickers();



// var objectID = new ObjectID();

// var ticker = new Ticker({
//     _exchange: objectID,
//     symbol: "BTC/EUR",
//     timestamp: new Date().getTime(),
//     high: 0.123312312
// });
// let timerId = setTimeout(function saveTicker(){
//     ticker.save().then((ticker)=>{
//         console.log(ticker);
//     }).catch((e)=>{
//         console.log(e);
//     })
//     setTimeout(saveTicker, process.env.QUERY_INTERVAL)
// }, process.env.QUERY_INTERVAL)

