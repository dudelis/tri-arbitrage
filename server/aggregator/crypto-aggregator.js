const logger = require('./../../utils/logger');
const {Exchange} = require('../models/exchange');
const exchangeInitializer = require('./exchange-initializer');
const orderbookPlugin = require('./orderbook-plugin');
const tickerPlugin = require('./ticker-plugin');

const moduleName = 'crypto-aggregator';
let _isRunning = false;
let _interval = process.env.QUERY_INTERVAL;
const _minInterval = 60000; //Minimun interval is 1 min sec.
let _timeoutId;
let _delay = 2000; //2000 ms to not be banned by exchanges

const _startJob = async()=>{
    syncExchanges();
    if(_isRunning)
    {
        _timeoutId = setTimeout(_startJob, _interval);
    }
}
const _syncExchange = async (exchange, createdAt)=>{
    for (let symbol of exchange.symbols){
        await orderbookPlugin.syncItem(exchange, symbol, createdAt);
        await new Promise (resolve => setTimeout (resolve, _delay)); //rate limit to not be banned;
        await tickerPlugin.syncItem(exchange, symbol, createdAt);
        if (exchange.symbols.length > 1){
            await new Promise (resolve => setTimeout (resolve, _delay)); //rate limit to not be banned;
        }
    }
}
const getSettings = ()=>{
    return {
        isrunning: _isRunning,
        syncinterval: _interval
    }
}

const start = async()=>{
    try{
        if (!_isRunning){
            _isRunning = true;
            _startJob();
        }
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
const syncExchange = async (ccxtid, createdAt)=>{
    try{
        logger.info(`${ccxtid} - sync was started`, {moduleName, exchange: ccxtid});
        const exchange = await Exchange.findOne({ccxt_id: ccxtid});
        if (!createdAt){
            createdAt = new Date().getTime();
        }
        await _syncExchange(exchange, createdAt);
        const end = new Date();
        logger.info(`${ccxtid} - exchange was queried for ${end-start} ms.`, {moduleName, exchange: ccxtid, start, end, duration: end - start})
    }catch(e){
        logger.error(`${ccxtid} - error querying`, {exchange: ccxtid, e})
    }
}
const syncExchanges = async()=>{
    try{
        logger.info(`${moduleName} - Sync job was started`, {moduleName});
        var start = new Date();
        const createdAt = new Date().getTime();
        const exchanges = await Exchange.find({includeIntoQuery: true});
        for (let exchange of exchanges){
            await _syncExchange(exchange, createdAt);
        }
        var end = new Date();
        logger.info(`${exchanges.length} exchanges were queried for ${end-start} ms.`, {moduleName, start, end, duration: end - start})
    } catch(e){
        logger.error('Query exchanges error.', {moduleName, e})
    }
}

const setInterval = (num) =>{
    if (num > _minInterval){
        _interval = num;
        logger.info(`${moduleName} query interval was changed to ${_interval}`, {moduleName});
    } else{
        _interval = process.env.QUERY_INTERVAL;
        logger.info(`${moduleName} query interval cannot be changed to  ${num}. It cannot be less than ${_minInterval}`, {moduleName});
    }
    return _interval;
}

module.exports = {start, stop, setInterval, syncExchanges, syncExchange, getSettings}