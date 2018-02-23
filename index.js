require('./config');
require('./utils/seed-exchanges').populate();

const async = require('async');

const app = require('./app');
const logger = require('./utils/logger');
const cryptoAggregator = require('./server/crypto-aggregator');
const fiatAggregator = require('./server/fiat-aggregator');

async.parallel([
    function startCryptoAggregator(callback){
      cryptoAggregator.start(callback);
    },
    function startFiatAggregator(callback){
      fiatAggregator.start(callback);
    },
    function log(callback){
      console.log('hello');
    },
    // function startApp(callback){
    //   app.start();
    // }
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