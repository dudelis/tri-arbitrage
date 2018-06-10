const logger = require('./../../utils/logger');
const {Arbitrage} = require('../models/arbitrage');
const weightedarbitrage = require('./../arbitrage/stage2_weighted');

//configuration values
const baseFiat = 'USD';
const cryptos = ['BTC'];
const volumes = [10000, 25000, 50000];

//system values
const moduleName = 'arbitrage-aggregator';
let _isRunning = false;
let _interval = process.env.QUERY_INTERVAL;
const _minInterval = 60000; //Minimun interval is 1 min.
let _timeoutId;


//start arbitrage aggregation
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
//stop arbitrage aggregation
const stop = () =>{
    if (_timeoutId){
        clearTimeout(_timeoutId);
        logger.info(`Sync job was stopped`, {moduleName});
    }
    _isRunning = false;
}
//start arbitrage job
const _startJob = ()=>{
    getSaveArbitrages();
    if(_isRunning)
    {
        _timeoutId = setTimeout(_startJob, _interval);
    }
}

//Collect and save all arbitrages
const getSaveArbitrages = async()=>{
    try{
        logger.info(`${moduleName} - Sync job was started`, {moduleName});
        var start = new Date();
        cryptos.forEach(async (crypto) =>{
            volumes.forEach(async (volume) =>{
                const arbitrages = await weightedarbitrage.getArbitrageList(crypto, volume);
                const ArbitragesList = arbitrages.map(item =>{
                    const arbitrageObj = {
                        ...item,
                        volume,
                        crypto
                    }
                    return new Arbitrage(arbitrageObj);
                });
                await Arbitrage.insertMany(ArbitragesList, {ordered: false});
            });
        })
        var end = new Date();
        logger.info(`Arbitrage was received and saved to DB for ${end-start} ms.`, {moduleName, start, end, duration: end - start})
    } catch(e){
        const msg = {
            message: `Error getting arbitrages.`,
            e
        }
        logger.error(msg.message, { e});
    }
}
//Get arbitrages for 1 crypt and amount

module.exports = {start, getSaveArbitrages}