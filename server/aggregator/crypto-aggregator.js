const async = require('async');
const CronJob = require('cron').CronJob;

const logger = require('./../../utils/logger');
const {Exchange} = require('../models/exchange');
const orderbookPlugin = require('./orderbook-plugin');
const tickerPlugin = require('./ticker-plugin');

const moduleName = 'crypto-aggregator';
let _delay = 2000; //2000 ms to not be banned by exchanges


const _job = new CronJob({
    cronTime: '00 05,15,27,35,45,55 * * * *',
    onTick: ()=>{
        syncExchanges();
    },
    onComplete: function(){
        logger.info(`Sync job was stopped`, {moduleName});
    }
})

const syncExchanges = async()=>{
    try{
        logger.info(`${moduleName} - Sync job was started`, {moduleName});
        var start = new Date();
        const exchanges = await Exchange.find({includeIntoQuery: true});
        
        async.forEachOf(exchanges, function(value, key, callback) {
            _syncExchange(value).then((res)=>{
                callback(null);
            }, (err)=>{
                callback(err);
            });
            
        }, function(err){
            if (err){
                logger.error('Query exchanges error.', {moduleName, e: err})
            } else{
                var end = new Date();
                logger.info(`${exchanges.length} exchanges were queried for ${end-start} ms.`, {moduleName, start, end, duration: end - start});
            }
        });        
    } catch(e){
        logger.error('Query exchanges error.', {moduleName, e})
    }
}

const _syncExchange = async (exchange, createdAt)=>{
    createdAt = createdAt || new Date().getTime();
    for (let symbol of exchange.symbols){
        await orderbookPlugin.syncItem(exchange, symbol, createdAt);
        await new Promise (resolve => setTimeout (resolve, _delay)); //rate limit to not be banned;
        await tickerPlugin.syncItem(exchange, symbol, createdAt);
        if (exchange.symbols.length > 1){
            await new Promise (resolve => setTimeout (resolve, _delay)); //rate limit to not be banned;
        }
    }
}
const start = ()=>{
    try{
        _job.start();
    } catch(e){
        logger.error('Sync job cannot be started!', {moduleName, e});
    }
}
const stop = () =>{
    _job.stop();
}
const syncExchange = async (id)=>{
    try{
        const start = new Date();
        const exchange = await Exchange.findById(id);
        logger.info(`${exchange.ccxt_id} - sync was started`, {moduleName, exchange: exchange.ccxt_id});
        const createdAt = new Date().getTime();
        await _syncExchange(exchange, createdAt);
        const end = new Date();
        const message = `${exchange.ccxt_id} - exchange was queried for ${end-start} ms.`;
        logger.info(message, {moduleName, exchange: exchange.ccxt_id, start, end, duration: end - start});
        return {message};
    }catch(e){
        const msg = {
            message: `${exchange.ccxt_id} - error querying`,
            e
        }
        logger.error(msg.message, {exchange: exchange.ccxt_id, e})
    }
}

module.exports = {start, stop, syncExchanges, syncExchange}