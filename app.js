require('./config');
require('./utils/seed-exchanges').populate();

const async = require('async');

const server = require('./server/server');
const logger = require('./utils/logger');
const cryptoAggregator = require('./server/aggregator/crypto-aggregator');
const fiatAggregator = require('./server/aggregator/fiat-aggregator');

async.parallel([
    // function startCryptoAggregator(callback){
    //   cryptoAggregator.start(callback);
    // },
    // function startFiatAggregator(callback){
    //   fiatAggregator.start(callback);
    // },
    // function log(callback){
    //   console.log('hello');
    // },
    function startApp(callback){
      server.start();
    }
  ]
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