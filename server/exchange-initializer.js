const ccxt = require('ccxt');
const _ = require('lodash');

const logger = require('../utils/logger');
const {mongoose} = require('../lib/mongoose');
const {Exchange} = require('../models/exchange');

const moduleName = 'Exchange initializer';
let exchanges = {};


const initExchange = async(ccxt_id)=>{
    try{
        if (!exchanges[ccxt_id]){
            let exchange = new ccxt[ccxt_id]();
            exchanges[ccxt_id] = exchange;
            return exchanges[ccxt_id];
        } else{
            return exchanges[ccxt_id];
        }
        logger.debug(`Exchange was initialized successfully`, {moduleName, exchange: ccxt_id});
    }catch(e){
        logger.error(`Exchange with ${ccxt_id} cannot be initialized`, {moduleName, e});
    }
}
const refreshExchange = async(ccxt_id)=>{
    try{
        var exchange = new ccxt[ccxt_id]();
        await exchange.load_markets();
        logger.debug(`Exchange was refreshed successfully`, {moduleName, exchange: ccxt_id});
    } catch(e){
        logger.error(`Unable to refresh exchange ${ccxt_id}!`, {moduleName, e, exchange: ccxt_id});
    }
}

module.exports = {
    initExchange,
    refreshExchange
}