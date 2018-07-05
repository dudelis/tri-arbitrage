const CronJob = require('cron').CronJob;

const logger = require('./../../utils/logger');
const {Arbitrage} = require('../models/arbitrage');
const weightedarbitrage = require('./../arbitrage/stage2_weighted');

//configuration values
const cryptos = ['BTC'];
const volumes = [10000, 25000, 50000];
const moduleName = 'arbitrage-aggregator';

const job = new CronJob({
    cronTime: '00 05,18,20,30,40,54 * * * *',
    onTick: ()=>{
        getSaveArbitrages();
    },
    onComplete: function(){
        logger.info(`Sync job was stopped`, {moduleName});
    }
})

//start arbitrage aggregation
const start = async()=>{
    try{
        job.start();
    } catch(e){
        logger.error('Sync job cannot be started!', {moduleName, e});
    }
}
//stop arbitrage aggregation
const stop = () =>{
    job.stop();
}
//Collect and save all arbitrages
const getSaveArbitrages = async()=>{
    try{
        logger.info(`${moduleName} - Sync job was started`, {moduleName});
        var start = new Date();
        const weekday = start.getDay();
        const hours = start.getHours();
        const minutes = start.getMinutes();
        await _asyncForEach(cryptos, async function(crypto) {
            await _asyncForEach(volumes, async function(volume){
                const arbitrages = await weightedarbitrage.getArbitrageList(crypto, volume);
                const ArbitragesList = arbitrages.map(item =>{
                    const arbitrageObj = {
                        ...item,
                        volume,
                        crypto,
                        weekday,
                        hours,
                        minutes
                    }
                    return new Arbitrage(arbitrageObj);
                });
                Arbitrage.insertMany(ArbitragesList, {ordered: false});
            });
        });
        
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

const _asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }
//Get arbitrages for 1 crypt and amount

module.exports = {start, stop, getSaveArbitrages}