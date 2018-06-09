const async = require('async');

const arbitrageAggregator = require('./arbitrage-aggregator');
const cryptoAggregator = require('./crypto-aggregator');
const fiatAggregator = require('./fiat-aggregator');
const logger = require('../../utils/logger');



const start = () =>{
    async.parallel([
        function (callback){
          cryptoAggregator.start(callback);
        },
        // function (callback){
        //   fiatAggregator.start(callback);
        // }
        function(callback){
            arbitrageAggregator.start(callback)
        }
    ], 
    function(err, results){
        if (err){
            logger.error(`Error in the aggregator module`, {e: err});
        } else{
            logger.info(`Aggregator was launched successfully`, {results});
        }
    });
};

module.exports = {start}