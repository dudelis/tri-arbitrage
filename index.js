require('./config');
require('./utils/seed-exchanges').populate();

const async = require('async');

//const app = require('./app');
const logger = require('./utils/logger');
const tickerAggregator = require('./server/ticker-aggregator');
const orderbookAggregator = require('./server/orderbook-aggregator');

async.parallel([
    function startTickerAggregator(callback){
      tickerAggregator.start(callback);
    },
    function startOrderbookAggregator(callback){
      orderbookAggregator.start(callback);
    },
    function log(callback){
      console.log('hello');
    }]
    // function initializeDBConnection(callback) {
    //   require('./config/initializers/database')(callback);
    // },
    // function startServer(callback) {
    //   server(callback);
    // }]
        // function(err) {
    //   if (err) {
    //     logger.error('[APP] initialization failed', err);
    //   } else {
    //     logger.info('[APP] initialized SUCCESSFULLY');
    //   }
    // }
  );