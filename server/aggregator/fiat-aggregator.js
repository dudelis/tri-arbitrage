const axios = require('axios');
const CronJob = require('cron').CronJob;

const logger = require('../../utils/logger');
const {Exchange} = require('../models/exchange');
const {Fiat} = require('../models/fiat');

const moduleName = 'fiat-aggregator';
const _baseUrl = process.env.FIAT_QUERY_BASEURL;
const _base = process.env.FIAT_BASE_CURRENCY;


const _job = new CronJob({
    cronTime: '00 05,15,27,35,45,55 * * * *',
    onTick: ()=>{
        _syncItems();
    },
    onComplete: function(){
        logger.info(`Sync job was stopped`, {moduleName});
    }
});
const _syncItems = async()=>{
    try{
        logger.info(`${moduleName} - Sync job was started!`, {moduleName});
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

module.exports = {start, stop}