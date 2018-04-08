const _ = require('lodash');

const logger = require('./../../utils/logger');
const {Orderbook} = require('../models/orderbook');
const exchangeInitializer = require('./exchange-initializer');

const moduleName = 'orderbook-plugin';

const syncItem = async(exchange, symbol, createdAt)=>{
    try{
        const start = new Date();
        const exchangeInstance = await exchangeInitializer.initExchange(exchange.ccxt_id);
        const orderbookResponse = await exchangeInstance.fetchOrderBook(symbol);
        let itemBody = _.pick(orderbookResponse, ['timestamp','asks', 'bids']);
        itemBody._exchange = exchange._id;
        itemBody.createdAt = createdAt;
        itemBody.symbol = symbol;
        const orderbook = new Orderbook(itemBody);
        await orderbook.save();
        const end = new Date();
        logger.debug(`Exchange was queried successfully.`, {moduleName, start: start, end: end, duration: end-start, exchange: exchange.ccxt_id, symbol, item: itemBody});
    }catch(e){
        logger.error(`${exchange.ccxt_id} cannot be queried.`, {moduleName, exchange: exchange.id, symbol, e});
    }
}

module.exports = {syncItem}