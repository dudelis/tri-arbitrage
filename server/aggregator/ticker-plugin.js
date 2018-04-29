const _ = require('lodash');

const logger = require('./../../utils/logger');
const {Ticker} = require('../models/ticker');
const exchangeInitializer = require('./exchange-initializer');

const moduleName = 'ticker-plugin';

const syncItem = async(exchange, symbol, createdAt)=>{
    try{
        const start = new Date();
        const exchangeInstance = await exchangeInitializer.initExchange(exchange.ccxt_id);
        const tickerResponse = await exchangeInstance.fetchTicker(symbol);
        let itemBody = _.pick(tickerResponse, ['symbol', 'timestamp','high', 'low', 'bid', 'ask', 'vwap', 'last', 'baseVolume']);
        itemBody._exchange = exchange._id;
        itemBody.createdAt = createdAt;
        const ticker = new Ticker(itemBody);
        await ticker.save();
        const end = new Date();
        logger.debug(`Exchange was queried successfully.`, {moduleName, start, end, duration: end-start, exchange: exchange.ccxt_id, symbol, item: itemBody});
    }catch(e){
        logger.error(`${exchange.ccxt_id} cannot be queried.`, {moduleName, exchange: exchange.id, symbol, e});
    }
}

module.exports = {syncItem}