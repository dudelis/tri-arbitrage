const ccxt = require('ccxt');
const _ = require('lodash');

const {mongoose} = require('../server/db/mongoose');
const {Exchange} = require('./models/exchange');
const {Ticker} = require('./models/ticker');
const seed = require('./seed')

let _interval = process.env.QUERY_INTERVAL;
let _timerId;

let _initializedExchanges = {};

const startAggregator = async()=>{
    await _initExchanges(); //Initializes all the exchanges
    await _fetchTickers();
    _timerId = setTimeout(_recursiveFetchTimout, _interval); //Starting regular sync
}

const _initExchanges = async()=>{
    try{
        await seed.populateExchanges();
        const exchanges = await Exchange.find({includeIntoQuery: true});
        exchanges.forEach(async(exchange)=>{
            await _initExchange(exchange.ccxt_id);
        });
        return _initializedExchanges;
    } catch(e){
        throw new Error(e);
    }
}
const _initExchange = async(ccxt_id)=>{
    if (!_initializedExchanges[ccxt_id]){
        let exchange = new ccxt[ccxt_id]();
        _initializedExchanges[ccxt_id] = exchange;
        return exchange;
    } else{
        return _initializedExchanges[ccxt_id];
    }
}

const _fetchTickers = async()=>{
    let createdAt = new Date().getTime();
    let includedExchanges = await Exchange.find({includeIntoQuery: true});
    for (let iExchange of includedExchanges){
        let exchangeInstance = await _initExchange(iExchange.ccxt_id);
        for (let symbol of iExchange.symbols){
            let ticker = await exchangeInstance.fetchTicker(symbol);
            let itemBody = _.pick(ticker, ['symbol', 'timestamp','high', 'low', 'bid', 'ask', 'vwap', 'last', 'baseVolume']);
            itemBody._exchange = iExchange._id;
            itemBody.createdAt = createdAt;
            const item = new Ticker(itemBody);
            await item.save();
        }        
    }
}

const _recursiveFetchTimout = async()=>{
    await _fetchTickers();
    _timerId = setTimeout(_recursiveJob, _interval);
}

module.exports = {startAggregator}