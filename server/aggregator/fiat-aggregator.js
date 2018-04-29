const _ = require('lodash');
const axios = require('axios');

const logger = require('../../utils/logger');
const {Exchange} = require('../models/exchange');
const {Fiat} = require('../models/fiat');
const exchangeInitializer = require('./exchange-initializer');

const moduleName = 'fiat-aggregator';
let _isRunning = true;
let _interval = process.env.FIAT_QUERY_INTERVAL;
const _baseUrl = process.env.FIAT_QUERY_BASEURL;
const _base = process.env.FIAT_BASE_CURRENCY;
let _timeoutId;


const setInterval = (num) =>{
    if (num > 10000){
        _interval = num;
    } else{
        _interval = process.env.FIAT_QUERY_INTERVAL;
    }
    logger.debug(`${moduleName} query interval was changed to ${_interval}`, {moduleName});
}
const start = async()=>{
    try{
        _isRunning = true;
        _startJob();
        logger.info(`${moduleName} - Sync job was started!`, {moduleName});
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
        let start = new Date();
        const createdAt = new Date().getTime();
        const exchanges = await Exchange.find({includeIntoQuery: true});
        var localCurrencies = exchanges.filter(x => x.localCurrency !== _base).map(x => x.localCurrency);
        var res = {};
        if (localCurrencies.length > 0){
            const currencies = localCurrencies.join(); 
            const queryUrl = `${_baseUrl}?access_key=${process.env.FIAT_API_KEY}`;
            res = await axios.get(queryUrl);
            if (res.data){
                var items = localCurrencies.map((i) =>{
                    let symbol = _base + i;
                    var item = {
                        symbol: symbol,
                        price: res.data.quotes[symbol],
                        timestamp: res.data.timestamp,
                        createdAt
                    }
                    return item;
                });
                await Fiat.insertMany(items);
            }
        }                     
        var end = new Date();
        logger.info(`${moduleName} currency rates were received for ${end-start} ms.`, {moduleName, start, end, duration: end - start})
    } catch(e){
        logger.error('Query fiat exchange rates error.', {moduleName, e})
    }
}

const _startJob = async()=>{
    syncItems();
    if(_isRunning)
    {
        _timerId = setTimeout(_startJob, _interval);
    }
};

module.exports = {start, stop, setInterval}