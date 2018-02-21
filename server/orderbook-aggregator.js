const _ = require('lodash');

const logger = require('../utils/logger');
const {mongoose} = require('../lib/mongoose');
const {Exchange} = require('../models/exchange');
const {Orderbook} = require('../models/orderbook');
const exchangeInitializer = require('./exchange-initializer');

const moduleName = 'orderbook-aggregator';
let _interval = process.env.QUERY_INTERVAL;
let _initializedExchanges = {};
let _delay = 2000; //delay for querying 1 exchange for various symbols
let _timeoutId;

const setInterval = (num) =>{
    if (num > 10000){
        _interval = num;
    } else{
        _interval = process.env.QUERY_INTERVAL;
    }
    logger.debug(`Query interval was changed to ${_interval}`, {moduleName});
}
const start = async()=>{
    try{
        _startJob();
        logger.info('Sync job was started!', {moduleName});
    } catch(e){
        logger.error('Sync job cannot be started!', {moduleName, e});
    }
}
const stop = () =>{
    if (_timeoutId){
        clearTimeout(_timeoutId);
        logger.info(`Sync job was stopped`, {moduleName});
    }
}

const queryExchanges = async()=>{
    try{
        var start = new Date();
        const createdAt = new Date().getTime();
        const exchanges = await Exchange.find({includeIntoQuery: true});
        for (let exchange of exchanges){
            for (let symbol of exchange.symbols){
                await _fetchOrderBook(exchange, symbol, createdAt);
                if (exchange.symbols.length > 1){
                    await new Promise (resolve => setTimeout (resolve, _delay)); //rate limit to not be banned;
                }
            }
        }
        var end = new Date();
        logger.info(`${exchanges.length} exchanges were queried for ${end-start} ms.`, {moduleName, start, end, duration: end - start})
    } catch(e){
        logger.error('Query exchanges error.', {moduleName, e})
    }
}
const _fetchOrderBook = async(exchange, symbol, createdAt)=>{
    try{
        var start = new Date();
        const exchangeInstance = await exchangeInitializer.initExchange(exchange.ccxt_id);
        const orderbookResponse = await exchangeInstance.fetchOrderBook(symbol);
        let itemBody = _.pick(orderbookResponse, ['timestamp','asks', 'bids']);
        itemBody._exchange = exchange._id;
        itemBody.createdAt = createdAt;
        itemBody.symbol = symbol;
        const orderbook = new Orderbook(itemBody);
        await orderbook.save();
        var end = new Date();
        logger.debug(`Exchange was queried successfully.`, {moduleName, start: start, end: end, duration: end-start, exchange: exchange.ccxt_id, symbol, item: itemBody});
    }catch(e){
        logger.error(`${exchange.ccxt_id} cannot be queried.`, {moduleName, exchange: exchange.id, symbol, e});
    }
}

const _startJob = async()=>{
    await queryExchanges();
    _timerId = setTimeout(_startJob, _interval);
}

module.exports = {start, stop, setInterval}