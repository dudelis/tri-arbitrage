const logger = require('./../../utils/logger');
const {Exchange} = require('../models/exchange');
const exchangeInitializer = require('./exchange-initializer');
const orderbookPlugin = require('./orderbook-plugin');
const tickerPlugin = require('./ticker-plugin');

const moduleName = 'crypto-aggregator';
let _isRunning = true;
let _interval = process.env.QUERY_INTERVAL;
let _timeoutId;
let _delay = 2000; //2000 ms to not be banned by exchanges


const start = async()=>{
    try{
        _isRunning = true;
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
    _isRunning = false;
}

const syncItems = async()=>{
    try{
        var start = new Date();
        const createdAt = new Date().getTime();
        const exchanges = await Exchange.find({includeIntoQuery: true});
        for (let exchange of exchanges){
            for (let symbol of exchange.symbols){
                await orderbookPlugin.syncItem(exchange, symbol, createdAt);
                await new Promise (resolve => setTimeout (resolve, _delay)); //rate limit to not be banned;
                await tickerPlugin.syncItem(exchange, symbol, createdAt);
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
const setInterval = (num) =>{
    if (num > process.env.QUERY_INTERVAL){
        _interval = num;
    } else{
        _interval = process.env.QUERY_INTERVAL;
    }
    logger.debug(`Query interval was changed to ${_interval}`, {moduleName});
}
const _startJob = async()=>{
    syncItems();
    if(_isRunning)
    {
        _timerId = setTimeout(_startJob, _interval);
    }
}

module.exports = {start, stop, setInterval}