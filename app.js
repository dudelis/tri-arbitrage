require('./config');
require('./utils/seed-exchanges').populate();

const async = require('async');

const server = require('./server/server');
const logger = require('./utils/logger');
const aggregator = require('./server/aggregator');

async.parallel([
    function (callback){
      aggregator.start(callback);
    },
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